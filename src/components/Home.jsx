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
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
  
  // NEW: State for Menu
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // --- SAME LOGIC AS YOUR CODE ---
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("echoa_token"); // Ensure we use the stored token
        if (!token) return;

        const p = await fetch(
          "https://echoa-backend.onrender.com/me", 
          { headers: { Authorization: `Bearer ${token}` }} // Added header safety
        );
        if (p.ok) setProfile(await p.json());

        const s = await fetch(
          "https://echoa-backend.onrender.com/currently-playing",
          { headers: { Authorization: `Bearer ${token}` }} // Added header safety
        );
        
        if (s.status === 204) {
           setSong(null);
        } else if (s.ok) {
           setSong(await s.json());
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    const i = setInterval(fetchData, 6000);
    return () => clearInterval(i);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("echoa_token");
    window.location.href = "/"; // Refresh/Redirect to login
  };

  return (
    <div className="home-root">
      {/* NAV */}
      <div className="nav">
        {/* HAMBURGER WITH DROPDOWN */}
        <div className="menu-container">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
          
          {menuOpen && (
            <div className="dropdown">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
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
        {/* VINYL BOX */}
        <div className="vinyl-box">
          
          {/* THE RECORD DISC */}
          <div className={`vinyl-disc ${song?.playing ? 'spinning' : ''}`}>
             {/* Realistic Grooves (CSS) */}
             <div className="grooves"></div>
             
             {/* Album Art (Center Label) */}
             <div className="album-label">
                {song?.albumImage ? (
                  <img src={song.albumImage} alt="album" />
                ) : (
                  <div className="empty-label"></div>
                )}
             </div>
          </div>

          {/* THE TONE ARM */}
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