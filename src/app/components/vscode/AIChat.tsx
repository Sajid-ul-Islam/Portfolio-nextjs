"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Settings2, Sparkles, Zap, ChevronDown, Trash2 } from "lucide-react";
import { getLocalIntel } from "../../lib/intelEngine";

type ChatMessage = {
  role: "system" | "bot" | "user";
  content: string;
};

type ModelOption = "gemini-1.5-flash" | "gemini-1.5-pro";

const INITIAL_MESSAGES: ChatMessage[] = [
  { role: "system", content: "[EXTERNAL_LINK_SECURED] PROTOCOL: G-MODEL-1.5" },
  { role: "bot", content: "AI_INTEL_ENGINE ONLINE. I HAVE FULL ACCESS TO SAJID'S PORTFOLIO DATA. HOW CAN I ASSIST YOUR OPERATIONAL QUERY TODAY?" },
];

export default function AIChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [model, setModel] = useState<ModelOption>("gemini-1.5-flash");
  const [showModelSelect, setShowModelSelect] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const speak = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.pitch = 0.8;
    // Find a robotic sounding voice
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.name.includes("Google UK English Male")) || voices[0];
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // 1. LOCAL DATA CHECK
    const localMatch = getLocalIntel(input);
    if (localMatch) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "bot" as const, content: localMatch }]);
        speak(localMatch);
        setIsTyping(false);
      }, 800);
      return;
    }

    // 2. REMOTE AI CHECK
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          model: model,
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "bot" as const, content: data.content }]);
      speak(data.content);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: "system" as const, content: "[ERROR]: UPLINK_FAILURE" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    { label: "SHOW_DOSSUIER", prompt: "Who is Sajid Islam?" },
    { label: "PROJECT_STATUS", prompt: "Tell me about your featured projects." },
    { label: "TECH_OPS", prompt: "What is your primary tech stack?" },
    { label: "EXPERIENCE_LOG", prompt: "Where have you worked before?" },
  ];

  return (
    <div className="fixed bottom-20 right-8 w-80 md:w-96 h-[550px] bg-[#0d0d0d]/95 backdrop-blur-md border border-[#a3e635]/30 shadow-[0_0_40px_rgba(163,230,53,0.15)] z-[2000] flex flex-col font-mono text-[11px] animate-in slide-in-from-right-5 fade-in duration-300 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#a3e635]/5 p-3 border-b border-[#a3e635]/20 flex justify-between items-center bg-gradient-to-r from-black/50 to-transparent">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bot size={16} className="text-[#a3e635] animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#a3e635] rounded-full shadow-[0_0_10px_#a3e635]"></div>
          </div>
          <span className="text-[#a3e635] tracking-[0.2em] font-bold text-[10px] uppercase">[ intel_engine_v1.5 ]</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleClear}
            className="text-[#a3e635]/60 hover:text-white transition-colors p-1"
            title="Clear Chat"
          >
            <Trash2 size={14} />
          </button>
          <button onClick={onClose} className="text-[#a3e635]/60 hover:text-white transition-colors hover:rotate-90 duration-200">
            <X size={18} />
          </button>
        </div>
      </div>
      
      {/* Model Selection Bar */}
      <div className="px-3 py-1.5 border-b border-[#a3e635]/10 flex items-center justify-between bg-black/40 text-[9px] text-[#a3e635]/50">
        <div className="flex items-center gap-2">
          <Settings2 size={10} />
          <span>PROTOCOL:</span>
          <button 
            onClick={() => setShowModelSelect(!showModelSelect)}
            className="flex items-center gap-1 text-[#a3e635] hover:bg-[#a3e635]/10 px-1.5 py-0.5 rounded border border-[#a3e635]/20"
          >
            {model === "gemini-1.5-flash" ? (
              <>
                <Zap size={10} className="text-yellow-400" />
                <span>FLASH_1.5</span>
              </>
            ) : (
              <>
                <Sparkles size={10} className="text-purple-400" />
                <span>PRO_1.5</span>
              </>
            )}
            <ChevronDown size={8} className={`transition-transform ${showModelSelect ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse"></div>
          <span>UPLINK_STABLE</span>
        </div>

        {/* Model Dropdown */}
        {showModelSelect && (
          <div className="absolute top-[75px] left-3 bg-[#111] border border-[#a3e635]/30 rounded shadow-xl z-10 w-40 overflow-hidden animate-in zoom-in-95 duration-100">
             <button 
              onClick={() => { setModel("gemini-1.5-flash"); setShowModelSelect(false); }}
              className={`w-full text-left p-2 hover:bg-[#a3e635]/10 flex flex-col gap-0.5 ${model === "gemini-1.5-flash" ? 'bg-[#a3e635]/10' : ''}`}
             >
                <div className="flex items-center gap-2 text-[#a3e635]">
                  <Zap size={10} />
                  <span className="font-bold">Gemini 1.5 Flash</span>
                </div>
                <span className="text-[8px] text-gray-500 opacity-70">FAST, LIGHTWEIGHT, BALANCED</span>
             </button>
             <button 
              onClick={() => { setModel("gemini-1.5-pro"); setShowModelSelect(false); }}
              className={`w-full text-left p-2 hover:bg-[#a3e635]/10 flex flex-col gap-0.5 border-t border-[#a3e635]/10 ${model === "gemini-1.5-pro" ? 'bg-[#a3e635]/10 border-l-2 border-l-purple-500' : ''}`}
             >
                <div className="flex items-center gap-2 text-purple-400">
                  <Sparkles size={10} />
                  <span className="font-bold">Gemini 1.5 Pro</span>
                </div>
                <span className="text-[8px] text-gray-500 opacity-70">ADVANCED REASONING, DEEP INTEL</span>
             </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#a3e635]/30 custom-chat-scroll relative">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-2.5 rounded border relative ${
              m.role === 'user' 
                ? 'bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/40 rounded-tr-none' 
                : m.role === 'system'
                  ? 'border-none italic text-gray-500 opacity-70 text-[10px]'
                  : 'bg-white/5 text-gray-200 border-white/10 rounded-tl-none selection:bg-[#a3e635] selection:text-black shadow-[0_5px_15px_rgba(0,0,0,0.3)]'
            }`}>
              {m.role === 'user' && (
                <div className="absolute -top-3 right-0 text-[8px] text-[#a3e635]/50 flex items-center gap-1">
                  <Zap size={8} className="opacity-50" /> 
                  LOCAL_COMMAND
                </div>
              )}
              {m.role === 'bot' && (
                <div className="absolute -top-3 left-0 text-[8px] text-gray-500 flex items-center gap-1 font-bold">
                  <Bot size={8} /> 
                  INTEL_FETCHED // RESPONSE_SECURE
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed tracking-tight">
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="p-2.5 bg-black/40 border border-[#a3e635]/20 text-[#a3e635] flex items-center gap-2 italic">
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-[#a3e635] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1 h-1 bg-[#a3e635] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1 h-1 bg-[#a3e635] rounded-full animate-bounce"></span>
              </div>
              ANALYZING_INTEL_STREAMS...
            </div>
          </div>
        )}
      </div>

      {/* Input & Suggestions */}
      <div className="p-3 border-t border-[#a3e635]/20 bg-black/40">
        {!isTyping && messages.length < 5 && (
          <div className="flex flex-wrap gap-2 mb-3">
             {suggestions.map((s) => (
               <button
                 key={s.label}
                 onClick={() => { setInput(s.prompt); handleSend({ preventDefault: () => {} } as any); }}
                 className="px-2 py-1 bg-[#a3e635]/5 border border-[#a3e635]/20 rounded-sm text-[8px] text-[#a3e635] hover:bg-[#a3e635]/20 hover:border-[#a3e635]/40 transition-all uppercase tracking-wider"
               >
                 {s.label}
               </button>
             ))}
          </div>
        )}

        <form onSubmit={handleSend} className="group focus-within:bg-black/60 transition-colors">
          <div className="flex items-center gap-2 bg-[#0a0a0a] border border-[#a3e635]/30 rounded overflow-hidden p-1 focus-within:border-[#a3e635] group-hover:border-[#a3e635]/50 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              placeholder={isTyping ? "SIGNAL_PROCESSING..." : "EXECUTE_INTEL_QUERY..."}
              className="flex-1 bg-transparent border-none p-2 text-[#a3e635] outline-none placeholder:text-[#a3e635]/30 disabled:opacity-50"
              aria-label="AI message input"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="p-2 text-[#a3e635] hover:bg-[#a3e635]/10 disabled:opacity-30 disabled:hover:bg-transparent rounded transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .custom-chat-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-chat-scroll::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(163,230,53,0.2);
          border-radius: 10px;
        }
        .custom-chat-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(163,230,53,0.4);
        }
      `}</style>
    </div>
  );
}
