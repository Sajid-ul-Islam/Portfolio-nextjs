"use client";

import { LuX } from "react-icons/lu";

import { cn } from "../../lib/cn";
import AccountPanel from "./panels/AccountPanel";
import ExplorerPanel from "./panels/ExplorerPanel";
import ExtensionsPanel from "./panels/ExtensionsPanel";
import SearchPanel from "./panels/SearchPanel";
import SettingsPanel from "./panels/SettingsPanel";
import SourceControlPanel from "./panels/SourceControlPanel";

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
  activePanel?: "explorer" | "search" | "git" | "extensions" | "account" | "settings" | "terminal" | "chat";
  variant?: "default" | "drawer";
};

const panelLabels: Record<
  NonNullable<SidebarProps["activePanel"]>,
  string
> = {
  explorer: "Explorer",
  search: "Search",
  git: "Source Control",
  extensions: "Extensions",
  account: "Account",
  settings: "Settings",
  terminal: "Terminal",
  chat: "AI Chat",
};

export default function Sidebar({
  isOpen = true,
  onClose,
  activePanel = "explorer",
  variant = "default",
}: SidebarProps) {
  if (!isOpen) return null;

  const panelContent = (() => {
    switch (activePanel) {
      case "search":
        return <SearchPanel />;
      case "git":
        return <SourceControlPanel />;
      case "extensions":
        return <ExtensionsPanel />;
      case "account":
        return <AccountPanel />;
      case "settings":
        return <SettingsPanel />;
      case "explorer":
      default:
        return <ExplorerPanel onClose={onClose} />;
    }
  })();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[var(--vscode-sideBar-background)] overflow-hidden",
        variant === "drawer"
          ? "w-full border-t border-[var(--vscode-border)]"
          : "w-[var(--vscode-sidebar-width)] border-r border-[var(--vscode-border)]"
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 text-vscode-xs font-semibold uppercase tracking-wider text-[var(--vscode-text-secondary)] border-b border-[var(--vscode-border)]">
        <span>{panelLabels[activePanel]}</span>
        {onClose ? (
          <button
            onClick={onClose}
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded",
              "hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
            )}
            aria-label="Close panel"
          >
            <LuX size={14} />
          </button>
        ) : null}
      </div>
      {panelContent}
    </aside>
  );
}
