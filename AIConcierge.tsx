
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { useAppContext } from './AppContext';
import { getGeminiResponse } from './geminiService';
import { TRANSLATIONS } from './constants';

const AIConcierge: React.FC = () => {
  const { language } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ text: language === 'ar' ? 'مرحباً، كيف يمكنني مساعدتك؟' : 'Hello, how can I help you?', sender: 'ai' }]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput('');
    setLoading(true);
    const aiText = await getGeminiResponse(userMsg, language);
    setMessages(prev => [...prev, { text: aiText, sender: 'ai' }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-gold-500 text-navy-900 p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold hover:scale-110 transition">
          <Bot /> <span className="hidden sm:inline">{TRANSLATIONS.aiPrompt[language]}</span>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden border border-gray-100">
          <div className="bg-navy-900 p-4 text-white flex justify-between items-center">
            <span className="font-bold flex items-center gap-2"><Bot size={18} className="text-gold-400"/> AI Concierge</span>
            <button onClick={() => setIsOpen(false)}><X /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg text-sm max-w-[85%] ${m.sender === 'user' ? 'bg-navy-800 text-white rounded-br-none' : 'bg-white border text-gray-800 shadow-sm rounded-bl-none'}`}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t bg-white flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="..." className="flex-1 p-2 border rounded-md text-sm outline-none focus:border-gold-500" />
            <button onClick={handleSend} className="bg-gold-500 p-2 rounded-md text-navy-900 transition hover:bg-gold-600"><Send size={18}/></button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AIConcierge;
