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

import { fileTree, projects } from "../data/portfolio";

function buildTab(path: string): Tab {
  // Find the item in the file tree to get the correct extension
  let item: any = null;
  for (const section of fileTree) {
    item = section.items.find(i => i.href === path);
    if (item) break;
  }

  // If not in file tree, check if it's a project
  if (!item && path.startsWith("/projects/")) {
    const projectId = path.split("/").pop();
    const project = projects.find(p => p.id === projectId);
    if (project) {
      let extension = "ts";
      if (project.technologies.includes("Python")) extension = "py";
      else if (project.technologies.includes("React") || project.technologies.includes("Next.js")) extension = "tsx";
      else if (project.technologies.includes("R")) extension = "r";
      else if (project.technologies.includes("Tableau")) extension = "tableau";
      
      item = {
        label: project.title.replace(/\s+/g, ""),
        extension: extension
      };
    }
  }

  const extension = item?.extension ?? "tsx";
  const labelBase = item?.label ?? (path === "/" ? "Welcome" : path.slice(1).split('/').pop()?.replace(/-/g, " ") ?? "Unknown");
  
  return {
    id: path,
    label: `${labelBase}.${extension}`,
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
