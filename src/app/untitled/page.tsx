"use client";

import { useState } from "react";
import SectionHeader from "../components/vscode/SectionHeader";
import Button from "../components/vscode/Button";

export default function UntitledPage() {
  const [content, setContent] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-4 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--vscode-border)] pb-4">
        <SectionHeader
          title="Untitled.txt"
          description="Local workspace draft pad. Use this tab to jot down notes, logs, or comments."
        />
        <div className="flex items-center gap-3">
          {isSaved && (
            <span className="text-[#a3e635] text-vscode-xs font-mono font-bold animate-pulse-glow">
              [SESSION_SAVED]
            </span>
          )}
          <Button
            onClick={handleSave}
            className="bg-[var(--vscode-accent)] hover:opacity-90 text-white font-mono text-xs font-bold px-4 py-1.5 h-auto rounded-lg"
          >
            Save Draft
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] bg-[var(--vscode-editor-background)] border border-[var(--vscode-border)] rounded-xl overflow-hidden flex flex-col font-mono">
        <div className="flex items-center justify-between bg-[var(--vscode-titleBar-activeBackground)] px-4 py-2 border-b border-[var(--vscode-border)] text-vscode-xs text-[var(--vscode-text-secondary)] select-none">
          <span>Encoding: UTF-8</span>
          <span>Line 1, Column {content.length + 1}</span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="// Type draft notes or scratchpad text here..."
          className="flex-1 w-full bg-transparent p-6 text-vscode-sm text-[var(--vscode-text-primary)] placeholder:text-[var(--vscode-text-muted)] focus:outline-none resize-none leading-relaxed leading-6 selection:bg-[var(--vscode-accent)]/20"
        />
      </div>
    </div>
  );
}
