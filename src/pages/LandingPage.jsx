import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'; 

// Import Styles
import '../styles/Landing.css';
import '../styles/Stars.css'; 

const LandingPage = () => {
  const navigate = useNavigate();

  // --- LOGIC: Generate Random Stars ---
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`, 
      duration: `${Math.random() * 3 + 3}s`, 
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("token")) {
        navigate('/login' + window.location.search);
    }
    // Wake up server silently
    fetch("https://echoa-backend.onrender.com").catch(() => {});
  }, [navigate]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="landing-container">
      
      {/* ✨ STARRY NIGHT BACKGROUND (Pitch Dark) ✨ */}
      <div className="star-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDuration: star.duration,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>

      {/* === HERO SECTION === */}
      <section className="section hero-section">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="hero-content"
        >
          {/* Brand Title: Sensual & Elegant */}
          <h1 className="brand-title" style={{ 
              fontFamily: 'var(--font-title)', 
              color: 'white', 
              fontWeight: '400', 
              letterSpacing: '8px', 
              textShadow: 'none' 
          }}>
            ECHOA
          </h1>
          
          <p className="tagline">Music doesn’t end with sound. Echoa is what lingers. <span className="highlight">Feel it.</span></p>
          
          {/* 🔥 NEW DESCRIPTION (No AI word) */}
          <p className="description">
            A living canvas that breathes with your sound. <br/>
            We translate the unseen emotions of your playlist into a visual void, <br/>
            syncing every beat with an atmosphere that feels just right.
          </p>
          
          <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
             Enter the Void ↓
          </div>
        </motion.div>
      </section>

      {/* === FEATURE SECTION (THE SOUL) === */}
      <section className="section feature-section">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="feature-grid"
          style={{textAlign: 'center', maxWidth: '700px'}}
        >
            <h2 style={{fontFamily: 'var(--font-title)', fontSize:'3rem', fontWeight:'400', marginBottom:'25px'}}>
              The Soul of Echoa
            </h2>
            
            {/* 🔥 NEW SOULFUL TEXT (No Tech Stack) */}
            <p style={{fontSize:'1.15rem', color:'#a1a1aa', lineHeight:'1.9', fontStyle: 'italic'}}>
              Music is not meant to be just heard; it is meant to be felt. <br/><br/>
              Echoa exists to bridge the gap between sound and sight. 
              It listens to the heartbeat of your tracks—the sorrow in a ballad, 
              the fire in an anthem—and mirrors it instantly, creating an immersive space 
              where you and your music are the only things that exist.
            </p>
        </motion.div>
      </section>

      {/* === DEVELOPER SECTION === */}
      <section className="section developer-section">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="dev-card"
        >
          <p className="dev-label">Developed By</p>
          
          <h2 style={{fontFamily: 'var(--font-title)', fontSize:'2.5rem', margin:'15px 0', fontWeight:'400'}}>
            Siri Mahalaxmi
          </h2>
          
          {/* 🔥 UPDATED BIO (Short & Creative) */}
          <p style={{color:'#666', marginBottom:'30px', maxWidth: '500px', marginInline: 'auto'}}>
             A creator at the intersection of logic and emotion. <br/>
             Crafting digital experiences that don't just function, but feel.
          </p>
          
          <div className="social-links" style={{display:'flex', gap:'20px', justifyContent:'center', marginTop: '20px'}}>
            <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </motion.div>
      </section>

      {/* === CTA SECTION === */}
      <section className="section cta-section">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{duration:0.5}}>
          <h2 style={{fontFamily: 'var(--font-title)', marginBottom:'30px', fontWeight:'400'}}>
            Ready to experience the unseen?
          </h2>
          <button className="cta-btn big-btn" onClick={() => navigate('/login')}>
            Get Started with Spotify
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default LandingPage;