"use client";
import Image from "next/image";
import { LuMenu, LuMinus, LuSquare, LuX } from "react-icons/lu";

import { menuItems, siteMeta } from "../../data/portfolio";
import { cn } from "../../lib/cn";

type TitleBarProps = {
  onMenuClick?: () => void;
  isMobile?: boolean;
};

export default function TitleBar({ onMenuClick, isMobile }: TitleBarProps) {
  return (
    <header className="flex items-center justify-between h-[var(--vscode-titlebar-height)] bg-[var(--vscode-titleBar-activeBackground)] select-none">
      <div className="flex items-center h-full">
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
            <div className="flex items-center justify-center w-12 h-full">
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
                <button
                  key={item.label}
                  className={cn(
                    "px-3 h-full text-vscode-sm text-[var(--vscode-titleBar-activeForeground)]",
                    "hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </>
        )}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 text-vscode-sm text-[var(--vscode-titleBar-activeForeground)]">
        {siteMeta.name}
      </div>
      {!isMobile ? (
        <div className="flex items-center h-full">
          <button
            className="flex items-center justify-center w-12 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
            aria-label="Minimize"
          >
            <LuMinus size={16} className="text-[var(--vscode-titleBar-activeForeground)]" />
          </button>
          <button
            className="flex items-center justify-center w-12 h-full hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
            aria-label="Maximize"
          >
            <LuSquare size={12} className="text-[var(--vscode-titleBar-activeForeground)]" />
          </button>
          <button
            className="flex items-center justify-center w-12 h-full hover:bg-red-600 transition-colors"
            aria-label="Close"
            onClick={() => window.close()}
          >
            <LuX size={16} className="text-[var(--vscode-titleBar-activeForeground)]" />
          </button>
        </div>
      ) : null}
    </header>
  );
}
