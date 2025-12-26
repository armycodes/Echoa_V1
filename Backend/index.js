const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
let spotifyAccessToken = null;


const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/ping", (req, res) => {
  res.json({ message: "Echoa backend is running 🚀" });
});

/*route for Spotify authentication would go here*/
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    console.error("No code received");
    return res.redirect("http://localhost:5173/home");
  }

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
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

    console.log("ACCESS TOKEN STORED");

    // IMPORTANT: always redirect
    res.redirect("http://localhost:5173/home");

  } catch (error) {
    console.error(
      "Token exchange failed:",
      error.response?.data || error.message
    );

    // Even on error → redirect (no hanging)
    res.redirect("http://localhost:5173/home");
  }
});






/*login*/
const querystring = require("querystring");

app.get("/login", (req, res) => {
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
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });

  res.redirect(
    `https://accounts.spotify.com/authorize?${authQueryParameters}`
  );
});
/*Test API to verify token*/
app.get("/me", async (req, res) => {
  if (!spotifyAccessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  /*current spotify song playing*/
  app.get("/currently-playing", async (req, res) => {
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

  } catch (error) {
    console.error("Error fetching currently playing:", error.message);
    res.status(500).json({ error: "Failed to fetch current song" });
  }
});


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
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
