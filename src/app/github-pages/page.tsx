"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, RefreshCw, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/cn";

const EMBED_URL = "https://sajid-ul-islam.github.io/";

export default function GitHubPagesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(true); // Fullscreen by default inside the app
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const content = (
    <div 
      className={cn(
        "flex flex-col bg-[var(--vscode-editor-background)]",
        isFullscreen ? "fixed inset-0 z-[99999] w-[100vw] h-[100dvh]" : "flex-1 h-full w-full"
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--vscode-border)] bg-black/10">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[var(--vscode-accent)]/15 text-[var(--vscode-accent)] text-[9px] font-bold tracking-wider uppercase font-mono border border-[var(--vscode-accent)]/10">
            Embedded Viewer
          </span>
          <span className="text-[11px] font-mono text-[var(--vscode-text-secondary)]">
            {EMBED_URL}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] bg-white/5 border border-white/5 rounded-md hover:bg-white/10 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
            {isFullscreen ? "Exit Full" : "Fullscreen"}
          </button>
          <a
            href={EMBED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold text-[var(--vscode-accent)] bg-[var(--vscode-accent)]/10 border border-[var(--vscode-accent)]/20 rounded-md hover:bg-[var(--vscode-accent)]/20 transition-colors"
          >
            <ExternalLink size={11} />
            Open External
          </a>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="flex-1 relative w-full h-full bg-[var(--vscode-editor-background)]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--vscode-editor-background)] z-10">
            <div className="flex gap-1.5 mb-3">
              <span className="w-2 h-2 bg-[var(--vscode-accent)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-[var(--vscode-accent)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-[var(--vscode-accent)] rounded-full animate-bounce"></span>
            </div>
            <span className="text-[11px] font-mono text-[var(--vscode-text-secondary)]">
              Loading sajid-ul-islam.github.io...
            </span>
          </div>
        )}
        <iframe
          src={EMBED_URL}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          title="GitHub Pages Portfolio"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 border-t border-[var(--vscode-border)] bg-[var(--vscode-statusBar-background)] text-[var(--vscode-statusBar-foreground)] text-[9px] font-mono">
        <span>Embedded: sajid-ul-islam.github.io</span>
        <span>Right-click &rarr; Open in new tab if content is blocked</span>
      </div>
    </div>
  );

  if (isFullscreen && mounted) {
    return createPortal(content, document.body);
  }

  return content;
}
