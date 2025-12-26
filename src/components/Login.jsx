import "../styles/Login.css";
import loginBg from "../assets/login-bg.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const navigate = useNavigate(); //routing hook

  const fullText = "ECHOA";
const [displayText, setDisplayText] = useState("");

useEffect(() => {
  let typingTimeout;
  let restartTimeout;
  let index = 0;

  const startTyping = () => {
    index = 0;
    setDisplayText("");

    typingTimeout = setInterval(() => {
      index++;
      setDisplayText(fullText.slice(0, index));

      if (index === fullText.length) {
        clearInterval(typingTimeout);

        // Wait 5 seconds after full word
        restartTimeout = setTimeout(() => {
          startTyping(); // restart typing
        }, 5000);
      }
    }, 220); // typing speed (slow & premium)
  };

  startTyping();

  return () => {
    clearInterval(typingTimeout);
    clearTimeout(restartTimeout);
  };
}, []);


  return (
    <div className="login-container">
      <div className="image-section">
  <img src={loginBg} alt="Echoa background" />
  <div className="image-overlay"></div>
</div> 


      <div className="login-panel">
        <div className="login-content">
          <h1 className="logo typing">{displayText}</h1>
          <p className="tagline">Where music lingers.</p>


          <button
  className="spotify-btn"
  onClick={() => {
    window.location.href =
      "https://echoa-backend.onrender.com/login";
  }}
>
  Continue with Spotify
</button>



        </div>
      </div>
    </div>
  );
}
