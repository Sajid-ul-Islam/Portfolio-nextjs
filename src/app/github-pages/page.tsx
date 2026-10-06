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

export const PRESET_SITES = [
  {
    id: "deencommerce",
    name: "Deen Commerce",
    url: "https://deencommerce.vercel.app/",
    desc: "Omnichannel E-Commerce",
  },
  {
    id: "cybrcraft",
    name: "CybrCraft",
    url: "https://cybrcraft.com/",
    desc: "Official Software Company",
  },
  {
    id: "deakho",
    name: "Deakho TV",
    url: "https://deakho.vercel.app/",
    desc: "Live TV & Streaming",
  },
  {
    id: "github-pages",
    name: "GitHub Portfolio",
    url: "https://sajid-ul-islam.github.io/",
    desc: "Static Showcase",
  },
];

const REPO_URL = "https://github.com/Sajid-ul-Islam/Portfolio-nextjs";

type ViewportMode = "desktop" | "tablet" | "mobile";

export default function GitHubPagesPage() {
  const [currentUrl, setCurrentUrl] = useState("https://deencommerce.vercel.app/");
  const [inputUrl, setInputUrl] = useState("https://deencommerce.vercel.app/");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlParam = params.get("url");
      const siteParam = params.get("site");
      if (urlParam) {
        handleNavigate(urlParam);
      } else if (siteParam) {
        const found = PRESET_SITES.find((s) => s.id === siteParam);
        if (found) handleNavigate(found.url);
      } else {
        handleNavigate("https://deencommerce.vercel.app/");
      }
    }
  }, []);

  // Safeguard: auto-clear loading spinner if iframe onLoad does not fire
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleNavigate = (url: string) => {
    let formatted = url.trim();
    if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
      formatted = `https://${formatted}`;
    }
    if (formatted.includes("docs.google.com/forms") && !formatted.includes("embedded=true")) {
      formatted += formatted.includes("?") ? "&embedded=true" : "?embedded=true";
    }
    setCurrentUrl(formatted);
    setInputUrl(formatted);
    setIsLoading(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLoading(false);
    }, 700);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
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
        {/* Left: Preset Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {PRESET_SITES.map((site) => {
            const isActive = currentUrl === site.url;
            return (
              <button
                key={site.id}
                onClick={() => handleNavigate(site.url)}
                className={cn(
                  "px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all flex items-center gap-1.5 flex-shrink-0",
                  isActive
                    ? "bg-[var(--vscode-accent)] text-white shadow-md shadow-[var(--vscode-accent)]/20"
                    : "bg-white/5 text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] hover:bg-white/10"
                )}
              >
                <LuGlobe size={11} className={isActive ? "text-white" : "text-[var(--vscode-accent)]"} />
                <span>{site.name}</span>
              </button>
            );
          })}
        </div>

        {/* Center: Address Bar */}
        <div className="flex-1 max-w-xl mx-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNavigate(inputUrl);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all focus-within:border-[var(--vscode-accent)] group"
          >
            <LuLock size={12} className="text-[#a3e635] flex-shrink-0" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="text-vscode-xs font-mono text-[var(--vscode-text-primary)] bg-transparent border-none outline-none flex-1 truncate"
              placeholder="Enter URL to preview..."
            />
            <button
              type="button"
              onClick={handleCopyUrl}
              className="p-1 text-[var(--vscode-text-secondary)] hover:text-white transition-colors"
              title="Copy URL"
            >
              {copied ? <LuCheck size={12} className="text-[#a3e635]" /> : <LuCopy size={12} />}
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className={cn(
                "p-1 text-[var(--vscode-text-secondary)] hover:text-white transition-all",
                isRefreshing && "animate-spin text-[var(--vscode-accent)]"
              )}
              title="Refresh Page"
            >
              <LuRefreshCw size={12} />
            </button>
          </form>
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
            href={currentUrl}
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
                  INITIALIZING LIVE BROWSER PREVIEW...
                </span>
              </div>
              <p className="text-vscode-xs font-mono text-[var(--vscode-text-secondary)] truncate max-w-md px-4">
                Loading live environment: {currentUrl}
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

          {/* Actual Site Rendered in Iframe */}
          <iframe
            ref={iframeRef}
            src={currentUrl}
            className="w-full h-full border-0 bg-white"
            onLoad={() => setIsLoading(false)}
            title="Live Web Browser Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-black/40 border-t border-[var(--vscode-border)] text-vscode-xs font-mono text-[var(--vscode-text-secondary)]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 truncate max-w-sm">
            <LuGlobe size={12} className="text-[var(--vscode-accent)] flex-shrink-0" />
            <span className="truncate">Target: {currentUrl}</span>
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
