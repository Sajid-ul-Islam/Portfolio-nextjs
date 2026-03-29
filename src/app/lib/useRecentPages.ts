"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useRecentPages(limit = 5) {
  const [recentPages, setRecentPages] = useLocalStorage<string[]>(
    "recentPages",
    []
  );

  const addPage = useCallback(
    (path: string) => {
      if (path === "/") return;
      setRecentPages((prev) => {
        const next = prev.filter((item) => item !== path);
        return [path, ...next].slice(0, limit);
      });
    },
    [limit, setRecentPages]
  );

  const clearPages = useCallback(() => {
    setRecentPages([]);
  }, [setRecentPages]);

  return { recentPages, addPage, clearPages };
}
