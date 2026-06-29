"use client";

import { useState, useEffect } from "react";
import { X, Monitor } from "lucide-react";
import { cn } from "@/lib/cn";

export default function OnboardingTooltip() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("onboarding-dismissed")) return;

    // Show after a brief delay so user sees the UI first
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("onboarding-dismissed", "1");
  };

  if (!visible) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[3000] animate-in slide-in-from-top-4 fade-in duration-500 max-w-md w-[90%]">
      <div
        className={cn(
          "flex items-start gap-3 p-3 rounded-lg shadow-2xl",
          "bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-accent)]/30",
          "backdrop-blur-xl"
        )}
      >
        <div className="p-1.5 bg-[var(--vscode-accent)]/10 rounded-md flex-shrink-0">
          <Monitor size={16} className="text-[var(--vscode-accent)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-[var(--vscode-text-primary)] leading-relaxed">
            This portfolio is designed as a{" "}
            <span className="text-[var(--vscode-accent)] font-bold">VS Code workspace</span>
            {" "}— navigate using the sidebar, tabs, and terminal!
          </p>
        </div>
        <button
          onClick={dismiss}
          className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
          aria-label="Dismiss onboarding tip"
        >
          <X size={14} className="text-[var(--vscode-text-secondary)]" />
        </button>
      </div>
    </div>
  );
}
