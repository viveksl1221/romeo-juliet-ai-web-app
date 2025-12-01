import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Persona } from '../types';

interface MessageListProps {
  messages: Message[];
  activePersona: Persona;
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, activePersona, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        const isRomeo = msg.persona === 'romeo';
        
        // Dynamic styles based on who sent the message
        let bubbleStyle = '';
        let containerStyle = '';

        if (isUser) {
          containerStyle = 'justify-end';
          // User bubble style adapts slightly to active theme context or stays neutral
          bubbleStyle = 'bg-white border border-gray-200 text-gray-800 rounded-br-none shadow-sm';
        } else {
          containerStyle = 'justify-start';
          if (isRomeo) {
            bubbleStyle = 'bg-sky-50 border border-sky-100 text-sky-900 rounded-bl-none shadow-sm';
          } else {
            // Juliet
            bubbleStyle = 'bg-pink-50 border border-pink-100 text-pink-900 rounded-bl-none shadow-sm';
          }
        }

        return (
          <div key={msg.id} className={`flex ${containerStyle} animate-fade-in`}>
            <div className={`max-w-[85%] sm:max-w-[70%] px-5 py-3 rounded-2xl text-base leading-relaxed ${bubbleStyle}`}>
              {!isUser && (
                <div className="text-[10px] uppercase tracking-widest font-bold mb-1 opacity-50 font-serif">
                  {msg.persona}
                </div>
              )}
              <div className="markdown-content">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}
      
      {isLoading && (
        <div className="flex justify-start animate-pulse">
           <div className={`max-w-[85%] px-5 py-3 rounded-2xl rounded-bl-none text-sm bg-gray-50 border border-gray-100 text-gray-400 italic`}>
             {activePersona === 'romeo' ? 'Feeling...' : 'Thinking...'}
           </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};