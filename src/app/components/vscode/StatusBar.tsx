"use client";

<<<<<<< HEAD
export default function StatusBar() {
  return (
    <div className="h-6 w-full bg-[#166534] flex items-center justify-between px-3 text-[10px] text-white/90 font-mono tracking-wider z-50 animate-pulse duration-[3000ms]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 group cursor-pointer hover:bg-white/10 px-2 h-full transition-colors">
          <span className="text-xs">🌿</span>
          <span className="font-bold">main*</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <span>0 ▲</span>
          <span>0 ✖</span>
          <span className="animate-spin text-[8px]">⚙️</span>
          <span>BUILD: OK</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 opacity-60">
            <span>Spaces: 4</span>
        </div>
        <div className="flex items-center gap-1 font-bold">
            <span className="text-[#a3e635]">UTF-8</span>
        </div>
        <div className="flex items-center gap-1 font-bold group cursor-pointer hover:bg-white/10 px-2 h-full transition-colors">
            <span>PRETTIER: ✅</span>
        </div>
        <div className="flex items-center gap-1 bg-white/15 px-2 h-full">
            <span>🔔</span>
        </div>
      </div>
    </div>
  );
}
=======
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
>>>>>>> 086842fd025a55b975dbf46a3260a7ae75406454
