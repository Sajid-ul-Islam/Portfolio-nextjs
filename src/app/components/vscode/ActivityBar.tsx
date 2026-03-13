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

type ActivityBarProps = {
  activeItem?: string;
  onItemClick?: (id: string) => void;
};

export default function ActivityBar({
  activeItem = "explorer",
  onItemClick,
}: ActivityBarProps) {
  return (
    <aside className="flex flex-col justify-between w-[var(--vscode-activitybar-width)] h-full bg-[var(--vscode-activityBar-background)]">
      <div className="flex flex-col">
        {mainItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "relative flex items-center justify-center w-full h-12",
                "text-[var(--vscode-activityBar-inactiveForeground)]",
                "hover:text-[var(--vscode-activityBar-foreground)]",
                "transition-colors group",
                isActive && "text-[var(--vscode-activityBar-foreground)]"
              )}
              aria-label={item.label}
              title={item.label}
            >
              {isActive ? (
                <span className="absolute left-0 top-0 w-[2px] h-full bg-[var(--vscode-activityBar-activeBorder)]" />
              ) : null}
              <Icon size={24} strokeWidth={1.5} />
              <span className="absolute left-full ml-2 px-2 py-1 text-vscode-xs bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col">
        {bottomItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "relative flex items-center justify-center w-full h-12",
                "text-[var(--vscode-activityBar-inactiveForeground)]",
                "hover:text-[var(--vscode-activityBar-foreground)]",
                "transition-colors group"
              )}
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={24} strokeWidth={1.5} />
              <span className="absolute left-full ml-2 px-2 py-1 text-vscode-xs bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
