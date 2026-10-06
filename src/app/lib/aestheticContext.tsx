"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type AestheticMode = "glassmorphism" | "claymorphism" | "tactical-cyber" | "quantum-future" | "classic-ide";

export type AestheticPreset = {
  id: AestheticMode;
  name: string;
  badge: string;
  desc: string;
  previewClass: string;
  icon: string;
};

export const AESTHETIC_PRESETS: AestheticPreset[] = [
  {
    id: "glassmorphism",
    name: "Luminous Glassmorphism",
    badge: "Modern & Sleek",
    desc: "Frosted glass surfaces, specular highlights, dynamic backdrops & ambient glows",
    previewClass: "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl",
    icon: "✨",
  },
  {
    id: "quantum-future",
    name: "Quantum Cyber 2099",
    badge: "Holographic HUD",
    desc: "Futuristic neon telemetry, holographic scanlines, cyber grid depth & illuminated HUD corner targets",
    previewClass: "bg-[#050811] border border-cyan-500/50 rounded-xl font-mono shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    icon: "🛸",
  },
  {
    id: "tactical-cyber",
    name: "Tactical Cyber / HUD",
    badge: "Precision Tech",
    desc: "Sharp technical borders, monospace telemetry, matrix grid lines & technical accents",
    previewClass: "bg-[#0c120e] border border-emerald-500/40 rounded-md font-mono",
    icon: "⚡",
  },
  {
    id: "claymorphism",
    name: "Tactile Claymorphism",
    badge: "Soft 3D Depth",
    desc: "Inflated pillowy cards, double inner & drop shadows with satisfying physical press states",
    previewClass: "bg-[#1f242d] rounded-2xl shadow-[6px_6px_14px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.1),inset_-2px_-2px_4px_rgba(0,0,0,0.5)]",
    icon: "🫧",
  },
  {
    id: "classic-ide",
    name: "Classic VS Code IDE",
    badge: "Authentic Editor",
    desc: "Standard flat surface hierarchy, native Microsoft editor borders & true IDE fidelity",
    previewClass: "bg-[#1e1e1e] border border-[#3c3c3c] rounded-sm",
    icon: "💻",
  },
];

type AestheticContextType = {
  aesthetic: AestheticMode;
  setAesthetic: (mode: AestheticMode) => void;
  preset: AestheticPreset;
};

const AestheticContext = createContext<AestheticContextType | undefined>(undefined);

export function AestheticProvider({ children }: { children: React.ReactNode }) {
  const [aesthetic, setAestheticState] = useState<AestheticMode>("glassmorphism");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("vscode-aesthetic") as AestheticMode | null;
      if (saved && ["glassmorphism", "claymorphism", "tactical-cyber", "classic-ide"].includes(saved)) {
        setAestheticState(saved);
        document.documentElement.setAttribute("data-aesthetic", saved);
      } else {
        document.documentElement.setAttribute("data-aesthetic", "glassmorphism");
      }
    } catch (e) {}
  }, []);

  const setAesthetic = (mode: AestheticMode) => {
    setAestheticState(mode);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-aesthetic", mode);
    }
    try {
      localStorage.setItem("vscode-aesthetic", mode);
      window.dispatchEvent(new Event("vscode-aesthetic-changed"));
    } catch (e) {}
  };

  const preset = AESTHETIC_PRESETS.find((p) => p.id === aesthetic) || AESTHETIC_PRESETS[0];

  return (
    <AestheticContext.Provider value={{ aesthetic, setAesthetic, preset }}>
      {children}
    </AestheticContext.Provider>
  );
}

export function useAesthetic() {
  const context = useContext(AestheticContext);
  if (!context) {
    throw new Error("useAesthetic must be used within an AestheticProvider");
  }
  return context;
}
