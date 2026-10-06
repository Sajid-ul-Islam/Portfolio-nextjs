"use client";

import { useEffect, useState } from "react";
import {
  VscClose,
  VscPin,
  VscSplitHorizontal,
  VscEllipsis,
} from "react-icons/vsc";

import { cn } from "../../lib/cn";
import { useTabs } from "../../lib/tabsContext";
import FileIcon from "./FileIcon";
import { soundFx } from "@/app/lib/soundFx";

export default function Tabs() {
  const { tabs, openTab, closeTab, closeOtherTabs, closeAllTabs, togglePin } =
    useTabs();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    tabId: string;
  } | null>(null);

  const [toast, setToast] = useState<string | null>(null);

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

  const showToast = (msg: string) => {
    soundFx.playClick();
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center justify-between h-[var(--vscode-tab-height,35px)] bg-[var(--vscode-tab-inactiveBackground)] border-b border-[var(--vscode-tab-border)] select-none">
      {/* Scrollable Tabs List */}
      <div className="flex items-center h-full overflow-x-auto no-scrollbar whitespace-nowrap min-w-0 flex-1">
        {tabs.map((tab) => {
          const isActive = tab.isActive;
          return (
            <div
              key={tab.id}
              className={cn(
                "group relative flex items-center gap-2 h-full px-3 flex-shrink-0 min-w-[120px] max-w-[200px]",
                "border-r border-[var(--vscode-tab-border)] text-[12px] font-sans",
                "cursor-pointer transition-colors duration-100",
                isActive
                  ? "bg-[var(--vscode-tab-activeBackground)] text-[var(--vscode-tab-activeForeground)] z-10"
                  : "bg-[var(--vscode-tab-inactiveBackground)] text-[var(--vscode-tab-inactiveForeground)] hover:bg-[var(--vscode-tab-hoverBackground)] hover:text-white"
              )}
              onClick={() => {
                soundFx.playTabSwitch();
                openTab(tab.href);
              }}
              onContextMenu={(event) => {
                event.preventDefault();
                setContextMenu({
                  x: event.clientX,
                  y: event.clientY,
                  tabId: tab.id,
                });
              }}
            >
              {/* Authentic Top Active Tab Accent Border */}
              {isActive ? (
                <span className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--vscode-tab-activeBorderTop,var(--vscode-accent))]" />
              ) : null}

              <FileIcon filename={tab.label} size={14} />
              <span className="truncate flex-1 font-mono text-[11px]">{tab.label}</span>

              {tab.isPinned ? (
                <VscPin size={13} className="text-[var(--vscode-text-secondary)]" />
              ) : (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    soundFx.playClick();
                    closeTab(tab.id, false);
                  }}
                  className={cn(
                    "flex items-center justify-center w-4 h-4 rounded-[3px]",
                    isActive ? "opacity-70 hover:opacity-100" : "opacity-0 group-hover:opacity-100",
                    "hover:bg-white/10 hover:text-white transition-all"
                  )}
                  aria-label={`Close ${tab.label}`}
                >
                  <VscClose size={13} />
                </button>
              )}

              {tab.isModified && !tab.isPinned ? (
                <span className="w-2 h-2 rounded-full bg-white ml-1" />
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Real VS Code Tab Action Toolbar on Right */}
      <div className="flex items-center gap-1 px-2 h-full flex-shrink-0 text-gray-400 bg-[var(--vscode-tab-inactiveBackground)] border-l border-[var(--vscode-tab-border)]">
        <button
          onClick={() => showToast("Split Editor: Dual view active.")}
          className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"
          title="Split Editor Right (Ctrl+\)"
        >
          <VscSplitHorizontal size={14} />
        </button>
        <button
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setContextMenu({ x: rect.left, y: rect.bottom, tabId: tabs.find(t => t.isActive)?.id || tabs[0].id });
          }}
          className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"
          title="More Actions..."
        >
          <VscEllipsis size={14} />
        </button>
      </div>

      {/* Context Menu */}
      {contextMenu ? (
        <div
          className="fixed z-[300] min-w-[170px] bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] shadow-2xl py-1 text-[12px] animate-in fade-in zoom-in-95 duration-75"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {(() => {
            const tab = tabs.find((item) => item.id === contextMenu.tabId);
            if (!tab) return null;
            return (
              <div>
                <button
                  onClick={() => {
                    closeTab(tab.id, true);
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[var(--vscode-list-activeSelectionBackground)] hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeOtherTabs(tab.id);
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[var(--vscode-list-activeSelectionBackground)] hover:text-white transition-colors"
                >
                  Close Others
                </button>
                <button
                  onClick={() => {
                    closeAllTabs();
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[var(--vscode-list-activeSelectionBackground)] hover:text-white transition-colors"
                >
                  Close All
                </button>
                <div className="my-1 border-t border-[var(--vscode-border)]" />
                <button
                  onClick={() => {
                    togglePin(tab.id);
                    setContextMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[var(--vscode-list-activeSelectionBackground)] hover:text-white transition-colors"
                >
                  {tab.isPinned ? "Unpin Tab" : "Pin Tab"}
                </button>
              </div>
            );
          })()}
        </div>
      ) : null}

      {toast && (
        <div className="fixed top-20 right-6 bg-[#252526] border border-[#444] text-white text-[12px] px-3 py-1.5 rounded shadow-xl z-[400] font-mono animate-in fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
