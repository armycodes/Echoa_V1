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

export default function Home() {
  // 1. Check Mode Immediately
  const token = localStorage.getItem("echoa_token");
  const isGuestMode = token === "guest_mode_token";

  // 2. States
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(isGuestMode ? GUEST_PLAYLIST[0] : null); // Guest aithe first song load chey
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestIndex, setGuestIndex] = useState(0);
  const playerRef = useRef(null);

  // --- INITIAL SETUP ---
  useEffect(() => {
    // A. URL lo Token unte (Spotify return)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    
    if (urlToken) {
      localStorage.setItem("echoa_token", urlToken);
      window.history.replaceState({}, "", "/home");
      window.location.reload(); // Clean refresh for Spotify mode
      return;
    }

    // B. Guest Mode Setup
    if (isGuestMode) {
        setProfile({ display_name: "Guest Listener", isGuest: true });
        // Load YouTube API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }
        window.onYouTubeIframeAPIReady = initGuestPlayer;
        if (window.YT && window.YT.Player) initGuestPlayer();
    } 
    // C. Spotify Mode Setup
    else {
        const t = localStorage.getItem("echoa_token");
        if (t) {
            fetchSpotifyData(t);
            // Poll every 5 seconds for updates
            const interval = setInterval(() => fetchSpotifyData(t), 5000);
            return () => clearInterval(interval);
        }
    }
  }, [isGuestMode]);

  /* --- SPOTIFY FUNCTIONS --- */
  const fetchSpotifyData = async (t) => {
      try {
        // Get Profile
        if(!profile) {
            const p = await fetch("https://echoa-backend.onrender.com/me", { headers: { Authorization: `Bearer ${t}` } });
            if(p.ok) setProfile(await p.json());
        }

        // Get Song
        const s = await fetch("https://echoa-backend.onrender.com/currently-playing", { headers: { Authorization: `Bearer ${t}` } });
        if(s.ok) {
            const data = await s.json();
            setCurrent(data);
            setIsPlaying(data.playing); 
        }
      } catch (e) { console.error("Spotify Fetch Error:", e); }
  };

  /* --- GUEST PLAYER (YOUTUBE) --- */
  const initGuestPlayer = () => {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player('audio-player', {
          height: '0', width: '0', // Hidden Player
          videoId: GUEST_PLAYLIST[0].id,
          playerVars: { 'autoplay': 0, 'controls': 0, 'origin': window.location.origin },
          events: { 'onReady': (e) => e.target.unMute() }
      });
  };

  /* --- CONTROLS LOGIC (Unified) --- */
  const handlePlayPause = async () => {
    // GUEST LOGIC
    if (isGuestMode) {
        if (!playerRef.current) return;
        if (isPlaying) playerRef.current.pauseVideo();
        else playerRef.current.playVideo();
        setIsPlaying(!isPlaying);
    } 
    // SPOTIFY LOGIC
    else {
        const t = localStorage.getItem("echoa_token");
        const endpoint = isPlaying ? "/player/pause" : "/player/play";
        await fetch(`https://echoa-backend.onrender.com${endpoint}`, { method: 'POST', headers: { Authorization: `Bearer ${t}` } });
        setIsPlaying(!isPlaying);
        setTimeout(() => fetchSpotifyData(t), 500); // Quick refresh after click
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
          setTimeout(() => fetchSpotifyData(t), 1000);
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
          setTimeout(() => fetchSpotifyData(t), 1000);
      }
  };

  const updateGuestSong = (index) => {
      const song = GUEST_PLAYLIST[index];
      setCurrent(song);
      setIsPlaying(true);
      if (playerRef.current) playerRef.current.loadVideoById(song.id);
  };

  const handleLogout = () => {
      localStorage.removeItem("echoa_token");
      window.location.href = "/";
  };

  // --- UI PREPARATION ---
  // Ikkada Logic: Guest aite 'image' teesko, Spotify aite 'albumImage' teesko.
  const displayImg = current?.image || current?.albumImage || VINYL_DEFAULT;
  const displaySong = current?.title || current?.song || "Welcome to Echoa";
  const displayArtist = current?.artist || "Ready to play...";

  return (
    <div className="home-root">
      {/* Hidden Youtube Player for Guest */}
      <div id="audio-player" style={{ position: 'absolute', top: '-1000px' }}></div>

      {/* NAVBAR */}
      <div className="nav">
        <div className="hamburger">☰</div>
        <button onClick={handleLogout} className="logout-btn">LOGOUT</button>

        {profile && (
          <div className="profile-menu">
            {profile.images && profile.images[0] ? (
                <img src={profile.images[0].url} alt="Profile" />
            ) : (
                <div className="guest-pfp">{profile.display_name?.charAt(0) || "U"}</div>
            )}
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* MAIN STAGE (Unified Design) */}
      <div className="vinyl-stage">
        
        {/* VINYL DISC */}
        <div className="vinyl-box">
          <div className="tonearm" style={{ 
              transform: isPlaying ? 'rotate(0deg)' : 'rotate(-25deg)', 
              transition: 'transform 0.5s' 
          }} />
          
          <div className={`vinyl ${isPlaying ? "spinning" : ""}`}>
            <img 
                src={displayImg} 
                alt="Album Art" 
                onError={(e) => e.target.src = VINYL_DEFAULT} 
            />
          </div>
        </div>

        {/* SONG INFO */}
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


