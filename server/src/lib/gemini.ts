import { GoogleGenAI } from "@google/genai";

// console.log("KEY:", process.env.GEMINI_API_KEY);

export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});