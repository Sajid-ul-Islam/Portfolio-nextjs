"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "../../lib/cn";
import { useRecentPages } from "../../lib/useRecentPages";
import { useViewport } from "../../lib/useViewport";
import ActivityBar from "./ActivityBar";
import EditorShell from "./EditorShell";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import TitleBar from "./TitleBar";

type VSCodeShellProps = {
  children: React.ReactNode;
};

export default function VSCodeShell({ children }: VSCodeShellProps) {
  const { isMobile, isMounted } = useViewport();
  const pathname = usePathname();
  const { addPage } = useRecentPages();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeActivity, setActiveActivity] = useState("explorer");

  useEffect(() => {
    if (isMounted && isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile, isMounted]);

  useEffect(() => {
    if (pathname) {
      addPage(pathname);
    }
  }, [pathname, addPage]);

  if (!isMounted) {
    return <div className="h-screen bg-[var(--vscode-editor-background)]" />;
  }

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <TitleBar
          onMenuClick={() => setSidebarOpen((open) => !open)}
          isMobile
        />
        {sidebarOpen ? (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed top-[var(--vscode-titlebar-height)] left-0 bottom-[var(--vscode-statusbar-height)] z-50">
              <Sidebar isOpen onClose={() => setSidebarOpen(false)} />
            </div>
          </>
        ) : null}
        <div className="flex-1 overflow-hidden">
          <EditorShell>{children}</EditorShell>
        </div>
        <StatusBar />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid h-screen overflow-hidden",
        "grid-rows-[var(--vscode-titlebar-height)_1fr_var(--vscode-statusbar-height)]",
        sidebarOpen
          ? "grid-cols-[var(--vscode-activitybar-width)_var(--vscode-sidebar-width)_1fr]"
          : "grid-cols-[var(--vscode-activitybar-width)_0_1fr]"
      )}
    >
      <div className="col-span-3">
        <TitleBar />
      </div>
      <ActivityBar
        activeItem={activeActivity}
        onItemClick={(id) => {
          if (id === "explorer") {
            setSidebarOpen((open) => !open);
          }
          setActiveActivity(id);
        }}
      />
      <div className={cn("overflow-hidden transition-all duration-200", !sidebarOpen && "w-0")}>
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <EditorShell>{children}</EditorShell>
      <div className="col-span-3">
        <StatusBar />
      </div>
    </div>
  );
}
