import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const mockMessages = [
  {
    id: 1,
    type: 'bot',
    text: "Hi! I'm your Stitch to Figma Mentor. Paste your Google Stitch prompt here, and I'll help you optimize it for the best possible Figma output.",
  },
];

const StitchMentor = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        text: "That's a good start! To make it better for Figma, try specifying the theme (e.g., 'dark mode') and listing the exact sections you want (e.g., 'Hero, Features grid, Footer'). This gives the AI agents a clearer structure to work with.",
      }]);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-white/5 border-b border-white/10 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-[2px]">
          <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Stitch Mentor AI</h3>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Online & Ready
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.type === 'bot' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
            }`}>
              {msg.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.type === 'user' 
                ? 'bg-purple-500/20 text-white rounded-tr-sm border border-purple-500/30' 
                : 'bg-white/5 text-muted-foreground rounded-tl-sm border border-white/10'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
               <Bot className="w-4 h-4" />
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1">
               <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
               <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
               <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your prompt here..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-white transition-all placeholder:text-muted-foreground/50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors flex items-center justify-center text-white"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default StitchMentor;
