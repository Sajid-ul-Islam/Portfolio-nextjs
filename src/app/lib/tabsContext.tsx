"use client";

import { createContext, useContext } from "react";
import { useOpenTabs } from "./useOpenTabs";

type TabsContextValue = ReturnType<typeof useOpenTabs>;

const TabsContext = createContext<TabsContextValue | null>(null);

export function TabsProvider({ children }: { children: React.ReactNode }) {
  const value = useOpenTabs();
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within TabsProvider");
  }
  return context;
}
