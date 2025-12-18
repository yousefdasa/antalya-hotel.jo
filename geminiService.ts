
import { GoogleGenAI } from "@google/genai";
import { HOTEL_INFO, INITIAL_ROOMS } from './constants';

export const getGeminiResponse = async (userMessage: string, language: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const model = 'gemini-3-flash-preview';
    const context = `You are the AI Concierge for ${HOTEL_INFO.name}. 
    Location: ${HOTEL_INFO.location}. 
    Available Rooms: ${INITIAL_ROOMS.map(r => r.type).join(', ')}.
    Language: ${language === 'ar' ? 'Arabic' : 'English'}. Reply in the user language.`;
    
    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: { systemInstruction: context },
    });
    return response.text || (language === 'ar' ? 'عذراً، لا يمكنني المساعدة حالياً.' : "Sorry, I cannot assist right now.");
  } catch (error) {
    console.error("AI Error:", error);
    return language === 'ar' ? 'خطأ في الاتصال بالمساعد الذكي.' : "Error connecting to AI.";
  }
};
