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
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const p = await fetch(
          "https://echoa-backend.onrender.com/me"
        );
        setProfile(await p.json());

        const s = await fetch(
          "https://echoa-backend.onrender.com/currently-playing"
        );
        setSong(await s.json());
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
      <div className="nav">
        <div className="hamburger">☰</div>

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
          <div className="vinyl">
            {song?.albumImage && (
              <img src={song.albumImage} alt="album" />
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
}*/
import { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
  
  // New States for Navigation
  const [token, setToken] = useState(null);
  const [view, setView] = useState("landing"); // 'landing' | 'guest' | 'player'

  // --- 1. TOKEN CHECK (App Open Avvagane) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("echoa_token");

    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      setToken(urlToken);
      setView("player"); // Token unte direct Player ki vellu
      window.history.replaceState({}, "", "/home");
    } else if (localToken) {
      setToken(localToken);
      setView("player");
    }
  }, []);

  // --- 2. NEE ORIGINAL FETCH LOGIC (Only runs when Player is active) ---
  useEffect(() => {
    if (view !== "player") return; 

    const fetchData = async () => {
      try {
        const p = await fetch(
          "https://echoa-backend.onrender.com/me"
        );
        setProfile(await p.json());

        const s = await fetch(
          "https://echoa-backend.onrender.com/currently-playing"
        );
        setSong(await s.json());
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    const i = setInterval(fetchData, 6000);
    return () => clearInterval(i);
  }, [view]); // View marithe run avtundi

  // --- 3. VIEW 1: GUEST MODE (COMING SOON SCREEN) ---
  if (view === "guest") {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Guest Mode</h1>
        <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px', background: '#111', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>🚧 Coming Soon</p>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>We are crafting a special experience.</p>
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

  // --- 4. VIEW 2: LANDING SCREEN (Login vs Guest Selection) ---
  if (view === "landing" && !token) {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ letterSpacing: '2px', fontSize: '3rem' }}>ECHOA</h1>
        
        {/* Login Button */}
        <a href="https://echoa-backend.onrender.com/login" style={{ textDecoration: 'none' }}>
          <button style={{ 
            background: '#1DB954', color: 'black', fontWeight: 'bold', 
            padding: '15px 40px', borderRadius: '30px', border: 'none', 
            fontSize: '16px', cursor: 'pointer', minWidth: '200px' 
          }}>
            LOGIN WITH SPOTIFY
          </button>
        </a>

        {/* Guest Mode Button */}
        <button 
          onClick={() => setView("guest")}
          style={{ 
            background: 'transparent', color: 'white', 
            padding: '15px 40px', borderRadius: '30px', 
            border: '1px solid white', fontSize: '16px', 
            cursor: 'pointer', minWidth: '200px' 
          }}
        >
          GUEST MODE
        </button>
      </div>
    );
  }

  // --- 5. VIEW 3: ORIGINAL PLAYER (NEE WORKING CODE) ---
  return (
    <div className="home-root">
      {/* NAV */}
      <div className="nav">
        <div className="hamburger">☰</div>

        {profile && (
          <div className="profile-menu">
            <img src={profile.images?.[0]?.url} alt="" />
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* PLAYER */}
      <div className="vinyl-stage">
        <div className="vinyl-box">
          <div className="vinyl">
            {song?.albumImage && (
              <img src={song.albumImage} alt="album" />
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
