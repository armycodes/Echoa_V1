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

const Home = ({ token, item, is_playing, progress, no_data, deviceId, userProfile }) => {
  const [localIsPlaying, setLocalIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [guestSongIndex, setGuestSongIndex] = useState(0); 

  useEffect(() => {
    setLocalIsPlaying(is_playing);
  }, [is_playing]);

  // --- FUNCTIONALITY RESTORED: REAL SPOTIFY API CALLS ---
  const togglePlay = async () => {
    if (token) {
      // User Login Mode: Call Real Spotify API
      const endpoint = is_playing 
        ? "https://api.spotify.com/v1/me/player/pause" 
        : "https://api.spotify.com/v1/me/player/play";
      
      try {
        await fetch(endpoint, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // State updates via App.js polling
      } catch (error) {
        console.error("Error toggling play:", error);
      }
    } else {
      // Guest Mode: Local only
      setLocalIsPlaying(!localIsPlaying);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.reload(); 
  };

  // --- RESTORED GUEST SONGS LIST ---
  const guestSongs = [
    {
      title: "Filter",
      artist: "Jimin (BTS)",
      albumUrl: "https://upload.wikimedia.org/wikipedia/en/a/a1/BTS_-_Map_of_the_Soul_Persona.png"
    },
    {
      title: "Daechwita",
      artist: "Agust D",
      albumUrl: "https://ibighit.com/bts/images/bts/discography/mots_7/album-cover.jpg"
    },
    {
      title: "Blue & Grey",
      artist: "BTS",
      albumUrl: "https://ibighit.com/bts/images/bts/discography/be/album-cover.jpg"
    },
    {
      title: "Starboy",
      artist: "The Weeknd",
      albumUrl: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      albumUrl: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png"
    },
    {
      title: "Die For You",
      artist: "The Weeknd",
      albumUrl: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
    }
  ];

  const nextGuestSong = () => setGuestSongIndex((prev) => (prev + 1) % guestSongs.length);
  const prevGuestSong = () => setGuestSongIndex((prev) => (prev - 1 + guestSongs.length) % guestSongs.length);

  // --- FIXED DATA LOGIC: PRIORITIZE USER DATA IF TOKEN EXISTS ---
  // Step 1: Determine User Info
  const userDisplayName = token && userProfile ? userProfile.display_name : "Rkive's cutie 💜🤌🏻";
  const userDisplayImage = token && userProfile?.images?.[0]?.url 
    ? userProfile.images[0].url 
    : "https://i.pinimg.com/736x/88/02/56/880256247df60787e91d848e02573cc0.jpg";

  // Step 2: Determine Song Info
  let currentSong = {};
  
  if (token) {
    // User Mode
    if (item) {
      // Playing something
      currentSong = {
        title: item.name,
        artist: item.artists[0].name,
        cover: item.album.images[0].url,
        isPlaying: is_playing
      };
    } else {
      // User Logged in but NOT playing anything (Paused/Idle)
      // Show "No active song" or fallback to a default visual but KEEP User Profile
      currentSong = {
        title: "Paused / Idle",
        artist: "Play on Spotify",
        cover: "https://developer.spotify.com/images/guidelines/design/icon3@2x.png", // Generic Spotify Icon
        isPlaying: false
      };
    }
  } else {
    // Guest Mode
    currentSong = {
      title: guestSongs[guestSongIndex].title,
      artist: guestSongs[guestSongIndex].artist,
      cover: guestSongs[guestSongIndex].albumUrl,
      isPlaying: localIsPlaying
    };
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 40px', width: '100%' }}>
        
        {/* MENU / LOGOUT */}
        <div style={{ position: 'relative' }}> 
          <svg 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            style={{ color: '#d1d5db', cursor: 'pointer' }}
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>

          {isMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '0',
              backgroundColor: '#333',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              zIndex: 100,
              minWidth: '120px'
            }}>
              <button 
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '14px',
                  width: '100%',
                  textAlign: 'left',
                  padding: '5px'
                }}
                onMouseOver={(e) => e.target.style.color = '#1DB954'}
                onMouseOut={(e) => e.target.style.color = 'white'}
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>

        {/* PROFILE (Dynamic based on Login) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '16px', fontWeight: '500', color: '#e5e7eb', letterSpacing: '0.025em' }}>
            {userDisplayName}
          </span>
           <div style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #4b5563' }}>
            <img 
              src={userDisplayImage} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* --- CENTER VINYL PLAYER --- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        
        <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* ROTATING DISC */}
          <div 
            className={currentSong.isPlaying ? 'animate-spin-slow' : ''}
            style={{ 
              position: 'relative', 
              width: '320px', 
              height: '320px', 
              borderRadius: '50%', 
              border: '4px solid #111', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: '#050505', 
              transition: 'all 1s',
              animationPlayState: currentSong.isPlaying ? 'running' : 'paused'
            }}
          >
            {[15, 35, 55].map(m => (
              <div key={m} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #222', opacity: 0.4, margin: `${m}px` }}></div>
            ))}
            
            {/* ALBUM ART (Dynamic) */}
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', zIndex: 10, position: 'relative', border: '2px solid #111' }}>
               <img 
                src={currentSong.cover} 
                alt="Album Art" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'absolute', width: '15px', height: '15px', backgroundColor: 'black', borderRadius: '50%', zIndex: 20, border: '1px solid #333' }}></div>
          </div>

          {/* TONE ARM (STICK) */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '-20px', 
              right: '0px', 
              width: '100px', 
              height: '180px', 
              zIndex: 30, 
              transition: 'transform 0.7s ease-in-out', 
              transformOrigin: 'top right',
              transform: currentSong.isPlaying ? 'rotate(20deg)' : 'rotate(-25deg)',
              pointerEvents: 'none' 
            }}
          >
             <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', background: '#333', borderRadius: '50%' }}></div>
             <div style={{ position: 'absolute', top: '20px', right: '20px', width: '8px', height: '140px', background: 'linear-gradient(to bottom, #666, #222)', borderRadius: '99px', transform: 'rotate(-15deg)', transformOrigin: 'top right' }}></div>
             <div style={{ position: 'absolute', bottom: '20px', left: '10px', width: '30px', height: '45px', background: '#222', borderRadius: '4px', transform: 'rotate(10deg)' }}></div>
          </div>
        </div>

        {/* SONG INFO (Dynamic) */}
        <div style={{ marginTop: '40px', textAlign: 'center', zIndex: 10 }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', letterSpacing: '0.05em', marginBottom: '8px' }}>{currentSong.title}</h2>
          <p style={{ color: '#9ca3af', fontSize: '18px', fontWeight: '500' }}>{currentSong.artist}</p>
        </div>
      </div>

      {/* --- CONTROLS --- */}
      <div style={{ width: '100%', paddingBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '40px',
          background: '#222', 
          padding: '15px 50px',
          borderRadius: '50px',
          width: 'fit-content'
        }}>
          
          {/* PREV (Only for Guest Mode locally, real Spotify needs API but sticking to safe UI) */}
          <svg 
            onClick={token ? null : prevGuestSong} 
            width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ cursor: 'pointer', opacity: token ? 0.5 : 1 }}
          >
             <path d="M11 19V5l-9 7l9 7zm11 0V5l-9 7l9 7z"></path>
          </svg>
          
          {/* Play/Pause (Triggers API if logged in) */}
          <button 
            onClick={togglePlay}
            style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
          >
            {currentSong.isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
            ) : (
               <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"></path></svg>
            )}
          </button>

           {/* NEXT */}
           <svg 
             onClick={token ? null : nextGuestSong} 
             width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ cursor: 'pointer', opacity: token ? 0.5 : 1 }}
           >
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
};

export default Home;