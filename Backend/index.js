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

/* FILENAME: Backend/index.js */
/* FILENAME: Backend/index.js */
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ENV VARIABLES
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({ origin: [FRONTEND_URI, "http://localhost:5173"], credentials: true }));
app.use(express.json());

// MIDDLEWARE: Check Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "No token" });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

app.get("/", (req, res) => res.send("Echoa Backend Alive! 🟢"));

// --- 1. LOGIN (IMPORTANT: ADDED PERMISSIONS) ---
app.get("/login", (req, res) => {
    // "user-modify-playback-state" is required for Play/Pause/Next
    const scope = "user-read-private user-read-email user-read-playback-state user-read-currently-playing user-modify-playback-state playlist-read-private playlist-read-collaborative";
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: "code",
            client_id: SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: SPOTIFY_REDIRECT_URI,
        }));
});

/*app.get("/callback", async (req, res) => {
    const code = req.query.code || null;
    if (!code) return res.redirect(`${FRONTEND_URI}/?error=no_code`);
    try {
        const response = await axios.post("https://accounts.spotify.com/api/token", 
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        const userJwt = jwt.sign({ accessToken: response.data.access_token }, JWT_SECRET, { expiresIn: "1h" });
        res.redirect(`${FRONTEND_URI}/home?token=${userJwt}`);
    } catch (error) {
        res.redirect(`${FRONTEND_URI}/?error=auth_failed`);
    }
});*/
app.get("/callback", async (req, res) => {
    const code = req.query.code || null;
    if (!code) return res.redirect(`${FRONTEND_URI}/?error=no_code`);

    try {
        // Log starting
        console.log("🔹 Attempting to exchange code for token...");
        console.log("🔹 Redirect URI being used:", SPOTIFY_REDIRECT_URI); 

        const response = await axios.post("https://accounts.spotify.com/api/token", 
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        console.log("✅ Token received successfully!");
        
        const userJwt = jwt.sign({ accessToken: response.data.access_token }, JWT_SECRET, { expiresIn: "1h" });
        res.redirect(`${FRONTEND_URI}/home?token=${userJwt}`);
    
    } catch (error) {
        // Ikkada Real Error Print avtundi
        console.error("❌ SPOTIFY LOGIN ERROR:");
        if (error.response) {
            // Spotify server nundi vachina error (Ex: 400 Bad Request)
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data));
        } else {
            // Code/Network error
            console.error("Message:", error.message);
        }
        res.redirect(`${FRONTEND_URI}/?error=auth_failed`);
    }
});


app.get("/me", authenticateToken, async (req, res) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${req.user.accessToken}` },
        });
        res.json(response.data);
    } catch (e) { res.status(500).json({ error: "Profile fetch failed" }); }
});

app.get("/currently-playing", authenticateToken, async (req, res) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: { Authorization: `Bearer ${req.user.accessToken}` },
        });

        if (!response.data || !response.data.item) {
            return res.json({ playing: false, message: "No song playing" });
        }
        const item = response.data.item;
        let albumImage = "";
        if (item.album && item.album.images.length > 0) albumImage = item.album.images[0].url;
        
        res.json({
            playing: response.data.is_playing,
            song: item.name,
            artist: item.artists.map(a => a.name).join(", "),
            albumImage: albumImage,
            uri: item.uri
        });
    } catch (error) { res.status(500).json({ error: "Failed to fetch song" }); }
});
// --- FETCH PLAYLISTS ROUTE ---
app.get("/playlists", authenticateToken, async (req, res) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: { Authorization: `Bearer ${req.user.accessToken}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Playlists fetch failed:", error.message);
        res.status(500).json({ error: "Playlists fetch failed" });
    }
});

// --- PLAY SPECIFIC PLAYLIST ROUTE ---
app.put("/play-playlist", authenticateToken, async (req, res) => {
    const { context_uri } = req.body;
    try {
        await axios.put("https://api.spotify.com/v1/me/player/play", 
            { context_uri: context_uri }, 
            { headers: { Authorization: `Bearer ${req.user.accessToken}` } }
        );
        res.json({ success: true });
    } catch (error) {
        console.error("Play playlist failed:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to play playlist" });
    }
});


// --- 2. CONTROL ROUTES (NEW) ---
// Play/Pause/Next work cheyyalante ivi undali

app.post("/player/pause", authenticateToken, async (req, res) => {
    try {
        await axios.put("https://api.spotify.com/v1/me/player/pause", {}, {
            headers: { Authorization: `Bearer ${req.user.accessToken}` }
        });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: "Pause failed" }); }
});

app.post("/player/play", authenticateToken, async (req, res) => {
    try {
        await axios.put("https://api.spotify.com/v1/me/player/play", {}, {
            headers: { Authorization: `Bearer ${req.user.accessToken}` }
        });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: "Play failed" }); }
});

app.post("/player/next", authenticateToken, async (req, res) => {
    try {
        await axios.post("https://api.spotify.com/v1/me/player/next", {}, {
            headers: { Authorization: `Bearer ${req.user.accessToken}` }
        });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: "Next failed" }); }
});

app.post("/player/previous", authenticateToken, async (req, res) => {
    try {
        await axios.post("https://api.spotify.com/v1/me/player/previous", {}, {
            headers: { Authorization: `Bearer ${req.user.accessToken}` }
        });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: "Prev failed" }); }
});

app.listen(PORT, () => console.log(`✅ Backend running on ${PORT}`));