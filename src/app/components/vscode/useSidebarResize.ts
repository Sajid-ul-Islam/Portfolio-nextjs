import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

export function useSidebarResize(storageKey: string, defaultWidth: number) {
  const [sidebarWidth, setSidebarWidth] = useLocalStorage<number>(storageKey, defaultWidth);
  const resizeState = useRef<{ startX: number; startWidth: number } | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) return;
    const handleMove = (event: MouseEvent) => {
      if (!resizeState.current) return;
      const delta = event.clientX - resizeState.current.startX;
      const nextWidth = Math.min(420, Math.max(200, resizeState.current.startWidth + delta));
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

  const startResizing = (event: React.MouseEvent) => {
    resizeState.current = { startX: event.clientX, startWidth: sidebarWidth };
    setIsResizing(true);
  };

  return { sidebarWidth, isResizing, startResizing };
}