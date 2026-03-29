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
        "rounded cursor-pointer transition-colors whitespace-nowrap",
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
    <footer className="flex items-center justify-between h-[var(--vscode-statusbar-height)] px-3 bg-[#166534] text-white font-mono uppercase tracking-[0.1em]">
      <div className="flex items-center gap-4">
        <StatusItem className="bg-[#a3e635] text-black font-bold px-2">
           <span>TACTICAL_OPS_MODE</span>
        </StatusItem>
        <StatusItem>
          <LuTerminal size={14} className="text-[#a3e635]" />
          <span className="text-[#a3e635]">DHAKA_GRID_02</span>
        </StatusItem>
        <StatusItem>
          <LuGitBranch size={14} />
          <span>main*</span>
        </StatusItem>
        <StatusItem className="hidden md:flex">
          <LuCheck size={14} className="text-[#a3e635]" />
          <span>BUILD: OK</span>
        </StatusItem>
      </div>
      <div className="flex items-center gap-4">
        <StatusItem className="hidden lg:flex">UTF-8</StatusItem>
        <StatusItem className="hidden lg:flex">Spaces: 4</StatusItem>
        <StatusItem className="bg-black/20">{time}</StatusItem>
        <StatusItem>
          <LuBell size={14} className="animate-pulse" />
        </StatusItem>
      </div>
    </footer>
  );
}
