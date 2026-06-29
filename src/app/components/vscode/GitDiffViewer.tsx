"use client";

import { cn } from "../../lib/cn";

type DiffLine = {
  type: "added" | "removed" | "unchanged";
  content: string;
};

type GitDiffViewerProps = {
  oldCode: string;
  newCode: string;
  filename?: string;
};

function parseDiff(oldCode: string, newCode: string): DiffLine[] {
  // A very simplified diff parser for demonstration.
  // In a real app, you'd use a library like 'diff'.
  // We'll assume the old and new code are provided line by line and we'll just do a naive comparison
  // or rather, we will expect the inputs to be pre-formatted or we'll just render old as removed and new as added.
  
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');
  
  const result: DiffLine[] = [];
  
  // Just for visual effect in the portfolio: show removed lines first, then added lines
  oldLines.forEach(line => {
    if (line.trim() !== '') {
      result.push({ type: "removed", content: line });
    }
  });
  
  newLines.forEach(line => {
    if (line.trim() !== '') {
      result.push({ type: "added", content: line });
    }
  });

  return result;
}

export default function GitDiffViewer({ oldCode, newCode, filename = "refactored_module.ts" }: GitDiffViewerProps) {
  const lines = parseDiff(oldCode, newCode);

  return (
    <div className="rounded-lg border border-[var(--vscode-border)] bg-[var(--vscode-editor-background)] overflow-hidden font-mono text-[12px] leading-relaxed shadow-xl">
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--vscode-sideBar-background)] border-b border-[var(--vscode-border)] text-[var(--vscode-text-secondary)]">
        <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
        <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
        <span className="ml-2 font-medium">{filename}</span>
        <span className="ml-auto text-[10px] uppercase tracking-wider opacity-50">Local Changes</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr 
                key={idx}
                className={cn(
                  "group hover:bg-[var(--vscode-list-hoverBackground)]",
                  line.type === "added" && "bg-emerald-500/10 text-emerald-400/90",
                  line.type === "removed" && "bg-red-500/10 text-red-400/90",
                  line.type === "unchanged" && "text-[var(--vscode-text-primary)]"
                )}
              >
                <td className="w-8 select-none text-right px-2 border-r border-[var(--vscode-border)] text-[var(--vscode-text-muted)] opacity-50 group-hover:opacity-100 bg-[var(--vscode-sideBar-background)]">
                  {line.type === "removed" ? '-' : line.type === "added" ? '+' : ' '}
                </td>
                <td className="w-8 select-none text-right px-2 border-r border-[var(--vscode-border)] text-[var(--vscode-text-muted)] opacity-50 group-hover:opacity-100 bg-[var(--vscode-sideBar-background)]">
                  {idx + 1}
                </td>
                <td className="px-4 py-0.5 whitespace-pre">
                  {line.content}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
