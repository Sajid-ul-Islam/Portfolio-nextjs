"use client";

import React from "react";
import { LuX } from "react-icons/lu";

import { cn } from "../../lib/cn";
import { useIconTheme, type IconName } from "../../lib/iconContext";
import AccountPanel from "./panels/AccountPanel";
import ExplorerPanel from "./panels/ExplorerPanel";
import SearchPanel from "./panels/SearchPanel";
import SourceControlPanel from "./panels/SourceControlPanel";

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
  activePanel?: "explorer" | "search" | "git" | "account" | "settings" | "terminal" | "chat";
  variant?: "default" | "drawer";
};

const panelLabels: Record<
  NonNullable<SidebarProps["activePanel"]>,
  string
> = {
  explorer: "Explorer",
  search: "Search",
  git: "Source Control",
  account: "Account",
  settings: "Settings",
  terminal: "Terminal",
  chat: "AI Chat",
};

// Panel -> icon theme vocabulary so the activity-bar icon choice flows through here too.
const panelIcons: Record<NonNullable<SidebarProps["activePanel"]>, IconName> = {
  explorer: "files",
  search: "search",
  git: "git",
  account: "account",
  settings: "settings",
  terminal: "terminal",
  chat: "chat",
};

export default function Sidebar({
  isOpen = true,
  onClose,
  activePanel = "explorer",
  variant = "default",
}: SidebarProps) {
  const { iconTheme } = useIconTheme();
  if (!isOpen) return null;

  const panelContent = (() => {
    switch (activePanel) {
      case "search":
        return <SearchPanel />;
      case "git":
        return <SourceControlPanel />;
      case "account":
        return <AccountPanel />;
      case "explorer":
      default:
        return <ExplorerPanel onClose={onClose} />;
    }
  })();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[var(--vscode-sideBar-background)] backdrop-blur-2xl overflow-hidden",
        variant === "drawer"
          ? "w-full border-t border-white/5"
          : "w-[var(--vscode-sidebar-width)] border-r border-white/5"
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 text-vscode-xs font-semibold uppercase tracking-wider text-[var(--vscode-text-secondary)] border-b border-[var(--vscode-border)]">
        <span className="flex items-center gap-2">
          {React.createElement(iconTheme.icons[panelIcons[activePanel]], { size: 14, className: "text-[var(--vscode-accent)]" })}
          {panelLabels[activePanel]}
        </span>
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
