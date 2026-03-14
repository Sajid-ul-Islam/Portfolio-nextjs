"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

import { fileTree } from "../../../data/portfolio";
import { cn } from "../../../lib/cn";
import FileIcon from "../FileIcon";

type ExplorerPanelProps = {
  onClose?: () => void;
};

export default function ExplorerPanel({ onClose }: ExplorerPanelProps) {
  const pathname = usePathname();
  const [sections, setSections] = useState(() => {
    const initial: Record<string, boolean> = {};
    fileTree.forEach((section) => {
      initial[section.id] = section.isOpen;
    });
    return initial;
  });

  const toggleSection = (id: string) => {
    setSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {fileTree.map((section) => {
        const open = sections[section.id];
        return (
          <div key={section.id} className="mb-1">
            <button
              onClick={() => toggleSection(section.id)}
              className={cn(
                "flex items-center w-full px-2 py-1 gap-1",
                "text-vscode-xs font-semibold uppercase tracking-wider",
                "text-[var(--vscode-text-secondary)]",
                "hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
              )}
            >
              {open ? <LuChevronDown size={16} /> : <LuChevronRight size={16} />}
              <span>{section.label}</span>
            </button>
            {open ? (
              <div className="animate-fade-in">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));
                  const filename = `${item.label}.${item.extension}`;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-2 px-4 py-[5px] pl-6",
                        "text-vscode-sm text-[var(--vscode-sideBar-foreground)]",
                        "hover:bg-[var(--vscode-list-hoverBackground)] transition-colors",
                        "cursor-pointer",
                        isActive &&
                          "bg-[var(--vscode-list-inactiveSelectionBackground)]"
                      )}
                    >
                      <FileIcon filename={filename} size={16} />
                      <span className="truncate">{filename}</span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
