export type Persona = 'romeo' | 'juliet';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  persona?: Persona; // Only relevant if role is 'model'
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  activePersona: Persona;
  isLoading: boolean;
  error: string | null;
}

export interface ThemeConfig {
  primaryBg: string;
  secondaryBg: string;
  accentText: string;
  buttonBg: string;
  buttonHover: string;
  borderColor: string;
  iconColor: string;
}
