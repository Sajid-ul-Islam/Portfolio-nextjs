"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Tabs from "./Tabs";
import Breadcrumbs from "./Breadcrumbs";
import CommandPalette from "./CommandPalette";

// Remember scroll position per route so navigating between tabs restores editor scroll
const scrollPositions = new Map<string, number>();

type EditorShellProps = {
  children: React.ReactNode;
};

export default function EditorShell({ children }: EditorShellProps) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore saved scroll for this route after content mounts
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const saved = scrollPositions.get(pathname) ?? 0;
    el.scrollTop = saved;
  }, [pathname]);

  // Save scroll on scroll (throttled via rAF) and on unmount/route change
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        scrollPositions.set(pathname, el.scrollTop);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--vscode-editor-background)]">
      <Tabs />
      <Breadcrumbs />
      <main ref={scrollRef} className="flex flex-col flex-1 overflow-auto min-h-0 custom-editor-scroll border-t border-white/5 bg-[var(--vscode-editor-background)] relative">
        <div className="flex flex-col flex-1 w-full min-h-full animate-fade-in duration-500">
          {children}
        </div>
      </main>
      <CommandPalette />
    </div>
  );
}
