"use client";

import { useEffect, useState } from "react";
import { LuPin, LuX } from "react-icons/lu";

import { cn } from "../../lib/cn";
import { useTabs } from "../../lib/tabsContext";
import FileIcon from "./FileIcon";

export default function Tabs() {
  const { tabs, openTab, closeTab, closeOtherTabs, closeAllTabs, togglePin } =
    useTabs();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    tabId: string;
  } | null>(null);

  useEffect(() => {
    if (!contextMenu) return;
    const handleClose = () => setContextMenu(null);
    window.addEventListener("click", handleClose);
    window.addEventListener("contextmenu", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("contextmenu", handleClose);
    };
  }, [contextMenu]);

  if (tabs.length === 0) return null;

  return (
    <div className="relative flex items-center h-auto min-h-[var(--vscode-tab-height)] bg-[var(--vscode-tab-inactiveBackground)] border-b border-[var(--vscode-tab-border)] overflow-x-auto scrollbar-none flex-wrap">
      {tabs.map((tab) => {
        const isActive = tab.isActive;
        return (
          <div
            key={tab.id}
            className={cn(
              "group relative flex items-center gap-2 h-[var(--vscode-tab-height)] px-3 flex-1 min-w-[40px] max-w-[200px] flex-shrink flex-grow-0",
              "border-r border-[var(--vscode-tab-border)]",
              "cursor-pointer transition-all duration-200",
              isActive
                ? "bg-[var(--vscode-tab-activeBackground)] text-[var(--vscode-tab-activeForeground)] z-10"
                : "bg-[var(--vscode-tab-inactiveBackground)] text-[var(--vscode-tab-inactiveForeground)] hover:bg-[var(--vscode-tab-hoverBackground)]"
            )}
            onClick={() => openTab(tab.href)}
            onContextMenu={(event) => {
              event.preventDefault();
              setContextMenu({
                x: event.clientX,
                y: event.clientY,
                tabId: tab.id,
              });
            }}
          >
            {isActive ? (
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--vscode-tab-activeBorderTop)]" />
            ) : null}
            <FileIcon filename={tab.label} size={14} />
            <span className="flex-1 truncate text-vscode-sm">{tab.label}</span>
            {tab.isPinned ? (
              <LuPin size={14} className="text-[var(--vscode-text-secondary)]" />
            ) : (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  closeTab(tab.id, false);
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
            )}
            {tab.isModified ? (
              <span className="w-2 h-2 rounded-full bg-white" />
            ) : null}
          </div>
        );
      })}
      {contextMenu ? (
        <div
          className="fixed z-[70] min-w-[160px] bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded shadow-lg"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {(() => {
            const tab = tabs.find((item) => item.id === contextMenu.tabId);
            if (!tab) return null;
            return (
              <div className="py-1">
                <button
                  onClick={() => {
                    closeTab(tab.id, true);
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 text-vscode-sm hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeOtherTabs(tab.id);
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 text-vscode-sm hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
                >
                  Close Others
                </button>
                <button
                  onClick={() => {
                    closeAllTabs();
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 text-vscode-sm hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
                >
                  Close All
                </button>
                <div className="my-1 border-t border-[var(--vscode-border)]" />
                <button
                  onClick={() => {
                    togglePin(tab.id);
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 text-vscode-sm hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
                >
                  {tab.isPinned ? "Unpin Tab" : "Pin Tab"}
                </button>
              </div>
            );
          })()}
        </div>
      ) : null}
    </div>
  );
}
