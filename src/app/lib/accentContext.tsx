"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type AccentColor = {
  name: string;
  value: string;
  shadow: string;
};

export const ACCENT_PRESETS: AccentColor[] = [
  { name: "Blue", value: "#007acc", shadow: "rgba(0,122,204,0.4)" },
  { name: "Green", value: "#10b981", shadow: "rgba(16,185,129,0.4)" },
  { name: "Purple", value: "#a855f7", shadow: "rgba(168,85,247,0.4)" },
  { name: "Pink", value: "#ec4899", shadow: "rgba(236,72,153,0.4)" },
  { name: "Orange", value: "#f97316", shadow: "rgba(249,115,22,0.4)" },
  { name: "Red", value: "#ef4444", shadow: "rgba(239,68,68,0.4)" },
  { name: "Yellow", value: "#eab308", shadow: "rgba(234,179,8,0.4)" },
  { name: "Cyan", value: "#06b6d4", shadow: "rgba(6,182,212,0.4)" },
  { name: "Lime", value: "#84cc16", shadow: "rgba(132,204,22,0.4)" },
  { name: "Teal", value: "#14b8a6", shadow: "rgba(20,184,166,0.4)" },
];

type AccentContextType = {
  accent: AccentColor;
  setAccent: (color: AccentColor) => void;
  setCustomAccent: (hex: string) => void;
};

const AccentContext = createContext<AccentContextType | null>(null);

function hexToShadow(hex: string, alpha = 0.4): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentColor>(ACCENT_PRESETS[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const applyFontFromStorage = () => {
      try {
        const settingsStr = localStorage.getItem("vscode-settings");
        if (settingsStr) {
          const settings = JSON.parse(settingsStr);
          if (settings["editor.fontSize"]) {
            const size = settings["editor.fontSize"];
            document.documentElement.style.setProperty("--editor-font-size", `${size}px`);
            document.documentElement.style.setProperty("--vscode-font-size", `${size}px`);
            document.documentElement.style.fontSize = `${size}px`;
          }
        }
      } catch {}
    };

    try {
      const stored = localStorage.getItem("vscode-accent");
      if (stored) {
        const parsed = JSON.parse(stored);
        setAccentState(parsed);
        applyAccent(parsed.value, parsed.shadow);
      }
      applyFontFromStorage();
    } catch {}

    window.addEventListener("vscode-settings-changed", applyFontFromStorage);
    return () => window.removeEventListener("vscode-settings-changed", applyFontFromStorage);
  }, []);

  const applyAccent = (value: string, shadow: string) => {
    const root = document.documentElement;
    root.style.setProperty("--vscode-accent", value);
    root.style.setProperty("--vscode-accent-shadow", shadow);
    root.style.setProperty("--vscode-focusBorder", value);
    root.style.setProperty("--vscode-button-background", value);
    root.style.setProperty("--vscode-tab-activeBorderTop", value);
    root.style.setProperty("--vscode-list-focusOutline", value);
    root.style.setProperty("--vscode-activityBar-activeBorder", value);
    root.style.setProperty("--vscode-statusBar-background", value);
    root.style.setProperty("--vscode-text-link", value);
  };

  const setAccent = useCallback((color: AccentColor) => {
    setAccentState(color);
    applyAccent(color.value, color.shadow);
    localStorage.setItem("vscode-accent", JSON.stringify(color));
  }, []);

  const setCustomAccent = useCallback((hex: string) => {
    const shadow = hexToShadow(hex);
    const custom: AccentColor = { name: "Custom", value: hex, shadow };
    setAccentState(custom);
    applyAccent(hex, shadow);
    localStorage.setItem("vscode-accent", JSON.stringify(custom));
  }, []);

  return (
    <AccentContext.Provider value={{ accent, setAccent, setCustomAccent }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used within AccentProvider");
  return ctx;
}
