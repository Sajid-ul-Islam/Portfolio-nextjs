"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Terminal as TerminalIcon, X } from "lucide-react";
import { cn } from "../../lib/cn";

type MissionReplayProps = {
  title: string;
  logs: string[];
};

export default function MissionReplay({ title, logs }: MissionReplayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [isReplaying, setIsReplaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startReplay = () => {
    setIsOpen(true);
    setIsReplaying(true);
    setCurrentLogs([]);
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setCurrentLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        setIsReplaying(false);
        clearInterval(interval);
      }
    }, 800);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentLogs]);

  return (
    <>
      <button 
        onClick={startReplay}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-black/40 border border-[#a3e635]/30 rounded text-[10px] font-bold text-[#a3e635] hover:bg-[#a3e635]/10 transition-all uppercase tracking-widest group"
      >
        <Play size={12} className="group-hover:scale-125 transition-transform" />
        <span>REPLAY_MISSION_LOG</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-[#0a0a0a] border border-[#a3e635]/40 rounded-lg shadow-[0_0_50px_rgba(163,230,53,0.2)] overflow-hidden flex flex-col h-[500px]">
            {/* Terminal Header */}
            <div className="bg-[#a3e635]/10 p-3 border-b border-[#a3e635]/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-[#a3e635]" />
                <span className="text-[10px] font-bold text-[#a3e635]">MISSION_REPLAY_LOG: {title}</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#a3e635]/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Terminal Content */}
            <div ref={scrollRef} className="flex-1 p-6 font-mono text-[11px] overflow-y-auto space-y-2 bg-[#050505] selection:bg-[#a3e635]/30">
              {currentLogs.map((log, i) => (
                <div key={i} className="flex gap-3 animate-in slide-in-from-left-2 duration-300">
                  <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
                  <span className={cn(
                    "flex-1",
                    log.startsWith(">>") ? "text-[#a3e635] font-bold" : 
                    log.startsWith("[!] ") ? "text-yellow-500" :
                    log.startsWith("[ERR]") ? "text-red-500" : "text-gray-300"
                  )}>
                    {log}
                  </span>
                </div>
              ))}
              {isReplaying && (
                <div className="flex items-center gap-2 text-[#a3e635] italic animate-pulse">
                   <div className="w-1.5 h-3 bg-[#a3e635]"></div>
                   <span>STREAMING_MISSION_DATA...</span>
                </div>
              )}
            </div>

            {/* Footer */}
            {!isReplaying && (
              <div className="p-3 border-t border-[#a3e635]/10 bg-black/40 flex justify-end">
                <button 
                  onClick={startReplay}
                  className="flex items-center gap-2 px-3 py-1 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded text-[9px] font-bold text-[#a3e635] hover:bg-[#a3e635]/20 transition-all"
                >
                  <RotateCcw size={10} />
                  <span>REBOOT_SEQUENCE</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
