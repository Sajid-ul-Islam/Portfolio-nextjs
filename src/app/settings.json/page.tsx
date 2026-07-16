"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../lib/themeContext";
import { useAccent, ACCENT_PRESETS } from "../lib/accentContext";
import { LuSave, LuRefreshCw, LuSliders, LuCode, LuCheck, LuPalette } from "react-icons/lu";
import Button from "../components/vscode/Button";
import { cn } from "@/lib/cn";

type SettingsData = {
  "workbench.colorTheme": string;
  "editor.fontSize": number;
  "editor.fontFamily": string;
  "terminal.integrated.fontSize": number;
  "window.zoomLevel": number;
  "telemetry.telemetryLevel": string;
};

const THEMES = [
  { id: "tactical-dark", name: "Tactical Dark", bg: "bg-[#111612]", border: "border-emerald-500/20", color: "#10b981" },
  { id: "vscode-dark", name: "VS Code Dark", bg: "bg-[#1e1e1e]", border: "border-blue-500/20", color: "#007acc" },
  { id: "dracula", name: "Dracula", bg: "bg-[#282a36]", border: "border-pink-500/20", color: "#ff79c6" },
  { id: "monokai", name: "Monokai", bg: "bg-[#272822]", border: "border-yellow-500/20", color: "#f92672" },
  { id: "vscode-light", name: "VS Code Light", bg: "bg-[#f3f3f3]", border: "border-gray-300", color: "#007acc" },
];

export default function SettingsJsonPage() {
  const { theme, setTheme } = useTheme();
  const { accent, setAccent, setCustomAccent } = useAccent();
  const [jsonText, setJsonText] = useState("");
  const [guiSettings, setGuiSettings] = useState<SettingsData>({
    "workbench.colorTheme": "tactical-dark",
    "editor.fontSize": 13,
    "editor.fontFamily": "var(--font-sans), system-ui, sans-serif",
    "terminal.integrated.fontSize": 11,
    "window.zoomLevel": 0,
    "telemetry.telemetryLevel": "off"
  });
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Load initial settings from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("vscode-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        setGuiSettings(parsed);
        setJsonText(`export default ${JSON.stringify(parsed, null, 2)};`);
      } else {
        const defaultSettings: SettingsData = {
          "workbench.colorTheme": theme,
          "editor.fontSize": 13,
          "editor.fontFamily": "var(--font-sans), system-ui, sans-serif",
          "terminal.integrated.fontSize": 11,
          "window.zoomLevel": 0,
          "telemetry.telemetryLevel": "off"
        };
        setGuiSettings(defaultSettings);
        setJsonText(`export default ${JSON.stringify(defaultSettings, null, 2)};`);
      }
    } catch (e) {}
  }, [theme]);

  // Sync GUI fields to JS Module text
  const updateGuiSettings = (key: keyof SettingsData, value: any) => {
    const updated = { ...guiSettings, [key]: value };
    setGuiSettings(updated);
    setJsonText(`export default ${JSON.stringify(updated, null, 2)};`);
    setError(null);
  };

  const handleSave = () => {
    try {
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (!match) {
        throw new Error("No object configuration found");
      }
      const parsed = JSON.parse(match[0]);
      const newTheme = parsed["workbench.colorTheme"];
      const validThemes = THEMES.map(t => t.id);
      
      if (newTheme) {
        if (validThemes.includes(newTheme)) {
          setTheme(newTheme);
          setGuiSettings(parsed);
          localStorage.setItem("vscode-settings", JSON.stringify(parsed));
          window.dispatchEvent(new Event("vscode-settings-changed"));
          setError(null);
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        } else {
          setError(`Invalid theme: "${newTheme}". Valid options: ${validThemes.join(", ")}`);
        }
      } else {
        setGuiSettings(parsed);
        localStorage.setItem("vscode-settings", JSON.stringify(parsed));
        window.dispatchEvent(new Event("vscode-settings-changed"));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    } catch (e) {
      setError("Invalid Javascript Module. Make sure it matches 'export default { ... };' enclosing valid JSON.");
    }
  };

  const handleReset = () => {
    const defaultSettings: SettingsData = {
      "workbench.colorTheme": "tactical-dark",
      "editor.fontSize": 13,
      "editor.fontFamily": "var(--font-sans), system-ui, sans-serif",
      "terminal.integrated.fontSize": 11,
      "window.zoomLevel": 0,
      "telemetry.telemetryLevel": "off"
    };
    setTheme("tactical-dark");
    setGuiSettings(defaultSettings);
    setJsonText(`export default ${JSON.stringify(defaultSettings, null, 2)};`);
    localStorage.setItem("vscode-settings", JSON.stringify(defaultSettings));
    window.dispatchEvent(new Event("vscode-settings-changed"));
    setError(null);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#141815]/40 animate-in fade-in duration-500 relative font-sans">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--vscode-border)] bg-[#191d1a]/80 backdrop-blur-xl z-10">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-[var(--vscode-accent)]/15 text-[var(--vscode-accent)] text-[9px] font-bold tracking-wider uppercase font-mono border border-[var(--vscode-accent)]/10">
            Preference Editor
          </span>
          <div className="flex items-center gap-1.5 text-vscode-sm text-[var(--vscode-text-secondary)]">
            <span className="text-[var(--vscode-accent)] font-bold">settings.mjs</span>
            <span className="text-[var(--vscode-text-muted)] text-vscode-xs">— Workspace Settings</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {error && <span className="text-red-400 text-vscode-xs font-mono mr-2 bg-red-400/10 px-2 py-1 rounded border border-red-400/20">{error}</span>}
          {isSaved && <span className="text-emerald-400 text-vscode-xs font-mono mr-2 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20 animate-pulse font-bold flex items-center gap-1">
            <LuCheck size={12} /> Saved
          </span>}
          <Button variant="secondary" className="px-3.5 py-1.5 h-auto text-vscode-xs gap-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10" onClick={handleReset}>
            <LuRefreshCw size={12} />
            Reset Defaults
          </Button>
          <Button className="px-3.5 py-1.5 h-auto text-vscode-xs gap-1.5 rounded-lg shadow-md shadow-[var(--vscode-accent)]/20 bg-[var(--vscode-accent)] text-white" onClick={handleSave}>
            <LuSave size={12} />
            Save Changes
          </Button>
        </div>
      </div>
      
      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Visual GUI Editor */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 border-r border-[var(--vscode-border)] bg-black/10">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <LuSliders className="text-[var(--vscode-accent)]" size={18} />
            <h2 className="text-vscode-base font-bold text-[var(--vscode-text-primary)]">User Interface settings</h2>
          </div>

          {/* Theme selection panel */}
          <div className="space-y-3">
            <label className="text-vscode-sm font-bold text-[var(--vscode-text-secondary)]">Workbench Color Theme</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {THEMES.map((t) => {
                const isActive = guiSettings["workbench.colorTheme"] === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => updateGuiSettings("workbench.colorTheme", t.id)}
                    className={cn(
                      "group text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden",
                      t.bg,
                      isActive
                        ? "border-[var(--vscode-accent)] shadow-lg shadow-[var(--vscode-accent)]/10 bg-opacity-100"
                        : "border-white/5 hover:border-white/20 bg-opacity-70"
                    )}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className={cn("text-vscode-xs font-bold font-mono tracking-wide", isActive ? "text-[var(--vscode-accent)]" : "text-white/60 group-hover:text-white")}>
                        {t.name}
                      </span>
                      {isActive && (
                        <div className="w-5 h-5 rounded-full bg-[var(--vscode-accent)] flex items-center justify-center text-white shadow-sm animate-in scale-in">
                          <LuCheck size={12} />
                        </div>
                      )}
                    </div>
                    {/* Visual mockup colors preview */}
                    <div className="mt-3 flex items-center gap-1.5 opacity-60 relative z-10">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></div>
                      <div className="w-10 h-2 rounded bg-white/10"></div>
                      <div className="w-6 h-2 rounded bg-white/5"></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color Picker */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <LuPalette className="text-[var(--vscode-accent)]" size={14} />
              <label className="text-vscode-sm font-bold text-[var(--vscode-text-secondary)]">Accent Color</label>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {ACCENT_PRESETS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setAccent(c)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 relative",
                    accent.value === c.value
                      ? "border-white shadow-lg scale-110"
                      : "border-transparent hover:border-white/40"
                  )}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                >
                  {accent.value === c.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LuCheck size={14} className="text-white drop-shadow-md" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <label className="text-vscode-xs text-[var(--vscode-text-muted)]">Custom:</label>
              <input
                type="color"
                value={accent.value}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-vscode-xs font-mono text-[var(--vscode-text-secondary)]">{accent.value}</span>
            </div>
          </div>

          {/* Text Editor preferences */}
          <div className="space-y-4 pt-3">
            <h3 className="text-vscode-xs font-bold text-[var(--vscode-text-muted)] uppercase tracking-wider">Editor Settings</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-vscode-xs">
                  <label className="text-[var(--vscode-text-secondary)] font-medium">Editor Font Size</label>
                  <span className="text-[var(--vscode-accent)] font-mono font-bold">{guiSettings["editor.fontSize"]}px</span>
                </div>
                <input
                  type="range"
                  min="11"
                  max="18"
                  value={guiSettings["editor.fontSize"]}
                  onChange={(e) => updateGuiSettings("editor.fontSize", parseInt(e.target.value))}
                  className="w-full accent-[var(--vscode-accent)] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-vscode-xs">
                  <label className="text-[var(--vscode-text-secondary)] font-medium">Terminal Font Size</label>
                  <span className="text-[var(--vscode-accent)] font-mono font-bold">{guiSettings["terminal.integrated.fontSize"]}px</span>
                </div>
                <input
                  type="range"
                  min="9"
                  max="16"
                  value={guiSettings["terminal.integrated.fontSize"]}
                  onChange={(e) => updateGuiSettings("terminal.integrated.fontSize", parseInt(e.target.value))}
                  className="w-full accent-[var(--vscode-accent)] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-vscode-xs text-[var(--vscode-text-secondary)] font-medium">Telemetry Level</label>
              <div className="flex gap-2">
                {["all", "error", "off"].map((level) => {
                  const isActive = guiSettings["telemetry.telemetryLevel"] === level;
                  return (
                    <button
                      key={level}
                      onClick={() => updateGuiSettings("telemetry.telemetryLevel", level)}
                      className={cn(
                        "flex-1 py-2 px-3 text-vscode-xs font-bold font-mono rounded-lg border transition-all uppercase",
                        isActive
                          ? "bg-[var(--vscode-accent)]/15 border-[var(--vscode-accent)]/30 text-[var(--vscode-accent)]"
                          : "bg-white/5 border-transparent text-white/50 hover:bg-white/10"
                      )}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Raw mjs Code Editor */}
        <div className="flex-1 flex flex-col h-full bg-[#181d19]/40 backdrop-blur-xl relative">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--vscode-border)] bg-black/10 text-vscode-xs text-white/40 font-mono">
            <LuCode size={12} className="text-[var(--vscode-accent)]" />
            <span>RAW_ES_MODULE_VIEW</span>
          </div>

          <div className="flex-1 relative font-mono text-vscode-sm leading-relaxed p-4 overflow-hidden">
            {/* Line numbers column */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/5 border-r border-white/5 text-right pr-3 pt-4 text-white/20 select-none text-[11px] font-mono leading-[22px]">
              {[...Array(12)].map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            
            <textarea
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                  e.preventDefault();
                  handleSave();
                }
              }}
              className="w-full h-full bg-transparent text-[var(--vscode-editor-foreground)] outline-none resize-none pl-14 pt-0 font-mono text-[12px] leading-[22px] tracking-tight placeholder:text-white/10"
              spellCheck={false}
              aria-label="Raw settings ES module input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
