import { GoogleGenAI, Content, Part } from "@google/genai";
import { Message, Persona } from "../types";
import { ROMEO_SYSTEM_INSTRUCTION, JULIET_SYSTEM_INSTRUCTION } from "../constants";

// Initialize the client. API_KEY is expected to be in the environment.
// Remove top-level initialization
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

/**
 * Generates a response from Gemini based on the current persona and chat history.
 * We specifically use `generateContent` instead of a stateful `Chat` object 
 * to ensure we can swap the System Instruction dynamically for every turn
 * based on the active persona.
 */
export const generatePersonaResponse = async (
  currentHistory: Message[],
  activePersona: Persona
): Promise<string> => {

  // Safe API Key access
  let apiKey = '';
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      // @ts-ignore
      apiKey = process.env.API_KEY;
    }
  } catch (e) {
    // ignore
  }

  if (!apiKey) {
    apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  if (!apiKey) {
    throw new Error("API Key not found. Please set VITE_GEMINI_API_KEY in .env");
  }

  const ai = new GoogleGenAI({ apiKey });

  // 1. Select the correct system instruction
  const systemInstruction = activePersona === 'romeo'
    ? ROMEO_SYSTEM_INSTRUCTION
    : JULIET_SYSTEM_INSTRUCTION;

  // 2. Format history into Gemini `Content` objects
  // We filter out any messages that might be errors or empty
  const contents: Content[] = currentHistory.map((msg) => {
    const part: Part = { text: msg.text };
    return {
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [part],
    };
  });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Slightly creative but grounded
        maxOutputTokens: 250, // Keep responses concise as per rules
      },
    });

    if (response.text) {
      return response.text;
    } else {
      throw new Error("Empty response from model.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
