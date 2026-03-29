"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

import { cn } from "../../lib/cn";
import { useLocalStorage } from "../../lib/useLocalStorage";
import {
  RecentPagesProvider,
  useRecentPagesContext,
} from "../../lib/recentPagesContext";
import { TabsProvider } from "../../lib/tabsContext";
import { useViewport } from "../../lib/useViewport";
import ActivityBar from "./ActivityBar";
import EditorShell from "./EditorShell";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import TitleBar from "./TitleBar";
import Terminal from "./Terminal";
import AIChat from "./AIChat";

type VSCodeShellProps = {
  children: React.ReactNode;
};

type ActivityId =
  | "explorer"
  | "search"
  | "git"
  | "extensions"
  | "account"
  | "settings"
  | "terminal"
  | "chat";

const mobileItems = [
  { id: "explorer", icon: "files", label: "Explorer" },
  { id: "search", icon: "search", label: "Search" },
  { id: "git", icon: "git-branch", label: "Source Control" },
  { id: "extensions", icon: "blocks", label: "Extensions" },
  { id: "settings", icon: "settings", label: "Settings" },
] as const;

function VSCodeShellContent({ children }: VSCodeShellProps) {
  const { isMobile, isMounted } = useViewport();
  const pathname = usePathname();
  const { addPage } = useRecentPagesContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeActivity, setActiveActivity] =
    useState<ActivityId>("explorer");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useLocalStorage<number>(
    "vscodeSidebarWidth",
    256
  );
  const resizeState = useRef<{ startX: number; startWidth: number } | null>(
    null
  );
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (isMounted && isMobile) {
      setSidebarOpen(false);
      setMobileDrawerOpen(false);
    }
  }, [isMobile, isMounted]);

  useEffect(() => {
    if (pathname) {
      addPage(pathname);
    }
  }, [pathname, addPage]);

  useEffect(() => {
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  }, [isMobile, pathname]);

  const handleActivityClick = (id: ActivityId) => {
    if (isMobile) {
      if (activeActivity === id) {
        setMobileDrawerOpen((open) => !open);
      } else {
        setActiveActivity(id);
        setMobileDrawerOpen(true);
      }
      return;
    }

    if (id === 'terminal') {
      setShowTerminal(!showTerminal);
      return;
    }
    if (id === 'chat') {
      setShowAIChat(!showAIChat);
      return;
    }

    setActiveActivity(id);
    if (activeActivity === id) {
      setSidebarOpen((open) => !open);
    } else {
      setSidebarOpen(true);
    }
  };

  const activatePanel = useCallback((id: ActivityId) => {
    setActiveActivity(id);
    setSidebarOpen(true);
  }, []);

  const toggleExplorer = useCallback(() => {
    if (activeActivity === "explorer") {
      setSidebarOpen((open) => !open);
    } else {
      activatePanel("explorer");
    }
  }, [activeActivity]);

  useEffect(() => {
    if (!isResizing) return;
    const handleMove = (event: MouseEvent) => {
      if (!resizeState.current) return;
      const delta = event.clientX - resizeState.current.startX;
      const nextWidth = Math.min(
        420,
        Math.max(200, resizeState.current.startWidth + delta)
      );
      setSidebarWidth(nextWidth);
    };
    const handleUp = () => {
      setIsResizing(false);
      resizeState.current = null;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isResizing, setSidebarWidth]);

  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isEditable =
        tag === "input" ||
        tag === "textarea" ||
        target?.isContentEditable;
      if (isEditable) return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleExplorer();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
        const key = event.key.toLowerCase();
        if (key === "f") {
          event.preventDefault();
          activatePanel("search");
          return;
        }
        if (key === "g") {
          event.preventDefault();
          activatePanel("git");
          return;
        }
        if (key === "x") {
          event.preventDefault();
          activatePanel("extensions");
          return;
        }
      }
      if ((event.ctrlKey || event.metaKey) && event.key === ",") {
        event.preventDefault();
        activatePanel("settings");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeActivity, isMobile, toggleExplorer, activatePanel]);

  const shellStyle = useMemo(
    () =>
      ({
        "--vscode-sidebar-width": `${sidebarWidth}px`,
      }) as CSSProperties,
    [sidebarWidth]
  );

  if (!isMounted) {
    return <div className="h-screen bg-[var(--vscode-editor-background)]" />;
  }

  if (isMobile) {
    return (
      <div
        className="flex flex-col h-screen overflow-hidden"
        style={shellStyle}
      >
        <TitleBar
          onMenuClick={() => {
            setActiveActivity("explorer");
            setMobileDrawerOpen((open) => !open);
          }}
          isMobile
        />
        <div className="flex-1 overflow-hidden relative">
          <EditorShell>{children}</EditorShell>
          {mobileDrawerOpen ? (
            <div
              className="fixed left-0 right-0 z-40"
              style={{
                bottom:
                  "calc(var(--vscode-statusbar-height) + var(--vscode-activitybar-width))",
                height: "60vh",
              }}
            >
              <div className="h-full bg-[var(--vscode-sideBar-background)] shadow-2xl rounded-t-lg overflow-hidden">
                <Sidebar
                  isOpen
                  activePanel={activeActivity}
                  onClose={() => setMobileDrawerOpen(false)}
                  variant="drawer"
                />
              </div>
            </div>
          ) : null}
        </div>
        <ActivityBar
          orientation="horizontal"
          items={[...mobileItems]}
          activeItem={activeActivity}
          onItemClick={handleActivityClick}
        />
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
          ? "grid-cols-[var(--vscode-activitybar-width)_var(--vscode-sidebar-width)_4px_1fr]"
          : "grid-cols-[var(--vscode-activitybar-width)_0_0_1fr]"
      )}
      style={shellStyle}
    >
      <div className="col-span-4">
        <TitleBar />
      </div>
      <ActivityBar
        activeItem={activeActivity}
        onItemClick={handleActivityClick}
      />
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          !sidebarOpen && "w-0"
        )}
      >
        <Sidebar isOpen={sidebarOpen} activePanel={activeActivity} />
      </div>
      <div
        className={cn(
          "relative",
          sidebarOpen
            ? "cursor-col-resize bg-[var(--vscode-border)] hover:bg-[var(--vscode-focusBorder)] transition-colors"
            : "pointer-events-none"
        )}
        onMouseDown={(event) => {
          if (!sidebarOpen) return;
          resizeState.current = {
            startX: event.clientX,
            startWidth: sidebarWidth,
          };
          setIsResizing(true);
        }}
      />
      <div className={cn("col-span-1", isResizing && "cursor-col-resize")}>
        <EditorShell>{children}</EditorShell>
      </div>
      <div className="col-span-4">
        <StatusBar />
      </div>

      {showTerminal && (
          <div className="absolute bottom-6 left-0 right-0 h-64 z-[1000]">
              <Terminal onClose={() => setShowTerminal(false)} />
          </div>
      )}

      {showAIChat && (
          <div className="fixed bottom-12 right-12 z-[2000]">
              <AIChat onClose={() => setShowAIChat(false)} />
          </div>
      )}
    </div>
  );
}

export default function VSCodeShell({ children }: VSCodeShellProps) {
  return (
    <RecentPagesProvider>
      <TabsProvider>
        <VSCodeShellContent>{children}</VSCodeShellContent>
      </TabsProvider>
    </RecentPagesProvider>
  );
}
