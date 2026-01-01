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

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const profileRes = await fetch(
        "https://echoa-backend.onrender.com/me"
      );
      const profileData = await profileRes.json();
      setProfile(profileData);

      const songRes = await fetch(
        "https://echoa-backend.onrender.com/currently-playing"
      );
      const songData = await songRes.json();
      setCurrent(songData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  const interval = setInterval(fetchData, 6000); // 🔥 every 6 sec

  return () => clearInterval(interval);
}, []);

  if (loading) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        Loading your music…
      </div>
    );
  }

  return (
    <div style={{ color: "white", padding: "40px" }}>
      {/* Profile */}
      <div style={{ marginBottom: "30px" }}>
        <h2>{profile?.display_name}</h2>
        <img
          src={profile?.images?.[0]?.url}
          alt="profile"
          width="90"
          style={{ borderRadius: "50%" }}
        />
      </div>

      {/* Currently Playing */}
      {current?.playing ? (
        <div>
          <img
            src={current.albumImage}
            alt="album"
            width="200"
            style={{ borderRadius: "12px" }}
          />
          <h3 style={{ marginTop: "16px" }}>{current.song}</h3>
          <p style={{ color: "#aaa" }}>{current.artist}</p>
        </div>
      ) : (
        <p>No song playing right now 🎧</p>
      )}
    </div>
  );
}
