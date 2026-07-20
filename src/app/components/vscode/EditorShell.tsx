"use client";

import Tabs from "./Tabs";
import Breadcrumbs from "./Breadcrumbs";
import CommandPalette from "./CommandPalette";

type EditorShellProps = {
  children: React.ReactNode;
};

export default function EditorShell({ children }: EditorShellProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--vscode-editor-background)]">
      <Tabs />
      <Breadcrumbs />
      <main className="flex flex-col flex-1 overflow-auto min-h-0 custom-editor-scroll border-t border-white/5 bg-[var(--vscode-editor-background)] relative">
        <div className="flex flex-col flex-1 w-full min-h-full animate-fade-in duration-500">
          {children}
        </div>
      </main>
      <CommandPalette />
    </div>
  );
}
