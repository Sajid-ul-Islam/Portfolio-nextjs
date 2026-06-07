"use client";

import { LuExternalLink, LuGlobe, LuCode, LuBrainCircuit, LuChartBar } from "react-icons/lu";

const SITE_URL = "https://sajid-ul-islam.github.io/";

const highlights = [
  { icon: LuCode, label: "VS Code Themed", desc: "Built to look and feel like a real IDE" },
  { icon: LuBrainCircuit, label: "AI Assistant", desc: "Integrated AI chat with portfolio context" },
  { icon: LuChartBar, label: "Data & BI Focus", desc: "Python, SQL, Tableau, Power BI projects" },
];

export default function PortfolioSitePage() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[var(--vscode-editor-background)]">
      {/* Mock browser toolbar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[var(--vscode-editorGroupHeader-tabsBackground)] border-b border-[var(--vscode-tab-border)] text-[11px] text-[var(--vscode-descriptionForeground)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 opacity-80">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--vscode-input-background)] border border-[var(--vscode-border)]">
            <LuGlobe size={10} className="opacity-60" />
            <span className="opacity-70">https://</span>
            <span className="font-medium text-[var(--vscode-text-primary)]">sajid-ul-islam.github.io</span>
          </div>
        </div>
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
        >
          <LuExternalLink size={11} />
          Open in Browser
        </a>
      </div>

      {/* Main content - centered card */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="w-full max-w-lg space-y-6">

          {/* Globe icon + heading */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] mb-2">
              <LuGlobe size={32} className="text-[#a3e635]" />
            </div>
            <h1 className="text-xl font-bold text-[var(--vscode-text-primary)] tracking-tight">
              Portfolio Site
            </h1>
            <p className="text-[13px] text-[var(--vscode-text-secondary)] leading-relaxed">
              The external GitHub Pages site cannot be embedded here due to browser security
              restrictions <span className="font-mono text-[11px] opacity-70">(X-Frame-Options)</span>.
              Open it directly to explore the full experience.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="space-y-2">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-3 px-4 py-3 rounded-lg bg-[var(--vscode-input-background)] border border-[var(--vscode-border)]"
              >
                <Icon size={16} className="text-[#a3e635] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[12px] font-semibold text-[var(--vscode-text-primary)]">{label}</p>
                  <p className="text-[11px] text-[var(--vscode-text-secondary)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
              bg-[#a3e635] hover:bg-[#b8f04a] active:bg-[#8cc42a]
              text-black font-semibold text-[13px]
              transition-all duration-150 shadow-lg shadow-[#a3e635]/20 hover:shadow-[#a3e635]/40"
          >
            <LuExternalLink size={15} />
            Open sajid-ul-islam.github.io
          </a>

          <p className="text-center text-[10px] text-[var(--vscode-text-secondary)] opacity-60">
            Opens in a new browser tab
          </p>
        </div>
      </div>
    </div>
  );
}
