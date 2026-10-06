"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  VscSearch,
  VscArrowLeft,
  VscArrowRight,
  VscLayoutSidebarLeft,
  VscLayoutPanel,
  VscLayoutSidebarRight,
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeRestore,
  VscChromeClose,
} from "react-icons/vsc";
import { LuMenu } from "react-icons/lu";

import { menuItems } from "@/app/data/portfolio";
import { useLayout } from "@/app/lib/layoutContext";
import { cn } from "@/lib/cn";
import { soundFx } from "@/app/lib/soundFx";

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
  "Command Palette": "Ctrl+Shift+P",
  "Color Theme": "Ctrl+K Ctrl+T",
};

export default function TitleBar({ onMenuClick, isMobile }: TitleBarProps) {
  const router = useRouter();
  const {
    setWorkspaceState,
    sidebarOpen,
    setSidebarOpen,
    setActiveActivity,
    showTerminal,
    setShowTerminal,
    showAIChat,
    setShowAIChat,
  } = useLayout();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

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
    soundFx.playClick();
    setActiveMenu(activeMenu === label ? null : label);
  };

  const handleMenuMouseEnter = (label: string) => {
    if (activeMenu !== null) {
      soundFx.playClick();
      setActiveMenu(label);
    }
  };

  const handleMaximize = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleAction = (action: string) => {
    soundFx.playClick();
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

    // Themes & Command Palette
    if (action === "Color Theme" || action === "Command Palette") {
      window.dispatchEvent(new CustomEvent("open-command-palette", { detail: action }));
      return;
    }

    // New File / Save
    if (action === "New File") {
      router.push("/contact");
      return;
    }
    if (action === "Save") {
      showNotification("Workspace state synced to local memory.");
      return;
    }

    // Exit
    if (action === "Exit") {
      setWorkspaceState("closed");
      return;
    }

    // Clipboard/Text Actions
    if (["Cut", "Copy", "Paste"].includes(action)) {
      showNotification(`Simulated ${action} action.`);
      return;
    }
    if (["Undo", "Redo"].includes(action)) {
      showNotification(`Simulated ${action} action.`);
      return;
    }

    showNotification(`Executed: ${action}`);
  };

  return (
    <header className="flex items-center justify-between h-[var(--vscode-titlebar-height)] bg-[var(--vscode-titleBar-activeBackground)] text-[var(--vscode-titleBar-activeForeground)] select-none relative z-[100] border-b border-black/20 font-sans">
      {/* Left: VS Code Icon & Native Menu Bar */}
      <div className="flex items-center h-full min-w-0" ref={menuRef}>
        {isMobile ? (
          <div className="flex items-center h-full">
            <button
              onClick={onMenuClick}
              className="flex items-center justify-center w-10 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
              aria-label="Toggle menu"
            >
              <LuMenu size={18} className="text-[var(--vscode-titleBar-activeForeground)]" />
            </button>
          </div>
        ) : (
          <>
            {/* VS Code Official Logo Icon */}
            <div
              className="flex items-center justify-center w-9 h-full pl-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                soundFx.playCommandPing();
                window.dispatchEvent(new CustomEvent("open-command-palette"));
              }}
              title="Visual Studio Code — Sajid Islam Portfolio"
            >
              <svg className="w-4 h-4 text-[#007acc]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.984 6.27a.545.545 0 0 0-.333-.186L17.82.2a.548.548 0 0 0-.655.132L12.38 5.17l-3.32-2.5a.546.546 0 0 0-.616-.017L.6 8.163a.546.546 0 0 0-.022.909l5.068 4.398L.58 17.868a.546.546 0 0 0 .022.91l7.813 5.51a.546.546 0 0 0 .616-.016l3.32-2.5 4.77 4.839a.548.548 0 0 0 .656.132l5.82-5.885a.546.546 0 0 0 .333-.185.539.539 0 0 0 .09-.364V6.634a.539.539 0 0 0-.09-.364zM18.064 12l-4.526 3.447V8.553L18.064 12zm.05-5.218l4.526 4.161-4.526 4.593V6.782zM1.385 8.67l7.009 6.082 3.844-2.927-3.844-2.927L1.385 8.67zm12.153 6.777l4.526-3.447v7.838l-4.526-4.391z"/>
              </svg>
            </div>

            {/* Desktop Menu Items */}
            <nav className="flex items-center h-full">
              {menuItems.map((item) => (
                <div key={item.label} className="relative h-full">
                  <button
                    onClick={() => handleMenuClick(item.label)}
                    onMouseEnter={() => handleMenuMouseEnter(item.label)}
                    className={cn(
                      "px-2.5 h-full text-[12px] text-[var(--vscode-titleBar-activeForeground)]",
                      "hover:bg-[var(--vscode-list-hoverBackground)] hover:text-white transition-colors duration-75",
                      activeMenu === item.label && "bg-[var(--vscode-list-hoverBackground)] text-white"
                    )}
                  >
                    {item.label}
                  </button>

                  {activeMenu === item.label && (
                    <div className="absolute top-full left-0 min-w-[220px] bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] shadow-2xl py-1 z-[250] animate-in fade-in zoom-in-95 duration-75 text-[12px]">
                      {item.items.map((subItem, idx) => {
                        if (subItem === "---") {
                          return <div key={idx} className="my-1 border-t border-[var(--vscode-border)] opacity-60" />;
                        }
                        return (
                          <button
                            key={subItem}
                            onClick={() => handleAction(subItem)}
                            className="w-full h-7 flex items-center justify-between px-3 text-[12px] text-gray-300 hover:bg-[var(--vscode-list-activeSelectionBackground)] hover:text-white transition-colors group"
                          >
                            <span>{subItem}</span>
                            <span className="text-[10px] text-gray-500 group-hover:text-gray-200 font-mono">
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

      {/* Center: Authentic Desktop VS Code Command Search Bar */}
      <div className="hidden md:flex items-center justify-center flex-1 max-w-[560px] mx-2">
        <div className="flex items-center gap-1 mr-2 text-gray-400">
          <button
            onClick={() => router.back()}
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            title="Go Back (Alt+LeftArrow)"
          >
            <VscArrowLeft size={13} />
          </button>
          <button
            onClick={() => router.forward()}
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            title="Go Forward (Alt+RightArrow)"
          >
            <VscArrowRight size={13} />
          </button>
        </div>

        <div
          onClick={() => {
            soundFx.playCommandPing();
            window.dispatchEvent(new CustomEvent("open-command-palette"));
          }}
          className="flex-1 flex items-center justify-between h-6 px-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[var(--vscode-focusBorder)] rounded-[4px] cursor-pointer transition-all shadow-inner group"
          title="Type to search files and run commands (Ctrl+P)"
        >
          <div className="flex items-center gap-2 truncate text-[11px] text-gray-300">
            <VscSearch size={12} className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
            <span className="truncate group-hover:text-white transition-colors">
              Portfolio-nextjs [Workspace] — Sajid Islam
            </span>
          </div>
          <span className="text-[9px] font-mono text-gray-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded leading-none flex-shrink-0 ml-2 group-hover:border-[var(--vscode-focusBorder)]">
            Ctrl+P
          </span>
        </div>
      </div>

      {/* Right: Layout Controls & Native Windows Window Actions */}
      <div className="flex items-center h-full flex-shrink-0">
        {!isMobile && (
          <div className="flex items-center h-full mr-1">
            {/* Turbo Overclock Futuristic Toggle */}
            <button
              onClick={() => {
                soundFx.playGlitch();
                document.documentElement.classList.toggle("overclock-active");
                showNotification("⚡ OVERCLOCK // QUANTUM PROTOCOL TOGGLED");
              }}
              className="flex items-center gap-1 px-2 h-6 text-[10px] font-mono font-bold text-[var(--vscode-accent)] bg-[var(--vscode-accent)]/10 hover:bg-[var(--vscode-accent)] hover:text-black rounded border border-[var(--vscode-accent)]/30 mr-1.5 transition-all"
              title="Toggle Cyber Overclock Mode"
            >
              <span>⚡ TURBO</span>
            </button>

            {/* Toggle Primary Sidebar (Explorer/Search) */}
            <button
              onClick={() => {
                soundFx.playClick();
                setSidebarOpen(!sidebarOpen);
              }}
              className={cn(
                "flex items-center justify-center w-7 h-6 rounded hover:bg-white/10 transition-colors",
                sidebarOpen ? "text-[var(--vscode-titleBar-activeForeground)]" : "text-gray-500 hover:text-gray-300"
              )}
              title="Toggle Primary Side Bar (Ctrl+B)"
            >
              <VscLayoutSidebarLeft size={14} />
            </button>

            {/* Toggle Bottom Panel (Terminal) */}
            <button
              onClick={() => {
                soundFx.playClick();
                setShowTerminal(!showTerminal);
              }}
              className={cn(
                "flex items-center justify-center w-7 h-6 rounded hover:bg-white/10 transition-colors",
                showTerminal ? "text-[var(--vscode-titleBar-activeForeground)]" : "text-gray-500 hover:text-gray-300"
              )}
              title="Toggle Panel (Ctrl+`)"
            >
              <VscLayoutPanel size={14} />
            </button>

            {/* Toggle Secondary Sidebar (AI Assistant) */}
            <button
              onClick={() => {
                soundFx.playClick();
                setShowAIChat(!showAIChat);
              }}
              className={cn(
                "flex items-center justify-center w-7 h-6 rounded hover:bg-white/10 transition-colors mr-2",
                showAIChat ? "text-[var(--vscode-accent)]" : "text-gray-500 hover:text-gray-300"
              )}
              title="Toggle AI Copilot (Ctrl+Alt+A)"
            >
              <VscLayoutSidebarRight size={14} />
            </button>
          </div>
        )}

        {/* Windows 11/10 Standard Window Controls */}
        {!isMobile ? (
          <div className="flex items-center h-full">
            <button
              onClick={() => {
                soundFx.playClick();
                setWorkspaceState("minimized");
              }}
              className="flex items-center justify-center w-[46px] h-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
              aria-label="Minimize"
              title="Minimize"
            >
              <VscChromeMinimize size={13} />
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                handleMaximize();
              }}
              className="flex items-center justify-center w-[46px] h-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
              aria-label={isFullscreen ? "Restore" : "Maximize"}
              title={isFullscreen ? "Restore" : "Maximize"}
            >
              {isFullscreen ? <VscChromeRestore size={13} /> : <VscChromeMaximize size={13} />}
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setWorkspaceState("closed");
              }}
              className="flex items-center justify-center w-[46px] h-full hover:bg-[#e81123] hover:text-white transition-colors text-gray-300"
              aria-label="Close"
              title="Close"
            >
              <VscChromeClose size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              soundFx.playCommandPing();
              window.dispatchEvent(new CustomEvent("open-command-palette"));
            }}
            className="flex items-center justify-center w-10 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
            aria-label="Search"
          >
            <VscSearch size={15} className="text-[var(--vscode-titleBar-activeForeground)]" />
          </button>
        )}
      </div>

      {/* Ephemeral Toast Notification */}
      {toast && (
        <div className="fixed top-11 right-4 bg-[#252526] border border-[#444] text-white text-[12px] px-3.5 py-1.5 rounded-md shadow-2xl z-[300] animate-in fade-in duration-150 font-mono">
          {toast}
        </div>
      )}
    </header>
  );
}
