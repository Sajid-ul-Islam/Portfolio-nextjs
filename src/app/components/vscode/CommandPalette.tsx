"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LuCornerDownLeft, LuSearch } from "react-icons/lu";
import { Command } from "cmdk";

import { cn } from "../../lib/cn";
import { filterSearchItems, getSearchItems } from "../../lib/search";
import { useRecentPagesContext } from "../../lib/recentPagesContext";
import { useTabs } from "../../lib/tabsContext";
import { useTheme } from "../../lib/themeContext";

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
  const { theme, setTheme } = useTheme();

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

    const themeItems: PaletteItem[] = [
      { id: "theme-tactical", title: "Color Theme: Tactical Dark (Default)", subtitle: "Preferences", typeLabel: "THEME", onSelect: () => setTheme("tactical-dark") },
      { id: "theme-vscode-dark", title: "Color Theme: VS Code Dark+", subtitle: "Preferences", typeLabel: "THEME", onSelect: () => setTheme("vscode-dark") },
      { id: "theme-vscode-light", title: "Color Theme: VS Code Light+", subtitle: "Preferences", typeLabel: "THEME", onSelect: () => setTheme("vscode-light") },
      { id: "theme-dracula", title: "Color Theme: Dracula", subtitle: "Preferences", typeLabel: "THEME", onSelect: () => setTheme("dracula") },
      { id: "theme-monokai", title: "Color Theme: Monokai", subtitle: "Preferences", typeLabel: "THEME", onSelect: () => setTheme("monokai") },
    ].filter((item) => {
      if (!normalized) return true;
      return item.title.toLowerCase().includes(normalized);
    });

    return [...themeItems, ...actionItems, ...recentItems, ...navItems];
  }, [baseItems, clearPages, closeAllTabs, query, recentPages, router, setTheme]);

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

    const handleCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setOpen(true);
      if (customEvent.detail) setQuery(customEvent.detail);
    };
    window.addEventListener("open-command-palette", handleCustomEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const handleSelect = (item: PaletteItem) => {
    item.onSelect();
    setOpen(false);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Palette"
      shouldFilter={false} // Uses your custom filterSearchItems instead
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 pt-24 p-4"
    >
      <div
        className="w-full max-w-2xl bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-[var(--vscode-border-radius-md)] shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--vscode-border)]">
          <LuSearch size={16} className="text-[var(--vscode-text-secondary)]" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            className="flex-1 bg-transparent text-vscode-base text-[var(--vscode-text-primary)] placeholder:text-[var(--vscode-text-muted)] focus:outline-none"
            placeholder="Type a command or search..."
          />
          <div className="flex items-center gap-1 text-vscode-xs text-[var(--vscode-text-secondary)]">
            <LuCornerDownLeft size={14} />
            Enter
          </div>
        </div>
        <Command.List className="max-h-[360px] overflow-y-auto py-2">
          <Command.Empty className="px-4 py-6 text-vscode-sm text-[var(--vscode-text-secondary)] text-center">
            No matches found.
          </Command.Empty>

          {items.map((item) => (
            <Command.Item
              key={item.id}
              value={item.id}
              onSelect={() => handleSelect(item)}
              className={cn(
                "px-4 py-2 flex items-center justify-between gap-3 cursor-pointer",
                "hover:bg-[var(--vscode-list-hoverBackground)] transition-colors",
                "aria-selected:bg-[var(--vscode-list-inactiveSelectionBackground)]"
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
            </Command.Item>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
