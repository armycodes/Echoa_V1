import React, { useState, useEffect } from "react";

// --- VIDEO ASSETS (High Quality Loops) ---
// Note: These are direct links to Pexels videos. You can replace them with your own local assets later if you want.
const VIDEOS = {
  // 1. PARTY / HIGH ENERGY (Neon, lights, movement)
  party: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4",
  
  // 2. ROMANTIC / LOVE (Soft colors, sunset, flowers)
  love: "https://videos.pexels.com/video-files/6653198/6653198-hd_1920_1080_25fps.mp4",
  
  // 3. SAD / LONELY (Rain, dark windows, grey)
  sad: "https://videos.pexels.com/video-files/4440846/4440846-hd_1920_1080_24fps.mp4",
  
  // 4. CHILL / NATURE (Ocean, clouds, green)
  chill: "https://videos.pexels.com/video-files/2611250/2611250-hd_1920_1080_30fps.mp4",
  
  // 5. DARK / MYSTERIOUS (Smoke, black & white, abstract)
  dark: "https://videos.pexels.com/video-files/2759484/2759484-hd_1920_1080_30fps.mp4",
  
  // 6. DEFAULT (Abstract fluids, safe for any song)
  default: "https://videos.pexels.com/video-files/2658826/2658826-hd_1920_1080_30fps.mp4"
};

export default function AestheticBackground({ currentSong }) {
  const [videoUrl, setVideoUrl] = useState(VIDEOS.default);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // If no song is playing, keep default
    if (!currentSong) return;

    // Start transition
    setIsFading(true);

    // --- MOOD DETECTION LOGIC ---
    // Combine Song Name & Artist Name to check keywords
    const text = (currentSong.name + " " + (currentSong.artists?.[0]?.name || "")).toLowerCase();
    
    let nextVideo = VIDEOS.default;

    // KEYWORD MATCHING
    if (text.includes("remix") || text.includes("party") || text.includes("dance") || text.includes("dj") || text.includes("club") || text.includes("rock")) {
        nextVideo = VIDEOS.party;
    } 
    else if (text.includes("love") || text.includes("heart") || text.includes("baby") || text.includes("kiss") || text.includes("beautiful")) {
        nextVideo = VIDEOS.love;
    }
    else if (text.includes("sad") || text.includes("lonely") || text.includes("cry") || text.includes("pain") || text.includes("break") || text.includes("sorry")) {
        nextVideo = VIDEOS.sad;
    }
    else if (text.includes("night") || text.includes("dark") || text.includes("star") || text.includes("moon") || text.includes("black")) {
        nextVideo = VIDEOS.dark;
    }
    else if (text.includes("ocean") || text.includes("sea") || text.includes("sky") || text.includes("blue") || text.includes("rain") || text.includes("water")) {
        nextVideo = VIDEOS.chill;
    }

    // Delay the switch slightly to allow fade-out animation
    const timeout = setTimeout(() => {
        setVideoUrl(nextVideo);
        setIsFading(false);
    }, 500); // 0.5s transition

    return () => clearTimeout(timeout);

  }, [currentSong?.name]); // Only trigger when song changes

  return (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // CRITICAL: Puts this behind everything
        overflow: "hidden",
        backgroundColor: "#000"
    }}>
      
      <video
        key={videoUrl} // Forces React to refresh the video element when URL changes
        src={videoUrl}
        autoPlay
        loop
        muted // Required for auto-play
        playsInline
        style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures video fills screen without stretching
            opacity: isFading ? 0 : 0.5, // Dim video to 50% so Vinyl is readable
            transition: "opacity 0.8s ease-in-out",
            filter: "contrast(1.2) brightness(0.8)" // Cinematic look
        }}
      />
      
      {/* Dark Gradient Overlay - Makes sure text/icons on top are visible */}
      <div style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          background: "radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 100%)"
      }}></div>

    </div>
  );
}