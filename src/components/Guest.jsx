/*import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";// YouTube Player
import axios from "axios"; // API Calls
import "../styles/Home.css"; // Reuse Vinyl Styles

export default function Guest() {
  const navigate = useNavigate();
  
  // 👇👇👇 PASTE YOUR API KEY HERE INSIDE THE QUOTES 👇👇👇
  const API_KEY = "AIzaSyBrsbzmyFyxW4SggOZA2a66Jwes6b772fE"; 
  
  const [query, setQuery] = useState("");
  const [song, setSong] = useState(null); // { title, artist, art, videoId }
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Player Reference
  const playerRef = useRef(null);

  // --- 1. SEARCH YOUTUBE FUNCTION ---
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      console.log("Searching for:", query);
      // YouTube Data API Call
      const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          maxResults: 1,
          q: query + " audio song", // Adding 'audio song' for better music results
          type: "video",
          key: API_KEY,
        },
      });

      if (res.data.items.length > 0) {
        const item = res.data.items[0];
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        // High Res Thumbnail
        const art = item.snippet.thumbnails.high.url;

        setSong({
          title: title.length > 25 ? title.slice(0, 25) + "..." : title, // Trim long titles
          artist: item.snippet.channelTitle, // Channel name as Artist
          art: art,
          videoId: videoId
        });
        
        setIsPlaying(true);
      } else {
        alert("No songs found! Try a different name.");
      }
    } catch (error) {
      console.error("YouTube API Error:", error);
      alert("Error: Check your API Key or Quota in Console.");
    }
  };

  return (
    <div className="home-root">
      
      {/* --- HIDDEN YOUTUBE PLAYER (The Engine) --- *//*}
      {/* Manam width/height 0 pettam, video kanipinchadu kani audio vastundi *//*}
     /* {song && (
        <div style={{ display: 'none' }}>
           <ReactPlayer
             ref={playerRef}
             url={`https://www.youtube.com/watch?v=${song.videoId}`}
             playing={isPlaying}
             controls={false}
             width="0px"
             height="0px"
             onEnded={() => setIsPlaying(false)}
           />
        </div>
      )}

      {/* --- NAV BAR --- *//*}
      <div className="nav" style={{ justifyContent: 'space-between' }}>
         <button 
          onClick={() => navigate('/')} 
          style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '24px' }}
        >
          ←
        </button>
        <span style={{color: '#888', fontSize: '12px', letterSpacing: '1px'}}>GUEST MODE</span>
        <div style={{width: '24px'}}></div>
      </div>

      {/* --- SEARCH BAR --- *//*}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px', zIndex: 100 }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Search Song (e.g. Die With A Smile)" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: '12px 20px',
              borderRadius: '30px',
              border: '1px solid #333',
              background: '#111',
              color: 'white',
              outline: 'none',
              width: '220px',
              fontSize: '14px'
            }}
          />
          <button type="submit" style={{
            padding: '10px 25px',
            borderRadius: '30px',
            border: 'none',
            background: '#1DB954',
            color: 'black',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Play
          </button>
        </form>
      </div>

      {/* --- VINYL STAGE (Visuals) --- *//*}
      <div className="vinyl-stage">
        <div className="vinyl-box">
          <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
             <div className="grooves"></div>
             <div className="album-label">
                {song ? (
                  // YouTube thumbnails often have black bars, scaling up (1.3) fixes it mostly
                  <img src={song.art} alt="album" style={{ transform: 'scale(1.3)' }} /> 
                ) : (
                  <div className="empty-label" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '10px'}}>
                    SEARCH
                  </div>
                )}
             </div>
          </div>
          <div className={`tonearm ${isPlaying ? 'active' : ''}`} />
        </div>

        {song ? (
          <div className="track-info">
            <h2 style={{ fontSize: '20px', marginBottom:'5px' }}>{song.title}</h2>
            <p style={{ fontSize: '14px', color:'#888' }}>{song.artist}</p>
          </div>
        ) : (
          <p className="no-song">Search for a song to play 🎧</p>
        )}
      </div>

      {/* --- PLAY/PAUSE CONTROLS --- *//*}
      {song && (
        <div style={{ marginBottom: '50px', zIndex: 100 }}>
           <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ 
              width: '60px', height: '60px', 
              borderRadius: '50%', background: 'white', 
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', color: 'black',
              boxShadow: '0 0 20px rgba(255,255,255,0.2)'
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>
      )}

    </div>
  );
}*/
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "../styles/Home.css"; 

export default function Guest() {
  const navigate = useNavigate();
  
  const [query, setQuery] = useState("");
  const [song, setSong] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // FAIL-SAFE STATE
  // Idi TRUE ayithe, manam "Coming Soon" message chupistham
  const [showComingSoon, setShowComingSoon] = useState(false);

  const audioRef = useRef(null);

  // --- FINAL ATTEMPT SEARCH ---
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setIsPlaying(false);
    setLoading(true);
    setShowComingSoon(false); // Reset fail state
    setSong(null);

    try {
      // Trying the Saavn API with a different Proxy (AllOrigins)
      // This is the strongest free proxy available.
      /*const targetApi = `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`;
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetApi)}`;*/

      const res = await axios.get(proxyUrl);

      if (res.data.data && res.data.data.results.length > 0) {
        const item = res.data.data.results[0];
        
        // Audio Link
        const audioUrl = item.downloadUrl[item.downloadUrl.length - 1].link;
        // Image Link
        const imgUrl = item.image[item.image.length - 1].link;

        setSong({
          title: item.name,
          artist: item.artists.primary[0]?.name || "Unknown",
          art: imgUrl, 
          audioUrl: audioUrl
        });
        
        // Success! Ready to play.

      } else {
        // No songs found -> Trigger Coming Soon (Safety Net)
        setShowComingSoon(true);
      }
    } catch (error) {
      console.log("Search Failed, switching to Coming Soon mode.");
      // If ANY error happens (Network, CORS, API down), show Coming Soon
      setShowComingSoon(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="home-root" style={{ position: 'relative', overflow: 'hidden', background: '#000', minHeight: '100vh', color: 'white' }}>
      
      {/* --- AUDIO TAG --- */}
      {song && !showComingSoon && (
        <audio 
            ref={audioRef}
            src={song.audioUrl}
            autoPlay={true}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
                // If audio fails to load, switch to Coming Soon
                setShowComingSoon(true);
            }}
        />
      )}

      {/* --- NAV BAR --- */}
      <div className="nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', zIndex: 100 }}>
         <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '24px' }}>←</button>
         <span style={{color: '#888', fontSize: '12px', letterSpacing: '1px'}}>GUEST MODE</span>
         <div style={{width: '24px'}}></div>
      </div>

      {/* --- SEARCH BAR --- */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '30px', zIndex: 100 }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Search Song..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: '30px', border: '1px solid #333', background: '#111', color: 'white', outline: 'none', width: '220px', fontSize: '14px' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '10px 25px', borderRadius: '30px', border: 'none', background: loading ? '#555' : '#1DB954', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? "..." : "Play"}
          </button>
        </form>
      </div>

      {/* --- MAIN STAGE --- */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 50, position: 'relative', width: '100%' }}>
        
        {/* CASE 1: SUCCESS - Song Playing */}
        {song && !showComingSoon && (
            <>
                <div className="vinyl-stage">
                    <div className="vinyl-box">
                      <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
                         <div className="grooves"></div>
                         <div className="album-label">
                            <img src={song.art} alt="album" style={{ transform: 'scale(1.3)' }} /> 
                         </div>
                      </div>
                      <div className={`tonearm ${isPlaying ? 'active' : ''}`} />
                    </div>
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center', padding: '0 20px' }}>
                     <h2 
                        style={{ fontSize: '20px', marginBottom:'5px' }}
                        dangerouslySetInnerHTML={{__html: song.title}} 
                     />
                     <p 
                        style={{ fontSize: '14px', color:'#888', marginBottom: '20px' }}
                        dangerouslySetInnerHTML={{__html: song.artist}}
                     />
                     <button 
                      onClick={togglePlay}
                      style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'black' }}
                    >
                      {isPlaying ? "⏸" : "▶"}
                    </button>
                </div>
            </>
        )}

        {/* CASE 2: FAILURE - Coming Soon Message */}
        {showComingSoon && (
            <div style={{ 
                marginTop: '50px', 
                textAlign: 'center', 
                padding: '40px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '20px',
                border: '1px solid #333',
                maxWidth: '80%'
            }}>
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>🚧</div>
                <h2 style={{ fontSize: '24px', color: '#1DB954', marginBottom: '10px' }}>Coming Soon</h2>
                <p style={{ color: '#ccc', fontSize: '16px', lineHeight: '1.5' }}>
                    We are currently building the ultimate music player experience. <br/>
                    Full audio streaming will be available in the next update!
                </p>
                <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                    Error: Network/API Limits Reached
                </div>
            </div>
        )}

      </div>
      
      <style>{`
        .vinyl-disc.spinning { animation: spin 4s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

    </div>
  );
}