import album from "../assets/album-placeholder.jpg";
import "../styles/Loading.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function LoadingText() {
    
  const texts = [
    "Tuning the echoes…",
    "Finding the soul of this track…",
    "Letting the vinyl spin…",
    "Music is loading, feelings included…",
    "Preparing a beautiful moment…",
    "Good music takes a second longer…",
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
  let timeoutId;

  const interval = setInterval(() => {
    setVisible(false);

    timeoutId = setTimeout(() => {
      setIndex((prev) => (prev + 1) % texts.length);
      setVisible(true);
    }, 600);
  }, 2600);

  return () => {
    clearInterval(interval);
    clearTimeout(timeoutId);
  };
}, []);




  return (
    <p className={`loading-text ${visible ? "show" : "hide"}`}>
      {texts[index]}
    </p>
  );
}



export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          "https://echoa-backend.onrender.com/ping"
        );

        if (res.ok) {
          clearInterval(interval);
          navigate("/home", { replace: true });
        }
      } catch (err) {
        // backend not ready yet → do nothing
      }
    }, 2000); // every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-root">
      <div className="album-orbit">
        {[0, 1, 2, 3, 4].map((i) => (
          <img
            key={i}
            src={album}
            alt=""
            className={`album album-${i}`}
          />
        ))}
      </div>

      <LoadingText />
    </div>
  );
}

