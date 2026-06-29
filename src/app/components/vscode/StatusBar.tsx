"use client";

import { useEffect, useState } from "react";
import { LuBell, LuGitBranch, LuTerminal, LuCpu, LuBattery, LuDownload } from "react-icons/lu";

import { cn } from "@/lib/cn";
import { personalInfo } from "@/app/data/portfolio";

type StatusItemProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function StatusItem({
  children,
  className,
  onClick,
}: StatusItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase font-mono",
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
  const [battery, setBattery] = useState<number | null>(null);
  const [memory, setMemory] = useState<string | null>(null);
  const [network, setNetwork] = useState<string>("Stable");

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

      // Simulated network status
      setNetwork(Math.random() > 0.05 ? "Stable" : "Latency Spike");

      // Memory Polling (Chrome Only)
      if ((performance as any).memory) {
        const used = (performance as any).memory.usedJSHeapSize;
        setMemory(`${Math.round(used / 1048576)}MB`);
      }
    };

    update();
    const interval = setInterval(update, 1000);

    // Battery API
    if (typeof navigator !== "undefined" && (navigator as any).getBattery) {
      (navigator as any).getBattery().then((batt: any) => {
        const updateBatt = () => {
          setBattery(Math.round(batt.level * 100));
        };
        updateBatt();
        batt.addEventListener("levelchange", updateBatt);
      });
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="flex items-center justify-between h-[var(--vscode-statusbar-height)] px-3 bg-[var(--vscode-statusBar-background)] text-[var(--vscode-statusBar-foreground)] border-t border-[var(--vscode-statusBar-border)] select-none relative z-50 font-mono">
      <div className="flex items-center gap-4">
        <StatusItem className="bg-[var(--vscode-accent)] text-white font-bold px-3">
           <span>System: Ready</span>
        </StatusItem>
        <StatusItem className="hidden md:flex">
          <LuTerminal size={12} className="text-white/80" />
          <span className="text-white/90">Shell: {network}</span>
        </StatusItem>
        <StatusItem>
          <LuGitBranch size={12} />
          <span>main</span>
        </StatusItem>
        {memory && (
          <StatusItem className="text-white/80 hidden sm:flex">
            <LuCpu size={12} />
            <span>Memory: {memory}</span>
          </StatusItem>
        )}
      </div>

      <div className="flex items-center gap-4">
        {battery !== null && (
          <StatusItem className={cn(battery < 20 ? "text-red-300 animate-pulse font-bold" : "text-white/90")}>
            <LuBattery size={12} className={battery < 20 ? "text-red-300" : "text-white/80"} />
            <span>Battery: {battery}%</span>
          </StatusItem>
        )}

        <StatusItem className="bg-black/20 font-semibold px-3 text-white/95">{time}</StatusItem>
        <a
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StatusItem className="bg-[var(--vscode-accent)] text-white font-bold px-3 hidden sm:flex hover:opacity-90 transition-opacity">
            <LuDownload size={11} />
            <span>Resume</span>
          </StatusItem>
        </a>
        <StatusItem>
          <LuBell size={12} className="text-white/80" />
        </StatusItem>
      </div>
    </footer>
  );
}
