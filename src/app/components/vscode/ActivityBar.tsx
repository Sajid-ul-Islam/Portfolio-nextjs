"use client";

import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscAccount,
  VscSettingsGear,
  VscTerminal,
} from "react-icons/vsc";

import { cn } from "@/lib/cn";
import { soundFx } from "@/app/lib/soundFx";

type ActivityItem = {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  shortcut?: string;
  badge?: number | string;
};

const topItems: ActivityItem[] = [
  { id: "explorer", icon: VscFiles, label: "Explorer", shortcut: "Ctrl+Shift+E" },
  { id: "search", icon: VscSearch, label: "Search", shortcut: "Ctrl+Shift+F" },
  { id: "git", icon: VscSourceControl, label: "Source Control", shortcut: "Ctrl+Shift+G", badge: 1 },
  { id: "chat", icon: VscExtensions, label: "AI Co-Pilot (Extensions)", shortcut: "Ctrl+Alt+A" },
  { id: "terminal", icon: VscTerminal, label: "Terminal", shortcut: "Ctrl+`" },
];

const bottomItems: ActivityItem[] = [
  { id: "account", icon: VscAccount, label: "Accounts" },
  { id: "settings", icon: VscSettingsGear, label: "Manage Settings", shortcut: "Ctrl+," },
];

type ActivityBarProps<T extends string = string> = {
  activeItem?: T;
  onItemClick?: (id: T) => void;
  orientation?: "vertical" | "horizontal";
  unreadChat?: number;
  items?: readonly { id: T; icon: any; label: string }[];
};

export default function ActivityBar<T extends string = string>({
  activeItem = "explorer" as T,
  onItemClick,
  orientation = "vertical",
  unreadChat = 0,
  items,
}: ActivityBarProps<T>) {
  const isHorizontal = orientation === "horizontal";

  return (
    <aside
      className={cn(
        "bg-[var(--vscode-activityBar-background)] select-none z-40",
        isHorizontal
          ? "flex items-center justify-around h-[var(--vscode-activitybar-width)] w-full border-t border-[var(--vscode-border)]"
          : "flex flex-col justify-between w-[var(--vscode-activitybar-width)] h-full border-r border-[var(--vscode-activityBar-border,#252526)]"
      )}
      aria-label="Activity Bar"
    >
      {/* Top Activity Icons */}
      <div className={cn(isHorizontal ? "flex items-center gap-1 w-full" : "flex flex-col")}>
        {topItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const badgeCount = item.id === "chat" && unreadChat > 0 ? unreadChat : item.badge;

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => {
                  soundFx.playTabSwitch();
                  onItemClick?.(item.id as T);
                }}
                className={cn(
                  "relative flex items-center justify-center transition-colors",
                  isHorizontal ? "flex-1 h-12 w-full" : "w-[var(--vscode-activitybar-width)] h-12",
                  "text-[var(--vscode-activityBar-inactiveForeground,#858585)]",
                  "hover:text-[var(--vscode-activityBar-foreground,#ffffff)]",
                  isActive && "text-[var(--vscode-activityBar-foreground,#ffffff)]"
                )}
                aria-label={item.label}
              >
                {/* Authentic 2px Left Active Border */}
                {isActive && !isHorizontal && (
                  <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--vscode-activityBar-activeBorder,var(--vscode-accent))]" />
                )}
                {isActive && isHorizontal && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[var(--vscode-activityBar-activeBorder,var(--vscode-accent))]" />
                )}

                <Icon size={24} className="transition-transform group-active:scale-95" />

                {/* Badge Indicator */}
                {badgeCount ? (
                  <span className="absolute top-2 right-2 min-w-[15px] h-[15px] px-1 flex items-center justify-center rounded-full bg-[var(--vscode-accent)] text-black text-[9px] font-bold leading-none shadow-sm">
                    {badgeCount}
                  </span>
                ) : null}
              </button>

              {/* Native VS Code Hover Tooltip */}
              {!isHorizontal && (
                <div className="absolute left-[calc(100%+6px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 px-2.5 py-1 bg-[#252526] text-white text-[11px] border border-[#454545] rounded-[3px] shadow-2xl pointer-events-none whitespace-nowrap z-[300]">
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span className="text-[10px] text-gray-400 font-mono bg-black/40 px-1 py-0.5 rounded border border-white/10">
                      {item.shortcut}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Action Icons (Accounts & Manage Gear) */}
      {!isHorizontal ? (
        <div className="flex flex-col">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onItemClick?.(item.id as T);
                  }}
                  className={cn(
                    "relative flex items-center justify-center w-[var(--vscode-activitybar-width)] h-12 transition-colors",
                    "text-[var(--vscode-activityBar-inactiveForeground,#858585)]",
                    "hover:text-[var(--vscode-activityBar-foreground,#ffffff)]",
                    isActive && "text-[var(--vscode-activityBar-foreground,#ffffff)]"
                  )}
                  aria-label={item.label}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--vscode-activityBar-activeBorder,var(--vscode-accent))]" />
                  )}
                  <Icon size={22} className="transition-transform group-active:scale-95" />
                </button>

                {/* Tooltip */}
                <div className="absolute left-[calc(100%+6px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 px-2.5 py-1 bg-[#252526] text-white text-[11px] border border-[#454545] rounded-[3px] shadow-2xl pointer-events-none whitespace-nowrap z-[300]">
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span className="text-[10px] text-gray-400 font-mono bg-black/40 px-1 py-0.5 rounded border border-white/10">
                      {item.shortcut}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </aside>
  );
}
