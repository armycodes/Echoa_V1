import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

// Import Lottie & File
import Lottie from "lottie-react";
// Ensure this path is correct based on where you saved the file
import musicAnimation from "../assets/music-wave.json"; 

import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from 'react-icons/fa'; 
import '../styles/Landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  // --- LOGIC: Redirect & Wake Up Server ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("token")) {
        navigate('/login' + window.location.search);
        return;
    }
    // Wake up Render Server silently
    fetch("https://echoa-backend.onrender.com").catch(() => {});
  }, [navigate]);

  // --- ANIMATION SETTINGS ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="landing-container">
      
      {/* === SECTION 1: HERO INTRO (With Background Animation) === */}
      <section className="section hero-section">
        
        {/* 🔥 1. BACKGROUND ANIMATION LAYER */}
<div className="hero-bg-animation">
   <Lottie 
      animationData={musicAnimation} 
      loop={true} 
      
      // 👇 Ee STYLE confirm chesko
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }} 
      
      // 👇👇👇 IDI MAGIC FIX! (Full Screen Cover) 👇👇👇
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice" 
      }}
   />
</div>

        {/* 🔥 2. FOREGROUND TEXT CONTENT */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="hero-content"
        >
          <h1 className="brand-title">ECHOA</h1>
          <p className="tagline">Don't just hear the music. <span className="highlight">Feel it.</span></p>
          <p className="description">
            Your Spotify, Reimagined. Sync your vibe with AI-curated cinematic atmospheres.
          </p>
          <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
             ↓ Scroll to Explore
          </div>
        </motion.div>
      </section>

      {/* === SECTION 2: DESKTOP MOCKUP === */}
      <section className="section mockup-section">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mockup-container"
        >
          <div className="mac-window">
            <div className="mac-header">
              <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
            </div>
            {/* Replace src with your actual screenshot later */}
            <img 
              src="https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop" 
              alt="Echoa Desktop Interface" 
              className="mockup-image" 
            />
            <div className="overlay-text">Experience on Desktop</div>
          </div>
        </motion.div>
      </section>

      {/* === SECTION 3: WHAT'S SPECIAL === */}
      <section className="section feature-section">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="feature-grid"
        >
          <div className="feature-text">
            <h2>Why Echoa?</h2>
            <p>
              Traditional players are static. <strong>Echoa is alive.</strong><br/><br/>
              Using <strong>Gemini AI</strong>, we analyze every beat, lyric, and emotion 
              of your song to fetch a background that matches the soul of the track.
            </p>
          </div>
          
          <div className="feature-visual-placeholder">
              <h3>🎵 AI Powered Emotions</h3>
          </div>
        </motion.div>
      </section>

      {/* === SECTION 4: DEVELOPER INFO === */}
      <section className="section developer-section">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="dev-card"
        >
          <p className="dev-label">Architected By</p>
          <h2>Siri Mahalaxmi</h2>
          <p className="dev-bio">
             Final Year CSE Student & Full Stack Developer.<br/>
             Passionate about merging AI with Human Emotion.
          </p>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </motion.div>
      </section>

      {/* === SECTION 5: CTA === */}
      <section className="section cta-section">
        <motion.div initial={{ scale: 0.8 }} whileInView={{ scale: 1 }}>
          <h2>Ready to feel the music?</h2>
          <button className="cta-btn big-btn" onClick={() => navigate('/login')}>
            Get Started with Spotify ➔
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default LandingPage;