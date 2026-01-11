import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

// New Icons: Envelope (Mail) & Globe (Portfolio)
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa'; 

import '../styles/Landing.css';
import '../styles/Stars.css'; 

const LandingPage = () => {
  const navigate = useNavigate();
  const [meteor, setMeteor] = useState(null); // State to handle meteor

  // --- LOGIC 1: Static Background Stars ---
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

  // --- LOGIC 2: Random Meteor Shower 🌠 ---
  useEffect(() => {
    const triggerMeteor = () => {
      // Random position start (Top-Right area mostly)
      const topPos = Math.random() * 50; // Top 50% of screen
      const rightPos = Math.random() * 50; // Right 50% of screen
      
      setMeteor({ top: `${topPos}%`, right: `${rightPos}%`, id: Date.now() });

      // Remove meteor after animation ends to clean up
      setTimeout(() => setMeteor(null), 1500); 

      // Schedule next meteor (Randomly between 5s and 9s)
      const nextDelay = Math.random() * 4000 + 5000; 
      setTimeout(triggerMeteor, nextDelay);
    };

    // Start the first meteor after a small delay
    const initialTimer = setTimeout(triggerMeteor, 3000);
    return () => clearTimeout(initialTimer);
  }, []);

  // --- LOGIC 3: Wake up Server ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("token")) {
        navigate('/login' + window.location.search);
    }
    fetch("https://echoa-backend.onrender.com").catch(() => {});
  }, [navigate]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="landing-container">
      
      {/* ✨ BACKGROUND LAYERS ✨ */}
      <div className="star-container">
        {/* 1. Static Twinkling Stars */}
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

        {/* 2. The Shooting Meteor (Conditionally Rendered) */}
        {meteor && (
          <div 
            className="meteor" 
            style={{ top: meteor.top, right: meteor.right }} 
          />
        )}
      </div>

      {/* === HERO SECTION === */}
      <section className="section hero-section">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="hero-content"
        >
          <h1 className="brand-title" style={{ 
              fontFamily: 'var(--font-title)', 
              color: 'white', 
              fontWeight: '400', 
              letterSpacing: '8px', 
              textShadow: 'none' 
          }}>
            ECHOA
          </h1>
          
          <p className="tagline">Don't just hear the music. <span className="highlight">Feel it.</span></p>
          
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

      {/* === FEATURE SECTION === */}
      <section className="section feature-section">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="feature-grid"
          style={{textAlign: 'center', maxWidth: '700px'}}
        >
            <h2 style={{fontFamily: 'var(--font-title)', fontSize:'3rem', fontWeight:'400', marginBottom:'25px'}}>
              The Soul of Echoa
            </h2>
            <p style={{fontSize:'1.15rem', color:'#a1a1aa', lineHeight:'1.9', fontStyle: 'italic'}}>
              Music is not meant to be just heard; it is meant to be felt. <br/><br/>
              Echoa exists to bridge the gap between sound and sight. 
              It listens to the heartbeat of your tracks—the sorrow in a ballad, 
              the fire in an anthem—and mirrors it instantly, creating an immersive space 
              where you and your music are the only things that exist.
            </p>
        </motion.div>
      </section>

      {/* === DEVELOPER SECTION (Updated Links) === */}
      <section className="section developer-section">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="dev-card"
        >
          <p className="dev-label">Architected By</p>
          
          <h2 style={{fontFamily: 'var(--font-title)', fontSize:'2.5rem', margin:'15px 0', fontWeight:'400'}}>
            Siri Mahalaxmi
          </h2>
          
          <p style={{color:'#666', marginBottom:'30px', maxWidth: '500px', marginInline: 'auto'}}>
             A creator at the intersection of logic and emotion. <br/>
             Crafting digital experiences that don't just function, but feel.
          </p>
          
          {/* 🔥 UPDATED SOCIAL LINKS 🔥 */}
          <div className="social-links" style={{display:'flex', gap:'25px', justifyContent:'center', marginTop: '20px'}}>
            
            {/* 1. Personal Portfolio (Put your link in href) */}
            <a href="#" target="_blank" rel="noreferrer" title="Personal Portfolio">
               <FaGlobe />
            </a>

            {/* 2. LinkedIn */}
            <a href="https://www.linkedin.com/in/vemula-siri-mahalaxmi-b4b624319/" target="_blank" rel="noreferrer" title="LinkedIn">
               <FaLinkedin />
            </a>

            {/* 3. GitHub */}
            <a href="https://github.com/armycodes" target="_blank" rel="noreferrer" title="GitHub">
               <FaGithub />
            </a>

            {/* 4. Mail */}
            <a href="mailto:sirimahalaxmivemula@gmail.com" title="Email Me">
               <FaEnvelope />
            </a>

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