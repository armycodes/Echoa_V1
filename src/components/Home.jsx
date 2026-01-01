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
import { useEffect, useState } from "react";
import "../styles/Home.css";
import PhaseOne from "./PhaseOne";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔑 controlled flow flag
  const [immersive, setImmersive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile
        const profileRes = await fetch(
          "https://echoa-backend.onrender.com/me",
          { cache: "no-store" }
        );
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch currently playing (auto refresh)
        const songRes = await fetch(
          "https://echoa-backend.onrender.com/currently-playing",
          { cache: "no-store" }
        );
        const songData = await songRes.json();

        setCurrent({ ...songData });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Spotify data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 6000); // 🔁 auto refresh

    return () => clearInterval(interval);
  }, []);

  /* =============================
     PHASE 1 — AESTHETIC SCREEN
     ============================= */
  if (!immersive) {
    return <PhaseOne onEnter={() => setImmersive(true)} />;
  }

  /* =============================
     PHASE 2 — ACTUAL PLAYER
     ============================= */

  if (loading) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        Loading your music…
      </div>
    );
  }

  return (
    <div className="home-root">
      {/* PROFILE */}
      <div className="profile">
        <img
          src={profile?.images?.[0]?.url}
          alt="profile"
          className="profile-pic"
        />
        <h2>{profile?.display_name}</h2>
      </div>

      {/* CURRENT SONG */}
      {current?.playing ? (
        <div className="player">
          <div className="vinyl">
            <img src={current.albumImage} alt="album" />
          </div>

          <h3>{current.song}</h3>
          <p>{current.artist}</p>
        </div>
      ) : (
        <p>No song playing right now 🎧</p>
      )}
    </div>
  );
}
