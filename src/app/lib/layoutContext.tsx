"use client";

import React, { createContext, useContext, useState } from "react";

export type ActivityId =
  | "explorer"
  | "search"
  | "git"
  | "account"
  | "settings"
  | "terminal"
  | "chat";

type LayoutContextType = {
  showTerminal: boolean;
  setShowTerminal: React.Dispatch<React.SetStateAction<boolean>>;
  showAIChat: boolean;
  setShowAIChat: React.Dispatch<React.SetStateAction<boolean>>;
  unreadAIChat: number;
  setUnreadAIChat: React.Dispatch<React.SetStateAction<number>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workspaceState: "active" | "minimized" | "closed";
  setWorkspaceState: React.Dispatch<React.SetStateAction<"active" | "minimized" | "closed">>;
  activeActivity: ActivityId;
  setActiveActivity: React.Dispatch<React.SetStateAction<ActivityId>>;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [unreadAIChat, setUnreadAIChat] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [workspaceState, setWorkspaceState] = useState<"active" | "minimized" | "closed">("active");
  const [activeActivity, setActiveActivity] = useState<ActivityId>("explorer");

  return (
    <LayoutContext.Provider
      value={{
        showTerminal,
        setShowTerminal,
        showAIChat,
        setShowAIChat,
        unreadAIChat,
        setUnreadAIChat,
        sidebarOpen,
        setSidebarOpen,
        workspaceState,
        setWorkspaceState,
        activeActivity,
        setActiveActivity,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
