"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { LuMenu, LuMinus, LuSquare, LuX, LuChevronRight } from "react-icons/lu";

import { menuItems, siteMeta } from "../../data/portfolio";
import { cn } from "../../lib/cn";

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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
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

  const handleMenuClick = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const handleAction = (action: string) => {
    console.log(`Action: ${action}`);
    setActiveMenu(null);
    if (action === "Exit") window.location.reload();
  };

  return (
    <header className="flex items-center justify-between h-[var(--vscode-titlebar-height)] bg-[var(--vscode-titleBar-activeBackground)] select-none relative z-[100]">
      <div className="flex items-center h-full" ref={menuRef}>
        {isMobile ? (
          <button
            onClick={onMenuClick}
            className="flex items-center justify-center w-12 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
            aria-label="Toggle menu"
          >
            <LuMenu size={18} className="text-[var(--vscode-titleBar-activeForeground)]" />
          </button>
        ) : (
          <>
            <div className="flex items-center justify-center w-10 h-full">
              <Image
                src="https://img.icons8.com/color/96/000000/visual-studio-code-2019.png"
                alt="VS Code"
                width={16}
                height={16}
                className="w-4 h-4"
              />
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
      
      <div className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[var(--vscode-titleBar-activeForeground)] font-medium pointer-events-none opacity-80">
        {siteMeta.name} — Tactical Dossier
      </div>

      {!isMobile ? (
        <div className="flex items-center h-full">
          <button
            className="flex items-center justify-center w-10 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors group"
            aria-label="Minimize"
          >
            <LuMinus size={14} className="text-[var(--vscode-titleBar-activeForeground)] group-hover:text-white" />
          </button>
          <button
            className="flex items-center justify-center w-10 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors group"
            aria-label="Maximize"
          >
            <LuSquare size={10} className="text-[var(--vscode-titleBar-activeForeground)] group-hover:text-white" />
          </button>
          <button
            className="flex items-center justify-center w-12 h-full hover:bg-red-600 transition-colors group"
            aria-label="Close"
            onClick={() => window.location.reload()}
          >
            <LuX size={16} className="text-[var(--vscode-titleBar-activeForeground)] group-hover:text-white" />
          </button>
        </div>
      ) : null}
    </header>
  );
}
