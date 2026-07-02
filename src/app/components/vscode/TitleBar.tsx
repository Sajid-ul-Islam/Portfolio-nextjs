"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { LuMenu, LuMinus, LuSearch, LuSquare, LuX } from "react-icons/lu";
import { useRouter } from "next/navigation";

import { menuItems, siteMeta } from "@/app/data/portfolio";
import { useLayout } from "@/app/lib/layoutContext";
import { cn } from "@/lib/cn";

type TitleBarProps = {
  onMenuClick?: () => void;
  isMobile?: boolean;
};

const MENU_SHORTCUTS: Record<string, string> = {
  "New File": "Ctrl+N",
  "Open": "Ctrl+O",
  "Save": "Ctrl+S",
  "Undo": "Ctrl+Z",
  "Redo": "Ctrl+Y",
  "Cut": "Ctrl+X",
  "Copy": "Ctrl+C",
  "Paste": "Ctrl+V",
  "Explorer": "Ctrl+Shift+E",
  "Search": "Ctrl+Shift+F",
  "Terminal": "Ctrl+`",
  "AI Chat": "Ctrl+Alt+A",
};

export default function TitleBar({ onMenuClick, isMobile }: TitleBarProps) {
  const router = useRouter();
  const {
    workspaceState,
    setWorkspaceState,
    setSidebarOpen,
    setActiveActivity,
    showTerminal,
    setShowTerminal,
    showAIChat,
    setShowAIChat,
  } = useLayout();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleMenuClick = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const handleMaximize = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleAction = (action: string) => {
    setActiveMenu(null);
    
    // Panel Toggles
    if (action === "Explorer") {
      setSidebarOpen(true);
      setActiveActivity("explorer");
      return;
    }
    if (action === "Search") {
      setSidebarOpen(true);
      setActiveActivity("search");
      return;
    }
    if (action === "Terminal") {
      setShowTerminal(!showTerminal);
      return;
    }
    if (action === "AI Chat") {
      setShowAIChat(!showAIChat);
      return;
    }

    // Themes
    if (action === "Color Theme") {
      window.dispatchEvent(new CustomEvent('open-command-palette', { detail: 'Color Theme' }));
      return;
    }

    // New File / Save
    if (action === "New File") {
      router.push("/untitled");
      return;
    }
    if (action === "Save") {
      showNotification("Workspace preferences saved to LocalStorage.");
      return;
    }

    // Exit
    if (action === "Exit") {
      setWorkspaceState("closed");
      return;
    }

    // Clipboard/Text Actions
    if (["Cut", "Copy", "Paste"].includes(action)) {
      showNotification(`Clipboard action '${action}' simulated.`);
      return;
    }
    if (["Undo", "Redo"].includes(action)) {
      showNotification(`History action '${action}' simulated.`);
      return;
    }

    showNotification(`Action: ${action} executed.`);
  };

  return (
    <header className="flex items-center justify-between h-[var(--vscode-titlebar-height)] bg-[var(--vscode-titleBar-activeBackground)] select-none relative z-[100]">
      <div className="flex items-center h-full" ref={menuRef}>
        {isMobile ? (
          <div className="flex items-center h-full">
            <button
              onClick={onMenuClick}
              className="flex items-center justify-center w-12 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
              aria-label="Toggle menu"
            >
              <LuMenu size={18} className="text-[var(--vscode-titleBar-activeForeground)]" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center w-10 h-full">
              <svg className="w-4 h-4 text-[#007acc]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.984 6.27a.545.545 0 0 0-.333-.186L17.82.2a.548.548 0 0 0-.655.132L12.38 5.17l-3.32-2.5a.546.546 0 0 0-.616-.017L.6 8.163a.546.546 0 0 0-.022.909l5.068 4.398L.58 17.868a.546.546 0 0 0 .022.91l7.813 5.51a.546.546 0 0 0 .616-.016l3.32-2.5 4.77 4.839a.548.548 0 0 0 .656.132l5.82-5.885a.546.546 0 0 0 .333-.185.539.539 0 0 0 .09-.364V6.634a.539.539 0 0 0-.09-.364zM18.064 12l-4.526 3.447V8.553L18.064 12zm.05-5.218l4.526 4.161-4.526 4.593V6.782zM1.385 8.67l7.009 6.082 3.844-2.927-3.844-2.927L1.385 8.67zm12.153 6.777l4.526-3.447v7.838l-4.526-4.391z"/>
              </svg>
            </div>
            <nav className="flex items-center h-full">
              {menuItems.map((item) => (
                <div key={item.label} className="relative h-full">
                  <button
                    onClick={() => handleMenuClick(item.label)}
                    onMouseEnter={() => activeMenu && setActiveMenu(item.label)}
                    className={cn(
                      "px-3 h-full text-[12px] text-[var(--vscode-titleBar-activeForeground)]",
                      "hover:bg-[var(--vscode-list-hoverBackground)] transition-colors",
                      activeMenu === item.label && "bg-[var(--vscode-list-hoverBackground)]"
                    )}
                  >
                    {item.label}
                  </button>

                  {activeMenu === item.label && (
                    <div className="absolute top-full left-0 w-64 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] shadow-2xl py-1 z-[200] animate-in fade-in zoom-in-95 duration-100">
                      {item.items.map((subItem, idx) => {
                        if (subItem === "---") return <div key={idx} className="my-1 border-t border-white/5" />;
                        return (
                          <button
                            key={subItem}
                            onClick={() => handleAction(subItem)}
                            className="w-full h-8 flex items-center justify-between px-4 text-[12px] text-gray-400 hover:bg-[var(--vscode-list-activeSelectionBackground)] hover:text-white transition-colors group"
                          >
                            <span>{subItem}</span>
                            <span className="text-[10px] text-gray-600 group-hover:text-gray-300">
                              {MENU_SHORTCUTS[subItem] || ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </>
        )}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[var(--vscode-titleBar-activeForeground)] font-medium pointer-events-none opacity-80 hidden sm:block">
        {siteMeta.name} — Visual Studio Code
      </div>

      {toast && (
        <div className="absolute top-10 right-4 bg-[#252526] border border-[#444] text-white text-vscode-xs px-4 py-2 rounded shadow-2xl z-[200] animate-in fade-in duration-200">
          {toast}
        </div>
      )}

      {!isMobile ? (
        <div className="flex items-center h-full">
          <button
            onClick={() => setWorkspaceState("minimized")}
            className="flex items-center justify-center w-10 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors group"
            aria-label="Minimize"
          >
            <LuMinus size={14} className="text-[var(--vscode-titleBar-activeForeground)] group-hover:text-white" />
          </button>
          <button
            onClick={handleMaximize}
            className="flex items-center justify-center w-10 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors group"
            aria-label="Maximize"
          >
            <LuSquare size={10} className="text-[var(--vscode-titleBar-activeForeground)] group-hover:text-white" />
          </button>
          <button
            className="flex items-center justify-center w-12 h-full hover:bg-red-600 transition-colors group"
            aria-label="Close"
            onClick={() => setWorkspaceState("closed")}
          >
            <LuX size={16} className="text-[var(--vscode-titleBar-activeForeground)] group-hover:text-white" />
          </button>
        </div>
      ) : (
        <div className="flex items-center h-full">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="flex items-center justify-center w-10 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
            aria-label="Search"
          >
            <LuSearch size={16} className="text-[var(--vscode-titleBar-activeForeground)]" />
          </button>
        </div>
      )}
    </header>
  );
}
