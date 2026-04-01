"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Settings2, Sparkles, Zap, ChevronDown, Trash2, Minus } from "lucide-react";
import { getLocalIntel } from "../../lib/intelEngine";

type ChatMessage = {
  role: "system" | "bot" | "user";
  content: string;
};

type ModelOption = "gemini-1.5-flash" | "gemini-1.5-pro" | "claude-3-5-sonnet";

type ToolingMode = "portfolio" | "website" | "combined";

const INITIAL_MESSAGES: ChatMessage[] = [
  { role: "system", content: "[EXTERNAL_LINK_SECURED] PROTOCOL: G-MODEL-1.5" },
  { role: "bot", content: "AI_INTEL_ENGINE ONLINE. I HAVE FULL ACCESS TO SAJID'S PORTFOLIO DATA. HOW CAN I ASSIST YOUR OPERATIONAL QUERY TODAY?" },
];

export default function AIChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [model, setModel] = useState<ModelOption>("gemini-1.5-flash");
  const [toolingMode, setToolingMode] = useState<ToolingMode>("portfolio");
  const [showModelSelect, setShowModelSelect] = useState(false);
  const [siteSnapshot, setSiteSnapshot] = useState<string>("");
  const [isFetchingSite, setIsFetchingSite] = useState(false);
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
      let siteContext = siteSnapshot;
      if ((toolingMode === "website" || toolingMode === "combined") && !siteContext) {
        const siteResp = await fetch("/api/site");
        const siteData = await siteResp.json();
        siteContext = siteData.content || "";
        setSiteSnapshot(siteContext);
      }
      const promptContext = (toolingMode === "website" || toolingMode === "combined") && siteContext
        ? `SITE_CONTENT:\n${siteContext}\n\n`
        : "";
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          model,
          siteContext: promptContext,
          sourceMode: toolingMode,
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
    <div className="w-[350px] md:w-[400px] h-[600px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col font-mono text-[11px] rounded-2xl overflow-hidden group/chat relative">
      {/* Decorative HUD Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a3e635] to-transparent opacity-50"></div>
      <div className="absolute top-0 right-0 p-1 opacity-20 group-hover/chat:opacity-50 transition-opacity">
        <Sparkles size={40} className="text-[#a3e635]" />
      </div>

      {/* Header */}
      <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[#a3e635]/20 animate-ping rounded-full duration-[3000ms]"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a3e635] to-[#65a30d] flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.3)]">
              <Bot size={18} className="text-black" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#a3e635] rounded-full border-2 border-[#111] shadow-[0_0_10px_#a3e635]"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[#a3e635] tracking-[0.2em] font-bold text-[10px] uppercase">NEURAL_UPLINK_v1.5</span>
            <div className="flex items-center gap-2">
               <span className="w-1 h-1 bg-[#a3e635] rounded-full animate-pulse"></span>
               <span className="text-[9px] text-white/40 font-mono tracking-tighter uppercase">SIGNAL_STRENGTH_MAX</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleClear}
            className="text-white/40 hover:text-[#a3e635] transition-colors p-1"
            title="Clear Chat"
          >
            <Trash2 size={14} />
          </button>
          <button 
            onClick={onClose} 
            className="text-white/40 hover:text-[#a3e635] transition-colors p-1"
            title="Minimize"
          >
            <Minus size={18} />
          </button>
          <button 
            onClick={onClose} 
            className="text-white/40 hover:text-white transition-colors hover:rotate-90 duration-200 p-1"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      {/* Model + Source Controls */}
      <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-white/[0.02] text-[9px] text-white/30 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Settings2 size={10} className="opacity-50" />
            <span className="uppercase tracking-[1px] opacity-40">INTEL_CORE:</span>
          </div>
          <button 
            onClick={() => setShowModelSelect(!showModelSelect)}
            className="flex items-center gap-1 text-[#a3e635] hover:bg-[#a3e635]/10 px-1.5 py-0.5 rounded border border-[#a3e635]/20 bg-[#a3e635]/5"
          >
            {model === "gemini-1.5-flash" ? (
              <>
                <Zap size={10} className="text-yellow-400" />
                <span>FLASH_1.5</span>
              </>
            ) : model === "gemini-1.5-pro" ? (
              <>
                <Sparkles size={10} className="text-purple-400" />
                <span>PRO_1.5</span>
              </>
            ) : (
              <>
                <Settings2 size={10} className="text-cyan-400" />
                <span>CLAUDE_3.5</span>
              </>
            )}
            <ChevronDown size={8} className={`transition-transform ${showModelSelect ? 'rotate-180' : ''}`} />
          </button>
          <div className="flex items-center gap-1">
            <span className="text-[9px] opacity-50">SOURCE:</span>
            <button
              onClick={() => setToolingMode("portfolio")}
              className={`px-2 py-0.5 rounded ${toolingMode === "portfolio" ? "bg-[#a3e635]/40 text-white" : "bg-white/5 text-white/50"}`}
            >PORTFOLIO</button>
            <button
              onClick={() => setToolingMode("website")}
              className={`px-2 py-0.5 rounded ${toolingMode === "website" ? "bg-[#a3e635]/40 text-white" : "bg-white/5 text-white/50"}`}
            >WEBSITE</button>
            <button
              onClick={() => setToolingMode("combined")}
              className={`px-2 py-0.5 rounded ${toolingMode === "combined" ? "bg-[#a3e635]/40 text-white" : "bg-white/5 text-white/50"}`}
            >COMBINED</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-2 text-[#a3e635]/60 hover:text-[#a3e635] cursor-help">
            <Zap size={10} className="animate-pulse" />
            <span className="uppercase tracking-widest font-bold">READY</span>
          </div>
        </div>

        {/* Model Dropdown */}
        {showModelSelect && (
          <div className="absolute top-[35px] left-4 bg-[#111] border border-white/10 rounded shadow-2xl z-20 w-56 overflow-hidden animate-in zoom-in-95 duration-100 backdrop-blur-md">
             <button 
              onClick={() => { setModel("gemini-1.5-flash"); setShowModelSelect(false); }}
              className={`w-full text-left p-3 hover:bg-white/5 flex flex-col gap-0.5 ${model === "gemini-1.5-flash" ? 'bg-white/5' : ''}`}
             >
                <div className="flex items-center gap-2 text-[#a3e635]">
                  <Zap size={10} />
                  <span className="font-bold">Gemini 1.5 Flash</span>
                </div>
                <span className="text-[8px] text-white/30">FAST, LIGHTWEIGHT, BALANCED</span>
             </button>
             <button 
              onClick={() => { setModel("gemini-1.5-pro"); setShowModelSelect(false); }}
              className={`w-full text-left p-3 hover:bg-white/5 flex flex-col gap-0.5 border-t border-white/5 ${model === "gemini-1.5-pro" ? 'bg-white/5' : ''}`}
             >
                <div className="flex items-center gap-2 text-purple-400">
                  <Sparkles size={10} />
                  <span className="font-bold">Gemini 1.5 Pro</span>
                </div>
                <span className="text-[8px] text-white/30">ADVANCED REASONING, DEEP INTEL</span>
             </button>
             <button 
              onClick={() => { setModel("claude-3-5-sonnet"); setShowModelSelect(false); }}
              className={`w-full text-left p-3 hover:bg-white/5 flex flex-col gap-0.5 border-t border-white/5 ${model === "claude-3-5-sonnet" ? 'bg-white/5' : ''}`}
             >
                <div className="flex items-center gap-2 text-cyan-400">
                  <Settings2 size={10} />
                  <span className="font-bold">Claude 3.5 Sonnet</span>
                </div>
                <span className="text-[8px] text-white/30">DOMAIN KNOWLEDGE + NATURAL COMPREHENSION</span>
             </button>
          </div>
        )}
      </div>

      <div className="px-4 py-1 border-b border-white/10 text-[8px] text-white/40 flex items-center justify-between gap-2">
        <span>
          {toolingMode === "website"
            ? siteSnapshot
              ? "Website snapshot loaded"
              : "Website snapshot not loaded"
            : toolingMode === "combined"
              ? siteSnapshot
                ? "Combined context active (website + portfolio)"
                : "Combined context active (portfolio only, website is pending)"
              : "Portfolio context active"}
        </span>
        {(toolingMode === "website" || toolingMode === "combined") && (
          <button
            disabled={isFetchingSite}
            onClick={async () => {
              setIsFetchingSite(true);
              try {
                const result = await fetch("/api/site");
                const data = await result.json();
                if (data.content) setSiteSnapshot(data.content);
                else setSiteSnapshot("");
              } catch {
                setSiteSnapshot("");
              } finally {
                setIsFetchingSite(false);
              }
            }}
            className="px-2 py-0.5 rounded border border-white/10 bg-white/10 hover:bg-white/20 disabled:opacity-40"
          >
            {isFetchingSite ? "Refreshing..." : "Refresh Site Snapshot"}
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 custom-chat-scroll relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] p-3 rounded-xl border relative transition-all duration-300 shadow-2xl ${
              m.role === 'user' 
                ? 'bg-gradient-to-br from-[#a3e635] to-[#65a30d] text-black border-[#a3e635]/30 rounded-tr-none' 
                : m.role === 'system'
                  ? 'border-none italic text-white/20 text-[9px] uppercase tracking-widest text-center w-full bg-white/5 py-1 rounded'
                  : 'bg-white/10 backdrop-blur-md text-white border-white/10 rounded-tl-none overflow-hidden'
            }`}>
              {m.role === 'bot' && (
                 <div className="absolute top-0 right-0 p-1 opacity-5">
                    <Sparkles size={30} />
                 </div>
              )}
              {m.role === 'user' && (
                <div className="absolute -top-3.5 right-0 text-[8px] text-[#a3e635]/50 flex items-center gap-1 font-bold uppercase tracking-tighter">
                  <Zap size={8} className="opacity-50" /> 
                  USER_QUERY_STREAM
                </div>
              )}
              {m.role === 'bot' && (
                <div className="absolute -top-3.5 left-0 text-[8px] text-white/30 flex items-center gap-1 font-bold uppercase tracking-tighter">
                  <Bot size={8} /> 
                  INTEL_FETCHED // SOURCE: PORTFOLIO_DB
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed tracking-tight relative z-10">
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="p-3 bg-white/5 border border-white/10 text-[#a3e635] flex items-center gap-3 italic rounded-xl rounded-tl-none">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-bounce"></span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest">ANALYZING_INTEL_STREAMS...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input & Suggestions */}
      <div className="p-4 border-t border-white/10 bg-[#0a0a0a] relative z-10">
        {!isTyping && messages.length < 5 && (
          <div className="flex flex-wrap gap-2 mb-4">
             {suggestions.map((s) => (
               <button
                 key={s.label}
                 onClick={() => { setInput(s.prompt); handleSend({ preventDefault: () => {} } as any); }}
                 className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-[#a3e635] hover:bg-[#a3e635]/10 hover:border-[#a3e635]/30 transition-all uppercase tracking-wider font-bold"
               >
                 {s.label}
               </button>
             ))}
          </div>
        )}

        <form onSubmit={handleSend} className="relative group">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl overflow-hidden p-1.5 focus-within:border-[#a3e635]/50 group-hover:border-[#a3e635]/30 transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              placeholder={isTyping ? "SIGNAL_PROCESSING..." : "EXECUTE_INTEL_QUERY..."}
              className="flex-1 bg-transparent border-none p-2 text-white outline-none placeholder:text-white/20 disabled:opacity-50 text-[12px]"
              aria-label="AI message input"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 flex items-center justify-center bg-[#a3e635] hover:bg-[#bef264] text-black disabled:bg-white/10 disabled:text-white/20 rounded-lg transition-all shadow-lg active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .custom-chat-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .custom-chat-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(163,230,53,0.3);
        }
      `}</style>
    </div>
  );
}
