import { GoogleGenerativeAI } from "@google/generative-ai";

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
        Act as a Visual Director for a Music Player that plays both Global Hits and Indian Local Mass Songs.
        
        Song: "${songName}" | Movie/Album: "${movieName}" | Artist: "${artist}".

        Analyze the genre and energy. Return a search query for a background video.

        STRICT RULES:
        1. NO FACES, NO PEOPLE (Silhouettes okay).
        2. REAL FOOTAGE only (No cartoons).

        --- LOGIC FOR DIFFERENT VIBES ---
        
        CASE 1: TELUGU/INDIAN MASS & ITEM SONGS (Ex: DSP, Thaman, Folk beats)
        * Context: Raw energy, Festival, Street, Dance.
        * Since stock videos lack specific Indian streets, focus on LIGHTING & ELEMENTS.
        * Keywords to use: "Bonfire sparks", "Red smoke", "Fast flashing lights", "Golden dust particles", "Fire background", "Disco lights abstract".
        * GOAL: Make it look like a "Jatara" or "Party" background.

        CASE 2: MELODY & LOVE (Universal or Indian)
        * Context: Romantic, Calm, Travel.
        * Keywords: "Moonlight reflection water", "Train window rainy", "Flower field wind", "Sunrise mountains", "Slow waves".

        CASE 3: UNIVERSAL POP / HIPHOP / TRANCE (Ex: English, Anirudh Western)
        * Context: Stylish, Cool, Modern.
        * Keywords: "Neon tunnel", "City night drive POV", "Cyberpunk street", "Abstract laser lights".

        CASE 4: SAD / DEEP / 3AM
        * Keywords: "Rain on glass", "Foggy forest", "Lonely street lamp".

        OUTPUT FORMAT:
        Return ONLY the 3-5 word search query. Nothing else.
      `;

    let text = await generateWithRetry(model, prompt);
    
    // Cleanup
    if (text.includes("\n")) {
        const lines = text.split("\n").filter(line => line.trim() !== "");
        text = lines[lines.length - 1]; 
    }
    text = text.replace(/\*\*/g, '').replace(/"/g, '').trim();

    console.log(`🎯 Final Search Query: "${text}"`);
    return text;
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return "abstract neon"; 
  }
};