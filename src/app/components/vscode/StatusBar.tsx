"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  VscRemote,
  VscSync,
  VscError,
  VscWarning,
  VscCheck,
  VscBell,
  VscFeedback,
} from "react-icons/vsc";
import {
  LuGitBranch,
  LuVolume2,
  LuVolumeX,
  LuDownload,
  LuShield,
  LuZap,
  LuX,
  LuActivity,
} from "react-icons/lu";

import { cn } from "@/lib/cn";
import { personalInfo } from "@/app/data/portfolio";
import { soundFx } from "@/app/lib/soundFx";

type StatusItemProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
};

function StatusItem({
  children,
  className,
  onClick,
  title,
}: StatusItemProps) {
  return (
    <div
      onClick={onClick}
      title={title}
      className={cn(
        "flex items-center gap-1.5 px-2 h-full text-[11px] font-sans",
        "hover:bg-[var(--vscode-statusBarItem-hoverBackground,rgba(255,255,255,0.12))]",
        "cursor-pointer transition-colors whitespace-nowrap",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function StatusBar() {
  const pathname = usePathname();
  const [sfxEnabled, setSfxEnabled] = useState(false);
  const [showDiagModal, setShowDiagModal] = useState(false);
  const [syncSpin, setSyncSpin] = useState(false);

  // Compute active language mode based on current URL
  const getLanguageMode = () => {
    if (pathname.includes("settings")) return "JSON";
    if (pathname.endsWith(".md") || pathname.includes("experience")) return "Markdown";
    if (pathname.includes("skills")) return "TypeScript";
    if (pathname.includes("projects")) return "TypeScript JSX";
    return "TypeScript JSX";
  };

  useEffect(() => {
    setSfxEnabled(soundFx.isEnabled());
    const handleSfxChange = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      setSfxEnabled(custom.detail);
    };
    window.addEventListener("vscode-sfx-toggled", handleSfxChange);
    return () => window.removeEventListener("vscode-sfx-toggled", handleSfxChange);
  }, []);

  const handleToggleSfx = () => {
    const nextState = soundFx.toggle();
    setSfxEnabled(nextState);
  };

  const handleSyncClick = () => {
    soundFx.playCommandPing();
    setSyncSpin(true);
    setTimeout(() => setSyncSpin(false), 800);
  };

  return (
    <>
      <footer className="flex items-center justify-between h-[var(--vscode-statusbar-height,24px)] bg-[var(--vscode-statusBar-background)] text-[var(--vscode-statusBar-foreground)] border-t border-[var(--vscode-statusBar-border)] select-none relative z-50 text-[11px] font-sans">
        {/* Left Section: Real VS Code Remote Badge + Git + Diagnostics */}
        <div className="flex items-center h-full overflow-x-auto no-scrollbar">
          {/* Authentic VS Code Remote Environment Host Pill */}
          <div
            onClick={() => {
              soundFx.playCommandPing();
              setShowDiagModal(true);
            }}
            className="flex items-center justify-center px-2.5 h-full bg-[#16825d] hover:bg-[#1bb380] text-white font-bold cursor-pointer transition-colors mr-1"
            title="WSL: CybrCraft Quantum Node (Connected)"
          >
            <VscRemote size={14} className="mr-1" />
            <span className="text-[10px] tracking-tight">WSL: CybrCraft</span>
          </div>

          {/* Git Branch */}
          <StatusItem
            onClick={() => {
              soundFx.playClick();
              window.dispatchEvent(new CustomEvent("open-command-palette", { detail: "git" }));
            }}
            title="Git Branch: main (Click to checkout branch)"
          >
            <LuGitBranch size={13} />
            <span>main*</span>
          </StatusItem>

          {/* Cloud Sync Status */}
          <StatusItem onClick={handleSyncClick} title="Synchronize Changes: 0 incoming, 1 outgoing">
            <VscSync size={12} className={cn(syncSpin && "animate-spin")} />
            <span className="text-[10px]">0 ↓ 1 ↑</span>
          </StatusItem>

          {/* Error & Warning Counters */}
          <StatusItem
            onClick={() => {
              soundFx.playClick();
              window.dispatchEvent(new CustomEvent("open-command-palette"));
            }}
            className="hidden sm:flex"
            title="0 Errors, 0 Warnings in workspace"
          >
            <div className="flex items-center gap-1">
              <VscError size={12} />
              <span>0</span>
            </div>
            <div className="flex items-center gap-1 ml-1 text-amber-300">
              <VscWarning size={12} />
              <span>0</span>
            </div>
          </StatusItem>

          {/* Futuristic Cyber Telemetry */}
          <StatusItem
            onClick={() => {
              soundFx.playCommandPing();
              setShowDiagModal(true);
            }}
            className="hidden md:flex text-emerald-300"
            title="CybrCraft Neural Engine v2099"
          >
            <LuActivity size={12} className="animate-pulse" />
            <span className="font-mono text-[10px]">NEURAL: 98%</span>
          </StatusItem>
        </div>

        {/* Right Section: Cursor Pos, Spaces, UTF-8, CRLF, Language Mode, Prettier, SFX */}
        <div className="flex items-center h-full flex-shrink-0">
          {/* SFX Audio Engine Toggle */}
          <StatusItem
            onClick={handleToggleSfx}
            className="px-2 font-mono"
            title="Toggle Web Audio Tactile SFX"
          >
            {sfxEnabled ? <LuVolume2 size={13} className="text-emerald-300" /> : <LuVolumeX size={13} className="opacity-60" />}
            <span className="hidden xs:inline text-[10px]">{sfxEnabled ? "SFX: ON" : "SFX: OFF"}</span>
          </StatusItem>

          {/* Dynamic Cursor Position */}
          <StatusItem className="hidden lg:flex" title="Line 1, Column 1">
            <span>Ln 1, Col 1</span>
          </StatusItem>

          {/* Indentation */}
          <StatusItem className="hidden md:flex" title="Indentation: 2 Spaces">
            <span>Spaces: 2</span>
          </StatusItem>

          {/* Encoding */}
          <StatusItem className="hidden sm:flex" title="File Encoding: UTF-8">
            <span>UTF-8</span>
          </StatusItem>

          {/* End of line */}
          <StatusItem className="hidden xl:flex" title="End of Line Sequence: CRLF">
            <span>CRLF</span>
          </StatusItem>

          {/* Dynamic Language Mode */}
          <StatusItem
            onClick={() => {
              soundFx.playClick();
              window.dispatchEvent(new CustomEvent("open-command-palette", { detail: "Language" }));
            }}
            className="font-medium hover:underline"
            title="Select Language Mode"
          >
            <span>{getLanguageMode()}</span>
          </StatusItem>

          {/* Prettier / Formatter Status */}
          <StatusItem className="hidden sm:flex" title="Code Formatted with Prettier">
            <span>Prettier</span>
            <VscCheck size={12} className="text-emerald-300" />
          </StatusItem>

          {/* Resume Dossier Download */}
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="hidden md:block h-full"
            title="Download Sajid Islam Professional Resume Dossier"
          >
            <StatusItem className="bg-white/10 hover:bg-white/20 font-semibold px-2.5">
              <LuDownload size={11} />
              <span>Resume</span>
            </StatusItem>
          </a>

          {/* Feedback Icon */}
          <StatusItem
            onClick={() => {
              soundFx.playClick();
              window.open("https://github.com/Sajid-ul-Islam/Portfolio-nextjs", "_blank");
            }}
            className="hidden sm:flex"
            title="Tweet or Send Feedback"
          >
            <VscFeedback size={12} />
          </StatusItem>

          {/* Notifications Bell */}
          <StatusItem
            onClick={() => {
              soundFx.playClick();
              setShowDiagModal(true);
            }}
            title="Notifications"
          >
            <VscBell size={13} />
          </StatusItem>
        </div>
      </footer>

      {/* Futuristic System Diagnostics HUD Modal */}
      {showDiagModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-150"
          onClick={() => setShowDiagModal(false)}
        >
          <div
            className="future-hud-card w-full max-w-lg p-6 rounded-2xl border border-[var(--vscode-accent)]/30 text-white font-mono shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <LuShield className="text-[var(--vscode-accent)]" size={18} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--vscode-accent)]">
                  CYBRCRAFT // NEURAL_HUD_DIAGNOSTICS
                </h3>
              </div>
              <button
                onClick={() => setShowDiagModal(false)}
                className="text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LuX size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[10px] text-white/40 uppercase">Architecture</span>
                <p className="font-bold text-white flex items-center gap-1.5">
                  <LuZap size={12} className="text-amber-400" />
                  CybrCraft Quantum v2099
                </p>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[10px] text-white/40 uppercase">Neural Co-Pilot</span>
                <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Gemini 3.8 / Flash RAG
                </p>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[10px] text-white/40 uppercase">Vector Index</span>
                <p className="font-bold text-white">Pinecone + Dense Embeddings</p>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[10px] text-white/40 uppercase">Zero-Trust Network</span>
                <p className="font-bold text-cyan-400">TLS 1.3 / Encrypted Mesh</p>
              </div>
            </div>

            <div className="p-3 bg-black/40 border border-white/5 rounded-xl mb-4 space-y-2 text-[11px]">
              <div className="flex justify-between text-white/70">
                <span>Neural Synapse Memory:</span>
                <span className="text-emerald-400 font-bold">128TB Virtual / 98.4% Efficiency</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[var(--vscode-accent)] h-full w-[94%]" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/50 pt-2 border-t border-white/10">
              <span>STATUS: SYSTEM OPERATIONAL</span>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setShowDiagModal(false);
                }}
                className="px-3 py-1 bg-[var(--vscode-accent)] text-black font-extrabold rounded-lg hover:opacity-90"
              >
                DISMISS HUD
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
