"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../lib/themeContext";
import { LuSave, LuRefreshCw } from "react-icons/lu";
import Button from "../components/vscode/Button";

export default function SettingsJsonPage() {
  const { theme, setTheme } = useTheme();
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Sync external theme changes into the editor
    setJsonText(JSON.stringify({
      "workbench.colorTheme": theme,
      "editor.fontSize": 13,
      "editor.fontFamily": "var(--font-sans), system-ui, sans-serif",
      "terminal.integrated.fontSize": 11,
      "window.zoomLevel": 0,
      "telemetry.telemetryLevel": "off"
    }, null, 2));
    setError(null);
  }, [theme]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed["workbench.colorTheme"]) {
        const newTheme = parsed["workbench.colorTheme"];
        const validThemes = ["tactical-dark", "vscode-dark", "vscode-light", "dracula", "monokai"];
        
        if (validThemes.includes(newTheme)) {
          setTheme(newTheme);
          setError(null);
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        } else {
          setError(`Invalid theme: "${newTheme}". Valid options: ${validThemes.join(", ")}`);
        }
      }
    } catch (e) {
      setError("Invalid JSON format. Please check your syntax.");
    }
  };

  const handleReset = () => {
    setTheme("tactical-dark");
  };

  return (
    <div className="flex flex-col h-full bg-[var(--vscode-editor-background)] animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--vscode-border)] bg-[var(--vscode-sideBar-background)]">
        <div className="flex items-center gap-2 text-vscode-sm text-[var(--vscode-text-secondary)]">
          <span className="text-[var(--vscode-accent)] font-medium">settings.json</span>
          <span className="text-[var(--vscode-text-muted)]">— User Settings</span>
        </div>
        <div className="flex items-center gap-2">
          {error && <span className="text-red-400 text-vscode-xs mr-2">{error}</span>}
          {isSaved && <span className="text-[#a3e635] text-vscode-xs mr-2">Saved!</span>}
          <Button variant="secondary" className="px-3 py-1 h-7 text-vscode-xs gap-1" onClick={handleReset}>
            <LuRefreshCw size={12} />
            Reset
          </Button>
          <Button className="px-3 py-1 h-7 text-vscode-xs gap-1" onClick={handleSave}>
            <LuSave size={12} />
            Save (Ctrl+S)
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative font-mono text-[13px] leading-relaxed p-4">
        {/* Line numbers mock */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[var(--vscode-editor-background)] border-r border-[var(--vscode-border)] text-right pr-2 pt-4 text-[var(--vscode-text-muted)] select-none">
          {[...Array(15)].map((_, i) => (
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
          className="w-full h-full bg-transparent text-[var(--vscode-editor-foreground)] outline-none resize-none pl-12"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
