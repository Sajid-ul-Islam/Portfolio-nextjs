"use client";

export default function PortfolioSitePage() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[var(--vscode-editor-background)]">
      <div className="flex items-center justify-between px-4 py-1.5 bg-[var(--vscode-editorGroupHeader-tabsBackground)] border-b border-[var(--vscode-tab-border)] text-[11px] text-[var(--vscode-descriptionForeground)]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 opacity-80">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-sm" />
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--vscode-input-background)] border border-[var(--vscode-border)]">
            <span className="opacity-70">https://</span>
            <span className="font-medium text-[var(--vscode-text-primary)]">saajiidi.github.io</span>
          </div>
        </div>
        <a 
          href="https://saajiidi.github.io/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors flex items-center gap-1"
        >
          Open in Browser
        </a>
      </div>
      <div className="flex-1 relative bg-white">
        <iframe
          src="https://saajiidi.github.io/"
          className="w-full h-full border-none"
          title="Sajid Islam Portfolio"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
