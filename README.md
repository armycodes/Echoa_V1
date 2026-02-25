# 🎧 Echoa — The AI-Powered Visual Music Companion

**Echoa** is not just a music player; it is an intelligent visual experience. It transforms the way you listen to music by synchronizing real-time audio data with AI-curated atmospheric visuals and dynamic ambient environments.

Unlike traditional players that use static backgrounds, Echoa employs **Google Gemini AI** as a "Visual Director," analyzing the emotion, genre, and context of every song—from Global Pop to **Telugu Mass Beats**—to dynamically fetch the perfect backdrop.

---

## ✨ Key Features

### 🧠 AI-Driven Atmosphere & Visual Modes
- **Smart Context Analysis:** Uses the cutting-edge **Google Gemini 2.5 Flash** to analyze song metadata in real-time.
- **Dual Visual Experiences (New!):**
  - 🎥 **Cinematic AI Mode:** Triggers hyper-realistic, context-aware video backdrops (e.g., Indian Mass songs trigger fire sparks/neon strobes; Melodies trigger rainy windows/misty mountains).
  - 🎨 **Magic Gradient Mode:** An Apple Music-inspired animated mesh background that dynamically extracts and fluidly blends colors directly from the live album art.
- **Instant Mood Switcher:** Seamlessly toggle between Cinematic videos and Magic Gradients without interrupting playback.

### 🎵 The Experience & Control
- **💿 Your Collection (New!):** A sleek, integrated sidebar that directly fetches your personal Spotify playlists, allowing you to browse and play your favorite collections without leaving the app.
- **Live Spotify Sync:** Real-time bi-directional sync with your Spotify account.
- **Vinyl Simulation:** A custom-built CSS animated record player that spins, stops, and reacts to the playback state.
- **Glassmorphism UI:** A clean, modern interface designed to let the visuals shine through.

### 🛠️ Engineering Excellence
- **Dynamic Video Fetching:** Integrates **Pexels API** with strict "No-Face/No-CGI" filtering to ensure cinematic realism.
- **Secure Authentication:** Production-ready Spotify OAuth 2.0 flow with advanced scope management for playlist access.
- **Zero-Latency Fallback:** Implements a smart caching and blur-effect strategy to ensure the user never sees a black screen while the AI thinks.
- **Responsive Design:** Adapts seamlessly to mobile and desktop screens.

---

## 🏗️ Tech Stack

| Component | Technology Used |
| :--- | :--- |
| **Frontend** | React.js (Vite), CSS3 Animations, Custom Mesh Gradients |
| **AI Logic** | Google Gemini 2.5 Flash (Generative AI) |
| **Visual Assets** | Pexels Video API |
| **Backend** | Node.js, Express.js |
| **Auth & Data** | Spotify Web API (OAuth 2.0, Playback & Playlist Scopes) |
| **Deployment** | Cloudflare Pages (Frontend) + Render (Backend) |

---

## ⚙️ How It Works (Architecture)

1. **Detection:** The app detects the currently playing song via the Spotify API.
2. **User Selection:** The system checks the user's active visual toggle (Cinematic vs. Magic Gradient).
3. **Analysis & Processing:**
   - *If Cinematic:* The metadata is sent to **Gemini 2.5 Flash** to determine the exact mood/genre, which then queries **Pexels** for the perfect video.
   - *If Magic Gradient:* The system extracts the live album art and dynamically generates a 3-point animated CSS mesh gradient.
4. **Playlist Integration:** Securely fetches the user's saved playlists via updated OAuth scopes (`playlist-read-private`) and renders them in a custom UI overlay, triggering Spotify's `/me/player/play` endpoint upon selection.
5. **Rendering:** The selected visual is seamlessly cross-faded into the background behind the glass UI.

---

## 🚀 Future Scope

The journey of Echoa doesn't end here. The roadmap includes:

- **👤 Guest Mode:** A version for non-Spotify users to experience the UI with demo songs (Coming Soon).
- **🎙️ Lyrical Deep Dive:** Using AI to analyze specific lyrics and change visuals *scene-by-scene* within the same song.
- **🤝 Shared Listening Rooms:** A "Watch Party" mode where friends can experience the same visuals and music together.
- **🎹 Artist Intent:** Pulling behind-the-scenes facts about the song's composition using LLMs.

---

## 🚀 Live Demo

👉 **Experience Echoa Here:** [https://echoa-v1.pages.dev](https://echoa-v1.pages.dev)

*(Note: Requires a Spotify Premium account for full playback control.)*

---

## 🔒 License & Usage

This project is a personal portfolio piece by **Siri Mahalaxmi Vemula** and is **not open-source**.

- ❌ Forking, redistribution, or commercial use is strictly prohibited.
- ✅ You may view the source code for educational and evaluation purposes only.

**© 2026 Echoa. All rights reserved.**

> *"Music doesn’t end with sound. Echoa is what lingers"*
