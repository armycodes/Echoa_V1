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
import { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [token, setToken] = useState(null);
  const [view, setView] = useState("loading"); // 'loading' | 'landing' | 'guest' | 'player'
  
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);

  // --- 1. INITIAL TOKEN CHECK (Prevents Layout Flash) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("echoa_token");

    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      setToken(urlToken);
      setView("player");
      window.history.replaceState({}, "", "/home"); // Clean URL
    } else if (localToken) {
      setToken(localToken);
      setView("player");
    } else {
      setView("landing");
    }
  }, []);

  // --- 2. DATA FETCHING (FIXED: Added Headers) ---
  useEffect(() => {
    if (view !== "player" || !token) return;

    const fetchData = async () => {
      try {
        // 1. Fetch Profile (WITH TOKEN HEADER)
        const p = await fetch("https://echoa-backend.onrender.com/me", {
           headers: { Authorization: `Bearer ${token}` }
        });
        if (p.ok) {
            setProfile(await p.json());
        }

        // 2. Fetch Song (WITH TOKEN HEADER)
        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        // Handle Empty Response (204) properly
        if (s.status === 204) {
            setSong(null);
        } else if (s.ok) {
            setSong(await s.json());
        }
      } catch (e) {
        console.error("Fetch Error:", e);
      }
    };

    fetchData(); // Run immediately
    const i = setInterval(fetchData, 6000); // Poll every 6s
    return () => clearInterval(i);
  }, [view, token]);


  // --- VIEW 1: LOADING ---
  if (view === "loading") {
    return <div style={{ height: '100vh', background: 'black' }} />;
  }

  // --- VIEW 2: GUEST MODE (COMING SOON) ---
  if (view === "guest") {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Guest Mode</h1>
        <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px', background: '#111', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>🚧 Coming Soon</p>
          <button 
            onClick={() => setView("landing")}
            style={{ marginTop: '20px', background: 'transparent', color: '#fff', border: '1px solid #555', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer' }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 3: LANDING SCREEN (Login / Guest Buttons) ---
  if (view === "landing") {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', fontFamily: 'sans-serif' }}>
        <h1 style={{ letterSpacing: '4px', fontSize: '3rem', fontWeight: 'bold' }}>ECHOA</h1>
        
        {/* Login Button */}
        <a href="https://echoa-backend.onrender.com/login" style={{ textDecoration: 'none' }}>
          <button style={{ 
            background: '#1DB954', color: 'black', fontWeight: 'bold', 
            padding: '14px 40px', borderRadius: '30px', border: 'none', 
            fontSize: '16px', cursor: 'pointer', minWidth: '220px',
            textTransform: 'uppercase', letterSpacing: '1px'
          }}>
            Login with Spotify
          </button>
        </a>

        {/* Guest Mode Button */}
        <button 
          onClick={() => setView("guest")}
          style={{ 
            background: 'transparent', color: 'white', 
            padding: '12px 40px', borderRadius: '30px', 
            border: '1px solid #ffffffaa', fontSize: '14px', 
            cursor: 'pointer', minWidth: '220px',
            textTransform: 'uppercase', letterSpacing: '1px'
          }}
        >
          Guest Mode
        </button>
      </div>
    );
  }

  // --- VIEW 4: PLAYER (NEE ORIGINAL LAYOUT) ---
  return (
    <div className="home-root">
      {/* NAV */}
      <div className="nav">
        <div className="hamburger">☰</div>

        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="Profile" />
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* PLAYER */}
      <div className="vinyl-stage">
        <div className="vinyl-box">
          <div className="vinyl">
            {song?.albumImage ? (
              <img src={song.albumImage} alt="album" />
            ) : (
               // Placeholder so layout doesn't break if no song
               <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#222', border: '1px solid #333' }}></div>
            )}
          </div>
          <div className="tonearm" />
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
}