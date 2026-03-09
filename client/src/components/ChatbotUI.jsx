import React, { useState, useRef, useEffect } from 'react';
import { Phone, MoreHorizontal, Paperclip, Mic, Send } from 'lucide-react';
import { chatApi } from '../api/chat';

function formatTime() {
  const d = new Date();
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

const ChatbotUI = () => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hello! 👋 Welcome to ReactOne. How can I assist you with your learning journey today?",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg = { role: 'user', text: trimmed, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const { reply } = await chatApi.sendMessage(trimmed);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: reply, time: formatTime() },
      ]);
    } catch (_err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: "Sorry, I couldn't connect to the server right now. Please try again later! 🔌",
          time: formatTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0d1520]/80 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(64,224,255,0.08)] relative">
      {/* Outer glow ring */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#40E0FF]/20 via-transparent to-purple-500/10 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#0d1520]/60 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#40E0FF] to-purple-600 flex items-center justify-center shadow-lg shadow-[#40E0FF]/20">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d1520]" />
          </div>
          <div>
            <h4 className="font-semibold text-white leading-tight text-sm">
              AI ASSISTANT
            </h4>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white/70">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white/70">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-5 space-y-5 h-[220px] overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg, idx) =>
          msg.role === 'ai' ? (
            /* AI Message */
            <div key={idx} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#40E0FF] to-purple-600 flex-shrink-0 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-[10px]">AI</span>
              </div>
              <div>
                <div className="bg-[#151A21] text-[#E9EEF5]/90 px-4 py-3 rounded-2xl rounded-tl-sm max-w-md border border-white/5 text-sm leading-relaxed whitespace-pre-line">
                  {msg.text}
                </div>
                <p className="text-[10px] text-white/30 mt-1.5 ml-1">
                  {msg.time}
                </p>
              </div>
            </div>
          ) : (
            /* User Message */
            <div key={idx} className="flex gap-3 justify-end">
              <div>
                <div className="bg-[#40E0FF] text-[#0B0D10] px-4 py-3 rounded-2xl rounded-tr-sm max-w-md text-sm font-medium leading-relaxed shadow-lg shadow-[#40E0FF]/10">
                  {msg.text}
                </div>
                <p className="text-[10px] text-white/30 mt-1.5 text-right mr-1">
                  {msg.time}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#273140] flex items-center justify-center flex-shrink-0 border border-white/10">
                <span className="text-xs text-white/60">U</span>
              </div>
            </div>
          )
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#40E0FF] to-purple-600 flex-shrink-0 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-[10px]">AI</span>
            </div>
            <div className="bg-[#151A21] px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#40E0FF]/60 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-[#40E0FF]/60 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-[#40E0FF]/60 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-[#0d1520]/40 relative z-10">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/30 hover:text-white/60">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message.."
              className="w-full bg-[#151A21] border border-white/5 rounded-xl py-2.5 pl-4 pr-4 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#40E0FF]/30 transition-colors"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/30 hover:text-white/60">
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-[#40E0FF] flex items-center justify-center shadow-lg shadow-[#40E0FF]/20 transition-all hover:shadow-[#40E0FF]/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#0B0D10]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
