# 🎧 Echoa — The AI-Powered Visual Music Companion

**Echoa** is not just a music player; it is an intelligent visual experience. It transforms the way you listen to music by synchronizing real-time audio data with AI-curated atmospheric visuals.

Unlike traditional players that use static backgrounds, Echoa employs **Google Gemini AI** as a "Visual Director," analyzing the emotion, genre, and context of every song—from Global Pop to **Telugu Mass Beats**—to dynamically fetch the perfect backdrop.

---

## ✨ Key Features

### 🧠 AI-Driven Atmosphere (The Brain)
- **Smart Context Analysis:** Uses **Google Gemini 1.5 Flash** to analyze song metadata in real-time.
- **Genre Intelligence:** Distinguishes between:
  - 🔥 **Indian Mass/Folk:** (e.g., DSP, Thaman) Triggers energetic elements like fire sparks, neon strobes, and fast-paced city lights.
  - 🌌 **Melody/Soul:** (e.g., Anirudh, ARR) Triggers dreamy visuals like rain on windows, misty mountains, or slow ocean waves.
  - 🏙️ **Global/Western:** Triggers cyberpunk, noir, or aesthetic lo-fi visuals.
- **Zero-Latency Fallback:** Implements a smart caching and blur-effect strategy to ensure the user never sees a black screen while the AI thinks.

### 🎵 The Experience
- **Live Spotify Sync:** Real-time bi-directional sync with your Spotify account.
- **Guest Mode 👤:** No Spotify? No problem. Experience the UI and visuals with a curated demo mode accessible to everyone.
- **Vinyl Simulation:** A custom-built CSS animated record player that spins, stops, and reacts to playback state.

### 🛠️ Engineering Excellence
- **Dynamic Video Fetching:** Integrates **Pexels API** with strict "No-Face/No-CGI" filtering to ensure cinematic realism.
- **Secure Authentication:** Production-ready Spotify OAuth 2.0 flow.
- **Responsive Design:** A glass-morphism UI that adapts to mobile and desktop screens.

---

## 🏗️ Tech Stack

| Component | Technology Used |
| :--- | :--- |
| **Frontend** | React.js (Vite), CSS3 Animations |
| **AI Logic** | Google Gemini API (Generative AI) |
| **Visual Assets** | Pexels Video API |
| **Backend** | Node.js, Express.js |
| **Auth** | Spotify Web API (OAuth 2.0) |
| **Deployment** | Cloudflare Pages (Frontend) + Render (Backend) |

---

## ⚙️ How It Works (Architecture)

1. **Detection:** The app detects the currently playing song via Spotify API.
2. **Analysis:** The metadata (Song Name + Movie/Album) is sent to **Gemini AI**.
3. **Prompt Engineering:** The system uses a specialized prompt to categorize the song (e.g., *"Is this a Telugu Mass song or a Sad melody?"*).
4. **Visual Retrieval:** Based on the AI's decision, a precise search query is sent to **Pexels** (e.g., *"Bonfire sparks night"* or *"Rainy train window"*).
5. **Rendering:** The video is seamlessly cross-faded into the background behind the glass UI.

---

## 🚀 Future Scope

The journey of Echoa doesn't end here. The roadmap includes:

- **🎙️ Lyrical Deep Dive:** Using AI to analyze specific lyrics and change visuals *scene-by-scene* within the same song.
- **🤝 Shared Listening Rooms:** A "Watch Party" mode where friends can experience the same visuals and music together.
- **🎹 Artist Intent:** Pulling behind-the-scenes facts about the song's composition using LLMs.
- **🕶️ 3D Elements:** Integrating Three.js for interactive audio visualizations.

---

## 🚀 Live Demo

👉 **Experience Echoa Here:** [https://echoa-v1.pages.dev](https://echoa-v1.pages.dev)

*(Note: Requires a Spotify Premium account for full playback control, or use Guest Mode to view the interface.)*

---

## 🔒 License & Usage

This project is a personal portfolio piece and is **not open-source**.

- ❌ Forking, redistribution, or commercial use is strictly prohibited.
- ✅ You may view the source code for educational and evaluation purposes only.

**© 2026 Echoa. All rights reserved.**


> *"Music doesn’t end with sound. Echoa is what lingers."*