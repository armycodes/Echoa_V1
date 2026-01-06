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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔑 get token
    const token = localStorage.getItem("echoa_token");

    if (!token) {
      console.error("No token found, redirecting to login");
      window.location.href = "/";
      return;
    }

    const fetchData = async () => {
      try {
        // 👤 profile
        const p = await fetch(
          "https://echoa-backend.onrender.com/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const profileData = await p.json();
        setProfile(profileData);

        // 🎵 currently playing
        const s = await fetch(
          "https://echoa-backend.onrender.com/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const songData = await s.json();
        setSong(songData);

        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    const i = setInterval(fetchData, 6000); // auto refresh
    return () => clearInterval(i);
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        Initializing Echoa…
      </div>
    );
  }

  return (
    <div className="home-root">
      {/* 🔹 NAV */}
      <div className="nav">
        <div className="hamburger">☰</div>

        {profile && (
          <div className="profile-menu">
            <img
              src={profile.images?.[0]?.url}
              alt="profile"
            />
            <span>{profile.display_name}</span>
          </div>
        )}
      </div>

      {/* 🔹 PLAYER */}
      <div className="vinyl-stage">
        <div className="vinyl-box">
          <div className="vinyl">
            {song?.albumImage && (
              <img src={song.albumImage} alt="album" />
            )}
          </div>

          {/* tonearm */}
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
