"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useLocalStorage } from "./useLocalStorage";

export type Tab = {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  isModified?: boolean;
  isPinned?: boolean;
};

function buildTab(path: string): Tab {
  const labelBase =
    path === "/" ? "Welcome" : path.slice(1).replace(/-/g, " ");
  return {
    id: path,
    label: `${labelBase}.tsx`,
    href: path,
    isActive: false,
    isPinned: false,
  };
}

export function useOpenTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const [tabs, setTabs] = useLocalStorage<Tab[]>("openTabs", []);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    setActiveTab(pathname);
    setTabs((prev) => {
      const exists = prev.some((tab) => tab.id === pathname);
      if (exists) {
        return prev.map((tab) => ({
          ...tab,
          isActive: tab.id === pathname,
        }));
      }
      return [...prev, { ...buildTab(pathname), isActive: true }];
    });
  }, [pathname, setTabs]);

  const openTab = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  const closeTab = useCallback(
    (id: string, force = true) => {
      setTabs((prev) => {
        const index = prev.findIndex((tab) => tab.id === id);
        const target = prev[index];
        if (target?.isPinned && !force) {
          return prev;
        }
        const nextTabs = prev.filter((tab) => tab.id !== id);

        if (id === activeTab) {
          if (nextTabs.length > 0) {
            const nextIndex = Math.min(index, nextTabs.length - 1);
            router.push(nextTabs[nextIndex].href);
          } else {
            router.push("/");
          }
        }

        return nextTabs;
      });
    },
    [activeTab, router, setTabs]
  );

  const closeOtherTabs = useCallback(
    (id: string) => {
      setTabs((prev) => {
        const nextTabs = prev.filter(
          (tab) => tab.id === id || tab.isPinned
        );
        const stillActive = nextTabs.some((tab) => tab.id === activeTab);
        if (!stillActive) {
          router.push(nextTabs[0]?.href ?? "/");
        }
        return nextTabs;
      });
    },
    [activeTab, router, setTabs]
  );

  const closeAllTabs = useCallback(() => {
    setTabs((prev) => {
      const nextTabs = prev.filter((tab) => tab.isPinned);
      if (nextTabs.length === 0) {
        router.push("/");
      } else if (!nextTabs.some((tab) => tab.id === activeTab)) {
        router.push(nextTabs[0].href);
      }
      return nextTabs;
    });
  }, [activeTab, router, setTabs]);

  const togglePin = useCallback(
    (id: string) => {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === id ? { ...tab, isPinned: !tab.isPinned } : tab
        )
      );
    },
    [setTabs]
  );

  return useMemo(
    () => ({
      tabs,
      activeTab,
      openTab,
      closeTab,
      closeOtherTabs,
      closeAllTabs,
      togglePin,
    }),
    [tabs, activeTab, openTab, closeTab, closeOtherTabs, closeAllTabs, togglePin]
  );
}
