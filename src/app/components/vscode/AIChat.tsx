"use client";

import { useState, useRef, useEffect } from "react";

const INITIAL_MESSAGES = [
  { role: "system" as const, content: "[SECURITY_ENCRYPTION_ACTIVE]" },
  { role: "bot" as const, content: "GREETINGS_OPERATIVE. AI_INTEL_ENGINE STANDING BY. ASK ME ANYTHING ABOUT SAJID'S PROJECTS OR SKILLS." },
];

export default function AIChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user" as const, content: input.toUpperCase() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
        const response = getAiResponse(input);
        setMessages(prev => [...prev, { role: "bot" as const, content: response }]);
        setIsTyping(false);
    }, 1000);
  };

  const getAiResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes("project")) return "PROJECT_INTEL: SAJID HAS COMPLETED 15+ DATA PROJECTS IN E-COMMERCE, ML, AND BI. CHECK THE PROJECTS TAB FOR DEEP DIVE.";
    if (q.includes("skill")) return "SKILL_TELEMETRY: CORE STACK - PYTHON, SQL, POWER_BI, ML. ADDITIONAL - NEXT.JS, REACT.";
    if (q.includes("contact")) return "SIGNAL_ESTABLISHED: WHATSAPP (+880 182 452 6054) OR sajid.islam.chowdhury@gmail.com";
    return "UNKNOWN_COMMAND_OR_QUERY. RE-INPUT INTEL OR TYPE 'HELP' FOR SYSTEM PROTOCOLS.";
  };

  return (
    <div className="fixed bottom-24 right-8 w-80 h-[450px] bg-black/80 border border-[#a3e635]/30 shadow-2xl z-[2000] flex flex-col font-mono text-xs animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#a3e635]/10 p-3 border-b border-[#a3e635]/20 flex justify-between items-center">
        <span className="text-[#a3e635] tracking-widest font-bold">[ AI_CHAT_INTERFACE ]</span>
        <button onClick={onClose} className="text-[#a3e635] hover:text-white transition-colors">×</button>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#a3e635]/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-2 rounded-sm border ${
              m.role === 'user' 
                ? 'bg-[#a3e635] text-black border-[#a3e635]' 
                : m.role === 'system'
                  ? 'border-none italic text-gray-500'
                  : 'bg-white/5 text-[#a3e635] border-[#a3e635]/20'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="p-2 bg-white/5 border border-[#a3e635]/20 text-[#a3e635]">
              ANALYZING_INTEL...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-[#a3e635]/20 bg-black/90">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER_INTEL_QUERY..."
          className="w-full bg-transparent border border-[#a3e635]/30 p-2 text-[#a3e635] outline-none placeholder:text-[#a3e635]/30"
        />
      </form>
    </div>
  );
}
