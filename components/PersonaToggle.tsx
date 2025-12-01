import React from 'react';
import { Persona } from '../types';
import { Feather, Hexagon } from 'lucide-react';

interface PersonaToggleProps {
  activePersona: Persona;
  onToggle: (persona: Persona) => void;
  disabled: boolean;
}

export const PersonaToggle: React.FC<PersonaToggleProps> = ({ activePersona, onToggle, disabled }) => {
  return (
    <div className="flex justify-center pb-6 pt-2 bg-transparent transition-colors duration-500">
      <div className="bg-white/60 border border-gray-200 rounded-full p-1 flex shadow-sm backdrop-blur-md">
        <button
          onClick={() => onToggle('romeo')}
          disabled={disabled}
          className={`
            relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2
            ${activePersona === 'romeo' 
              ? 'bg-sky-700 text-white shadow-md' 
              : 'text-gray-500 hover:text-sky-900 hover:bg-sky-50'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <Feather size={14} className={activePersona === 'romeo' ? 'animate-pulse' : ''} />
          <span>Romeo</span>
        </button>
        <button
          onClick={() => onToggle('juliet')}
          disabled={disabled}
          className={`
            relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2
            ${activePersona === 'juliet' 
              ? 'bg-pink-600 text-white shadow-md' 
              : 'text-gray-500 hover:text-pink-900 hover:bg-pink-50'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
           <Hexagon size={14} className={activePersona === 'juliet' ? 'animate-pulse' : ''} />
          <span>Juliet</span>
        </button>
      </div>
    </div>
  );
};