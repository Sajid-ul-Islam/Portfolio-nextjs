"use client";

import React, { createContext, useContext, useState } from "react";

type LayoutContextType = {
  showTerminal: boolean;
  setShowTerminal: React.Dispatch<React.SetStateAction<boolean>>;
  showAIChat: boolean;
  setShowAIChat: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <LayoutContext.Provider
      value={{
        showTerminal,
        setShowTerminal,
        showAIChat,
        setShowAIChat,
        sidebarOpen,
        setSidebarOpen,
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
