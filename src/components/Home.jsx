/*import { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(null);

  /* ---------- STORE TOKEN ON FIRST LOAD ---------- */
 /* useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("echoa_token", token);
      window.history.replaceState({}, "", "/home");
    }
  }, []);

  /* ---------- FETCH DATA WITH JWT ---------- */
 /* useEffect(() => {
    const token = localStorage.getItem("echoa_token");
    if (!token) return;

    const fetchData = async () => {
      try {
        const p = await fetch(
          "https://echoa-backend.onrender.com/me",
          {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          }
        );
        setProfile(await p.json());

        const s = await fetch(
          "https://echoa-backend.onrender.com/currently-playing",
          {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          }
        );
        setCurrent(await s.json());
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    const i = setInterval(fetchData, 6000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="home-root">
      {/* NAV *//*}
      /*<div className="nav">
        <div className="hamburger">☰</div>
        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="" />
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* PLAYER *//*}
     /* <div className="vinyl-stage">
        <div className="vinyl-box">
          <div className="vinyl">
            {current?.albumImage && (
              <img src={current.albumImage} alt="album" />
            )}
          </div>
          <div className="tonearm" />
        </div>

        {current?.playing ? (
          <div className="track-info">
            <h2>{current.song}</h2>
            <p>{current.artist}</p>
          </div>
        ) : (
          <p className="no-song">No song playing 🎧</p>
        )}
      </div>
    </div>
  );
}*/
import { useEffect, useState, useRef } from "react";
import "../styles/Home.css";
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Menu, Heart } from 'lucide-react';

// --- GUEST SONGS LIST ---
const GUEST_PLAYLIST = [
  { 
    id: "K4DyBUG242c", 
    title: "On & On", 
    artist: "Cartoon, Daniel Levi", 
    image: "https://i1.sndcdn.com/artworks-000130386062-h327f2-t500x500.jpg" 
  },
  { 
    id: "34Na4j8AVgA", 
    title: "Starboy", 
    artist: "The Weeknd", 
    image: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" 
  },
  { 
    id: "fHI8X4OXluQ", 
    title: "Blinding Lights", 
    artist: "The Weeknd", 
    image: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png" 
  },
  { 
    id: "TUVcZfQe-Kw", 
    title: "Levitating", 
    artist: "Dua Lipa", 
    image: "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Levitating.png" 
  },
  {
    id: "ApXoWvfEYVU",
    title: "Sunflower",
    artist: "Post Malone, Swae Lee",
    image: "https://upload.wikimedia.org/wikipedia/en/2/22/Post_Malone_and_Swae_Lee_-_Sunflower.png"
  }
];

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); 

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-hidden relative">
      
      {/* 1. Header Section */}
      <div className="flex items-center justify-between p-4 pt-6 z-10">
        <Menu className="w-6 h-6 text-gray-300" />
        <div className="flex items-center gap-2 mr-auto ml-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600">
             {/* Profile Pic */}
            <img src="https://i.pinimg.com/736x/88/02/56/880256247df60787e91d848e02573cc0.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-medium text-gray-200">Rkive's cutie 💜🤌🏻</span>
        </div>
      </div>

      {/* 2. Main Vinyl Player Section */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-[-20px]">
        
        {/* The Vinyl Container */}
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          
          {/* Background Dark Square (Subtle card effect) */}
          <div className="absolute inset-4 bg-[#1a1a1a] rounded-xl shadow-2xl opacity-50"></div>

          {/* THE VINYL DISC (Rotates when playing) */}
          <div 
            className={`relative w-[260px] h-[260px] rounded-full border-4 border-[#121212] shadow-2xl flex items-center justify-center bg-black transition-all duration-1000 ${isPlaying ? 'animate-spin-slow' : ''}`}
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
          >
            {/* Vinyl Texture */}
            <div className="absolute inset-0 rounded-full border-[10px] border-[#181818]"></div>
            <div className="absolute inset-8 rounded-full border border-[#222]"></div>
            <div className="absolute inset-12 rounded-full border border-[#222]"></div>
            
            {/* Album Art */}
            <div className="w-[160px] h-[160px] rounded-full overflow-hidden z-10 relative">
               <img 
                src="https://upload.wikimedia.org/wikipedia/en/a/a1/BTS_-_Map_of_the_Soul_Persona.png" 
                alt="Album Art" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-pink-500 opacity-20 mix-blend-overlay"></div>
            </div>

            {/* Center Hole */}
            <div className="absolute w-4 h-4 bg-black rounded-full z-20 border border-gray-700"></div>
          </div>

          {/* THE STICK (Tone Arm) - Moves onto record when playing */}
          <div className="absolute top-[-20px] right-[-10px] w-12 h-12 bg-[#2a2a2a] rounded-full shadow-lg z-30 flex items-center justify-center border border-[#444]">
            <div className="w-4 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          </div>
          
          <div 
            className={`absolute top-0 right-2 w-[100px] h-[140px] z-20 transition-transform duration-700 ease-in-out origin-top-right`}
            style={{ transform: isPlaying ? 'rotate(15deg)' : 'rotate(-25deg)' }}
          >
            {/* Stick Body */}
            <div className="absolute top-4 right-4 w-2 h-[100px] bg-gradient-to-b from-gray-500 to-gray-700 rounded-full shadow-xl transform -rotate-12"></div>
            {/* Needle Head */}
            <div className="absolute bottom-6 left-6 w-8 h-12 bg-[#333] rounded-md transform rotate-12 flex items-center justify-center shadow-lg border-t border-gray-600">
               <div className="w-1 h-3 bg-white mt-auto mb-1"></div>
            </div>
          </div>

        </div>

        {/* 3. Song Info */}
        <div className="mt-12 text-center z-10">
          <h2 className="text-2xl font-bold text-gray-100 tracking-wide">Jamais Vu</h2>
          <p className="text-gray-400 text-sm mt-1">BTS</p>
        </div>
      </div>

      {/* 4. Controls */}
      <div className="pb-12 px-8 w-full z-10">
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-1 rounded-full mb-6 relative group cursor-pointer">
          <div className="bg-white h-1 rounded-full relative" style={{ width: `${progress}%` }}>
            <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between max-w-[280px] mx-auto">
          {/* Shuffle Icon */}
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>

          <SkipBack className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition" />
          
          {/* Play/Pause */}
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-105 transition active:scale-95 shadow-lg shadow-white/10"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-black fill-current" />
            ) : (
              <Play className="w-6 h-6 text-black fill-current ml-1" />
            )}
          </button>

          <SkipForward className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition" />

          {/* Loop Icon */}
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;