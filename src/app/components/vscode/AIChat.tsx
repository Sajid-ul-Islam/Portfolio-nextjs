"use client";

import { useState, useRef, useEffect } from "react";
import React from "react";
import {
  LuBot,
  LuSparkles,
  LuZap,
  LuTerminal,
  LuCpu,
  LuChevronDown,
  LuChevronUp,
  LuTrash2,
  LuMinus,
  LuX,
  LuSend,
  LuCopy,
  LuCheck,
  LuActivity,
  LuShieldCheck,
} from "react-icons/lu";
import { getLocalIntel } from "../../lib/intelEngine";
import { useIconTheme } from "../../lib/iconContext";
import { cn } from "@/lib/cn";

type ChatMessage = {
  id: string;
  role: "system" | "bot" | "user";
  content: string;
  thoughts?: string[];
  timestamp?: string;
};

type ModelOption = "gemini-3.6-flash" | "gemini-1.5-pro" | "claude-3-5-sonnet";
type ToolingMode = "portfolio" | "website" | "combined";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "sys-1",
    role: "system",
    content: "ANTIGRAVITY_AGENT_V3.6_ONLINE // RAG_VECTOR_DB_CONNECTED",
  },
  {
    id: "bot-1",
    role: "bot",
    content:
      "Greetings! I am the Antigravity Agent pair-programmer. I am trained on Sajid's skills, operational analytics projects, and live codebase repositories. How can I assist you today?",
    thoughts: [
      "Initializing Antigravity Agent core...",
      "Loaded 24 active projects into local vector memory.",
      "Agent status: ONLINE & READY.",
    ],
    timestamp: "NOW",
  },
];

export default function AIChat({ onClose }: { onClose: () => void }) {
  const { iconTheme } = useIconTheme();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [model, setModel] = useState<ModelOption>("gemini-3.6-flash");
  const [toolingMode, setToolingMode] = useState<ToolingMode>("portfolio");
  const [showModelSelect, setShowModelSelect] = useState(false);
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [siteSnapshot, setSiteSnapshot] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Close on Escape for keyboard accessibility (the floating chat has no dialog trap)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggleThoughts = (id: string) => {
    setExpandedThoughts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const thoughts = [
      `Analyzing prompt: "${userText.slice(0, 30)}..."`,
      "Searching vector index & portfolio knowledge base...",
      "Evaluating metrics, GitHub repos, and project history...",
      "Synthesizing response with Antigravity Agent reasoning...",
    ];

    const localMatch = getLocalIntel(userText);
    if (localMatch) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "bot",
            content: localMatch,
            thoughts,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsTyping(false);
      }, 700);
      return;
    }

    try {
      let siteContext = siteSnapshot;
      if ((toolingMode === "website" || toolingMode === "combined") && !siteContext) {
        const siteResp = await fetch("/api/site");
        const siteData = await siteResp.json();
        siteContext = siteData.data || "";
        setSiteSnapshot(siteContext);
      }

      const promptContext =
        (toolingMode === "website" || toolingMode === "combined") && siteContext
          ? `SITE_CONTENT:\n${siteContext}\n\n`
          : "";

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMsg).map((m) => ({ role: m.role, content: m.content })),
          model: model.includes("pro") ? "gemini-1.5-pro" : "gemini-1.5-flash",
          siteContext: promptContext,
          sourceMode: toolingMode,
        }),
      });

      const data = await response.json();
      const botContent = data.content || "I have analyzed your request. Let me know if you need deeper details on Sajid's experience or projects!";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "bot",
          content: botContent,
          thoughts,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-err-${Date.now()}`,
          role: "system",
          content: "[AGENT ERROR]: Network Timeout. Re-establishing connection...",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    { label: "⚡ About Sajid", prompt: "Who is Sajid Islam and what is his background?" },
    { label: "⚡ DESCO Bot", prompt: "Tell me about the DESCO Telegram Assistant project." },
    { label: "⚡ Tech Stack", prompt: "What are Sajid's primary technical skills & tools?" },
    { label: "⚡ Contact", prompt: "How can I contact Sajid Islam?" },
  ];

  return (
    <div className="w-[calc(100vw-2rem)] sm:w-[420px] md:w-[460px] h-[calc(100dvh-6rem)] sm:h-[650px] max-h-[650px] glass-panel border border-[var(--vscode-border)] shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-2xl flex flex-col font-sans text-vscode-xs overflow-hidden relative bg-[var(--vscode-sideBar-background)]/95 backdrop-blur-2xl transition-all duration-300">
      {/* Top Cyber Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--vscode-accent)] via-[#38bdf8] to-[#a855f7] opacity-80" />

      {/* Agent Header */}
      <div className="px-4 py-3.5 bg-[var(--vscode-sideBar-background)] border-b border-[var(--vscode-border)] flex justify-between items-center relative z-10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[var(--vscode-accent)]/20 animate-ping rounded-full [animation-duration:2500ms]" />
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--vscode-accent)]/20 via-[var(--vscode-sideBar-background)] to-[#38bdf8]/20 border border-[var(--vscode-accent)]/40 flex items-center justify-center shadow-lg">
              <LuCpu size={18} className="text-[var(--vscode-accent)] animate-pulse" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[var(--vscode-accent)] rounded-full border-2 border-[var(--vscode-sideBar-background)] shadow-[0_0_8px_var(--vscode-accent)]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[var(--vscode-accent)] tracking-wider font-extrabold text-[11px] font-mono uppercase">
                Antigravity Agent
              </span>
              <span className="px-1.5 py-0.2 text-[8px] font-mono font-bold uppercase rounded bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] border border-[var(--vscode-accent)]/20">
                v3.6
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <LuShieldCheck size={10} className="text-[var(--vscode-accent)]" />
              <span className="text-[9px] text-[var(--vscode-text-secondary)] font-mono tracking-wide">
                RAG INTELLIGENCE ACTIVE
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-accent)] transition-colors p-1.5 rounded-lg hover:bg-[var(--vscode-accent)]/10"
            title="Clear Chat History"
          >
            <LuTrash2 size={14} />
          </button>
          <button
            onClick={onClose}
            className="text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] transition-colors p-1.5 rounded-lg hover:bg-[var(--vscode-accent)]/10"
            title="Minimize"
          >
            <LuMinus size={15} />
          </button>
          <button
            onClick={onClose}
            className="text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] transition-colors hover:rotate-90 duration-300 p-1.5 rounded-lg hover:bg-[var(--vscode-accent)]/10"
            title="Close Chat"
          >
            <LuX size={15} />
          </button>
        </div>
      </div>

      {/* Model & Source Bar */}
      <div className="px-4 py-2 border-b border-[var(--vscode-border)] flex items-center justify-between bg-[var(--vscode-sideBar-background)]/90 text-[9px] font-mono text-[var(--vscode-text-secondary)] relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-[var(--vscode-text-muted)] font-bold uppercase">MODEL:</span>
          <button
            onClick={() => setShowModelSelect(!showModelSelect)}
            className="flex items-center gap-1.5 text-[var(--vscode-accent)] hover:bg-[var(--vscode-accent)]/15 px-2 py-0.5 rounded-lg border border-[var(--vscode-accent)]/20 bg-[var(--vscode-accent)]/5 font-bold transition-all"
          >
            {model === "gemini-3.6-flash" ? (
              <>
                <LuZap size={10} className="text-yellow-400" />
                <span>Gemini 3.6 Flash</span>
              </>
            ) : model === "gemini-1.5-pro" ? (
              <>
                <LuSparkles size={10} className="text-purple-400" />
                <span>Gemini 1.5 Pro</span>
              </>
            ) : (
              <>
                <LuBot size={10} className="text-cyan-400" />
                <span>Claude 3.5 Sonnet</span>
              </>
            )}
            <LuChevronDown size={10} className={cn("transition-transform", showModelSelect && "rotate-180")} />
          </button>
        </div>

        {/* Source Mode Pills */}
        <div className="flex items-center gap-1">
          <span className="text-[var(--vscode-text-muted)] font-bold uppercase mr-1">RAG:</span>
          <button
            onClick={() => setToolingMode("portfolio")}
            className={cn(
              "px-2 py-0.5 rounded-md text-[8px] font-bold border transition-all",
              toolingMode === "portfolio"
                ? "bg-[var(--vscode-accent)]/20 text-[var(--vscode-accent)] border-[var(--vscode-accent)]/40"
                : "bg-[var(--vscode-card-bg)] text-[var(--vscode-text-secondary)] border-transparent hover:text-[var(--vscode-text-primary)]"
            )}
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => setToolingMode("website")}
            className={cn(
              "px-2 py-0.5 rounded-md text-[8px] font-bold border transition-all",
              toolingMode === "website"
                ? "bg-[var(--vscode-accent)]/20 text-[var(--vscode-accent)] border-[var(--vscode-accent)]/40"
                : "bg-[var(--vscode-card-bg)] text-[var(--vscode-text-secondary)] border-transparent hover:text-[var(--vscode-text-primary)]"
            )}
          >
            WEB
          </button>
        </div>

        {/* Model Select Dropdown */}
        {showModelSelect && (
          <div className="absolute top-[36px] left-4 glass-panel border border-[var(--vscode-border)] shadow-2xl z-30 w-60 overflow-hidden rounded-xl bg-[var(--vscode-sideBar-background)]">
            <button
              onClick={() => {
                setModel("gemini-3.6-flash");
                setShowModelSelect(false);
              }}
              className={cn(
                "w-full text-left p-3 hover:bg-[var(--vscode-accent)]/10 flex flex-col gap-0.5 transition-colors",
                model === "gemini-3.6-flash" && "bg-[var(--vscode-accent)]/10"
              )}
            >
              <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
                <LuZap size={11} />
                <span>Gemini 3.6 Flash (High)</span>
              </div>
              <span className="text-[8px] text-[var(--vscode-text-secondary)]">OPTIMIZED AGENTIC REASONING // FAST</span>
            </button>
            <button
              onClick={() => {
                setModel("gemini-1.5-pro");
                setShowModelSelect(false);
              }}
              className={cn(
                "w-full text-left p-3 hover:bg-[var(--vscode-accent)]/10 flex flex-col gap-0.5 border-t border-[var(--vscode-border)] transition-colors",
                model === "gemini-1.5-pro" && "bg-[var(--vscode-accent)]/10"
              )}
            >
              <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                <LuSparkles size={11} />
                <span>Gemini 1.5 Pro</span>
              </div>
              <span className="text-[8px] text-[var(--vscode-text-secondary)]">DEEP REASONING & MULTI-STEP RAG</span>
            </button>
            <button
              onClick={() => {
                setModel("claude-3-5-sonnet");
                setShowModelSelect(false);
              }}
              className={cn(
                "w-full text-left p-3 hover:bg-[var(--vscode-accent)]/10 flex flex-col gap-0.5 border-t border-[var(--vscode-border)] transition-colors",
                model === "claude-3-5-sonnet" && "bg-[var(--vscode-accent)]/10"
              )}
            >
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                {React.createElement(iconTheme.icons.chat, { size: 11, className: "text-cyan-400" })}
                <span>Claude 3.5 Sonnet</span>
              </div>
              <span className="text-[8px] text-[var(--vscode-text-secondary)]">EXPERT CODE & NATURAL DIALOG</span>
            </button>
          </div>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-chat-scroll relative z-10">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            {m.role === "system" ? (
              <div className="w-full text-center py-1.5 px-3 rounded-lg bg-[var(--vscode-card-bg)] border border-[var(--vscode-border)] text-[9px] font-mono text-[var(--vscode-text-secondary)] uppercase tracking-widest flex items-center justify-center gap-2">
                <LuTerminal size={11} className="text-[var(--vscode-accent)]" />
                <span>{m.content}</span>
              </div>
            ) : m.role === "user" ? (
              <div className="max-w-[85%] p-3.5 rounded-2xl rounded-tr-none bg-[var(--vscode-accent)] text-black font-semibold text-vscode-sm shadow-lg shadow-[var(--vscode-accent)]/10 relative">
                <div className="text-[8px] font-mono font-bold uppercase tracking-wider text-black/60 mb-1 flex items-center justify-between">
                  <span>YOU</span>
                  {m.timestamp && <span>{m.timestamp}</span>}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
              </div>
            ) : (
              <div className="max-w-[90%] p-4 rounded-2xl rounded-tl-none bg-[var(--vscode-card-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text-primary)] text-vscode-sm shadow-xl relative group/card">
                {/* Agent Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[var(--vscode-border)] font-mono text-[9px]">
                  <div className="flex items-center gap-2">
                    {React.createElement(iconTheme.icons.chat, { size: 12, className: "text-[var(--vscode-accent)]" })}
                    <span className="font-bold uppercase text-[var(--vscode-accent)] tracking-wider">
                      ANTIGRAVITY AGENT
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.timestamp && <span className="text-[var(--vscode-text-muted)]">{m.timestamp}</span>}
                    <button
                      onClick={() => handleCopy(m.content, m.id)}
                      className="text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text-primary)] transition-colors p-1"
                      title="Copy Response"
                    >
                      {copiedId === m.id ? (
                        <LuCheck size={12} className="text-[var(--vscode-accent)]" />
                      ) : (
                        <LuCopy size={12} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Antigravity Thought Trace Box */}
                {m.thoughts && m.thoughts.length > 0 && (
                  <div className="mb-3 rounded-xl bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] overflow-hidden">
                    <button
                      onClick={() => toggleThoughts(m.id)}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-mono text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] bg-[var(--vscode-card-bg)] transition-colors"
                    >
                      <span className="flex items-center gap-1.5 text-[var(--vscode-accent)] font-bold">
                        <LuActivity size={10} className="animate-pulse" />
                        Thought trace ({m.thoughts.length} steps)
                      </span>
                      {expandedThoughts[m.id] ? <LuChevronUp size={10} /> : <LuChevronDown size={10} />}
                    </button>
                    {expandedThoughts[m.id] && (
                      <div className="p-3 border-t border-[var(--vscode-border)] space-y-1.5 font-mono text-[9px] text-[var(--vscode-text-secondary)] bg-[var(--vscode-editor-background)]">
                        {m.thoughts.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-[var(--vscode-accent)] font-bold">›</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Message Body */}
                <div className="whitespace-pre-wrap leading-relaxed font-sans">{m.content}</div>
              </div>
            )}
          </div>
        ))}

        {/* Antigravity Thinking State */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="p-3.5 rounded-2xl rounded-tl-none bg-[var(--vscode-card-bg)] border border-[var(--vscode-accent)]/30 text-vscode-sm font-mono text-[var(--vscode-text-primary)] space-y-2 max-w-[85%]">
              <div className="flex items-center gap-2 text-[10px] text-[var(--vscode-accent)] font-bold uppercase tracking-wider">
                <LuCpu size={12} className="animate-spin text-[var(--vscode-accent)]" />
                <span>Antigravity Agent Reasoning...</span>
              </div>
              <div className="flex items-center gap-1.5 pl-1">
                <span className="w-1.5 h-1.5 bg-[var(--vscode-accent)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-[var(--vscode-accent)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-[var(--vscode-accent)] rounded-full animate-bounce" />
                <span className="text-[9px] text-[var(--vscode-text-secondary)] italic ml-2">
                  Querying vector embeddings & code syntax...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      {!isTyping && messages.length < 6 && (
        <div className="px-4 py-2 border-t border-[var(--vscode-border)] bg-[var(--vscode-sideBar-background)]/80 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 relative z-10">
          {quickPrompts.map((s) => (
            <button
              key={s.label}
              onClick={() => {
                setInput(s.prompt);
              }}
              className="px-2.5 py-1 rounded-lg bg-[var(--vscode-card-bg)] hover:bg-[var(--vscode-accent)]/15 border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/30 text-vscode-xs font-mono text-[var(--vscode-accent)] font-semibold transition-all flex-shrink-0"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Input Section */}
      <div className="p-4 border-t border-[var(--vscode-border)] bg-[var(--vscode-sideBar-background)] relative z-10">
        <form onSubmit={handleSend} className="relative">
          <div className="flex items-center gap-2 bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] rounded-2xl p-1.5 focus-within:border-[var(--vscode-accent)]/50 transition-all shadow-inner">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              placeholder={isTyping ? "Agent synthesizing answer..." : "Ask Antigravity Agent anything about Sajid..."}
              className="flex-1 bg-transparent border-none px-3 py-2 text-[var(--vscode-text-primary)] outline-none placeholder:text-[var(--vscode-text-muted)] disabled:opacity-50 text-[12px] font-sans"
              aria-label="Agent input query"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 flex items-center justify-center bg-[var(--vscode-accent)] hover:opacity-90 text-black font-bold disabled:opacity-30 rounded-xl transition-all active:scale-95 shadow-md flex-shrink-0"
              title="Send to Agent"
            >
              <LuSend size={15} />
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
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .custom-chat-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--vscode-accent);
        }
      `}</style>
    </div>
  );
}
