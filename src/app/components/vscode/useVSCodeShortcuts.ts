import { useEffect } from "react";

type ActivityId = "explorer" | "search" | "git" | "extensions" | "account" | "settings" | "terminal" | "chat";

type UseVSCodeShortcutsProps = {
  isMobile: boolean;
  activeActivity: ActivityId;
  toggleExplorer: () => void;
  activatePanel: (id: ActivityId) => void;
};

export function useVSCodeShortcuts({
  isMobile,
  activeActivity,
  toggleExplorer,
  activatePanel,
}: UseVSCodeShortcutsProps) {
  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isEditable = tag === "input" || tag === "textarea" || target?.isContentEditable;
      if (isEditable) return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleExplorer();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
        const key = event.key.toLowerCase();
        if (key === "f") {
          event.preventDefault();
          activatePanel("search");
          return;
        }
        if (key === "g") {
          event.preventDefault();
          activatePanel("git");
          return;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeActivity, isMobile, toggleExplorer, activatePanel]);
}