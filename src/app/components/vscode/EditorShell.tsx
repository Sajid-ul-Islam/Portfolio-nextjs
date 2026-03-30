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
      <main className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 custom-editor-scroll border-t border-white/5 bg-[var(--vscode-editor-background)]">
        <div className="min-h-full p-4 md:p-8 lg:p-10 w-full animate-fade-in duration-500">
          {children}
        </div>
      </main>
      <CommandPalette />
    </div>
  );
}
