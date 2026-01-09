import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 👇 HELPER: Retry Logic
async function generateWithRetry(model, prompt, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            const isOverloaded = error.message.includes('503') || error.message.includes('overloaded');
            if (isOverloaded && i < retries - 1) {
                console.warn(`⚠️ Gemini Overloaded. Retrying in ${delay}ms...`);
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
    // Model set to 2.5 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // 🔥 UPDATED PROMPT: FOCUSED ANALYSIS 🔥
    const prompt = `
      Act as a precise visual keyword generator.
      Target Song: "${songName}" by "${artistName}".
      
      Perform a quick analysis on these 4 elements:
      1. **About the Song:** What is the core subject? (e.g., Party, Heartbreak, Nature, Space)
      2. **Song Theme:** What is the underlying emotion? (e.g., Nostalgic, Aggressive, Romantic)
      3. **Lyrics Meaning:** Extract key visual metaphors from lyrics (e.g., "burning fire", "cold rain", "shining stars").
      4. **The Beat:** How does it sound? (e.g., Fast Techno, Slow Piano, Lo-fi, Orchestral).

      TASK: Combine the strongest keywords from these 4 points into a SINGLE, PRECISE 2-4 word video search query.

      CRITICAL RESTRICTIONS:
      - STRICTLY NO PEOPLE, NO FACES, NO CROWDS. (Must be abstract, nature, or texture).
      - Output ONLY the search query. Do not explain the analysis.
      
      Examples:
      - Song: "Be Mine" (Jimin) -> "Dark tropical neon"
      - Song: "The Feels" (Twice) -> "Pink disco sparkles"
      - Song: "Someone Like You" (Adele) -> "Black and white rain"
    `;

    let text = await generateWithRetry(model, prompt);
    
    // 🧹 CLEANUP LOGIC 🧹
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