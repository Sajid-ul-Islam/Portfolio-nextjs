"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LuCornerDownLeft, LuSearch } from "react-icons/lu";

import { cn } from "../../lib/cn";
import { filterSearchItems, getSearchItems } from "../../lib/search";
import { useRecentPagesContext } from "../../lib/recentPagesContext";
import { useTabs } from "../../lib/tabsContext";

type PaletteItem = {
  id: string;
  title: string;
  subtitle?: string;
  typeLabel: string;
  onSelect: () => void;
};

export default function CommandPalette() {
  const router = useRouter();
  const { recentPages, clearPages } = useRecentPagesContext();
  const { closeAllTabs } = useTabs();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const baseItems = useMemo(() => getSearchItems(), []);

  const items = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matches = normalized
      ? filterSearchItems(baseItems, normalized)
      : baseItems;

    const navItems: PaletteItem[] = matches.slice(0, 10).map((item) => ({
      id: `nav-${item.id}`,
      title: item.title,
      subtitle: item.subtitle,
      typeLabel: item.type.toUpperCase(),
      onSelect: () => {
        if (item.external) {
          window.open(item.href, "_blank", "noopener,noreferrer");
        } else {
          router.push(item.href);
        }
      },
    }));

    const recentItems: PaletteItem[] = recentPages
      .filter((path) => {
        if (!normalized) return true;
        return path.toLowerCase().includes(normalized);
      })
      .slice(0, 5)
      .map((path) => ({
        id: `recent-${path}`,
        title: path === "/" ? "Welcome.tsx" : path.slice(1),
        subtitle: "Recent",
        typeLabel: "RECENT",
        onSelect: () => router.push(path),
      }));

    const actionItems: PaletteItem[] = [
      {
        id: "action-clear-recent",
        title: "Clear Recent Pages",
        subtitle: "Workspace",
        typeLabel: "ACTION",
        onSelect: clearPages,
      },
      {
        id: "action-close-tabs",
        title: "Close All Tabs",
        subtitle: "Workspace",
        typeLabel: "ACTION",
        onSelect: closeAllTabs,
      },
    ].filter((item) => {
      if (!normalized) return true;
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.subtitle?.toLowerCase().includes(normalized)
      );
    });

    return [...actionItems, ...recentItems, ...navItems];
  }, [baseItems, clearPages, closeAllTabs, query, recentPages, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(items.length - 1, 0)));
  }, [items.length]);

  const handleSelect = (item: PaletteItem) => {
    item.onSelect();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 pt-24"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-2xl mx-4 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-[var(--vscode-border-radius-md)] shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--vscode-border)]">
          <LuSearch size={16} className="text-[var(--vscode-text-secondary)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((index) =>
                  Math.min(index + 1, Math.max(items.length - 1, 0))
                );
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((index) => Math.max(index - 1, 0));
              }
              if (event.key === "Enter" && items[activeIndex]) {
                event.preventDefault();
                handleSelect(items[activeIndex]);
              }
            }}
            className="flex-1 bg-transparent text-vscode-base text-[var(--vscode-text-primary)] placeholder:text-[var(--vscode-text-muted)] focus:outline-none"
            placeholder="Type a command or search..."
            aria-label="Command palette input"
          />
          <div className="flex items-center gap-1 text-vscode-xs text-[var(--vscode-text-secondary)]">
            <LuCornerDownLeft size={14} />
            Enter
          </div>
        </div>
        <div className="max-h-[360px] overflow-y-auto">
          {items.length === 0 ? (
            <div className="px-4 py-6 text-vscode-sm text-[var(--vscode-text-secondary)]">
              No matches found.
            </div>
          ) : (
            <ul className="py-2">
              {items.map((item, index) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "w-full text-left px-4 py-2 flex items-center justify-between gap-3",
                      "hover:bg-[var(--vscode-list-hoverBackground)] transition-colors",
                      index === activeIndex &&
                        "bg-[var(--vscode-list-inactiveSelectionBackground)]"
                    )}
                  >
                    <div>
                      <div className="text-vscode-sm text-[var(--vscode-text-primary)]">
                        {item.title}
                      </div>
                      {item.subtitle ? (
                        <div className="text-vscode-xs text-[var(--vscode-text-secondary)]">
                          {item.subtitle}
                        </div>
                      ) : null}
                    </div>
                    <span className="px-2 py-0.5 border border-[var(--vscode-border)] rounded text-vscode-xs text-[var(--vscode-text-secondary)]">
                      {item.typeLabel}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
