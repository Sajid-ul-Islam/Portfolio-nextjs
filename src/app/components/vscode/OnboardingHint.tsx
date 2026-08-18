"use client";

import { useEffect, useState } from "react";
import { X, Terminal as TerminalIcon, Bot, Command } from "lucide-react";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "vscode-onboarded";

/**
 * One-time onboarding hint that points first-time visitors to the
 * Terminal, AI Chat, and Command Palette. Dismissible + respects reduced motion.
 */
export default function OnboardingHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      /* localStorage unavailable — don't show */
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!visible) return null;

  const tips = [
    { icon: TerminalIcon, label: "Toggle Terminal", keys: "Ctrl+`" },
    { icon: Bot, label: "Ask the AI Assistant", keys: "Click ●" },
    { icon: Command, label: "Open Command Palette", keys: "Ctrl+K" },
  ];

  return (
    <div className="fixed bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-[2400] w-[min(92vw,420px)] animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="relative bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-accent)]/30 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.55)] p-4">
        <button
          onClick={dismiss}
          aria-label="Dismiss hint"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] flex items-center justify-center text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] transition-colors"
        >
          <X size={12} />
        </button>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--vscode-accent)] font-mono">
            Quick Start
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {tips.map((tip) => (
            <div
              key={tip.label}
              className="flex items-center gap-2.5 text-vscode-xs text-[var(--vscode-text-primary)]"
            >
              <tip.icon size={14} className="text-[var(--vscode-accent)] flex-shrink-0" />
              <span className="flex-1">{tip.label}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-black/30 border border-white/10 text-[8px] font-mono leading-none text-[var(--vscode-text-secondary)]">
                {tip.keys}
              </kbd>
            </div>
          ))}
        </div>
        <button
          onClick={dismiss}
          className={cn(
            "mt-3 w-full py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest",
            "bg-[var(--vscode-accent)]/15 text-[var(--vscode-accent)] hover:bg-[var(--vscode-accent)]/25 transition-colors"
          )}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
