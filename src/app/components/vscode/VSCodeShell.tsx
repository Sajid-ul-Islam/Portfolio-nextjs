"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import {
  RecentPagesProvider,
  useRecentPagesContext,
} from "@/lib/recentPagesContext";
import { TabsProvider } from "@/lib/tabsContext";
import { useViewport } from "@/lib/useViewport";
import ActivityBar from "./ActivityBar";
import EditorShell from "./EditorShell";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import TitleBar from "./TitleBar";
import Terminal from "./Terminal";
import AIChat from "./AIChat";
import AIChatTrigger from "./AIChatTrigger";
import IntroAnimation from "./IntroAnimation";
import CommandPalette from "./CommandPalette";
import { useSidebarResize } from "./useSidebarResize";
import { useVSCodeShortcuts } from "./useVSCodeShortcuts";
import ErrorBoundary from "./ErrorBoundary";
import OnboardingTooltip from "./OnboardingTooltip";
import { LayoutProvider, useLayout } from "../../lib/layoutContext";


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
  const {
    sidebarOpen,
    setSidebarOpen,
    showTerminal,
    setShowTerminal,
    showAIChat,
    setShowAIChat,
  } = useLayout();
  const [activeActivity, setActiveActivity] =
    useState<ActivityId>("explorer");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { sidebarWidth, isResizing, startResizing } = useSidebarResize("vscodeSidebarWidth", 256);

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

    if (activeActivity === id) {
      setSidebarOpen((open) => !open);
    } else {
      setActiveActivity(id);
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
  }, [activeActivity, activatePanel]);

  useVSCodeShortcuts({
    isMobile,
    activeActivity,
    toggleExplorer,
    activatePanel
  });

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
        className="flex flex-col h-screen overflow-hidden relative"
        style={shellStyle}
      >
        <TitleBar
          onMenuClick={() => {
             if (mobileDrawerOpen) {
                 setMobileDrawerOpen(false);
             } else {
                setActiveActivity("explorer");
                setMobileDrawerOpen(true);
             }
          }}
          isMobile
        />
        <div className="flex-1 overflow-hidden relative">
          <ErrorBoundary fallbackMessage="Editor module offline. Missing dependencies.">
            <EditorShell>{children}</EditorShell>
          </ErrorBoundary>
          
          {/* Mobile Side Drawer Overlay */}
          <div 
            className={cn(
              "fixed inset-0 z-[100] bg-black/60 transition-opacity duration-300",
              mobileDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Mobile Side Drawer Content */}
          <div
            className={cn(
              "fixed top-0 bottom-0 left-0 z-[101] w-[80%] max-w-[300px] transition-transform duration-300 ease-out shadow-2xl",
              mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="h-full bg-[var(--vscode-sideBar-background)] border-r border-white/5">
                <Sidebar
                  isOpen
                  activePanel={activeActivity}
                  onClose={() => setMobileDrawerOpen(false)}
                  variant="drawer"
                />
            </div>
          </div>
        </div>
        <ActivityBar
          orientation="horizontal"
          items={[...mobileItems]}
          activeItem={activeActivity}
          onItemClick={handleActivityClick}
        />
        <StatusBar />

        {/* Mobile AI Chat */}
        {showAIChat && (
          <div className="fixed inset-0 z-[2000] bg-black/60 flex items-end justify-center p-2 animate-in fade-in duration-200">
            <div className="w-full max-w-md max-h-[85vh] relative">
              <ErrorBoundary fallbackMessage="AI Neural Link disconnected. Verify environment API keys.">
                <AIChat onClose={() => setShowAIChat(false)} />
              </ErrorBoundary>
            </div>
          </div>
        )}
        <AIChatTrigger isOpen={showAIChat} onClick={() => setShowAIChat(true)} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid h-[100dvh] min-h-[100dvh] overflow-hidden bg-[var(--vscode-editor-background)] backdrop-blur-3xl",
        "grid-rows-[var(--vscode-titlebar-height)_1fr_var(--vscode-statusbar-height)]",
        sidebarOpen
          ? "grid-cols-[var(--vscode-activitybar-width)_var(--vscode-sidebar-width)_2px_minmax(0,1fr)]"
          : "grid-cols-[var(--vscode-activitybar-width)_minmax(0,1fr)]"
      )}
      style={shellStyle}
    >
      <header className={cn("z-50 backdrop-blur-xl border-b border-white/5", sidebarOpen ? "col-span-4" : "col-span-2")}>
        <TitleBar />
      </header>

      <div className="flex h-full min-h-0 col-span-1">
        <ActivityBar
          activeItem={activeActivity}
          onItemClick={handleActivityClick}
        />
      </div>

      {sidebarOpen && (
        <>
          <div className="col-span-1 h-full min-h-0 overflow-hidden">
            <Sidebar 
              isOpen={sidebarOpen} 
              activePanel={activeActivity} 
            />
          </div>
          <div
            className={cn(
              "col-span-1 h-full min-h-0 relative",
              "cursor-col-resize bg-[var(--vscode-border)] hover:bg-[var(--vscode-focusBorder)] transition-colors"
            )}
          onMouseDown={startResizing}
          />
        </>
      )}

      <main className={cn("h-full min-h-0 bg-transparent relative", isResizing && "cursor-col-resize")}>
        <ErrorBoundary fallbackMessage="Editor module offline. Missing dependencies.">
          <EditorShell>{children}</EditorShell>
        </ErrorBoundary>
      </main>

      <footer className={cn("z-50 backdrop-blur-xl border-t border-white/5", sidebarOpen ? "col-span-4" : "col-span-2")}>
        <StatusBar />
      </footer>

      {showTerminal && (
          <div className="absolute bottom-6 left-0 right-0 h-64 z-[1000]">
              <ErrorBoundary fallbackMessage="Terminal module offline.">
                <Terminal 
                  onClose={() => setShowTerminal(false)} 
                />
              </ErrorBoundary>
          </div>
      )}

      {showAIChat && (
          <div className="fixed bottom-12 md:bottom-28 right-6 md:right-12 z-[2000] animate-in slide-in-from-bottom-8 zoom-in-95 duration-500 ease-out">
              <div className="relative group/float">
                {/* Floating Shadow Glow */}
                <div className="absolute inset-0 bg-[#a3e635]/10 rounded-2xl blur-3xl opacity-30 group-hover/float:opacity-50 transition-opacity duration-1000"></div>
                <ErrorBoundary fallbackMessage="AI Neural Link disconnected. Verify environment API keys.">
                  <AIChat onClose={() => setShowAIChat(false)} />
                </ErrorBoundary>
              </div>
          </div>
      )}
      <AIChatTrigger isOpen={showAIChat} onClick={() => setShowAIChat(true)} />
      <IntroAnimation />
      <CommandPalette />
      <OnboardingTooltip />
    </div>
  );
}

export default function VSCodeShell({ children }: VSCodeShellProps) {
  return (
    <RecentPagesProvider>
      <TabsProvider>
        <LayoutProvider>
          <VSCodeShellContent>{children}</VSCodeShellContent>
        </LayoutProvider>
      </TabsProvider>
    </RecentPagesProvider>
  );
}
