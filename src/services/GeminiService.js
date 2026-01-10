/*mport { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Retry Logic
async function generateWithRetry(model, prompt, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            const isOverloaded = error.message.includes('503') || error.message.includes('overloaded');
            if (isOverloaded && i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; 
            } else {
                throw error;
            }
        }
    }
}

export const getSongMoodSearchTerm = async (songName, artistName) => {
  if (!GEMINI_API_KEY) {
      console.error("❌ Gemini API Key is missing!");
      return "abstract lights";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // 🔥 SMART PROMPT: VIBE vs LITERAL DECISION 🔥
    const prompt = `
      Act as a smart visual director for a music player.
      Target Song: "${songName}" by "${artistName}".
      
      Your Task: Analyze the following to decide the best background video:
      1. **Genre & Beat:** (Is it Fast/Aggressive, Slow/Melancholic, or Pop/Fun?)
      2. **Theme & Feel:** (Is it Dark, Bright, Romantic, or Mysterious?)
      3. **Concept:** (Is the title a Metaphor? e.g., "Butter" is not about food, it's about smooth charm.)

      DECISION LOGIC (Crucial):
      - **Case A (Vibe/Abstract):** If the song is aggressive, electronic, or hype (e.g., "Danger", "Idol"), use TEXTURES.
        -> Output: "Red glitch", "Neon strobe", "Fast particles".
      - **Case B (Scenery/Literal):** If the song is atmospheric, sad, or nature-based (e.g., "Rain", "Spring Day"), use SCENERY.
        -> Output: "Rain on glass", "Pastel sky clouds", "Ocean sunset".
      - **Case C (Metaphor Check):** If the title is an object but the song is a vibe (e.g., "Butter"), IGNORE the object. Use the feeling.
        -> Output: "Yellow liquid smooth" (Not "Butter stick").

      FINAL OUTPUT:
      Provide ONLY the precise 2-4 word search term. No explanations.
    `;

    let text = await generateWithRetry(model, prompt);
    
    // Cleanup
    if (text.includes("\n")) {
        const lines = text.split("\n").filter(line => line.trim() !== "");
        text = lines[lines.length - 1]; 
    }
    text = text.replace(/\*\*//*g, /*'').replace(/"/g, '').trim();

    console.log(`🎯 Final Search Query: "${text}"`);
    return text;
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return "abstract neon"; 
  }
};*/
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Note: Using 'gemini-1.5-flash' as it is the most stable fast model right now.
// If you have access to 2.5, change it to 'gemini-2.5-flash'.
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- RETRY LOGIC (Kept from your original code) ---
async function generateWithRetry(model, prompt, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            // Check for overload errors
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
// ✅ FIX: Added 'movieName' to arguments to stop ReferenceError
export const getSongMoodSearchTerm = async (songName, movieName, artistName) => {
  if (!GEMINI_API_KEY) {
      console.error("❌ Gemini API Key is missing!");
      return "abstract lights";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Safety check: Fallback strings if data is missing
    const safeMovie = movieName || "Unknown Movie";
    const safeArtist = artistName || "Unknown Artist";

    // 🔥 SMART PROMPT: INDIAN CONTEXT + CINEMATIC SCENERY 🔥
    const prompt = `
      Act as a Visual Director for an Indian Music Player (Telugu/Tamil/Hindi + Global).
      
      CONTEXT:
      Song: "${songName}"
      Movie/Album: "${safeMovie}"
      Artist: "${safeArtist}"

      Your Task: Analyze the song's energy and genre to generate a "Real World Scenery" search query for Pexels.

      STRICT RULES:
      1. **NO FACES / NO PEOPLE:** The video must be a background. Use silhouettes if needed, but prefer empty scenery.
      2. **REAL FOOTAGE:** No cartoons, no abstract graphics (unless it's a club song).

      DECISION LOGIC (Indian Context):
      
      - **CASE A: MASS / ITEM / FOLK (DSP, Thaman style)**
        * Vibe: High Energy, Festival, Raw, Street, Oopu.
        * Since stock videos lack specific Indian streets, focus on LIGHTING & ELEMENTS.
        * Keywords: "Bonfire sparks", "Red smoke atmosphere", "Fast flashing city lights", "Dust particles in light", "Jeep driving night POV", "Fireworks".
      
      - **CASE B: MELODY / ROMANTIC (Anirudh, ARR, Sid Sriram)**
        * Vibe: Dreamy, Travel, Pleasant, Love.
        * Keywords: "Train window rain view", "Sunrise misty mountains", "Slow motion ocean waves", "Flower field wind", "Moonlight reflection river", "Green paddy field".
      
      - **CASE C: SAD / HEARTBREAK / SOLITUDE**
        * Vibe: Lonely, Deep, 3AM.
        * Keywords: "Rain on car window night", "Lonely bench empty street", "Foggy forest road", "Grey sky ocean", "Candle light".

      - **CASE D: UNIVERSAL / WESTERN / CLUB**
        * Vibe: Stylish, Modern.
        * Keywords: "Neon tunnel", "Cyberpunk city night", "Laser lights abstract", "Driving at night".

      FINAL OUTPUT:
      Provide ONLY the precise 3-5 word search term. No explanations.
    `;

    // Execute with Retry Logic
    let text = await generateWithRetry(model, prompt);
    
    // Cleanup Response
    if (text.includes("\n")) {
       const lines = text.split("\n").filter(line => line.trim() !== "");
       text = lines[lines.length - 1]; 
    }
    text = text.replace(/\*\*/g, '').replace(/"/g, '').trim();

    console.log(`🧠 Gemini Brain: ${songName} (${safeMovie}) -> Search: "${text}"`);
    return text;
    
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback based on simple logic if AI fails
    return songName.toLowerCase().includes("love") ? "sunset clouds" : "abstract neon"; 
  }
};