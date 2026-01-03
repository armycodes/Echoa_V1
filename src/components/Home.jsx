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

// --- ASSETS ---
const VINYL_DEFAULT = "https://upload.wikimedia.org/wikipedia/commons/b/b6/12in-Vinyl-LP-Record-Angle.jpg";

// --- GUEST SONGS (Updated IDs & Covers) ---
const GUEST_PLAYLIST = [
  { 
    id: "K4DyBUG242c", // NCS: On & On (Safe)
    title: "On & On", 
    artist: "Cartoon, Daniel Levi", 
    image: "https://i1.sndcdn.com/artworks-000130386062-h327f2-t500x500.jpg" 
  },
  { 
    id: "34Na4j8AVgA", // Starboy (Audio Version - Safer than Video)
    title: "Starboy", 
    artist: "The Weeknd", 
    image: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" 
  },
  { 
    id: "fHI8X4OXluQ", // Blinding Lights (Audio)
    title: "Blinding Lights", 
    artist: "The Weeknd", 
    image: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png" 
  },
  { 
    id: "TUVcZfQe-Kw", // Levitating (Audio)
    title: "Levitating", 
    artist: "Dua Lipa", 
    image: "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Levitating.png" 
  },
  {
    id: "ApXoWvfEYVU", // Sunflower
    title: "Sunflower",
    artist: "Post Malone, Swae Lee",
    image: "https://upload.wikimedia.org/wikipedia/en/2/22/Post_Malone_and_Swae_Lee_-_Sunflower.png"
  }
];

export default function Home() {
  // Logic to determine user mode immediately
  const token = localStorage.getItem("echoa_token");
  const isGuestMode = token === "guest_mode_token";

  // STATE: Init with GUEST_PLAYLIST[0] immediately if Guest
  const [profile, setProfile] = useState(isGuestMode ? { display_name: "Guest", isGuest: true } : null);
  const [current, setCurrent] = useState(isGuestMode ? GUEST_PLAYLIST[0] : null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestIndex, setGuestIndex] = useState(0);
  const playerRef = useRef(null);

  /* ---------- SETUP ON LOAD ---------- */
  useEffect(() => {
    // 1. Handle Token in URL (if returning from Spotify)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      window.history.replaceState({}, "", "/home");
    }

    // 2. Guest Mode Setup
    if (isGuestMode) {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }
        window.onYouTubeIframeAPIReady = initGuestPlayer;
        if (window.YT && window.YT.Player) initGuestPlayer();
    } 
    // 3. Spotify Mode Setup
    else {
        const t = urlToken || token;
        if (t) {
            fetchSpotifyData(t);
            const interval = setInterval(() => fetchSpotifyData(t), 5000);
            return () => clearInterval(interval);
        }
    }
  }, [isGuestMode]);

  /* --- SPOTIFY DATA FETCH --- */
  const fetchSpotifyData = async (t) => {
      try {
        // Fetch Profile
        const p = await fetch("https://echoa-backend.onrender.com/me", { headers: { Authorization: `Bearer ${t}` } });
        if(p.ok) setProfile(await p.json());

        // Fetch Song
        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", { headers: { Authorization: `Bearer ${t}` } });
        if(s.ok) {
            const data = await s.json();
            setCurrent(data);
            setIsPlaying(data.playing); 
        }
      } catch (e) { console.error(e); }
  };

  /* --- GUEST PLAYER (YOUTUBE) --- */
  const initGuestPlayer = () => {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player('audio-player', {
          height: '200', width: '200',
          videoId: GUEST_PLAYLIST[0].id,
          playerVars: { 'autoplay': 0, 'controls': 0, 'origin': window.location.origin },
          events: { 'onReady': (e) => e.target.unMute() }
      });
  };

  /* --- CONTROLS --- */
  const handlePlayPause = async () => {
    if (isGuestMode) {
        if (!playerRef.current) return;
        if (isPlaying) playerRef.current.pauseVideo();
        else playerRef.current.playVideo();
        setIsPlaying(!isPlaying);
    } else {
        const t = localStorage.getItem("echoa_token");
        const endpoint = isPlaying ? "/player/pause" : "/player/play";
        await fetch(`https://echoa-backend.onrender.com${endpoint}`, { method: 'POST', headers: { Authorization: `Bearer ${t}` } });
        setIsPlaying(!isPlaying);
    }
  };

  const handleNext = async () => {
      if (isGuestMode) {
          let newIndex = (guestIndex + 1) % GUEST_PLAYLIST.length;
          setGuestIndex(newIndex);
          updateGuestSong(newIndex);
      } else {
          const t = localStorage.getItem("echoa_token");
          await fetch(`https://echoa-backend.onrender.com/player/next`, { method: 'POST', headers: { Authorization: `Bearer ${t}` } });
      }
  };

  const handlePrev = async () => {
      if (isGuestMode) {
          let newIndex = (guestIndex - 1 + GUEST_PLAYLIST.length) % GUEST_PLAYLIST.length;
          setGuestIndex(newIndex);
          updateGuestSong(newIndex);
      } else {
          const t = localStorage.getItem("echoa_token");
          await fetch(`https://echoa-backend.onrender.com/player/previous`, { method: 'POST', headers: { Authorization: `Bearer ${t}` } });
      }
  };

  const updateGuestSong = (index) => {
      const song = GUEST_PLAYLIST[index];
      setCurrent(song); // Updates Image & Text
      setIsPlaying(true);
      if (playerRef.current) playerRef.current.loadVideoById(song.id);
  };

  const handleLogout = () => {
      localStorage.removeItem("echoa_token");
      window.location.href = "/";
  };

  // --- IMAGE LOGIC (FIXED) ---
  // Checks 'image' (Guest) OR 'albumImage' (Spotify) OR Default
  const displayImg = current?.image || current?.albumImage || VINYL_DEFAULT;
  const displaySong = current?.title || current?.song || "Loading...";
  const displayArtist = current?.artist || "...";

  return (
    <div className="home-root">
      <div id="audio-player" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}></div>

      {/* NAV */}
      <div className="nav">
        <div className="hamburger">☰</div>
        <button onClick={handleLogout} style={{background:'transparent', border:'none', color:'white', fontSize:'12px', cursor:'pointer', marginRight:'auto', marginLeft:'15px', opacity:0.7}}>LOGOUT</button>

        {profile && (
          <div className="profile-menu">
            {profile.isGuest ? (
                <div className="guest-pfp">G</div>
            ) : (
                <img src={profile.images?.[0]?.url} alt="" />
            )}
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* STAGE */}
      <div className="vinyl-stage">
        <div className="vinyl-box">
          {/* TONEARM */}
          <div className="tonearm" style={{ transform: isPlaying ? 'rotate(0deg)' : 'rotate(-25deg)', transition: 'transform 0.5s' }} />
          
          {/* VINYL DISC */}
          <div className={`vinyl ${isPlaying ? "spinning" : ""}`}>
            <img src={displayImg} alt="Album Art" onError={(e) => e.target.src = VINYL_DEFAULT} />
          </div>
        </div>

        <div className="track-info">
            <h2>{displaySong}</h2>
            <p>{displayArtist}</p>
        </div>

        {/* CONTROLS */}
        <div className="controls-container">
            <button className="ctrl-btn" onClick={handlePrev}>⏮</button>
            <button className="ctrl-btn play-btn" onClick={handlePlayPause}>
                {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="ctrl-btn" onClick={handleNext}>⏭</button>
        </div>
      </div>
    </div>
  );
}