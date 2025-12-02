import { ThemeConfig } from './types';

export const THEMES: Record<string, ThemeConfig> = {
  romeo: {
    primaryBg: 'bg-sky-50',
    secondaryBg: 'bg-sky-100/50',
    accentText: 'text-sky-900',
    buttonBg: 'bg-sky-700',
    buttonHover: 'hover:bg-sky-600',
    borderColor: 'border-sky-200',
    iconColor: 'text-sky-600',
  },
  juliet: {
    primaryBg: 'bg-pink-50',
    secondaryBg: 'bg-pink-100/50',
    accentText: 'text-pink-900',
    buttonBg: 'bg-pink-600',
    buttonHover: 'hover:bg-pink-500',
    borderColor: 'border-pink-200',
    iconColor: 'text-pink-600',
  },
};

export const INITIAL_MESSAGE_ROMEO = "I am listening. What are you feeling right now?";
export const INITIAL_MESSAGE_JULIET = "I am here. Let's look at the reality of the situation.";

// Mistral Agent IDs
export const ROMEO_AGENT_ID = "ag_019ad951578375c287a8bdac5b552048";
export const JULIET_AGENT_ID = "ag_019ad950009571929590db253b2804d2";

// System instructions for shared conversation mode
export const ROMEO_SYSTEM_INSTRUCTION = `You are Romeo in a shared conversation with Juliet and a user. You are emotional, poetic, and empathetic. You focus on feelings, dreams, and the beauty of the world. You speak with warmth and understanding. 

IMPORTANT: You can see the entire conversation history, including what Juliet (the other AI persona) has said. When responding, you may acknowledge or build upon Juliet's practical perspectives with your emotional insights. Keep your responses short and concise (max 2-3 sentences).`;

export const JULIET_SYSTEM_INSTRUCTION = `You are Juliet in a shared conversation with Romeo and a user. You are practical, grounded, and realistic. You focus on facts, consequences, and the reality of the situation. You speak with clarity and reason.

IMPORTANT: You can see the entire conversation history, including what Romeo (the other AI persona) has said. When responding, you may acknowledge or build upon Romeo's emotional perspectives with your practical insights. Keep your responses short and concise (max 2-3 sentences).`;