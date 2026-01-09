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
    text = text.replace(/\*\*/g, '').replace(/"/g, '').trim();

    console.log(`🎯 Final Search Query: "${text}"`);
    return text;
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return "abstract neon"; 
  }
};