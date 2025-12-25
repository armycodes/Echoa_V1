import { useEffect, useState } from "react";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch(() => setError("Failed to load Spotify profile"));
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!profile) {
    return <p>Loading Spotify profile...</p>;
  }

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Welcome to Echoa 🎧</h1>
      <p>Logged in as: <strong>{profile.display_name}</strong></p>

      {profile.images?.[0] && (
        <img
          src={profile.images[0].url}
          alt="Profile"
          width={120}
          style={{ borderRadius: "50%", marginTop: "20px" }}
        />
      )}
    </div>
  );
}
