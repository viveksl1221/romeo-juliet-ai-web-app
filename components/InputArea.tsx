import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Persona, ThemeConfig } from '../types';
import { THEMES } from '../constants';

interface InputAreaProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  activePersona: Persona;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading, activePersona }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const theme: ThemeConfig = THEMES[activePersona];

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-grow
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  // Focus input on mount
  useEffect(() => {
     textareaRef.current?.focus();
  }, []);

  return (
    <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 sticky bottom-0 z-10">
      <div className="max-w-3xl mx-auto relative flex items-end gap-2 p-2 bg-white border border-gray-200 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-gray-200 transition-all duration-300">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={`Talk to ${activePersona === 'romeo' ? 'Romeo' : 'Juliet'}...`}
          disabled={isLoading}
          rows={1}
          className="flex-1 max-h-[150px] py-3 pl-4 bg-transparent border-none focus:ring-0 resize-none text-gray-800 placeholder-gray-400 text-base"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`p-3 rounded-full mb-1 transition-all duration-300 ${
            input.trim() && !isLoading 
              ? `${theme.buttonBg} text-white shadow-md transform hover:scale-105` 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
      <div className="text-center mt-2">
        <p className="text-[10px] text-gray-400">
          AI generated content can be inaccurate. Romeo & Juliet provide perspective, not professional advice.
        </p>
      </div>
    </div>
  );
};
