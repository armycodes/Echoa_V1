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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://echoa-backend.onrender.com/me"
        );

        if (!res.ok) {
          throw new Error("Not authenticated");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        Loading profile…
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        Not logged in
      </div>
    );
  }

  return (
    <div style={{ color: "white", padding: "40px" }}>
      <h1>{profile.display_name}</h1>
      <img
        src={profile.images?.[0]?.url}
        alt="profile"
        width="120"
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
}
