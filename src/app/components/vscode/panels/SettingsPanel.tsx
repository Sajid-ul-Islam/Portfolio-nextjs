"use client";

import { useState } from "react";
import { LuCheck, LuPalette, LuSettings2, LuLayout, LuTrash2, LuX } from "react-icons/lu";
import { useTheme, type Theme } from "../../../lib/themeContext";
import { useRecentPagesContext } from "../../../lib/recentPagesContext";
import { useTabs } from "../../../lib/tabsContext";
import { cn } from "../../../lib/cn";

type ThemeOption = {
  id: Theme;
  label: string;
  kind: "Dark" | "Light" | "Dark High Contrast";
  preview: { bg: string; sidebar: string; accent: string; text: string };
};

const THEMES: ThemeOption[] = [
  {
    id: "tactical-dark",
    label: "Tactical Dark (Default)",
    kind: "Dark",
    preview: { bg: "#0d1117", sidebar: "#161b22", accent: "#a3e635", text: "#e6edf3" },
  },
  {
    id: "vscode-dark",
    label: "Dark+ (default dark)",
    kind: "Dark",
    preview: { bg: "#1e1e1e", sidebar: "#252526", accent: "#569cd6", text: "#d4d4d4" },
  },
  {
    id: "vscode-light",
    label: "Light+ (default light)",
    kind: "Light",
    preview: { bg: "#ffffff", sidebar: "#f3f3f3", accent: "#0066b8", text: "#333333" },
  },
  {
    id: "dracula",
    label: "Dracula",
    kind: "Dark",
    preview: { bg: "#282a36", sidebar: "#21222c", accent: "#bd93f9", text: "#f8f8f2" },
  },
  {
    id: "monokai",
    label: "Monokai",
    kind: "Dark",
    preview: { bg: "#272822", sidebar: "#1e1f1c", accent: "#e6db74", text: "#f8f8f2" },
  },
];

const kindGroups: { label: string; kind: ThemeOption["kind"] }[] = [
  { label: "DARK THEMES", kind: "Dark" },
  { label: "LIGHT THEMES", kind: "Light" },
];

function ThemePreview({ preview }: { preview: ThemeOption["preview"] }) {
  return (
    <div
      className="w-10 h-7 rounded overflow-hidden flex-shrink-0 border border-white/10"
      style={{ background: preview.bg }}
    >
      <div className="flex h-full">
        <div className="w-2.5 h-full" style={{ background: preview.sidebar }} />
        <div className="flex-1 flex flex-col justify-start pt-1 px-0.5 gap-0.5">
          <div className="h-0.5 w-5 rounded" style={{ background: preview.accent }} />
          <div className="h-0.5 w-3 rounded opacity-50" style={{ background: preview.text }} />
          <div className="h-0.5 w-4 rounded opacity-30" style={{ background: preview.text }} />
        </div>
      </div>
    </div>
  );
}

export default function SettingsPanel() {
  const { theme, setTheme } = useTheme();
  const { clearPages } = useRecentPagesContext();
  const { closeAllTabs } = useTabs();
  const [activeSection, setActiveSection] = useState<"theme" | "workspace" | "layout">("theme");

  const sections = [
    { id: "theme" as const, icon: LuPalette, label: "Color Theme" },
    { id: "workspace" as const, icon: LuSettings2, label: "Workspace" },
    { id: "layout" as const, icon: LuLayout, label: "Layout" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Section nav tabs */}
      <div className="flex border-b border-[var(--vscode-border)] px-2 pt-2 gap-1 flex-shrink-0">
        {sections.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 text-vscode-xs rounded-t transition-colors",
              activeSection === id
                ? "bg-[var(--vscode-editor-background)] text-[var(--vscode-text-primary)] border border-b-0 border-[var(--vscode-border)]"
                : "text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)]"
            )}
          >
            <Icon size={12} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">

        {/* ── COLOR THEME ── */}
        {activeSection === "theme" && (
          <div className="space-y-1">
            <p className="text-vscode-xs text-[var(--vscode-text-secondary)] uppercase tracking-wider px-1 mb-3">
              Color Theme
            </p>
            {kindGroups.map(({ label, kind }) => {
              const items = THEMES.filter((t) => t.kind === kind);
              if (!items.length) return null;
              return (
                <div key={kind} className="mb-3">
                  <p className="text-[10px] text-[var(--vscode-text-secondary)] uppercase tracking-widest px-1 mb-1 opacity-60">
                    {label}
                  </p>
                  {items.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-2 py-2 rounded text-left transition-colors",
                        theme === t.id
                          ? "bg-[var(--vscode-list-inactiveSelectionBackground)] text-[var(--vscode-text-primary)]"
                          : "text-[var(--vscode-sideBar-foreground)] hover:bg-[var(--vscode-list-hoverBackground)]"
                      )}
                    >
                      <ThemePreview preview={t.preview} />
                      <span className="flex-1 text-vscode-sm">{t.label}</span>
                      {theme === t.id && (
                        <LuCheck size={14} className="text-[#a3e635] flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* ── WORKSPACE ── */}
        {activeSection === "workspace" && (
          <div className="space-y-3">
            <p className="text-vscode-xs text-[var(--vscode-text-secondary)] uppercase tracking-wider px-1">
              Workspace Actions
            </p>
            <button
              onClick={clearPages}
              className="w-full flex items-center gap-2 px-3 py-2 rounded text-vscode-sm text-[var(--vscode-sideBar-foreground)] bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-focusBorder)] transition-colors"
            >
              <LuTrash2 size={13} />
              Clear Recent Pages
            </button>
            <button
              onClick={closeAllTabs}
              className="w-full flex items-center gap-2 px-3 py-2 rounded text-vscode-sm text-[var(--vscode-sideBar-foreground)] bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-focusBorder)] transition-colors"
            >
              <LuX size={13} />
              Close All Tabs
            </button>
            <div className="pt-2 px-1">
              <p className="text-vscode-xs text-[var(--vscode-text-secondary)] leading-relaxed">
                Sidebar width is automatically saved. Theme is persisted across sessions.
              </p>
            </div>
          </div>
        )}

        {/* ── LAYOUT ── */}
        {activeSection === "layout" && (
          <div className="space-y-3">
            <p className="text-vscode-xs text-[var(--vscode-text-secondary)] uppercase tracking-wider px-1">
              Layout Info
            </p>
            <div className="space-y-2">
              {[
                { key: "Ctrl + B", desc: "Toggle Explorer sidebar" },
                { key: "Ctrl + Shift + F", desc: "Open Search panel" },
                { key: "Ctrl + Shift + G", desc: "Open Source Control panel" },
                { key: "Ctrl + Shift + X", desc: "Open Extensions panel" },
                { key: "Ctrl + ,", desc: "Open Settings panel" },
              ].map(({ key, desc }) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 px-3 py-2 rounded bg-[var(--vscode-input-background)] border border-[var(--vscode-border)]"
                >
                  <span className="text-vscode-xs text-[var(--vscode-text-secondary)]">{desc}</span>
                  <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--vscode-editor-background)] border border-[var(--vscode-border)] text-[var(--vscode-text-primary)] whitespace-nowrap">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
