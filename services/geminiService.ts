
import { GoogleGenAI } from "@google/genai";
import { Subject } from "../types";

/**
 * Service to handle streaming responses from Gemini.
 * Specifically tuned for ISGS 3rd Year Management students (2025-2026).
 */
export const getStreamingTutorResponse = async (
  messages: {role: string, text: string}[], 
  activeSubject: Subject | null,
  onChunk: (text: string) => void
) => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined') {
    console.error("Gemini API Key missing.");
    onChunk("SYSTEM ERROR: API_KEY not detected in neural uplink. Check GitHub Secrets.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const subjectContext = activeSubject 
      ? `Student is currently analyzing: ${activeSubject.name} (${activeSubject.category}) at ISGS. Description: ${activeSubject.description}.`
      : "Student is at the ISGS Core Command Center.";

    const streamResponse = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      })),
      config: {
        systemInstruction: `You are 'CyberTutor-ISGS', the specialized AI intelligence for the 3rd Year Management cohort (Promotion 2025-2026) at ISGS. 
        Context: ${subjectContext}
        Personality: Highly sophisticated, management-expert, encouraging but professional. 
        Mission: Help ISGS students master their exams (Nefissa Boudali, Olfa Bouhlel, KBHM curricula) and organizational theories. 
        Style: Use markdown, be precise, use terminology relevant to management and strategic analysis.`,
      },
    });

    let fullText = "";
    for await (const chunk of streamResponse) {
      const chunkText = chunk.text || "";
      fullText += chunkText;
      onChunk(fullText);
    }
    return fullText;
  } catch (error) {
    console.error("Gemini Streaming Error:", error);
    onChunk("SYSTEM ERROR: ISGS link unstable. Retry protocol.");
    return null;
  }
};
