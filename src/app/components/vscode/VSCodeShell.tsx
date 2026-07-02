"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";

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
import { useTerminalResize } from "./useTerminalResize";
import { useVSCodeShortcuts } from "./useVSCodeShortcuts";
import ErrorBoundary from "./ErrorBoundary";
import OnboardingTooltip from "./OnboardingTooltip";
import { LayoutProvider, useLayout, type ActivityId } from "../../lib/layoutContext";


type VSCodeShellProps = {
  children: React.ReactNode;
};

const mobileItems = [
  { id: "explorer", icon: "files", label: "Explorer" },
  { id: "search", icon: "search", label: "Search" },
  { id: "git", icon: "git-branch", label: "Source Control" },
  { id: "settings", icon: "settings", label: "Settings" },
] as const;

function VSCodeShellContent({ children }: VSCodeShellProps) {
  const { isMobile, isMounted } = useViewport();
  const pathname = usePathname();
  const router = useRouter();
  const { addPage } = useRecentPagesContext();
  const {
    sidebarOpen,
    setSidebarOpen,
    showTerminal,
    setShowTerminal,
    showAIChat,
    setShowAIChat,
    workspaceState,
    setWorkspaceState,
    activeActivity,
    setActiveActivity,
  } = useLayout();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { sidebarWidth, isResizing, startResizing } = useSidebarResize("vscodeSidebarWidth", 256);
  const { terminalHeight, isResizing: isTerminalResizing, startResizing: startTerminalResizing } = useTerminalResize("vscodeTerminalHeight", 256);

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
    if (id === 'settings') {
      setActiveActivity(id);
      router.push('/settings.json');
      if (isMobile) setMobileDrawerOpen(false);
      return;
    }

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

  if (workspaceState === "closed") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0d0f12] text-white font-mono relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="z-10 text-center space-y-6 max-w-md p-8 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-md shadow-2xl relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur opacity-30 pointer-events-none" />
          <div className="w-16 h-16 rounded-full border border-red-500/30 flex items-center justify-center mx-auto bg-red-500/10 text-red-500 animate-pulse relative">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-widest text-red-400">Workspace Offline</h1>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Environment safely suspended. Click the button below to reactivate your workspace session.
            </p>
          </div>
          <button
            onClick={() => setWorkspaceState("active")}
            className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white active:scale-[0.98] transition-all text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
          >
            <span>Reboot Workspace</span>
          </button>
        </div>
      </div>
    );
  }

  if (workspaceState === "minimized") {
    return (
      <div 
        className="flex flex-col items-center justify-between h-screen bg-[#0d0f12] text-white font-mono relative overflow-hidden bg-cover bg-center select-none"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-none" />
        <div className="m-auto text-center z-10 space-y-4">
          <p className="text-vscode-xs text-gray-400 uppercase tracking-widest font-semibold">Workspace Status: Suspended</p>
          <h2 className="text-3xl font-black gradient-text">Sajid Islam Portfolio</h2>
        </div>
        <div className="w-[90%] max-w-md p-4 bg-[var(--vscode-titleBar-activeBackground)] border border-[var(--vscode-border)] rounded-t-2xl z-20 flex items-center justify-between shadow-2xl transition-transform duration-300">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#007acc]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.984 6.27a.545.545 0 0 0-.333-.186L17.82.2a.548.548 0 0 0-.655.132L12.38 5.17l-3.32-2.5a.546.546 0 0 0-.616-.017L.6 8.163a.546.546 0 0 0-.022.909l5.068 4.398L.58 17.868a.546.546 0 0 0 .022.91l7.813 5.51a.546.546 0 0 0 .616-.016l3.32-2.5 4.77 4.839a.548.548 0 0 0 .656.132l5.82-5.885a.546.546 0 0 0 .333-.185.539.539 0 0 0 .09-.364V6.634a.539.539 0 0 0-.09-.364zM18.064 12l-4.526 3.447V8.553L18.064 12zm.05-5.218l4.526 4.161-4.526 4.593V6.782zM1.385 8.67l7.009 6.082 3.844-2.927-3.844-2.927L1.385 8.67zm12.153 6.777l4.526-3.447v7.838l-4.526-4.391z"/>
            </svg>
            <span className="text-vscode-xs font-bold tracking-wide">Workspace Environment</span>
          </div>
          <button
            onClick={() => setWorkspaceState("active")}
            className="px-4 py-2 bg-[var(--vscode-accent)] text-white hover:opacity-90 active:scale-[0.96] transition-all text-vscode-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-[var(--vscode-accent)]/20"
          >
            Restore
          </button>
        </div>
      </div>
    );
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

      <main className={cn("h-full min-h-0 bg-transparent relative flex flex-col", (isResizing || isTerminalResizing) && "cursor-row-resize")}>
        <div className="flex-1 overflow-hidden relative">
          <ErrorBoundary fallbackMessage="Editor module offline. Missing dependencies.">
            <EditorShell>{children}</EditorShell>
          </ErrorBoundary>
        </div>

        {showTerminal && (
          <>
            <div
              className={cn(
                "h-[2px] w-full relative z-[1001]",
                "cursor-row-resize bg-[var(--vscode-border)] hover:bg-[var(--vscode-focusBorder)] transition-colors"
              )}
              onMouseDown={startTerminalResizing}
            />
            <div 
              className="w-full z-[1000] relative"
              style={{ height: `${terminalHeight}px` }}
            >
                <ErrorBoundary fallbackMessage="Terminal module offline.">
                  <Terminal 
                    onClose={() => setShowTerminal(false)} 
                  />
                </ErrorBoundary>
            </div>
          </>
        )}
      </main>

      <footer className={cn("z-50 backdrop-blur-xl border-t border-white/5", sidebarOpen ? "col-span-4" : "col-span-2")}>
        <StatusBar />
      </footer>

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
