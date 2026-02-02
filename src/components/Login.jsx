/*import "../styles/Login.css";
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
}*/

import "../styles/Login.css";
import loginBg from "../assets/login-bg.png";
import { useEffect, useState } from "react";

export default function Login() {
  const fullText = "ECHOA";
  const [displayText, setDisplayText] = useState("");

  // --- 1. PREVENT AUTO-LOGIN LOOP ---
  useEffect(() => {
    // When Login page loads, clear any old tokens so user MUST choose again.
    localStorage.removeItem("echoa_token");
  }, []);

  // --- 2. TYPING EFFECT (YOUR ORIGINAL CODE) ---
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
          restartTimeout = setTimeout(() => {
            startTyping(); 
          }, 5000);
        }
      }, 220); 
    };

    startTyping();
    return () => {
      clearInterval(typingTimeout);
      clearTimeout(restartTimeout);
    };
  }, []);

  // --- 3. GUEST HANDLER (UPDATED) ---
  const handleGuestLogin = () => {
    // Updated: Manam fake token set cheyyatledu. 
    // Direct ga separate /guest route ki force redirect chestunnam.
    window.location.href = "/guest"; 
  };

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

          {/* BUTTON GROUP */}
          <div style={{display:'flex', flexDirection:'column', gap:'15px', width:'100%', alignItems:'center'}}>
              <button
                className="spotify-btn"
                onClick={() => {
                  window.location.href = "https://echoa-backend.onrender.com/login";
                }}
              >
                Continue with Spotify
              </button>

              {/* GUEST BUTTON */}
              <button 
                onClick={handleGuestLogin}
                style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    padding: '12px 30px',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    width: 'fit-content'
                }}
              >
                Enter as Guest
              </button>
          </div>

        </div>
      </div>
    </div>
  );
}