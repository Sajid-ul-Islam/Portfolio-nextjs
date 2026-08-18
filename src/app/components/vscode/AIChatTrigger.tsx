"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { useAccent } from "../../lib/accentContext";
import { useIconTheme } from "../../lib/iconContext";
import { cn } from "../../lib/cn";

type AIChatTriggerProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function AIChatTrigger({ isOpen, onClick }: AIChatTriggerProps) {
  const [showGreeting, setShowGreeting] = useState(false);
  const { accent } = useAccent();
  const { iconTheme } = useIconTheme();

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

  const accentColor = accent?.value || "var(--vscode-accent)";
  const accentShadow = accent?.shadow || "rgba(163,230,53,0.4)";

  return (
    <div className="fixed bottom-20 md:bottom-12 right-6 z-[2500] flex flex-col items-end gap-3 group">
      {/* Greeting Bubble */}
      {showGreeting && (
        <div className="relative animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-accent)]/30 p-3 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-w-[200px] text-[11px] text-[var(--vscode-text-primary)] leading-relaxed relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-full flex items-center justify-center text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] transition-colors"
            >
              <X size={10} />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={12} className="text-[var(--vscode-accent)] animate-pulse" />
              <span className="text-[var(--vscode-accent)] font-bold uppercase tracking-wider text-[9px]">Assistant</span>
            </div>
            Hi! Ask me anything about Sajid&apos;s skills, experience, or projects. <span className="text-[var(--vscode-accent)] font-bold underline cursor-pointer" onClick={onClick}>Chat now!</span>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[var(--vscode-sideBar-background)] border-r border-b border-[var(--vscode-accent)]/30 rotate-45"></div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500",
          "hover:scale-110 active:scale-95 group",
          "before:absolute before:inset-0 before:rounded-full before:bg-[var(--vscode-accent)] before:animate-ping before:opacity-20 before:[animation-duration:2000ms]"
        )}
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 0 25px ${accentShadow}`,
        }}
      >
        <div className="absolute inset-0.5 rounded-full bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {React.createElement(iconTheme.icons.chat, { size: 24, className: "text-white group-hover:rotate-12 transition-transform drop-shadow-md", strokeWidth: 2.5 })}
        
        {/* Orbits / HUD Decorative */}
        <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute -inset-1 rounded-full border border-[var(--vscode-accent)]/30 scale-105 group-hover:scale-115 transition-transform duration-700"></div>
      </button>
    </div>
  );
}
