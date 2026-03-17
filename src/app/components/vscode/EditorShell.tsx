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
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="min-h-full p-6 md:p-8 lg:p-12 max-w-5xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
      <CommandPalette />
    </div>
  );
}
