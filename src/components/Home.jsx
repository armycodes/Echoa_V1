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
/*import { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [token, setToken] = useState(null);
  const [view, setView] = useState("loading"); 
  
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // --- 1. INITIAL TOKEN CHECK ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("echoa_token");

    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      setToken(urlToken);
      setView("player");
      window.history.replaceState({}, "", "/home"); 
    } else if (localToken) {
      setToken(localToken);
      setView("player");
    } else {
      setView("landing");
    }
  }, []);

  // --- 2. DATA FETCHING (FROM YOUR BACKEND ONLY) ---
  useEffect(() => {
    if (view !== "player" || !token) return;

    const fetchData = async () => {
      try {
        // Fetch Profile
        const p = await fetch("https://echoa-backend.onrender.com/me", {
           headers: { Authorization: `Bearer ${token}` }
        });
        if (p.ok) setProfile(await p.json());

        // Fetch Song
        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (s.status === 204) {
            // 204 means Spotify said "No Content" (Not playing)
            setSong(null);
        } else if (s.ok) {
            setSong(await s.json());
        }
      } catch (e) {
        console.error("Backend Fetch Error:", e);
      }
    };

    fetchData(); 
    const i = setInterval(fetchData, 6000); // Check every 6s
    return () => clearInterval(i);
  }, [view, token]);

  const handleLogout = () => {
    localStorage.removeItem("echoa_token");
    window.location.href = "/";
  };

  // --- VIEW: LOADING ---
  if (view === "loading") return <div style={{ height: '100vh', background: 'black' }} />;

  // --- VIEW: GUEST ---
  if (view === "guest") {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Guest Mode</h1>
        <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px', background: '#111', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>🚧 Coming Soon</p>
          <button onClick={() => setView("landing")} style={{ marginTop: '20px', background: 'transparent', color: '#fff', border: '1px solid #555', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer' }}>Go Back</button>
        </div>
      </div>
    );
  }

  // --- VIEW: LANDING ---
  if (view === "landing") {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', fontFamily: 'sans-serif' }}>
        <h1 style={{ letterSpacing: '4px', fontSize: '3rem', fontWeight: 'bold' }}>ECHOA</h1>
        <a href="https://echoa-backend.onrender.com/login" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#1DB954', color: 'black', fontWeight: 'bold', padding: '14px 40px', borderRadius: '30px', border: 'none', fontSize: '16px', cursor: 'pointer', minWidth: '220px', textTransform: 'uppercase', letterSpacing: '1px' }}>Login with Spotify</button>
        </a>
        <button onClick={() => setView("guest")} style={{ background: 'transparent', color: 'white', padding: '12px 40px', borderRadius: '30px', border: '1px solid #ffffffaa', fontSize: '14px', cursor: 'pointer', minWidth: '220px', textTransform: 'uppercase', letterSpacing: '1px' }}>Guest Mode</button>
      </div>
    );
  }

  // --- VIEW: PLAYER ---
  return (
    <div className="home-root">
      {/* NAV *//*}
      <div className="nav">
        <div className="menu-container">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
          {menuOpen && (
            <div className="dropdown">
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>

        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="" />
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* PLAYER *//*}
      <div className="vinyl-stage">
        <div className="vinyl-box">
          <div className={`vinyl-disc ${song?.playing ? 'spinning' : ''}`}>
             <div className="grooves"></div>
             <div className="album-label">
                {song?.albumImage ? (
                  <img src={song.albumImage} alt="album" />
                ) : (
                  <div className="empty-label"></div>
                )}
             </div>
          </div>
          <div className={`tonearm ${song?.playing ? 'active' : ''}`} />
        </div>

        {song?.playing ? (
          <div className="track-info">
            <h2>{song.song}</h2>
            <p>{song.artist}</p>
          </div>
        ) : (
          <p className="no-song">No song playing 🎧</p>
        )}
      </div>
    </div>
  );
}*/
/*import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import "../styles/Home.css";

export default function Home() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate(); 

  // --- 1. TOKEN HANDLING ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("echoa_token");

    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      setToken(urlToken);
      // Remove token from URL for cleaner look
      window.history.replaceState({}, "", "/home"); 
    } else if (localToken) {
      setToken(localToken);
    }
  }, []);

  // --- 2. DATA FETCHING ---
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const p = await fetch("https://echoa-backend.onrender.com/me", {
           headers: { Authorization: `Bearer ${token}` }
        });
        if (p.ok) setProfile(await p.json());

        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (s.status === 204) {
            setSong(null);
        } else if (s.ok) {
            setSong(await s.json());
        }
      } catch (e) {
        console.error("Fetch Error:", e);
      }
    };

    fetchData(); 
    const i = setInterval(fetchData, 6000); 
    return () => clearInterval(i);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("echoa_token");
    setToken(null);
    navigate('/'); 
  };

  // --- VIEW 1: LANDING SCREEN (Login / Guest) ---
  if (!token) {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', fontFamily: 'sans-serif' }}>
        <h1 style={{ letterSpacing: '4px', fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>ECHOA</h1>
      {/* GUEST BUTTON (SIMPLE HTML LINK) *//*}
        {/* Idi manual ga type chesinatte work avtundi - 100% Safe *//*}
        <a href="/guest" style={{ textDecoration: 'none' }}>
          <button 
            style={{ 
              background: 'transparent', 
              color: 'white', 
              padding: '12px 40px', 
              borderRadius: '30px', 
              border: '1px solid #ffffffaa', 
              fontSize: '14px', 
              cursor: 'pointer', 
              minWidth: '220px', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}
          >
            Guest Mode
          </button>
        </a>
      </div>
    );
  }

  // --- VIEW 2: PLAYER (Logged In) ---
  return (
    
    <div className="home-root">
      <div className="nav">
        <div className="menu-container">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
          {menuOpen && (
            <div className="dropdown">
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="" />
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      <div className="vinyl-stage">
        <div className="vinyl-box">
          <div className={`vinyl-disc ${song?.playing ? 'spinning' : ''}`}>
             <div className="grooves"></div>
             <div className="album-label">
                {song?.albumImage ? (
                  <img src={song.albumImage} alt="album" />
                ) : (
                  <div className="empty-label"></div>
                )}
             </div>
          </div>
          <div className={`tonearm ${song?.playing ? 'active' : ''}`} />
        </div>

        {song?.playing ? (
          <div className="track-info">
            <h2>{song.song}</h2>
            <p>{song.artist}</p>
          </div>
        ) : (
          <p className="no-song">No song playing 🎧</p>
        )}
      </div>
    </div>
  );
}*/
/*import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../styles/Home.css";

// 👇 IMPORT THE AESTHETIC COMPONENT (This will now be AI Powered)
import AestheticBackground from "../components/AestheticBackground"; 

export default function Home() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate(); 

  // --- 1. TOKEN HANDLING ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("echoa_token");

    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      setToken(urlToken);
      window.history.replaceState({}, "", "/home"); 
    } else if (localToken) {
      setToken(localToken);
    }
  }, []);

  // --- 2. DATA FETCHING ---
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const p = await fetch("https://echoa-backend.onrender.com/me", {
           headers: { Authorization: `Bearer ${token}` }
        });
        if (p.ok) setProfile(await p.json());

        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", {
             headers: { Authorization: `Bearer ${token}` }
        });
        
        if (s.status === 204) {
            setSong(null);
        } else if (s.ok) {
            setSong(await s.json());
        }
      } catch (e) {
        console.error("Fetch Error:", e);
      }
    };

    fetchData(); 
    const i = setInterval(fetchData, 6000); 
    return () => clearInterval(i);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("echoa_token");
    setToken(null);
    navigate('/'); 
  };

  // --- VIEW 1: LANDING SCREEN (Login / Guest) ---
  if (!token) {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', fontFamily: 'sans-serif' }}>
        <h1 style={{ letterSpacing: '4px', fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>ECHOA</h1>
      
        <a href="https://echoa-backend.onrender.com/login" style={{ textDecoration: 'none' }}>
           <button style={{ background: '#1DB954', color: 'black', padding: '12px 40px', borderRadius: '30px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', minWidth: '220px', textTransform: 'uppercase', letterSpacing: '1px' }}>
             Connect Spotify
           </button>
        </a>

        <a href="/guest" style={{ textDecoration: 'none' }}>
          <button 
            style={{ 
              background: 'transparent', 
              color: 'white', 
              padding: '12px 40px', 
              borderRadius: '30px', 
              border: '1px solid #ffffffaa', 
              fontSize: '14px', 
              cursor: 'pointer', 
              minWidth: '220px', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}
          >
            Guest Mode
          </button>
        </a>
      </div>
    );
  }

  // --- VIEW 2: PLAYER (Logged In) ---
  return (
    // 🔴 CRITICAL: background: 'transparent' ensures the video behind is visible
    <div className="home-root" style={{ background: 'transparent' }}>

      {/* 🔥 AI POWERED BACKGROUND 🔥 *//*}
      /*{/* We pass the song details to the component. It handles the Gemini + Pexels logic internally *//*}
     /* {song && (
        <AestheticBackground 
            currentSong={{
                name: song.song, 
                artists: [{ name: song.artist }]
            }} 
        />
      )}

      {/* --- NAV BAR --- *//*}
      <div className="nav">
        <div className="menu-container">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
          {menuOpen && (
            <div className="dropdown">
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="" />
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* --- VINYL STAGE --- *//*}
      <div className="vinyl-stage">
        <div className="vinyl-box">
          <div className={`vinyl-disc ${song?.playing ? 'spinning' : ''}`}>
             <div className="grooves"></div>
             <div className="album-label">
                {song?.albumImage ? (
                  <img src={song.albumImage} alt="album" />
                ) : (
                  <div className="empty-label"></div>
                )}
             </div>
          </div>
          <div className={`tonearm ${song?.playing ? 'active' : ''}`} />
        </div>

        {song?.playing ? (
          <div className="track-info">
            <h2 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.song}</h2>
            <p style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.artist}</p>
          </div>
        ) : (
          <p className="no-song">No song playing 🎧</p>
        )}
      </div>
    </div>
  );
}*/
/*import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../styles/Home.css";

// 👇 IMPORT THE BRAIN (Mana Gemini Service)
import { getSongMoodSearchTerm } from "../services/GeminiService";

export default function Home() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // 👇 NEW STATE FOR VIDEO
  const [videoUrl, setVideoUrl] = useState(null);

  const navigate = useNavigate(); 

  // --- 1. TOKEN HANDLING (NO CHANGE) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("echoa_token");

    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      setToken(urlToken);
      window.history.replaceState({}, "", "/home"); 
    } else if (localToken) {
      setToken(localToken);
    }
  }, []);

  // --- 2. DATA FETCHING (NO CHANGE) ---
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const p = await fetch("https://echoa-backend.onrender.com/me", {
           headers: { Authorization: `Bearer ${token}` }
        });
        if (p.ok) setProfile(await p.json());

        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", {
             headers: { Authorization: `Bearer ${token}` }
        });
        
        if (s.status === 204) {
            setSong(null);
        } else if (s.ok) {
            setSong(await s.json());
        }
      } catch (e) {
        console.error("Fetch Error:", e);
      }
    };

    fetchData(); 
    const i = setInterval(fetchData, 6000); 
    return () => clearInterval(i);
  }, [token]);

  // --- 3. 🔥 NEW: AI VIDEO LOGIC 🔥 ---
  useEffect(() => {
    if (!song) return;

    const updateBackground = async () => {
      // Step A: Call Gemini (Brain)
      // Manam song, album (movie), artist ni service ki pampisthunnam
      const term = await getSongMoodSearchTerm(
        song.song, 
        song.album || song.song, // Fallback if album is missing
        song.artist
      );

      // Step B: Call Pexels (Visuals)
      // Using the term from Gemini to get a video
      const pexelsUrl = `https://api.pexels.com/videos/search?query=${term}&per_page=1&orientation=landscape&size=medium`;

      try {
        const res = await fetch(pexelsUrl, {
          headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY } 
        });
        const data = await res.json();

        if (data.videos && data.videos.length > 0) {
            // Find best quality (HD)
            const videoFiles = data.videos[0].video_files;
            const bestFile = videoFiles.find(f => f.height >= 720 && f.height < 1080) || videoFiles[0];
            setVideoUrl(bestFile.link);
        }
      } catch (err) {
        console.error("Pexels Error:", err);
      }
    };

    // Run this only when Song Name changes
    updateBackground();
  }, [song?.song]);


  const handleLogout = () => {
    localStorage.removeItem("echoa_token");
    setToken(null);
    navigate('/'); 
  };

  // --- VIEW 1: LANDING SCREEN (Login / Guest) ---
  if (!token) {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', fontFamily: 'sans-serif' }}>
        <h1 style={{ letterSpacing: '4px', fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>ECHOA</h1>
      
        <a href="https://echoa-backend.onrender.com/login" style={{ textDecoration: 'none' }}>
           <button style={{ background: '#1DB954', color: 'black', padding: '12px 40px', borderRadius: '30px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', minWidth: '220px', textTransform: 'uppercase', letterSpacing: '1px' }}>
             Connect Spotify
           </button>
        </a>

        <a href="/guest" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'transparent', color: 'white', padding: '12px 40px', borderRadius: '30px', border: '1px solid #ffffffaa', fontSize: '14px', cursor: 'pointer', minWidth: '220px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Guest Mode
          </button>
        </a>
      </div>
    );
  }

  // --- VIEW 2: PLAYER (Logged In) ---
  return (
    <div className="home-root" style={{ background: 'black' }}>
      
      {/* 🔥 BACKGROUND VIDEO LAYER 🔥 *//*}
      {videoUrl && (
        <video 
          src={videoUrl}
          autoPlay 
          muted 
          loop 
          playsInline
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100vh',
            objectFit: 'cover',
            zIndex: 0, // Behind everything
            opacity: 0.6, // Slight dim so text is readable
            transition: 'opacity 1s ease'
          }}
        />
      )}

      {/* --- NAV BAR --- *//*}
      <div className="nav" style={{ position: 'relative', zIndex: 10 }}>
        <div className="menu-container">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
          {menuOpen && (
            <div className="dropdown">
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="" />
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* --- VINYL STAGE (Z-Index increased to show above video) --- *//*}
      <div className="vinyl-stage" style={{ position: 'relative', zIndex: 10 }}>
        <div className="vinyl-box">
          <div className={`vinyl-disc ${song?.playing ? 'spinning' : ''}`}>
             <div className="grooves"></div>
             <div className="album-label">
                {song?.albumImage ? (
                  <img src={song.albumImage} alt="album" />
                ) : (
                  <div className="empty-label"></div>
                )}
             </div>
          </div>
          <div className={`tonearm ${song?.playing ? 'active' : ''}`} />
        </div>

        {song?.playing ? (
          <div className="track-info">
            <h2 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.song}</h2>
            <p style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.artist}</p>
          </div>
        ) : (
          <p className="no-song" style={{position: 'relative', zIndex: 10}}>No song playing 🎧</p>
        )}
      </div>
    </div>
  );
}*/
/*final code token refresh*/
/*import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../styles/Home.css";

// 👇 IMPORT THE BRAIN (Mana Gemini Service)
import { getSongMoodSearchTerm } from "../services/GeminiService";

export default function Home() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // 👇 NEW STATE FOR VIDEO
  //New Background mode state
  const [bgMode, setBgMode] = useState('cinematic');
  const [videoUrl, setVideoUrl] = useState(null);

  const navigate = useNavigate(); 

  // --- 1. TOKEN HANDLING (NO CHANGE) ---
 /* useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("echoa_token");

    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      setToken(urlToken);
      window.history.replaceState({}, "", "/home"); 
    } else if (localToken) {
      setToken(localToken);
    }
  }, []);*/
  // --- 1. TOKEN HANDLING ---
 /* useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("echoa_token");

    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      setToken(urlToken);
      window.history.replaceState({}, "", "/home"); 
    } else if (localToken) {
      setToken(localToken);
    }
  }, []);


  // --- 2. DATA FETCHING (UPDATED WITH FIX ✅) ---
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const p = await fetch("https://echoa-backend.onrender.com/me", {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (p.ok) setProfile(await p.json());

        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", {
             headers: { Authorization: `Bearer ${token}` }
        });
        
        // 🔥🔥 FIX ADDED HERE: TOKEN EXPIRY CHECK 🔥🔥
        // 401 (Unauthorized) or 403 (Forbidden) vasthe automatic ga login ki redirect chesthundi
        if (s.status === 401 || s.status === 403) {
            console.warn("Token Expired! Redirecting to login...");
            localStorage.removeItem("echoa_token");
            setToken(null);
            window.location.href = "https://echoa-backend.onrender.com/login";
            return;
        }

        if (s.status === 204) {
             setSong(null);
        } else if (s.ok) {
             setSong(await s.json());
        }
      } catch (e) {
        console.error("Fetch Error:", e);
      }
    };

    fetchData(); 
    const i = setInterval(fetchData, 6000); 
    return () => clearInterval(i);
  }, [token]);

  // --- 3. 🔥 NEW: AI VIDEO LOGIC 🔥 ---
  /*useEffect(() => {
    if (!song) return;

    const updateBackground = async () => {
      // Step A: Call Gemini (Brain)
      // Manam song, album (movie), artist ni service ki pampisthunnam
      const term = await getSongMoodSearchTerm(
        song.song, 
        song.album || song.song, // Fallback if album is missing
        song.artist
      );

      // Step B: Call Pexels (Visuals)
      // Using the term from Gemini to get a video
      const pexelsUrl = `https://api.pexels.com/videos/search?query=${term}&per_page=1&orientation=landscape&size=medium`;

      try {
        const res = await fetch(pexelsUrl, {
          headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY } 
        });
        const data = await res.json();

        if (data.videos && data.videos.length > 0) {
          // 🔥 CHANGE 2: Pick a RANDOM video from the list
            const randomIndex = Math.floor(Math.random() * data.videos.length);
            const selectedVideo = data.videos[randomIndex];
            // Find best quality (HD)

            const videoFiles = selectedVideo.video_files;
            const bestFile = videoFiles.find(f => f.height >= 720 && f.height < 1080) || videoFiles[0];
            setVideoUrl(bestFile.link);
        }
      } catch (err) {
        console.error("Pexels Error:", err);
      }
    };

    // Run this only when Song Name changes
    updateBackground();
  }, [song?.song]);


  const handleLogout = () => {
    localStorage.removeItem("echoa_token");
    setToken(null);
    navigate('/'); 
  };*/
  // --- 3. 🔥 AI VIDEO LOGIC (ONLY RUNS IN CINEMATIC MODE) 🔥 ---
  /*useEffect(() => {
    // If no song OR we are in Gradient Mode, DO NOT call APIs
    if (!song || bgMode === 'gradient') return;

    const updateBackground = async () => {
      const term = await getSongMoodSearchTerm(
        song.song, 
        song.album || song.song, 
        song.artist
      );

      // Randomize selection (15 videos)
      const pexelsUrl = `https://api.pexels.com/videos/search?query=${term}&per_page=15&orientation=landscape&size=medium`;

      try {
        const res = await fetch(pexelsUrl, {
          headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY } 
        });
        const data = await res.json();

        if (data.videos && data.videos.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.videos.length);
            const selectedVideo = data.videos[randomIndex];
            const videoFiles = selectedVideo.video_files;
            const bestFile = videoFiles.find(f => f.height >= 720 && f.height < 1080) || videoFiles[0];
            setVideoUrl(bestFile.link);
        }
      } catch (err) {
        console.error("Pexels Error:", err);
      }
    };

    updateBackground();
    // Re-run if Song changes OR Mode changes back to Cinematic
  }, [song?.song, bgMode]); 


  const handleLogout = () => {
    localStorage.removeItem("echoa_token");
    setToken(null);
    navigate('/'); 
  };

  // --- VIEW 1: LANDING SCREEN (Login / Guest) ---
  /*if (!token) {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', fontFamily: 'sans-serif' }}>
        <h1 style={{ letterSpacing: '4px', fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>ECHOA</h1>
      
        <a href="https://echoa-backend.onrender.com/login" style={{ textDecoration: 'none' }}>
           <button style={{ background: '#1DB954', color: 'black', padding: '12px 40px', borderRadius: '30px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', minWidth: '220px', textTransform: 'uppercase', letterSpacing: '1px' }}>
             Connect Spotify
           </button>
        </a>

        <a href="/guest" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'transparent', color: 'white', padding: '12px 40px', borderRadius: '30px', border: '1px solid #ffffffaa', fontSize: '14px', cursor: 'pointer', minWidth: '220px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Guest Mode
          </button>
        </a>
      </div>
    );
  }*/
 /*comment out this portion if home.jsx is not working*/

  // --- VIEW 2: PLAYER (Logged In) ---
  /*return (
    <div className="home-root" style={{ background: 'black' }}>
      
      {/* 🔥 BACKGROUND VIDEO LAYER 🔥 *//*}
      {videoUrl && (
        <video 
          key={videoUrl}
          src={videoUrl}
          autoPlay 
          muted 
          loop 
          playsInline
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100vh',
            objectFit: 'cover',
            zIndex: 0, // Behind everything
            opacity: 0.6, // Slight dim so text is readable
            transition: 'opacity 1s ease'
          }}
        />
      )}

      {/* --- NAV BAR --- *//*}
      <div className="nav" style={{ position: 'relative', zIndex: 10 }}>
        <div className="menu-container">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
          {menuOpen && (
            <div className="dropdown">
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="" />
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* --- VINYL STAGE (Z-Index increased to show above video) --- *//*}
      <div className="vinyl-stage" style={{ position: 'relative', zIndex: 10 }}>
        <div className="vinyl-box">
          <div className={`vinyl-disc ${song?.playing ? 'spinning' : ''}`}>
             <div className="grooves"></div>
             <div className="album-label">
                {song?.albumImage ? (
                  <img src={song.albumImage} alt="album" />
                ) : (
                  <div className="empty-label"></div>
                )}
             </div>
          </div>
          <div className={`tonearm ${song?.playing ? 'active' : ''}`} />
        </div>

        {song?.playing ? (
          <div className="track-info">
            <h2 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.song}</h2>
            <p style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.artist}</p>
          </div>
        ) : (
          <p className="no-song" style={{position: 'relative', zIndex: 10}}>No song playing 🎧</p>
        )}
      </div>
    </div>
  );
} */
// --- VIEW 2: PLAYER ---
  /*return (
    <div className="home-root" style={{ background: 'black' }}>
      
      {/* 1. CINEMATIC MODE *//*}
      {bgMode === 'cinematic' && videoUrl && (
        <video 
          key={videoUrl}
          src={videoUrl}
          autoPlay muted loop playsInline
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
            objectFit: 'cover', zIndex: 0, opacity: 0.6,
            transition: 'opacity 1s ease'
          }}
        />
      )}
      {/* 🔥 2. MAGIC MODE: APPLE MUSIC MESH EFFECT 🔥 *//*}
      {bgMode === 'gradient' && song?.albumImage && (
        <div className="apple-mesh-bg">
           {/* Layer 1: Slow Rotate *//*}
           <div className="mesh-blob blob-1" style={{ backgroundImage: `url(${song.albumImage})` }}></div>
           {/* Layer 2: Counter Rotate & Pulse *//*}
           <div className="mesh-blob blob-2" style={{ backgroundImage: `url(${song.albumImage})` }}></div>
           {/* Layer 3: Drifting *//*}
           <div className="mesh-blob blob-3" style={{ backgroundImage: `url(${song.albumImage})` }}></div>
           {/* Dark Overlay for Text Readability *//*}
           <div className="mesh-overlay"></div>
        </div>
      )}
      

      {/* --- NAV BAR --- *//*}
      <div className="nav">
        
        {/* 🔥 LEFT GROUP: MENU + BUTTONS 🔥 *//*}
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            {/* Hamburger *//*}
            <div className="menu-container">
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
            {menuOpen && (
                <div className="dropdown">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            )}
            </div>

            {/* Mood Switcher (Placed Next to Hamburger) *//*}
            <div className="mood-toggles">
                <button 
                    className={`toggle-btn ${bgMode === 'cinematic' ? 'active' : ''}`}
                    onClick={() => setBgMode('cinematic')}
                    title="Cinematic AI Video"
                >
                    🎥 <span className="toggle-text">Cinema</span>
                </button>
                <div className="divider"></div>
                <button 
                    className={`toggle-btn ${bgMode === 'gradient' ? 'active' : ''}`}
                    onClick={() => setBgMode('gradient')}
                    title="Magic Gradient"
                >
                    🎨 <span className="toggle-text">Magic</span>
                </button>
            </div>

        </div>

        {/* 🔥 RIGHT: PROFILE (Always Visible Now) 🔥 *//*}
        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="" />
            <span className="profile-name">{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* --- VINYL STAGE --- *//*}
      <div className="vinyl-stage">
        <div className="vinyl-box">
          <div className={`vinyl-disc ${song?.playing ? 'spinning' : ''}`}>
             <div className="grooves"></div>
             <div className="album-label">
                {song?.albumImage ? (
                  <img src={song.albumImage} alt="album" />
                ) : (
                  <div className="empty-label"></div>
                )}
             </div>
          </div>
          <div className={`tonearm ${song?.playing ? 'active' : ''}`} />
        </div>

        {song?.playing ? (
          <div className="track-info">
            <h2 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.song}</h2>
            <p style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.artist}</p>
          </div>
        ) : (
          <p className="no-song" style={{position: 'relative', zIndex: 10}}>No song playing 🎧</p>
        )}
      </div>
    </div>
  );
}*/

/* **Final code home.jsx** */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../styles/Home.css";

// 👇 IMPORT THE BRAIN (Mana Gemini Service)
import { getSongMoodSearchTerm } from "../services/GeminiService";

export default function Home() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // 👇 NEW STATE FOR VIDEO
  const [bgMode, setBgMode] = useState('cinematic');
  const [videoUrl, setVideoUrl] = useState(null);

  // 👇 PLAYLIST STATE
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);

  const navigate = useNavigate(); 

  // --- 1. TOKEN HANDLING (Consolidated) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("echoa_token");

    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      setToken(urlToken);
      window.history.replaceState({}, "", "/home"); 
    } else if (localToken) {
      setToken(localToken);
    }
  }, []);

  // --- 2. FETCH PLAYLISTS (REAL SPOTIFY URL ✅) ---
  const fetchPlaylists = async (authToken) => {
    try {
        console.log("🔄 Fetching Playlists..."); 

        // 🔥 FIXED: REAL SPOTIFY API LINK 🔥
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!response.ok) {
            console.error("❌ Playlist Fetch Failed:", response.status);
            return;
        }

        const data = await response.json();
        console.log("✅ Playlists Data:", data); 
        setPlaylists(data.items);
    } catch (error) {
        console.error("❌ Error fetching playlists:", error);
    }
  };

  // 👇 ADDED: Token ragane Playlists Auto-Load avutai 👇
  useEffect(() => {
    if (token) {
        console.log("🔑 Token Found! Getting Playlists...");
        fetchPlaylists(token);
    }
  }, [token]);

  // --- 3. PLAY PLAYLIST (REAL SPOTIFY URL ✅) ---
  const playPlaylist = async (playlistUri) => {
    try {
        // 🔥 FIXED: REAL SPOTIFY API LINK 🔥
        await fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                context_uri: playlistUri, 
            }),
        });
        setShowPlaylists(false); 
    } catch (e) {
        console.error("Play Error", e);
    }
  };

  // --- 4. DATA FETCHING (Profile & Song) ---
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch Profile
        const p = await fetch("https://echoa-backend.onrender.com/me", {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (p.ok) setProfile(await p.json());

        // Fetch Current Song
        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", {
             headers: { Authorization: `Bearer ${token}` }
        });
        
        // Token Expiry Check
        if (s.status === 401 || s.status === 403) {
            console.warn("Token Expired! Redirecting to login...");
            localStorage.removeItem("echoa_token");
            setToken(null);
            window.location.href = "https://echoa-backend.onrender.com/login";
            return;
        }

        if (s.status === 204) {
             setSong(null);
        } else if (s.ok) {
             setSong(await s.json());
        }
      } catch (e) {
        console.error("Fetch Error:", e);
      }
    };

    fetchData(); 
    const i = setInterval(fetchData, 6000); 
    return () => clearInterval(i);
  }, [token]);

  // --- 5. AI VIDEO LOGIC ---
  useEffect(() => {
    if (!song || bgMode === 'gradient') return;

    const updateBackground = async () => {
      const term = await getSongMoodSearchTerm(
        song.song, 
        song.album || song.song, 
        song.artist
      );

      const pexelsUrl = `https://api.pexels.com/videos/search?query=${term}&per_page=15&orientation=landscape&size=medium`;

      try {
        const res = await fetch(pexelsUrl, {
          headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY } 
        });
        const data = await res.json();

        if (data.videos && data.videos.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.videos.length);
            const selectedVideo = data.videos[randomIndex];
            const videoFiles = selectedVideo.video_files;
            const bestFile = videoFiles.find(f => f.height >= 720 && f.height < 1080) || videoFiles[0];
            setVideoUrl(bestFile.link);
        }
      } catch (err) {
        console.error("Pexels Error:", err);
      }
    };

    updateBackground();
  }, [song?.song, bgMode]); 

  const handleLogout = () => {
    localStorage.removeItem("echoa_token");
    setToken(null);
    navigate('/'); 
  };

  // --- RENDER ---
  return (
    <div className="home-root" style={{ background: 'black' }}>
      
      {/* 1. CINEMATIC BACKGROUND */}
      {bgMode === 'cinematic' && videoUrl && (
        <video 
          key={videoUrl}
          src={videoUrl}
          autoPlay muted loop playsInline
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
            objectFit: 'cover', zIndex: 0, opacity: 0.6,
            transition: 'opacity 1s ease'
          }}
        />
      )}

      {/* 2. MAGIC BACKGROUND */}
      {bgMode === 'gradient' && song?.albumImage && (
        <div className="apple-mesh-bg">
           <div className="mesh-blob blob-1" style={{ backgroundImage: `url(${song.albumImage})` }}></div>
           <div className="mesh-blob blob-2" style={{ backgroundImage: `url(${song.albumImage})` }}></div>
           <div className="mesh-blob blob-3" style={{ backgroundImage: `url(${song.albumImage})` }}></div>
           <div className="mesh-overlay"></div>
        </div>
      )}
      
      {/* --- NAVIGATION BAR --- */}
      <div className="nav">
        
        {/* LEFT: Menu + Toggles + Collection Button */}
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            {/* Hamburger Menu */}
            <div className="menu-container">
               <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
               {menuOpen && (
                   <div className="dropdown">
                   <button onClick={handleLogout} className="logout-btn">Logout</button>
                   </div>
               )}
            </div>

            {/* Mood Switcher */}
            <div className="mood-toggles">
                <button 
                    className={`toggle-btn ${bgMode === 'cinematic' ? 'active' : ''}`}
                    onClick={() => setBgMode('cinematic')}
                    title="Cinematic AI Video"
                >
                    🎥 <span className="toggle-text">Cinema</span>
                </button>
                <div className="divider"></div>
                <button 
                    className={`toggle-btn ${bgMode === 'gradient' ? 'active' : ''}`}
                    onClick={() => setBgMode('gradient')}
                    title="Magic Gradient"
                >
                    🎨 <span className="toggle-text">Magic</span>
                </button>
            </div>

            {/* 🔥 COLLECTION BUTTON (Integrated Here) 🔥 */}
            <button 
                className={`toggle-btn ${showPlaylists ? 'active' : ''}`}
                onClick={() => setShowPlaylists(!showPlaylists)}
                style={{ marginLeft: '10px' }}
                title="Your Playlists"
            >
                💿 <span className="toggle-text">Collection</span>
            </button>

        </div>

        {/* RIGHT: Profile */}
        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="" />
            <span className="profile-name">{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* --- VINYL STAGE --- */}
      <div className="vinyl-stage">
        <div className="vinyl-box">
             {/* The Disc Container */}
             <div className="vinyl-disc">
                 {/* The Actual Spinning Part */}
                 <div className={`album-label ${song?.playing ? 'spinning' : ''}`}>
                    {song?.albumImage ? (
                      <img src={song.albumImage} alt="album" />
                    ) : (
                      <div className="empty-label"></div>
                    )}
                 </div>
             </div>
             {/* Tonearm */}
             <div className={`tonearm ${song?.playing ? 'active' : ''}`} />
        </div>

        {/* Track Info */}
        {song?.playing ? (
          <div className="track-info">
            <h2 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.song}</h2>
            <p style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{song.artist}</p>
          </div>
        ) : (
          <p className="no-song" style={{position: 'relative', zIndex: 10}}>No song playing 🎧</p>
        )}
      </div>

      {/* --- PLAYLIST SIDEBAR (Overlay) --- */}
      <div className={`playlist-sidebar ${showPlaylists ? 'open' : ''}`}>
        <div className="sidebar-header">
            <h3>Your Collection</h3>
            <button className="close-btn" onClick={() => setShowPlaylists(false)}>×</button>
        </div>
        
        <div className="playlist-grid">
            {playlists && playlists.map((playlist) => (
                <div 
                    key={playlist.id} 
                    className="playlist-card" 
                    onClick={() => playPlaylist(playlist.uri)}
                >
                    <div className="playlist-img-wrapper">
                        {playlist.images?.[0]?.url ? (
                            <img src={playlist.images[0].url} alt={playlist.name} />
                        ) : (
                            <div className="placeholder-art">🎵</div>
                        )}
                        <div className="play-overlay">▶</div>
                    </div>
                    <p className="playlist-name">{playlist.name}</p>
                </div>
            ))}
        </div>
      </div>

      {/* Sidebar Overlay (Click outside to close) */}
      {showPlaylists && (
        <div className="sidebar-overlay" onClick={() => setShowPlaylists(false)}></div>
      )}

    </div>
  );
}