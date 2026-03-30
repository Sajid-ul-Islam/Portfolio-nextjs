"use client";

import { useEffect, useState, useRef } from "react";
import { LuBell, LuCheck, LuGitBranch, LuTerminal, LuCpu, LuBattery, LuMusic, LuVolume2, LuVolumeX } from "react-icons/lu";

import { cn } from "../../lib/cn";

function StatusItem({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
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
  const [network, setNetwork] = useState<string>("4.2GB/S");
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

      // Simulated Network Flux
      setNetwork(`${(Math.random() * 2 + 3).toFixed(1)}GB/S`);

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

  const toggleAudio = () => {
    if (!audioRef.current) {
      // High-quality dark cyberpunk ambient loop
      audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73907.mp3"); 
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    
    if (isMuted) {
      audioRef.current.play().catch(() => {});
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
          <span className="text-[#a3e635]">CMD_OK // {network}</span>
        </StatusItem>
        <StatusItem>
          <LuGitBranch size={12} />
          <span>master*</span>
        </StatusItem>
        {memory && (
          <StatusItem className="text-[#a3e635]/80 hidden sm:flex">
            <LuCpu size={12} />
            <span>HEARTBEAT: {memory}</span>
          </StatusItem>
        )}
      </div>

      <div className="flex items-center gap-4">
        <StatusItem 
          onClick={toggleAudio}
          className={cn(
            "border border-white/10 px-2 transition-all group",
            !isMuted && "bg-[#a3e635]/20 border-[#a3e635] text-[#a3e635]"
          )}
        >
          {isMuted ? <LuVolumeX size={12} className="text-gray-400" /> : <LuVolume2 size={12} className="animate-pulse" />}
          <span className="text-[9px] group-hover:tracking-widest transition-all">NEURAL_DEEP_GRID: {isMuted ? "OFF" : "LIVE"}</span>
        </StatusItem>

        {battery !== null && (
          <StatusItem className={cn(battery < 20 ? "text-red-500 animate-pulse font-black" : "text-white")}>
            <LuBattery size={12} className={battery < 20 ? "text-red-500" : "text-[#a3e635]"} />
            <span>CHARGE: {battery}%</span>
          </StatusItem>
        )}

        <StatusItem className="bg-black/20 font-bold px-3">{time}</StatusItem>
        <StatusItem>
          <LuBell size={12} className="animate-pulse text-[#a3e635]" />
        </StatusItem>
      </div>
    </footer>
  );
}
