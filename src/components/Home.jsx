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
import React, { useState, useEffect } from 'react';
import "../styles/Home.css"; 

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- 1. STORE TOKEN ON FIRST LOAD (Your Original Logic) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("echoa_token", token);
      window.history.replaceState({}, "", "/home");
    }
  }, []);

  // --- 2. FETCH DATA FROM YOUR RENDER BACKEND (Your Original Logic) ---
  useEffect(() => {
    const token = localStorage.getItem("echoa_token");
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch Profile
        const p = await fetch("https://echoa-backend.onrender.com/me", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const profileData = await p.json();
        setProfile(profileData);

        // Fetch Current Song
        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        
        // Handle empty response (if no song is playing)
        if (s.status === 204 || s.status > 400) {
            setCurrent(null);
        } else {
            const songData = await s.json();
            setCurrent(songData);
        }

      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };

    fetchData();
    const i = setInterval(fetchData, 6000); // Polling every 6 seconds
    return () => clearInterval(i);
  }, []);

  // --- 3. CONTROLS (Standard Spotify API Calls using your Token) ---
  // Since your snippet didn't have control logic, I added direct calls 
  // so the buttons actually work.
  const handleControl = async (command) => {
    const token = localStorage.getItem("echoa_token");
    if (!token) return;

    let endpoint = "";
    let method = "POST";

    if (command === "play") {
        endpoint = "https://api.spotify.com/v1/me/player/play";
        method = "PUT";
    } else if (command === "pause") {
        endpoint = "https://api.spotify.com/v1/me/player/pause";
        method = "PUT";
    } else if (command === "next") {
        endpoint = "https://api.spotify.com/v1/me/player/next";
    } else if (command === "prev") {
        endpoint = "https://api.spotify.com/v1/me/player/previous";
    }

    try {
        await fetch(endpoint, {
            method: method,
            headers: { Authorization: `Bearer ${token}` }
        });
        // State updates automatically via the polling useEffect above
    } catch (e) {
        console.error("Control error:", e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("echoa_token"); // Clears YOUR specific token
    window.location.href = "/"; // Redirect to login
  };

  // --- 4. PREPARE DISPLAY DATA ---
  // If data exists from backend, use it. Otherwise show default.
  const display = {
    userName: profile?.display_name || "Spotify User",
    userImg: profile?.images?.[0]?.url || "https://i.pinimg.com/736x/88/02/56/880256247df60787e91d848e02573cc0.jpg",
    
    // Mapping YOUR backend variables (current.song, current.artist, etc.)
    title: current?.song || "No Active Song",
    artist: current?.artist || "Play on Spotify to sync",
    cover: current?.albumImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
    isPlaying: current?.playing || false
  };

  return (
    // CONTAINER: 100vh Fixed (No Scrolling)
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: 'black', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      fontFamily: 'sans-serif',
      color: 'white',
      overflow: 'hidden' 
    }}>
      
      {/* --- HEADER --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Menu */}
        <div style={{ position: 'relative' }}> 
          <svg 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            style={{ color: '#d1d5db', cursor: 'pointer' }}
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>

          {isMenuOpen && (
            <div style={{
              position: 'absolute', top: '40px', left: '0', backgroundColor: '#222', border: '1px solid #444', borderRadius: '8px', padding: '10px', zIndex: 100, minWidth: '120px'
            }}>
              <button 
                onClick={handleLogout}
                style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', width: '100%', textAlign: 'left' }}
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>

        {/* Profile (Fetched from /me) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#eee' }}>{display.userName}</span>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #555' }}>
            <img src={display.userImg} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* --- VINYL PLAYER --- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%' }}>
        
        {/* Disc Container */}
        <div style={{ position: 'relative', width: '280px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Rotating Disc */}
          <div 
            className={display.isPlaying ? 'animate-spin-slow' : ''}
            style={{ 
              position: 'relative', 
              width: '250px', 
              height: '250px', 
              borderRadius: '50%', 
              border: '4px solid #111', 
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: '#111', 
              transition: 'all 1s',
              animationPlayState: display.isPlaying ? 'running' : 'paused'
            }}
          >
            {[10, 30, 50].map(m => (
              <div key={m} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #222', opacity: 0.4, margin: `${m}px` }}></div>
            ))}
            
            {/* Album Art (Fetched from /currently-playing) */}
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', zIndex: 10, position: 'relative', border: '2px solid #000' }}>
               <img src={display.cover} alt="Album Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', width: '12px', height: '12px', backgroundColor: 'black', borderRadius: '50%', zIndex: 20 }}></div>
          </div>

          {/* Tone Arm */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '-30px', 
              right: '-10px', 
              width: '80px', 
              height: '140px', 
              zIndex: 30, 
              transition: 'transform 0.7s ease-in-out', 
              transformOrigin: 'top right',
              transform: display.isPlaying ? 'rotate(15deg)' : 'rotate(-25deg)',
              pointerEvents: 'none' 
            }}
          >
             <div style={{ position: 'absolute', top: 0, right: 0, width: '30px', height: '30px', background: '#333', borderRadius: '50%' }}></div>
             <div style={{ position: 'absolute', top: '15px', right: '15px', width: '6px', height: '100px', background: 'linear-gradient(to bottom, #666, #222)', borderRadius: '99px', transform: 'rotate(-15deg)', transformOrigin: 'top right' }}></div>
             <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '25px', height: '35px', background: '#222', borderRadius: '4px', transform: 'rotate(10deg)' }}></div>
          </div>
        </div>

        {/* Song Info */}
        <div style={{ marginTop: '30px', textAlign: 'center', zIndex: 10 }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '5px', letterSpacing: '0.02em' }}>{display.title}</h2>
          <p style={{ color: '#aaa', fontSize: '16px', fontWeight: '500' }}>{display.artist}</p>
        </div>
      </div>

      {/* --- CONTROLS --- */}
      <div style={{ width: '100%', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Progress Bar (Optional - based on polling it might be jumpy so kept static/hidden logic for now, or you can add if backend sends progress) */}
        {/* <div style={{ width: '40%', minWidth: '300px', height: '4px', background: '#333', borderRadius: '10px', marginBottom: '25px' }} /> */}

        <div style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px',
          background: '#1a1a1a', padding: '15px 50px', borderRadius: '50px' 
        }}>
          <svg onClick={() => handleControl("prev")} width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ cursor: 'pointer' }}>
             <path d="M11 19V5l-9 7l9 7zm11 0V5l-9 7l9 7z"></path>
          </svg>
          
          <button 
            onClick={() => handleControl(display.isPlaying ? "pause" : "play")}
            style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
          >
            {display.isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
            ) : (
               <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"></path></svg>
            )}
          </button>

           <svg onClick={() => handleControl("next")} width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ cursor: 'pointer' }}>
             <path d="M4 5v14l9-7l-9-7zm9 0v14l9-7l-9-7z"></path>
          </svg>
        </div>
      </div>

      <style>{`
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
}