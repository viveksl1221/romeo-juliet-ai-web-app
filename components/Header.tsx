import React from 'react';
import { Persona, ThemeConfig } from '../types';
import { THEMES } from '../constants';

interface HeaderProps {
  activePersona: Persona;
  onClearChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePersona, onClearChat }) => {
  const theme: ThemeConfig = THEMES[activePersona];

  return (
    <header className={`p-6 pb-2 flex flex-col items-center justify-center transition-colors duration-500 relative`}>
      <button
        onClick={onClearChat}
        className={`absolute right-4 top-4 p-2 rounded-full hover:bg-black/5 transition-colors ${theme.accentText}`}
        title="Clear Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
      <h1 className={`text-3xl font-serif tracking-widest transition-colors duration-500 ${theme.accentText}`}>
        ROMEO <span className="text-xs align-middle mx-1 font-sans text-gray-400">&</span> JULIET
      </h1>
      <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-medium">
        {activePersona === 'romeo' ? 'Emotional Resonance' : 'Rational Clarity'}
      </p>
    </header>
  );
};