"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  VscChevronDown,
  VscChevronRight,
  VscNewFile,
  VscNewFolder,
  VscRefresh,
  VscCollapseAll,
  VscSymbolClass,
  VscHistory,
} from "react-icons/vsc";

import { fileTree } from "../../../data/portfolio";
import { cn } from "../../../lib/cn";
import FileIcon from "../FileIcon";
import { soundFx } from "@/app/lib/soundFx";

type ExplorerPanelProps = {
  onClose?: () => void;
};

export default function ExplorerPanel({ onClose }: ExplorerPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sections, setSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {
      workspace: true,
      outline: false,
      timeline: false,
    };
    fileTree.forEach((section) => {
      initial[section.id] = section.isOpen;
    });
    return initial;
  });

  const [outlineOpen, setOutlineOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  const toggleSection = (id: string) => {
    soundFx.playClick();
    setSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const collapseAll = () => {
    soundFx.playClick();
    setSections((prev) => {
      const next: Record<string, boolean> = { workspace: true };
      Object.keys(prev).forEach((k) => (next[k] = false));
      return next;
    });
    setOutlineOpen(false);
    setTimelineOpen(false);
  };

  const refreshExplorer = () => {
    soundFx.playCommandPing();
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Keep the active file's section open
  useEffect(() => {
    let activeSection: string | null = null;
    for (const section of fileTree) {
      if (section.items.some((i) => pathname === i.href || (i.href !== "/" && pathname.startsWith(i.href)))) {
        activeSection = section.id;
        break;
      }
    }
    if (activeSection) {
      setSections((prev) => ({ ...prev, [activeSection as string]: true }));
    }
  }, [pathname]);

  useEffect(() => {
    if (activeLinkRef.current) {
      activeLinkRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [pathname]);

  return (
    <div className="flex flex-col h-full overflow-hidden select-none text-[13px] font-sans">
      {/* Workspace Header with Real VS Code Action Icons */}
      <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-[var(--vscode-sideBar-foreground)] tracking-wider group hover:bg-[var(--vscode-list-hoverBackground)] cursor-pointer">
        <span className="truncate uppercase">Portfolio-NextJS [Workspace]</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              router.push("/contact");
            }}
            className="p-1 hover:text-white rounded hover:bg-white/10"
            title="New File (Ctrl+N)"
          >
            <VscNewFile size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
            }}
            className="p-1 hover:text-white rounded hover:bg-white/10"
            title="New Folder"
          >
            <VscNewFolder size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              refreshExplorer();
            }}
            className={cn("p-1 hover:text-white rounded hover:bg-white/10", isRefreshing && "animate-spin")}
            title="Refresh Explorer"
          >
            <VscRefresh size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              collapseAll();
            }}
            className="p-1 hover:text-white rounded hover:bg-white/10"
            title="Collapse Folders in Explorer"
          >
            <VscCollapseAll size={14} />
          </button>
        </div>
      </div>

      {/* Main File Tree */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-editor-scroll">
        {fileTree.map((section) => {
          const open = sections[section.id];
          return (
            <div key={section.id} className="mb-0.5">
              <button
                onClick={() => toggleSection(section.id)}
                className={cn(
                  "flex items-center w-full px-2 py-0.5 gap-1",
                  "text-[11px] font-bold tracking-wider uppercase",
                  "text-[var(--vscode-text-secondary)]",
                  "hover:bg-[var(--vscode-list-hoverBackground)] hover:text-white transition-colors"
                )}
              >
                {open ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
                <span className="truncate">{section.label}</span>
              </button>

              {open ? (
                <div className="animate-in fade-in duration-100">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href));
                    const filename = `${item.label}.${item.extension}`;
                    return (
                      <Link
                        key={item.id}
                        ref={isActive ? activeLinkRef : undefined}
                        href={item.href}
                        onClick={() => {
                          soundFx.playTabSwitch();
                          onClose?.();
                        }}
                        className={cn(
                          "flex items-center gap-2 py-[3px] pr-2 relative text-[13px] leading-5",
                          item.indent ? "pl-7" : "pl-5",
                          "text-[var(--vscode-sideBar-foreground)]",
                          "hover:bg-[var(--vscode-list-hoverBackground)] hover:text-white transition-colors",
                          "cursor-pointer",
                          isActive
                            ? "bg-[var(--vscode-list-activeSelectionBackground)] text-white font-medium"
                            : ""
                        )}
                      >
                        {/* Tree Indentation Guide Line */}
                        {item.indent && (
                          <span className="absolute left-[18px] top-0 bottom-0 w-[1px] bg-white/10" />
                        )}
                        <FileIcon filename={filename} size={15} />
                        <span className="truncate">{filename}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}

        {/* Collapsible Outline Accordion */}
        <div className="border-t border-white/5 mt-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setOutlineOpen(!outlineOpen);
            }}
            className="flex items-center w-full px-2 py-1 gap-1 text-[11px] font-bold tracking-wider uppercase text-[var(--vscode-text-secondary)] hover:bg-[var(--vscode-list-hoverBackground)] hover:text-white transition-colors"
          >
            {outlineOpen ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
            <span>Outline</span>
          </button>
          {outlineOpen && (
            <div className="px-5 py-1 text-[12px] space-y-1 text-gray-400">
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer py-0.5">
                <VscSymbolClass size={13} className="text-[#007acc]" />
                <span>ExecutiveSummary</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer py-0.5">
                <VscSymbolClass size={13} className="text-[#a3e635]" />
                <span>CoreCompetencies</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer py-0.5">
                <VscSymbolClass size={13} className="text-[#e5c07b]" />
                <span>ProjectShowcase</span>
              </div>
            </div>
          )}
        </div>

        {/* Collapsible Timeline Accordion */}
        <div className="border-t border-white/5">
          <button
            onClick={() => {
              soundFx.playClick();
              setTimelineOpen(!timelineOpen);
            }}
            className="flex items-center w-full px-2 py-1 gap-1 text-[11px] font-bold tracking-wider uppercase text-[var(--vscode-text-secondary)] hover:bg-[var(--vscode-list-hoverBackground)] hover:text-white transition-colors"
          >
            {timelineOpen ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
            <span>Timeline</span>
          </button>
          {timelineOpen && (
            <div className="px-5 py-1 text-[12px] space-y-1 text-gray-400">
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer py-0.5">
                <VscHistory size={13} className="text-emerald-400" />
                <span>feat(quantum): cybrcraft live v2099</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer py-0.5">
                <VscHistory size={13} className="text-emerald-400" />
                <span>fix(theme): authentic vscode chrome</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
