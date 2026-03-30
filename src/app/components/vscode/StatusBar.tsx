"use client";

import { useEffect, useState, useRef } from "react";
import { LuBell, LuCheck, LuGitBranch, LuTerminal, LuCpu, LuBattery, LuMusic, LuVolume2, LuVolumeX } from "react-icons/lu";

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
        "flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold tracking-tighter uppercase",
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
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
              (window as any).batteryLevel = Math.round(batt.level * 100);
            };
            updateBatt();
            batt.addEventListener("levelchange", updateBatt);
        });
      }

    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/02/10/audio_141a0e1b6f.mp3"); // Dark Ambient Synth
      audioRef.current.loop = true;
    }
    
    if (isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser. User interaction needed."));
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  return (
    <footer className="flex items-center justify-between h-[var(--vscode-statusbar-height)] px-3 bg-[#166534] text-white font-mono border-t border-white/5 relative z-50">
      <div className="flex items-center gap-4">
        <StatusItem className="bg-[#a3e635] text-black font-black px-3">
           <span>LIVE_SYSTEM_UPLINK</span>
        </StatusItem>
        <StatusItem className="hidden md:flex">
          <LuTerminal size={12} className="text-[#a3e635]" />
          <span className="text-[#a3e635]">TERMINAL_OK</span>
        </StatusItem>
        <StatusItem>
          <LuGitBranch size={12} />
          <span>master*</span>
        </StatusItem>
        {memory && (
          <StatusItem className="text-[#a3e635]/80">
            <LuCpu size={12} />
            <span>HEARTBEAT: {memory}</span>
          </StatusItem>
        )}
      </div>

      <div className="flex items-center gap-4">
        {battery !== null && (
          <StatusItem className={cn(battery < 20 ? "text-red-500 animate-pulse" : "text-white")}>
            <LuBattery size={12} className={battery < 20 ? "text-red-500" : "text-[#a3e635]"} />
            <span>CHARGE: {battery}%</span>
          </StatusItem>
        )}

        <StatusItem className="bg-black/20 font-bold px-3">{time}</StatusItem>
        <StatusItem>
          <LuBell size={12} className="animate-pulse" />
        </StatusItem>
      </div>
    </footer>
  );
}
