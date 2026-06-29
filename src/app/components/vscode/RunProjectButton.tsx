"use client";

import { LuPlay } from "react-icons/lu";
import Button from "./Button";
import { useLayout } from "../../lib/layoutContext";

export default function RunProjectButton({ projectId, isPython = false }: { projectId: string; isPython?: boolean }) {
  const { setShowTerminal } = useLayout();

  const handleRun = () => {
    // Open terminal first
    setShowTerminal(true);

    // Give terminal a brief moment to render before dispatching command
    setTimeout(() => {
      const command = isPython ? `python3 ${projectId}.py` : `npm run start ${projectId}`;
      window.dispatchEvent(new CustomEvent("terminal-run", { detail: command }));
    }, 100);
  };

  return (
    <Button 
      onClick={handleRun}
      className="bg-[var(--vscode-accent)] text-white hover:bg-[var(--vscode-button-hoverBackground)] border-none px-6 py-4 h-auto text-sm font-bold uppercase tracking-tight shadow-lg shadow-[var(--vscode-accent)]/20"
    >
      <LuPlay size={18} />
      RUN_SCRIPT
    </Button>
  );
}
