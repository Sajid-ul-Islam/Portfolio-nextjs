"use client";

import {
  SquareStack,
  Folder,
  GitBranch,
  Search,
  Settings,
  User,
  MessageSquare,
  Terminal as TerminalIcon,
  ChevronRight
} from "lucide-react";

import { cn } from "../../lib/cn";

const iconMap = {
  files: Folder,
  search: Search,
  "git-branch": GitBranch,
  blocks: SquareStack,
  user: User,
  settings: Settings,
  chat: MessageSquare,
  terminal: TerminalIcon,
};

const mainItems = [
  { id: "explorer", icon: "files", label: "Explorer" },
  { id: "search", icon: "search", label: "Search" },
  { id: "git", icon: "git-branch", label: "Source Control" },
  { id: "chat", icon: "chat", label: "AI Chat" },
  { id: "terminal", icon: "terminal", label: "Terminal" },
];

const bottomItems = [
  { id: "account", icon: "user", label: "Account" },
  { id: "settings", icon: "settings", label: "Settings" },
];

type ActivityBarProps<T extends string = string> = {
  activeItem?: T;
  onItemClick?: (id: T) => void;
  orientation?: "vertical" | "horizontal";
  items?: { id: T; icon: keyof typeof iconMap; label: string }[];
};

export default function ActivityBar<T extends string = string>({
  activeItem = "explorer" as T,
  onItemClick,
  orientation = "vertical",
  items,
}: ActivityBarProps<T>) {
  const isHorizontal = orientation === "horizontal";
  const topItems = items ?? mainItems;
  return (
    <aside
      className={cn(
        "bg-[var(--vscode-activityBar-background)] border-r border-white/5",
        isHorizontal
          ? "flex items-center justify-around h-[var(--vscode-activitybar-width)] w-full border-t border-r-0"
          : "flex flex-col justify-between w-[var(--vscode-activitybar-width)] h-full"
      )}
    >
      <div className={cn(isHorizontal ? "flex items-center gap-1 w-full" : "flex flex-col")}>
        {topItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Folder;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id as T)}
              className={cn(
                "relative flex items-center justify-center transition-all",
                isHorizontal ? "flex-1 h-full py-2" : "w-full h-12",
                "text-[var(--vscode-activityBar-inactiveForeground)]",
                "hover:text-[var(--vscode-activityBar-foreground)]",
                isActive && "text-[var(--vscode-activityBar-foreground)]"
              )}
              aria-label={item.label}
              title={item.label}
            >
              {isActive && !isHorizontal ? (
                <span className="absolute left-0 top-0 w-[2px] h-full bg-[#a3e635]" />
              ) : null}
              {isActive && isHorizontal ? (
                <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
              ) : null}
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              {!isHorizontal && (
                <span className="absolute left-full ml-3 px-2 py-1 text-[10px] font-bold bg-[#1e1e1e] border border-white/10 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-all scale-95 group-hover:scale-100 group">
                    {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {!isHorizontal ? (
        <div className="flex flex-col">
          {bottomItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || User;
            return (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item.id as T)}
                className={cn(
                  "relative flex items-center justify-center w-full h-12 group",
                  "text-[var(--vscode-activityBar-inactiveForeground)]",
                  "hover:text-[var(--vscode-activityBar-foreground)] transition-all"
                )}
                aria-label={item.label}
                title={item.label}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className="absolute left-full ml-3 px-2 py-1 text-[10px] font-bold bg-[#1e1e1e] border border-white/10 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-all scale-95 group-hover:scale-100">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </aside>
  );
}
