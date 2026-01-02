/*import { useEffect, useState } from "react";
import "../styles/Home.css";
export default function Home() {
  const [profile, setProfile] = useState(null);
  const [song, setSong] = useState(null);
return (
  <div style={{ color: "white", padding: "40px" }}>
    HOME PAGE LOADED
  </div>
);
}*/

 /* useEffect(() => {
    // fetch profile
    fetch("https://echoa-backend.onrender.com/me")
      .then(res => res.json())
      .then(data => setProfile(data));

    // fetch currently playing song
    fetch("https://echoa-backend.onrender.com/currently-playing")
      .then(res => res.json())
      .then(data => {
        if (data.playing) {
          setSong(data);
        }
      });
  }, []);
//added with vinyl aesthetic
  return (
  <div className="app">
    <div className="player-card">
      <h1 className="brand">Echoa</h1>

      {profile && (
        <p className="user">
          Logged in as <strong>{profile.display_name}</strong>
        </p>
      )}

      {song ? (
        <>
          <div className="vinyl">
            <img src={song.albumImage} alt="album" />
          </div>

          <div className="track-info">
            <h2>{song.song}</h2>
            <p>{song.artist}</p>
          </div>
        </>
      ) : (
        <p>No song playing</p>
      )}
    </div>
  </div>
);

}*/
/*Home page component to display user profile and currently playing song from Spotify*/

/*import PhaseOne from "./PhaseOne";*/
import { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch(
          "https://echoa-backend.onrender.com/me",
          { cache: "no-store" }
        );
        const profileData = await profileRes.json();
        setProfile(profileData);

        const songRes = await fetch(
          "https://echoa-backend.onrender.com/currently-playing",
          { cache: "no-store" }
        );
        const songData = await songRes.json();
        setCurrent({ ...songData });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-root">
      {/* Hamburger */}
      <button className="menu-btn" onClick={() => setMenuOpen(true)}>
        ☰
      </button>

      {/* Side Profile Panel */}
      {menuOpen && (
        <div className="side-panel">
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            ✕
          </button>

          <img
            src={profile?.images?.[0]?.url}
            alt="profile"
            className="side-profile-pic"
          />
          <h3 className="side-username">{profile?.display_name}</h3>
        </div>
      )}

      {/* Center Player */}
      {current?.playing && (
        <div className="player-center">
          <div className="vinyl-wrapper">
            <div className="tonearm" />
            <div className="vinyl">
              <img src={current.albumImage} alt="album" />
            </div>
          </div>

          <div className="track-info">
            <h2>{current.song}</h2>
            <p>{current.artist}</p>
          </div>
        </div>
      )}
    </div>
  );
}


