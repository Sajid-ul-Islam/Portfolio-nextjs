"use client";

import { LuX } from "react-icons/lu";

import { cn } from "../../lib/cn";
import { useOpenTabs } from "../../lib/useOpenTabs";
import FileIcon from "./FileIcon";

export default function Tabs() {
  const { tabs, openTab, closeTab } = useOpenTabs();

  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center h-[var(--vscode-tab-height)] bg-[var(--vscode-tab-inactiveBackground)] border-b border-[var(--vscode-tab-border)] overflow-x-auto scrollbar-none">
      {tabs.map((tab) => {
        const isActive = tab.isActive;
        return (
          <div
            key={tab.id}
            className={cn(
              "group relative flex items-center gap-2 h-full px-3 min-w-[120px] max-w-[200px]",
              "border-r border-[var(--vscode-tab-border)]",
              "cursor-pointer transition-colors",
              isActive
                ? "bg-[var(--vscode-tab-activeBackground)] text-[var(--vscode-tab-activeForeground)]"
                : "bg-[var(--vscode-tab-inactiveBackground)] text-[var(--vscode-tab-inactiveForeground)] hover:bg-[var(--vscode-tab-hoverBackground)]"
            )}
            onClick={() => openTab(tab.href)}
          >
            {isActive ? (
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--vscode-tab-activeBorderTop)]" />
            ) : null}
            <FileIcon filename={tab.label} size={14} />
            <span className="flex-1 truncate text-vscode-sm">{tab.label}</span>
            <button
              onClick={(event) => {
                event.stopPropagation();
                closeTab(tab.id);
              }}
              className={cn(
                "flex items-center justify-center w-5 h-5 rounded",
                "opacity-0 group-hover:opacity-100",
                "hover:bg-[var(--vscode-list-hoverBackground)] transition-opacity"
              )}
              aria-label={`Close ${tab.label}`}
            >
              <LuX size={14} />
            </button>
            {tab.isModified ? (
              <span className="w-2 h-2 rounded-full bg-white" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
