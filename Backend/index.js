/*const express = require("express");
const cors = require("cors");
const axios = require("axios");
const querystring = require("querystring");
require("dotenv").config();*/

/*let spotifyAccessToken = null;*/
/*const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "echoa_super_secret";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;*/

/* -------------------- HEALTH CHECK -------------------- */
/*app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});*/

/* -------------------- SPOTIFY LOGIN -------------------- */
/*app.get("/login", (req, res) => {
  const scope = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
  ].join(" ");

  const authQueryParameters = querystring.stringify({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: "https://echoa-backend.onrender.com/callback",
  });

  res.redirect(
    `https://accounts.spotify.com/authorize?${authQueryParameters}`
  );
});

/* -------------------- SPOTIFY CALLBACK -------------------- */
/*app.get("/callback", async (req, res) => {
  const code = req.query.code;

  // 🔥 IMPORTANT: ALWAYS redirect to /bootstrap (not home, not loading)
  const FRONTEND_BOOTSTRAP =
    "https://echoa-v1.pages.dev/bootstrap";

  if (!code) {
    console.error("No code received from Spotify");
    return res.redirect(FRONTEND_BOOTSTRAP);
  }

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://echoa-backend.onrender.com/callback",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    spotifyAccessToken = tokenResponse.data.access_token;
    console.log("✅ ACCESS TOKEN STORED");

    // 👉 Decision happens in frontend (bootstrap)
    return res.redirect(FRONTEND_BOOTSTRAP);

  } catch (error) {
    console.error("Token exchange failed:", error.message);
    return res.redirect(FRONTEND_BOOTSTRAP);
  }
});*/
/*app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.redirect("https://echoa-v1.pages.dev/");
  }

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://echoa-backend.onrender.com/callback",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;

    // 🔥 create JWT
    const jwtToken = jwt.sign(
      { spotifyAccessToken: accessToken },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // redirect to frontend WITH token
    res.redirect(
      `https://echoa-v1.pages.dev/home?token=${jwtToken}`
    );
  } catch (err) {
    console.error("Spotify auth error:", err.message);
    res.redirect("https://echoa-v1.pages.dev/");
  }
});


/* -------------------- USER PROFILE -------------------- */
/*app.get("/me", async (req, res) => {
  if (!spotifyAccessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});*/
/*app.get("/me", authenticate, async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${req.spotifyAccessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Profile fetch failed" });
  }
});


/* -------------------- CURRENTLY PLAYING -------------------- */
/*app.get("/currently-playing", async (req, res) => {
  if (!spotifyAccessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      }
    );

    if (!response.data || !response.data.item) {
      return res.json({ playing: false });
    }

    const item = response.data.item;

    res.json({
      playing: true,
      song: item.name,
      artist: item.artists.map(a => a.name).join(", "),
      albumImage: item.album.images[0].url,
    });

  } catch (error) {
    console.error("Error fetching currently playing:", error.message);
    res.status(500).json({ error: "Failed to fetch current song" });
  }
});*/
/*app.get("/currently-playing", authenticate, async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${req.spotifyAccessToken}`,
        },
      }
    );

    if (!response.data) {
      return res.json({ playing: false });
    }

    const item = response.data.item;

    res.json({
      playing: true,
      song: item.name,
      artist: item.artists.map(a => a.name).join(", "),
      albumImage: item.album.images[0].url,
    });
  } catch {
    res.status(500).json({ error: "Song fetch failed" });
  }
});
/* -------------------- AUTHENTICATION MIDDLEWARE -------------------- */
/*function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.spotifyAccessToken = decoded.spotifyAccessToken;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

/* -------------------- START SERVER -------------------- */
/*app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/
/* FILENAME: Backend/index.js 
   Configuration: DEPLOYED / LIVE ENVIRONMENT
   (Uses Render Backend & Cloudflare Frontend)
*/

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 🔴 HARDCODED LIVE LINKS (As per request)
// ==========================================

// 1. Mee Backend URL (Render)
// NOTE: Ikkada '/callback' undali
const BACKEND_URL = "https://echoa-backend.onrender.com"; 
const SPOTIFY_REDIRECT_URI = `${BACKEND_URL}/callback`;

// 2. Mee Frontend URL (Cloudflare)
const FRONTEND_URI = "https://echoa-v1.pages.dev";

// 3. Spotify Credentials (Env nundi techukuntundi leda fallbacks)
// Render Dashboard lo environment variables set cheyyadam marchipovaddu!
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET || "echoa_super_secret_key_live";

// ==========================================

// Allow Only Your Live Frontend & Localhost (Just in case)
app.use(cors({
    origin: [FRONTEND_URI, "http://localhost:5173"], 
    credentials: true
}));
app.use(express.json());

// --- Middleware: Verify JWT Token ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

// --- ROUTES ---

app.get("/", (req, res) => {
    res.send("Echoa Live Backend is Active! 🌍");
});

// 1. LOGIN
app.get("/login", (req, res) => {
    const scope = "user-read-private user-read-email user-read-playback-state user-read-currently-playing";
    const params = querystring.stringify({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: SPOTIFY_REDIRECT_URI, // Points to Render
    });
    res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

// 2. CALLBACK (Handles Spotify Response)
app.get("/callback", async (req, res) => {
    const code = req.query.code || null;

    if (!code) {
        return res.redirect(`${FRONTEND_URI}/?error=no_code`);
    }

    try {
        // Exchange Code for Token
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: SPOTIFY_REDIRECT_URI, // Must match exactly
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { access_token, refresh_token } = response.data;

        // Wrap in JWT
        const userJwt = jwt.sign(
            { accessToken: access_token, refreshToken: refresh_token }, 
            JWT_SECRET, 
            { expiresIn: "1h" }
        );

        // Redirect to LIVE Frontend
        res.redirect(`${FRONTEND_URI}/home?token=${userJwt}`);

    } catch (error) {
        console.error("Spotify Auth Error:", error.response ? error.response.data : error.message);
        res.redirect(`${FRONTEND_URI}/?error=auth_failed`);
    }
});

// 3. GET PROFILE
app.get("/me", authenticateToken, async (req, res) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${req.user.accessToken}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Profile Error:", error.message);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

// 4. GET CURRENTLY PLAYING
app.get("/currently-playing", authenticateToken, async (req, res) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: { Authorization: `Bearer ${req.user.accessToken}` },
        });

        if (!response.data || !response.data.item) {
            return res.json({ playing: false, message: "No song playing" });
        }

        const item = response.data.item;
        res.json({
            playing: response.data.is_playing,
            song: item.name,
            artist: item.artists.map((a) => a.name).join(", "),
            albumImage: item.album.images[0]?.url,
            uri: item.uri
        });

    } catch (error) {
        console.error("Song Fetch Error:", error.message);
        res.status(500).json({ error: "Failed to fetch song" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT} (Configured for LIVE)`);
});