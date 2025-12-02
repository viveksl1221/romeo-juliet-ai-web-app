import { Message, Persona } from "../types";
import {
    ROMEO_AGENT_ID,
    JULIET_AGENT_ID,
    ROMEO_SYSTEM_INSTRUCTION,
    JULIET_SYSTEM_INSTRUCTION
} from "../constants";

const MISTRAL_API_URL = "/api/mistral/chat/completions";

/**
 * Generates a response from Mistral Agents based on the current persona and chat history.
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
        apiKey = import.meta.env.VITE_MISTRAL_API_KEY || '';
    }

    if (!apiKey) {
        throw new Error("API Key not found. Please set VITE_MISTRAL_API_KEY in .env");
    }

    // 1. Select the correct agent ID and System Instruction
    const agentId = activePersona === 'romeo' ? ROMEO_AGENT_ID : JULIET_AGENT_ID;
    const systemInstruction = activePersona === 'romeo' ? ROMEO_SYSTEM_INSTRUCTION : JULIET_SYSTEM_INSTRUCTION;

    // 2. Format history into Mistral messages
    const messages = currentHistory.map((msg) => ({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.text,
    }));

    const makeRequest = async (model: string, msgs: any[]) => {
        const response = await fetch(MISTRAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: model,
                messages: msgs,
                temperature: 0.7,
                max_tokens: 250,
            }),
        });
        return response;
    };

    try {
        // First try with the specific Agent ID
        let response = await makeRequest(agentId, messages);

        // If the Agent ID is invalid (400 Bad Request), fallback to standard model with system prompt
        if (response.status === 400) {
            const errorData = await response.json().catch(() => ({}));

            // Check if it's an invalid model error
            if (errorData?.code === 'invalid_model' || errorData?.message?.includes('Invalid model')) {
                console.warn(`Agent ID ${agentId} is invalid or not accessible. Falling back to standard model with system instruction.`);

                // Inject system instruction at the beginning
                const messagesWithSystem = [
                    { role: 'system', content: systemInstruction },
                    ...messages
                ];

                // Retry with standard model
                response = await makeRequest('mistral-small-latest', messagesWithSystem);
            } else {
                // If it's some other 400 error, throw it
                throw new Error(`Mistral API Error: ${response.status} ${JSON.stringify(errorData)}`);
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Mistral API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            throw new Error("Empty response from Mistral model.");
        }
    } catch (error) {
        console.error("Mistral API Error:", error);
        throw error;
    }
};
