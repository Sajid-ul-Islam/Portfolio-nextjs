"use client";

import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";

export default function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show on first visit per session
    if (typeof window !== "undefined" && sessionStorage.getItem("intro-shown")) {
      return;
    }

    setVisible(true);

    // Start fade-out after 800ms
    const fadeTimer = setTimeout(() => setFadeOut(true), 800);
    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("intro-shown", "1");
    }, 1300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center font-mono transition-opacity duration-500",
        "bg-[var(--vscode-editor-background)]",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="relative">
          <ShieldCheck
            size={48}
            className="text-[var(--vscode-accent)] drop-shadow-[0_0_12px_var(--vscode-accent)]"
          />
          <div className="absolute inset-0 -m-3 border border-[var(--vscode-accent)]/20 rounded-full animate-ping [animation-duration:1.5s]" />
        </div>
        <div className="text-center space-y-1">
          <div className="text-sm font-bold text-[var(--vscode-accent)] tracking-wider">
            SYSTEM READY
          </div>
          <div className="text-[10px] text-[var(--vscode-text-secondary)] tracking-[0.2em] uppercase">
            Loading workspace...
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-32 h-0.5 bg-[var(--vscode-border)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--vscode-accent)] rounded-full animate-progress-fill" />
        </div>
      </div>
    </div>
  );
}
