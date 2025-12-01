import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { PersonaToggle } from './components/PersonaToggle';
import { generatePersonaResponse } from './services/gemini';
import { Message, Persona, ThemeConfig } from './types';
import { THEMES, INITIAL_MESSAGE_ROMEO, INITIAL_MESSAGE_JULIET } from './constants';

const App: React.FC = () => {
  const [activePersona, setActivePersona] = useState<Persona>('romeo');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with a greeting from the default persona (Romeo)
  useEffect(() => {
    // Only set initial message if empty
    if (messages.length === 0) {
        setMessages([
            {
                id: uuidv4(),
                role: 'model',
                text: INITIAL_MESSAGE_ROMEO,
                persona: 'romeo',
                timestamp: Date.now(),
            }
        ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTogglePersona = (persona: Persona) => {
    if (persona === activePersona) return;
    setActivePersona(persona);
    
    // Optional: Could add a system message indicating the switch, but cleaner to just switch UI context
    // and let the next response come from the new persona.
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: uuidv4(),
      role: 'user',
      text: text,
      timestamp: Date.now(),
    };

    // Optimistically add user message
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const responseText = await generatePersonaResponse(newHistory, activePersona);
      
      const modelMsg: Message = {
        id: uuidv4(),
        role: 'model',
        text: responseText,
        persona: activePersona,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error) {
      console.error("Failed to generate response", error);
      const errorMsg: Message = {
        id: uuidv4(),
        role: 'model',
        text: "I am having trouble connecting right now. Please try again.",
        persona: activePersona,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentTheme: ThemeConfig = THEMES[activePersona];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ease-in-out ${currentTheme.primaryBg}`}>
      
      {/* Sticky Header Section combining Title and Toggle */}
      <div className={`sticky top-0 z-20 backdrop-blur-md bg-opacity-95 border-b transition-colors duration-500 ${currentTheme.primaryBg} ${currentTheme.borderColor}`}>
        <Header activePersona={activePersona} />
        <PersonaToggle 
            activePersona={activePersona} 
            onToggle={handleTogglePersona} 
            disabled={isLoading} 
        />
      </div>
      
      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto relative z-0">
        <MessageList 
            messages={messages} 
            activePersona={activePersona} 
            isLoading={isLoading} 
        />
        
        <InputArea 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading} 
            activePersona={activePersona} 
        />
      </div>

      {/* Ambient background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
         {/* Romeo's ambient glow (Sky Blue) */}
         <div className={`absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-sky-200 transition-opacity duration-1000 ${activePersona === 'romeo' ? 'opacity-40' : 'opacity-0'}`}></div>
         <div className={`absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-blue-100 transition-opacity duration-1000 ${activePersona === 'romeo' ? 'opacity-40' : 'opacity-0'}`}></div>
         
         {/* Juliet's ambient glow (Pink) */}
         <div className={`absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-pink-200 transition-opacity duration-1000 ${activePersona === 'juliet' ? 'opacity-40' : 'opacity-0'}`}></div>
         <div className={`absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-rose-100 transition-opacity duration-1000 ${activePersona === 'juliet' ? 'opacity-40' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
};

export default App;