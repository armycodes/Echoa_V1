import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Using flash model for speed
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- RETRY LOGIC ---
async function generateWithRetry(model, prompt, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            const isOverloaded = error.message?.includes('503') || error.message?.includes('overloaded');
            if (isOverloaded && i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; 
            } else {
                throw error;
            }
        }
    }
}

// --- MAIN FUNCTION ---
// 👇👇👇 IMPORTANT CHANGE: (songName, movieName, artistName) added here 👇👇👇
export const getSongMoodSearchTerm = async (songName, movieName, artistName) => {
  if (!GEMINI_API_KEY) {
      console.error("❌ Gemini API Key is missing!");
      return "abstract lights";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Safety check
    const safeMovie = movieName || "Unknown Movie";
    const safeArtist = artistName || "Unknown Artist";

    // 🔥 SMART PROMPT 🔥
    const prompt = `
      Act as a Visual Director for an Indian Music Player.
      
      CONTEXT:
      Song: "${songName}"
      Movie/Album: "${safeMovie}"
      Artist: "${safeArtist}"

      Generate a 'Real World Scenery' search query for a background video.

      STRICT RULES:
      1. NO FACES / NO PEOPLE.
      2. REAL FOOTAGE ONLY.

      DECISION LOGIC:
      - MASS/FOLK (DSP, Thaman): "Bonfire sparks", "Red smoke", "Fast city lights", "Dust particles".
      - MELODY (Anirudh, ARR): "Train window rain", "Mist on mountains", "Slow waves", "Flower field".
      - SAD: "Rain on glass", "Lonely bench", "Fog".
      - CLUB/WESTERN: "Neon tunnel", "Laser lights".

      OUTPUT:
      Return ONLY the 3-5 word search query.
    `;

    let text = await generateWithRetry(model, prompt);
    
    // Cleanup
    if (text.includes("\n")) {
       const lines = text.split("\n").filter(line => line.trim() !== "");
       text = lines[lines.length - 1]; 
    }
    text = text.replace(/\*\*/g, '').replace(/"/g, '').trim();

    console.log(`🧠 Gemini Brain: ${songName} (${safeMovie}) -> Search: "${text}"`);
    return text;
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return "abstract neon"; 
  }
};