"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Sparkles, X } from "lucide-react";
import { cn } from "../../lib/cn";

type AIChatTriggerProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function AIChatTrigger({ isOpen, onClick }: AIChatTriggerProps) {
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // Show greeting after 3 seconds on first load
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowGreeting(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (isOpen) return null;

  return (
    <div className="fixed bottom-12 right-6 z-[2500] flex flex-col items-end gap-3 group">
      {/* Greeting Bubble */}
      {showGreeting && (
        <div className="relative animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="bg-[#1a1a1a] border border-[#a3e635]/30 p-3 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-w-[200px] text-[11px] text-gray-200 leading-relaxed relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-[#222] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={10} />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={12} className="text-[#a3e635] animate-pulse" />
              <span className="text-[#a3e635] font-bold uppercase tracking-wider text-[9px]">AI Assistant</span>
            </div>
            Ready to decode Sajid&apos;s portfolio data or assist your mission. <span className="text-[#a3e635] font-bold underline cursor-pointer" onClick={onClick}>Ask anything!</span>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#1a1a1a] border-r border-b border-[#a3e635]/30 rotate-45"></div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500",
          "bg-gradient-to-br from-[#a3e635] to-[#65a30d] shadow-[0_0_20px_rgba(163,230,53,0.4)]",
          "hover:scale-110 active:scale-95 group",
          "before:absolute before:inset-0 before:rounded-full before:bg-[#a3e635] before:animate-ping before:opacity-20 before:duration-[2000ms]"
        )}
      >
        <div className="absolute inset-0.5 rounded-full bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <MessageSquare size={24} className="text-black group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
        
        {/* Orbits / HUD Decorative */}
        <div className="absolute inset-0 rounded-full border border-black/5 animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute -inset-1 rounded-full border border-[#a3e635]/20 scale-105 group-hover:scale-115 transition-transform duration-700"></div>
      </button>
    </div>
  );
}
