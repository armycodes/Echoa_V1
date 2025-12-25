import { useEffect } from "react";

export default function HomePage() {

  useEffect(() => {
    fetch("http://localhost:5000/ping")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
      })
      .catch((err) => {
        console.error("Error connecting to backend:", err);
      });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
      }}
    >
      Echoa Home – Backend Test 🎧
    </div>
  );
}
