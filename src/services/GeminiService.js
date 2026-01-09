import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure this matches your .env file variable name (VITE_GEMINI_API_KEY)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const getSongMoodSearchTerm = async (songName, artistName) => {
  if (!GEMINI_API_KEY) {
      console.error("❌ Gemini API Key is missing! Check .env file.");
      return "abstract lights";
  }

  try {
    // 🔴 UPDATED MODEL NAME HERE
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `

      Act as a visual director for a music video. 

      The song is "${songName}" by "${artistName}".

      Analyze the mood, lyrics, and vibe of this song.

      Based on the analysis, give me a search query to find a cinematic stock video background.

      

      Rules:

      1. Output ONLY 2-3 words.

      2. Do not use words like "video", "background", or "stock".

      3. Focus on visual elements (e.g., "neon rain", "sunset ocean", "dark smoke", "party lights", "galaxy stars").

      4. If the song is sad, look for rain/dark. If happy, look for bright/nature.

      5. Output NOTHING else but the search words.

    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "abstract lights"; 
  }
};