import React from "react";
import { useNavigate } from "react-router-dom"; // Navigation kosam

export default function Guest() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: 'black', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'sans-serif' 
    }}>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', letterSpacing: '2px' }}>Guest Mode</h1>
      
      <div style={{ 
        padding: '40px', 
        border: '1px solid #333', 
        borderRadius: '15px', 
        background: '#111', 
        textAlign: 'center', 
        maxWidth: '350px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <p style={{ fontSize: '1.5rem', margin: '0 0 15px 0' }}>🚧 Coming Soon</p>
        <p style={{ color: '#888', fontSize: '1rem', lineHeight: '1.6' }}>
          We are crafting a special vinyl experience for our guests. Stay tuned.
        </p>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            marginTop: '30px', 
            background: 'transparent', 
            color: '#fff', 
            border: '1px solid #555', 
            padding: '10px 30px', 
            borderRadius: '25px', 
            cursor: 'pointer', 
            fontSize: '14px', 
            transition: 'all 0.3s' 
          }}
          onMouseOver={(e) => e.target.style.borderColor = 'white'}
          onMouseOut={(e) => e.target.style.borderColor = '#555'}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}