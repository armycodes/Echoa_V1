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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // IMPORTANT
import "../styles/Home.css";

export default function Home() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate(); // Hook for navigation

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

  // --- 2. DATA FETCHING (Only if Token Exists) ---
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
    navigate('/'); // Reload or go to root
  };

  // --- VIEW 1: LANDING SCREEN (If No Token) ---
  if (!token) {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', fontFamily: 'sans-serif' }}>
        <h1 style={{ letterSpacing: '4px', fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>ECHOA</h1>
        
        {/* LOGIN BUTTON */}
        <a href="https://echoa-backend.onrender.com/login" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#1DB954', color: 'black', fontWeight: 'bold', padding: '14px 40px', borderRadius: '30px', border: 'none', fontSize: '16px', cursor: 'pointer', minWidth: '220px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Login with Spotify
          </button>
        </a>

        {/* GUEST BUTTON -> Redirects to /guest Route */}
        <button 
          onClick={() => navigate('/guest')} 
          style={{ background: 'transparent', color: 'white', padding: '12px 40px', borderRadius: '30px', border: '1px solid #ffffffaa', fontSize: '14px', cursor: 'pointer', minWidth: '220px', textTransform: 'uppercase', letterSpacing: '1px' }}
        >
          Guest Mode
        </button>
      </div>
    );
  }

  // --- VIEW 2: PLAYER (If Token Exists) ---
  return (
    <div className="home-root">
      {/* NAV */}
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

      {/* PLAYER */}
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
}