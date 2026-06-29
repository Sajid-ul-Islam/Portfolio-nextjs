import { useState, useCallback, useEffect } from "react";

export function useTerminalResize(storageKey: string, defaultHeight: number) {
  const [terminalHeight, setTerminalHeight] = useState(defaultHeight);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setTerminalHeight(parseInt(saved, 10));
    }
  }, [storageKey]);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      // Calculate new height based on bottom of window
      const newHeight = window.innerHeight - e.clientY;
      // Constrain height between 100px and 80% of window height
      const constrainedHeight = Math.max(100, Math.min(newHeight, window.innerHeight * 0.8));
      
      setTerminalHeight(constrainedHeight);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        localStorage.setItem(storageKey, terminalHeight.toString());
      }
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, storageKey, terminalHeight]);

  return { terminalHeight, isResizing, startResizing };
}
