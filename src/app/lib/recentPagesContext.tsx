"use client";

import { createContext, useContext } from "react";
import { useRecentPages } from "./useRecentPages";

type RecentPagesContextValue = ReturnType<typeof useRecentPages>;

const RecentPagesContext = createContext<RecentPagesContextValue | null>(null);

export function RecentPagesProvider({ children }: { children: React.ReactNode }) {
  const value = useRecentPages();
  return (
    <RecentPagesContext.Provider value={value}>
      {children}
    </RecentPagesContext.Provider>
  );
}

export function useRecentPagesContext() {
  const context = useContext(RecentPagesContext);
  if (!context) {
    throw new Error("useRecentPagesContext must be used within RecentPagesProvider");
  }
  return context;
}
