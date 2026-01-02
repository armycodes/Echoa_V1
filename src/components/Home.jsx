import { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(null);
  const [token, setToken] = useState(null);

  /* ---------------- TOKEN (SINGLE SOURCE OF TRUTH) ---------------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("echoa_token", tokenFromUrl);
      window.history.replaceState({}, "", "/home");
      setToken(tokenFromUrl);
    } else {
      const stored = localStorage.getItem("echoa_token");
      if (stored) setToken(stored);
    }
  }, []);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    if (!token) return; // 🔥 DO NOTHING without token

    const fetchData = async () => {
      try {
        const profileRes = await fetch(
          "https://echoa-backend.onrender.com/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!profileRes.ok) throw new Error("Profile failed");
        setProfile(await profileRes.json());

        const songRes = await fetch(
          "https://echoa-backend.onrender.com/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!songRes.ok) throw new Error("Song failed");
        setCurrent(await songRes.json());
      } catch (err) {
        console.error("Echoa fetch error:", err.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 6000);
    return () => clearInterval(interval);
  }, [token]);

  /* ---------------- LOADING ---------------- */
  if (!token) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        Initializing Echoa…
      </div>
    );
  }

  return (
    <div className="home-root">
      {/* NAV */}
      <div className="nav">
        <div className="hamburger">☰</div>

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
}
