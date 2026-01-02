import { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(null);
  const [ready, setReady] = useState(false); // 🔥 KEY FIX

  /* ---------------- TOKEN HANDLING ---------------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("echoa_token", tokenFromUrl);
      window.history.replaceState({}, "", "/home");
    }

    const storedToken = localStorage.getItem("echoa_token");
    if (storedToken) {
      setReady(true); // ✅ only now app is allowed to fetch
    }
  }, []);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    if (!ready) return; // 🔥 DO NOTHING until token exists

    const token = localStorage.getItem("echoa_token");
    if (!token) return;

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

        const profileData = await profileRes.json();
        setProfile(profileData);

        const songRes = await fetch(
          "https://echoa-backend.onrender.com/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const songData = await songRes.json();
        setCurrent(songData);
      } catch (e) {
        console.error("Fetch failed:", e);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 6000);
    return () => clearInterval(interval);
  }, [ready]);

  /* ---------------- UI ---------------- */
  if (!ready) {
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
