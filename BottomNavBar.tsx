"use client";

import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type BottomNavBarProps = {
  items: { id: string; icon: string; label: string; href?: string }[];
  activeItem: string;
  onItemClick: (id: string) => void;
  onChatClick: () => void;
  showChat: boolean;
};

export default function BottomNavBar({
  items,
  activeItem,
  onItemClick,
  onChatClick,
  showChat,
}: BottomNavBarProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40",
        "bg-[var(--vscode-activityBar-background)]",
        "border-t border-[var(--vscode-border)]",
        "flex items-center justify-around",
        "h-16 md:hidden",
        "shadow-lg"
      )}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={cn(
            "flex flex-col items-center justify-center",
            "w-full h-full px-2 py-1",
            "text-xs font-medium",
            "transition-colors duration-200",
            "relative",
            "min-h-[44px] min-w-[44px]", // Touch-friendly sizing
            activeItem === item.id
              ? "text-[var(--vscode-activityBar-foreground)]"
              : "text-[var(--vscode-activityBar-inactiveForeground)] hover:text-[var(--vscode-activityBar-foreground)]"
          )}
          title={item.label}
          aria-label={item.label}
        >
          <Icon
            name={item.icon}
            className={cn(
              "h-6 w-6",
              activeItem === item.id ? "fill-current" : "fill-current opacity-70"
            )}
          />
          <span className="mt-1 text-xs hidden sm:inline">{item.label}</span>
          {activeItem === item.id && (
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1",
                "bg-[var(--vscode-activityBar-activeBorder)]",
                "animate-fadeIn"
              )}
            />
          )}
        </button>
      ))}
      <button
        onClick={onChatClick}
        className={cn(
          "flex flex-col items-center justify-center",
          "w-full h-full px-2 py-1",
          "text-xs font-medium",
          "transition-colors duration-200",
          "relative",
          "min-h-[44px] min-w-[44px]", // Touch-friendly sizing
          showChat
            ? "text-[var(--vscode-activityBar-foreground)]"
            : "text-[var(--vscode-activityBar-inactiveForeground)] hover:text-[var(--vscode-activityBar-foreground)]"
        )}
        title="AI Chat"
        aria-label="AI Chat"
      >
        <Icon
          name="comment"
          className={cn(
            "h-6 w-6",
            showChat ? "fill-current" : "fill-current opacity-70"
          )}
        />
        <span className="mt-1 text-xs hidden sm:inline">Chat</span>
        {showChat && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-1",
              "bg-[var(--vscode-activityBar-activeBorder)]",
              "animate-fadeIn"
            )}
          />
        )}
      </button>
    </nav>
  );
}
