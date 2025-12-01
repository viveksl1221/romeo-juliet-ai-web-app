import React from 'react';
import { Persona, ThemeConfig } from '../types';
import { THEMES } from '../constants';

interface HeaderProps {
  activePersona: Persona;
}

export const Header: React.FC<HeaderProps> = ({ activePersona }) => {
  const theme: ThemeConfig = THEMES[activePersona];

  return (
    <header className={`p-6 pb-2 flex flex-col items-center justify-center transition-colors duration-500`}>
      <h1 className={`text-3xl font-serif tracking-widest transition-colors duration-500 ${theme.accentText}`}>
        ROMEO <span className="text-xs align-middle mx-1 font-sans text-gray-400">&</span> JULIET
      </h1>
      <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-medium">
        {activePersona === 'romeo' ? 'Emotional Resonance' : 'Rational Clarity'}
      </p>
    </header>
  );
};