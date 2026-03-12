"use client";

import { useEffect, useState } from "react";
import { LuBell, LuCheck, LuGitBranch, LuTerminal } from "react-icons/lu";

import { cn } from "../../lib/cn";

function StatusItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 px-1 py-0.5 text-vscode-xs",
        "hover:bg-[var(--vscode-statusBarItem-hoverBackground)]",
        "rounded cursor-pointer transition-colors",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="flex items-center justify-between h-[var(--vscode-statusbar-height)] px-2 bg-[var(--vscode-statusBar-background)] text-[var(--vscode-statusBar-foreground)]">
      <div className="flex items-center gap-3">
        <StatusItem>
          <LuTerminal size={14} />
          <span>Remote</span>
        </StatusItem>
        <StatusItem>
          <LuGitBranch size={14} />
          <span>main</span>
        </StatusItem>
        <StatusItem>
          <LuCheck size={14} />
          <span>0</span>
          <span className="ml-1">0</span>
        </StatusItem>
      </div>
      <div className="flex items-center gap-3">
        <StatusItem>Next.js</StatusItem>
        <StatusItem>TypeScript</StatusItem>
        <StatusItem>Tailwind</StatusItem>
        <StatusItem>UTF-8</StatusItem>
        <StatusItem>Port: 3000</StatusItem>
        <StatusItem>{time}</StatusItem>
        <StatusItem>
          <LuBell size={14} />
        </StatusItem>
      </div>
    </footer>
  );
}
