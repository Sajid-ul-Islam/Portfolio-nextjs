"use client";

import {
  LuBoxes,
  LuFolder,
  LuGitBranch,
  LuSearch,
  LuSettings,
  LuUser,
} from "react-icons/lu";

import { cn } from "../../lib/cn";

const iconMap = {
  files: LuFolder,
  search: LuSearch,
  "git-branch": LuGitBranch,
  blocks: LuBoxes,
  user: LuUser,
  settings: LuSettings,
};

const mainItems = [
  { id: "explorer", icon: "files", label: "Explorer" },
  { id: "search", icon: "search", label: "Search" },
  { id: "git", icon: "git-branch", label: "Source Control" },
  { id: "extensions", icon: "blocks", label: "Extensions" },
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
        "bg-[var(--vscode-activityBar-background)]",
        isHorizontal
          ? "flex items-center justify-around h-[var(--vscode-activitybar-width)] w-full"
          : "flex flex-col justify-between w-[var(--vscode-activitybar-width)] h-full"
      )}
    >
      <div className={cn(isHorizontal ? "flex items-center gap-2" : "flex flex-col")}>
        {topItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id as T)}
              className={cn(
                "relative flex items-center justify-center",
                isHorizontal ? "w-11 h-11 rounded" : "w-full h-12",
                "text-[var(--vscode-activityBar-inactiveForeground)]",
                "hover:text-[var(--vscode-activityBar-foreground)]",
                "transition-colors group",
                isActive && "text-[var(--vscode-activityBar-foreground)]"
              )}
              aria-label={item.label}
              title={item.label}
            >
              {isActive && !isHorizontal ? (
                <span className="absolute left-0 top-0 w-[2px] h-full bg-[var(--vscode-activityBar-activeBorder)]" />
              ) : null}
              {isActive && isHorizontal ? (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--vscode-activityBar-activeBorder)]" />
              ) : null}
              <Icon size={22} strokeWidth={1.5} />
              <span
                className={cn(
                  "absolute px-2 py-1 text-vscode-xs bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity",
                  isHorizontal ? "bottom-full mb-2" : "left-full ml-2"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {!isHorizontal ? (
        <div className="flex flex-col">
          {bottomItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item.id as T)}
                className={cn(
                  "relative flex items-center justify-center w-full h-12",
                  "text-[var(--vscode-activityBar-inactiveForeground)]",
                  "hover:text-[var(--vscode-activityBar-foreground)]",
                  "transition-colors group"
                )}
                aria-label={item.label}
                title={item.label}
              >
                <Icon size={22} strokeWidth={1.5} />
                <span className="absolute left-full ml-2 px-2 py-1 text-vscode-xs bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
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
