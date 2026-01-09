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
      Analyze the song "${songName}" by "${artistName}" deeply.
      
      Step 1: Analyze the Lyrics & Meaning. (Is it about heartbreak, falling in love, partying, confidence, or loneliness?)
      Step 2: Analyze the Beat & Genre. (Is it upbeat Disco, slow R&B, heavy Rock, or chill Lo-fi?)
      Step 3: Analyze the "Vibe". (Is it dark and moody, bright and colorful, or dreamy and blurry?)

      Step 4: Based on the above, create a VISUAL SEARCH QUERY for a background video.
      
      CRITICAL RULES for the Visual:
      1. STRICTLY NO PEOPLE, NO FACES, NO CROWDS. (The background must be abstract or scenery).
      2. If the song is energetic/pop (like Twice), look for "Neon movement", "Disco lights", "Bright particles".
      3. If the song is romantic/sensual (like Jimin), look for "Red fluid ink", "Dark water ripples", "Moody smoke".
      4. If the lyrics are sad, look for "Rain on glass", "Foggy forest".
      5. Output ONLY the search query.
      
      OUTPUT FORMAT:
      Return ONLY a 2-4 word search term. 
      Examples: "Neon purple tunnel", "Sunset ocean waves", "Pink glitter bokeh", "Dark storm clouds".
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "abstract lights"; 
  }
};