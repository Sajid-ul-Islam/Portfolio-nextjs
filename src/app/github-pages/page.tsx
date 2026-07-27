"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  LuGlobe,
  LuRefreshCw,
  LuExternalLink,
  LuMaximize2,
  LuMinimize2,
  LuSmartphone,
  LuTablet,
  LuMonitor,
  LuLock,
  LuGithub,
  LuCheck,
  LuCopy,
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const EMBED_URL = "https://sajid-ul-islam.github.io/";
const REPO_URL = "https://github.com/Sajid-ul-Islam/sajid-ul-islam.github.io";

type ViewportMode = "desktop" | "tablet" | "mobile";

export default function GitHubPagesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = `${EMBED_URL}?t=${Date.now()}`;
    }
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(EMBED_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-[390px] h-[780px]";
      case "tablet":
        return "max-w-[768px] h-[900px]";
      default:
        return "w-full h-full";
    }
  };

  const content = (
    <div
      className={cn(
        "flex flex-col bg-[var(--vscode-editor-background)] text-[var(--vscode-text-primary)] transition-all duration-300 font-sans overflow-hidden",
        isFullscreen ? "fixed inset-0 z-[99999] w-screen h-screen" : "w-full h-[calc(100vh-80px)] min-h-[600px]"
      )}
    >
      {/* Top Browser Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-black/20 border-b border-[var(--vscode-border)] backdrop-blur-md">
        {/* Left: Brand Badge & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--vscode-accent)]/10 border border-[var(--vscode-accent)]/20">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635] animate-pulse" />
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[var(--vscode-accent)]">
              GitHub Pages Live
            </span>
          </div>
          <span className="hidden sm:inline text-vscode-xs font-mono text-[var(--vscode-text-secondary)] truncate">
            HTML / Static Site Preview
          </span>
        </div>

        {/* Center: Address Bar */}
        <div className="flex-1 max-w-xl mx-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all focus-within:border-[var(--vscode-accent)] group">
            <LuLock size={12} className="text-[#a3e635] flex-shrink-0" />
            <span className="text-vscode-xs font-mono text-[var(--vscode-text-secondary)] select-all truncate flex-1">
              {EMBED_URL}
            </span>
            <button
              onClick={handleCopyUrl}
              className="p-1 text-[var(--vscode-text-secondary)] hover:text-white transition-colors"
              title="Copy URL"
            >
              {copied ? <LuCheck size={12} className="text-[#a3e635]" /> : <LuCopy size={12} />}
            </button>
            <button
              onClick={handleRefresh}
              className={cn(
                "p-1 text-[var(--vscode-text-secondary)] hover:text-white transition-all",
                isRefreshing && "animate-spin text-[var(--vscode-accent)]"
              )}
              title="Refresh Page"
            >
              <LuRefreshCw size={12} />
            </button>
          </div>
        </div>

        {/* Right: Viewport Controls & Actions */}
        <div className="flex items-center gap-2">
          {/* Device Switcher */}
          <div className="hidden md:flex items-center p-1 rounded-xl bg-black/20 border border-white/5 gap-1">
            <button
              onClick={() => setViewport("desktop")}
              className={cn(
                "p-1.5 rounded-lg text-vscode-xs font-mono transition-all flex items-center gap-1",
                viewport === "desktop"
                  ? "bg-[var(--vscode-accent)] text-white shadow-sm font-bold"
                  : "text-[var(--vscode-text-secondary)] hover:text-white hover:bg-white/5"
              )}
              title="Desktop View"
            >
              <LuMonitor size={13} />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={cn(
                "p-1.5 rounded-lg text-vscode-xs font-mono transition-all flex items-center gap-1",
                viewport === "tablet"
                  ? "bg-[var(--vscode-accent)] text-white shadow-sm font-bold"
                  : "text-[var(--vscode-text-secondary)] hover:text-white hover:bg-white/5"
              )}
              title="Tablet View"
            >
              <LuTablet size={13} />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={cn(
                "p-1.5 rounded-lg text-vscode-xs font-mono transition-all flex items-center gap-1",
                viewport === "mobile"
                  ? "bg-[var(--vscode-accent)] text-white shadow-sm font-bold"
                  : "text-[var(--vscode-text-secondary)] hover:text-white hover:bg-white/5"
              )}
              title="Mobile View"
            >
              <LuSmartphone size={13} />
            </button>
          </div>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-vscode-xs font-mono font-bold text-[var(--vscode-text-secondary)] hover:text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            title="View Source Repo on GitHub"
          >
            <LuGithub size={13} />
            <span className="hidden lg:inline">Source</span>
          </a>

          <a
            href={EMBED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-vscode-xs font-mono font-bold text-[var(--vscode-accent)] bg-[var(--vscode-accent)]/10 border border-[var(--vscode-accent)]/20 rounded-xl hover:bg-[var(--vscode-accent)]/20 transition-all"
            title="Open in new browser tab"
          >
            <LuExternalLink size={13} />
            <span className="hidden sm:inline">Open Tab</span>
          </a>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-[var(--vscode-text-secondary)] hover:text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
          >
            {isFullscreen ? <LuMinimize2 size={14} /> : <LuMaximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 relative w-full h-full bg-[var(--vscode-editor-background)] flex items-center justify-center p-2 sm:p-4 overflow-auto">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--vscode-editor-background)]/90 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-[var(--vscode-accent)] rounded-full animate-ping" />
                <span className="text-vscode-sm font-mono font-bold text-white tracking-wider">
                  INITIALIZING LIVE PREVIEW...
                </span>
              </div>
              <p className="text-vscode-xs font-mono text-[var(--vscode-text-secondary)]">
                Fetching static bundle from sajid-ul-islam.github.io
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Viewport Frame */}
        <div
          className={cn(
            "transition-all duration-500 relative flex flex-col overflow-hidden",
            viewport !== "desktop" &&
              "rounded-3xl border-4 border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] my-auto bg-black",
            getViewportWidth()
          )}
        >
          {/* Mobile/Tablet Mock Notch Header */}
          {viewport !== "desktop" && (
            <div className="h-6 bg-neutral-800 flex items-center justify-center relative flex-shrink-0">
              <div className="w-16 h-3.5 bg-black rounded-full" />
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={EMBED_URL}
            className="w-full h-full border-0 bg-white"
            onLoad={() => setIsLoading(false)}
            title="GitHub Pages Live Portfolio"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-black/40 border-t border-[var(--vscode-border)] text-vscode-xs font-mono text-[var(--vscode-text-secondary)]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <LuGlobe size={12} className="text-[var(--vscode-accent)]" />
            <span>Target: sajid-ul-islam.github.io</span>
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline uppercase">Viewport: {viewport}</span>
        </div>
        <div>
          <span>Press ESC or toggle icon to exit full view</span>
        </div>
      </div>
    </div>
  );

  if (isFullscreen && mounted) {
    return createPortal(content, document.body);
  }

  return content;
}
