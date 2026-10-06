"use client";

import { useState, useEffect } from "react";
import { Cpu, Terminal, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { soundFx } from "@/app/lib/soundFx";

const BOOT_LOGS = [
  "QUANTUM_CORE_INITIALIZED // REGION: GLOBAL_01",
  "CYBRCRAFT_KERNEL_v2099.4 // MOUNTED",
  "SYNAPSE_VECTOR_INDEX // 24_COLLECTIONS_ONLINE",
  "NEURAL_AGENTIC_PIPELINES // ARMED",
  "HOLOGRAPHIC_HUD_LAYER // READY",
];

export default function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Only show on first visit per session
    if (typeof window !== "undefined" && sessionStorage.getItem("intro-shown")) {
      return;
    }

    setVisible(true);

    // Audio chime on boot sequence
    const chimeTimer = setTimeout(() => {
      soundFx.playBootSequence();
    }, 200);

    // Rapid stream of logs
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 180);

    // Start fade-out after ~1400ms
    const fadeTimer = setTimeout(() => setFadeOut(true), 1400);

    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("intro-shown", "1");
    }, 1850);

    const handleSkip = () => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("intro-shown", "1");
      }, 300);
    };

    window.addEventListener("keydown", handleSkip);

    return () => {
      clearTimeout(chimeTimer);
      clearInterval(logInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      window.removeEventListener("keydown", handleSkip);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center font-mono select-none transition-opacity duration-500",
        "bg-[#05080f]/95 backdrop-blur-2xl future-scanlines",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      onClick={() => setFadeOut(true)}
    >
      {/* Ambient Cyber Grid */}
      <div className="future-cyber-grid" />

      {/* Cyber Reticle & Boot UI */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md w-full px-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Holographic Radar / Reticle */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 rounded-full border border-[var(--vscode-accent)]/30 animate-spin [animation-duration:8s]" />
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-[var(--vscode-accent)]/40 animate-spin [animation-duration:12s] [animation-direction:reverse]" />
          <div className="absolute inset-0 -m-2 rounded-full border border-[var(--vscode-accent)]/20 animate-ping [animation-duration:2s]" />

          <div className="w-14 h-14 rounded-full bg-[var(--vscode-accent)]/10 border border-[var(--vscode-accent)]/60 flex items-center justify-center shadow-[0_0_25px_var(--vscode-accent)]">
            <Cpu size={26} className="text-[var(--vscode-accent)]" />
          </div>
        </div>

        {/* Title and Telemetry */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[var(--vscode-accent)] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            CYBRCRAFT // NEURAL_OS 2099
          </div>
          <div className="text-[11px] text-white/90 font-mono tracking-wider">
            BOOT SEQUENCE // ACTIVE
          </div>
        </div>

        {/* Terminal Telemetry Log Box */}
        <div className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-left shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 text-[9px] text-white/50">
            <span className="flex items-center gap-1.5">
              <Terminal size={10} className="text-[var(--vscode-accent)]" />
              DIAGNOSTIC_LOG
            </span>
            <span className="text-emerald-400 font-bold">100% OK</span>
          </div>

          <div className="space-y-1 min-h-[48px]">
            {BOOT_LOGS.slice(0, logIndex + 1).map((log, i) => (
              <div key={i} className="text-[10px] text-emerald-400/90 font-mono truncate flex items-center gap-1.5">
                <span className="text-white/40">›</span>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar & Skip Prompt */}
        <div className="w-full space-y-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--vscode-accent)] rounded-full transition-all duration-300 shadow-[0_0_8px_var(--vscode-accent)]"
              style={{ width: `${((logIndex + 1) / BOOT_LOGS.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[9px] text-white/40 font-mono">
            <span>MEM: 128TB QUANTUM</span>
            <span>PRESS ANY KEY TO SKIP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
