import React, { useState, useEffect } from "react";
import { getSongMoodSearchTerm } from "../services/GeminiService";

// 🔴 PASTE YOUR PEXELS API KEY HERE
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
export default function AestheticBackground({ currentSong }) {
  const [videoUrl, setVideoUrl] = useState(null);
  
  // Default video (Abstract) so screen isn't black while thinking
  const DEFAULT_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-abstract-blue-and-purple-liquid-background-2788-large.mp4";

  useEffect(() => {
    if (!currentSong) return;

    const fetchAesthetic = async () => {
      // 1. Ask Gemini for the vibe
      const songName = currentSong.name;
      const artistName = currentSong.artists?.[0]?.name || "";
      
      console.log(`🤖 Gemini Analyzing: ${songName}...`);
      const searchQuery = await getSongMoodSearchTerm(songName, artistName);
      console.log(`🎨 Visual Concept: "${searchQuery}"`);

      // 2. Ask Pexels for a video matching that vibe
      try {
        const pexelsUrl = `https://api.pexels.com/videos/search?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape&size=medium`;
        
        const response = await fetch(pexelsUrl, {
          headers: { Authorization: PEXELS_API_KEY }
        });

        const data = await response.json();

        if (data.videos && data.videos.length > 0) {
          // Find a good quality MP4 (HD)
          const videoFiles = data.videos[0].video_files;
          const bestFile = videoFiles.find(v => v.width >= 1280 && v.width <= 1920) || videoFiles[0];
          setVideoUrl(bestFile.link);
        } else {
          setVideoUrl(DEFAULT_VIDEO);
        }
      } catch (error) {
        console.error("Pexels Error:", error);
        setVideoUrl(DEFAULT_VIDEO);
      }
    };

    fetchAesthetic();

  }, [currentSong?.name]); 

  return (
    <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        zIndex: -1, overflow: "hidden", backgroundColor: "#000"
    }}>
      <video
        key={videoUrl || "default"} 
        src={videoUrl || DEFAULT_VIDEO}
        autoPlay loop muted playsInline
        style={{
            width: "100%", height: "100%", objectFit: "cover",
            opacity: 0.6, // Dim video slightly
            transition: "opacity 1s ease-in-out",
            filter: "brightness(0.6) contrast(1.1)" 
        }}
      />
      <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          background: "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.9) 100%)"
      }}></div>
    </div>
  );
}