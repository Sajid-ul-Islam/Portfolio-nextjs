"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, X, ChevronRight, LayoutPanelLeft, Terminal as TerminalIcon, AlertCircle, Info, Bug } from "lucide-react";
import { cn } from "../../lib/cn";

type TerminalTab = "TERMINAL" | "DEBUG CONSOLE" | "OUTPUT" | "PROBLEMS";

const NEO_ASCII = `
   _____                _      _ 
  / ____|              (_)    | |
 | (___    __ _   __ _  _   __| |
  \\___ \\  / _\` | / _\` || | / _\` |
  ____) || (_| || (_| || || (_| |
 |_____/  \\__,_| \\__, ||_| \\__,_|
                  __/ |          
                 |___/           
`;

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<TerminalTab>("TERMINAL");
  const [currentDir, setCurrentDir] = useState("C:\\Users\\SAJID\\Portfolio");
  const [output, setOutput] = useState<string[]>([
    "Tactical_OS [Version 2.4.102]",
    "(c) 2026 Sajid Intelligence Systems. All rights reserved.",
    "",
    "Establishing secure uplink...",
    "[SUCCESS] Connection verified. Level 5 clearance granted.",
    "Type 'help' to see mission-critical commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  
  // Mock data for other tabs
  const [problems] = useState([
    { file: "AIIntelEngine.ts", msg: "Missing documentation for [NEURAL_BUFFER]", line: 142, severity: "warning" },
    { file: "Terminal.tsx", msg: "Unoptimized scanline animation", line: 89, severity: "info" }
  ]);
  
  const [debugLogs] = useState([
    "[09:42:12] [DEBUG] Initializing Neural_Uplink...",
    "[09:42:15] [INFO] Gemini 1.5 Flash responding in 450ms.",
    "[09:43:01] [DEBUG] Syncing Local_Intel_Engine indices.",
    "[09:43:05] [SUCCESS] All systems NOMINAL."
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, activeTab]);

  const terminalCommands = {
    help: () => `AVAILABLE_OPS:
  help              Display tactical assistance
  ls                List archive contents
  cd [dir]          Change operational directory
  pwd               Print working directory
  cat [file]        Read encrypted data stream
  neofetch          Display system specifications
  whoami            Verification of operative identity
  projects          Summary of active mission projects
  status            Internal hardware diagnostics
  clear             Purge terminal buffer
  exit              Terminate session`,

    neofetch: () => `${NEO_ASCII}
OPERATIVE: Sajid Islam
OS: Tactical_OS_v2.0 (x86_64)
SHELL: SAJ-SH v1.2
UPTIME: ${Math.floor(performance.now() / 1000)}s
RESOLUTION: 1920x1080 (HUD_ENHANCED)
WM: VSCode_IDE_Shell
CPU: Neural_Engine_v15 (8) @ 4.2GHz
MEMORY: 32768MiB / 65536MiB
THEME: Midnight_Operative_Green`,

    whoami: () => `IDENTITY_SECURED: SAJID ISLAM
ROLE: DATA_ENGINEER // BI_STRATEGIST
LOC: DHAKA_SECTOR_07
CLEARANCE: LVL_05_ROOT`,

    ls: () => `mode     lastWriteTime         length name
----     -------------         ------ ----
d-----   30/03/2026     12:47         Experience/
d-----   30/03/2026     12:47         Projects/
d-----   30/03/2026     12:47         Skills/
-a----   30/03/2026     12:47    4201 README.md
-a----   30/03/2026     12:47    1024 identity.json`,

    pwd: () => currentDir,

    date: () => new Date().toLocaleString(),

    projects: () => `ACTIVE_MISSION_SESSIONS (LIVE):
[01] E-Commerce Dashboard  |  STATUS: DEPLOYED
[02] Sheet2WhatsApp        |  STATUS: OPERATION_SUCCESS
[03] Sentinel Bangladesh   |  STATUS: ACTIVE_INTEL
[04] Ramadan Compass       |  STATUS: MISSION_COMPLETE`,

    status: () => `[DIAGNOSTICS]
> CORE_TEMP: 42°C [STABLE]
> NET_UPLINK: 450Mbps [ENCRYPTED]
> AI_LATENCY: 12ms [OPTIMAL]
> DATA_INTEGRITY: 100% [VERIFIED]`,

    clear: () => "CLEAR",
    exit: () => "EXIT",
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newHistory = [cmd, ...history].slice(0, 50);
    setHistory(newHistory);
    setHistoryIdx(-1);

    const fullCmd = `${currentDir}> ${cmd}`;
    const [baseCmd, ...args] = cmd.toLowerCase().split(' ');
    
    if (baseCmd === 'clear') {
      setOutput([]);
    } else if (baseCmd === 'exit') {
       onClose();
    } else if (baseCmd === 'cd') {
      const target = args[0] || "~";
      if (target === ".." || target === "projects" || target === "skills" || target === "experience") {
        setCurrentDir(`C:\\Users\\SAJID\\Portfolio\\${target === ".." ? "" : target}`);
        setOutput(prev => [...prev, fullCmd, ""]);
      } else {
        setOutput(prev => [...prev, fullCmd, `cd: ${target}: Access Denied or Path Not Found`, ""]);
      }
    } else if (baseCmd === 'cat') {
      const file = args[0];
      let response = `cat: ${file}: Unable to read sector. File may be encrypted.`;
      if (file === 'readme.md') response = "# SAJID_ISLAM_ARCHIVE\nOperational dossier for Sajid Islam. All data verified.";
      if (file === 'identity.json') response = '{\n  "operative": "Sajid Islam",\n  "status": "Ready for assignment",\n  "specialties": ["BI", "Data Analytics", "IT Strategy"]\n}';
      setOutput(prev => [...prev, fullCmd, response, ""]);
    } else if (terminalCommands[baseCmd as keyof typeof terminalCommands]) {
      const response = terminalCommands[baseCmd as keyof typeof terminalCommands]();
      setOutput(prev => [...prev, fullCmd, response, ""]);
    } else {
      setOutput(prev => [...prev, fullCmd, `Term: '${cmd}' not recognized as a valid internal command.`, ""]);
    }
    
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c] border-t border-white/10 text-[#cccccc] font-mono text-[12px] select-text">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-4 bg-[#111111] h-9 border-b border-white/5">
        <div className="flex items-center gap-5 h-full">
          {["PROBLEMS", "OUTPUT", "DEBUG CONSOLE", "TERMINAL"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TerminalTab)}
                className={cn(
                  "h-full flex items-center text-[10px] font-bold tracking-tight transition-all border-b-2 hover:text-white relative",
                  isActive ? "border-[#a3e635] text-white" : "border-transparent text-gray-500"
                )}
              >
                {tab}
                {tab === "PROBLEMS" && (
                  <span className="ml-1.5 flex items-center justify-center w-3.5 h-3.5 bg-red-500/20 text-red-500 text-[8px] rounded-full">
                    {problems.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center gap-4 text-gray-500">
           <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded text-[10px] text-[#a3e635]/80 font-bold border border-white/5">
              <ChevronRight size={10} />
              <span>ps: saj-shell</span>
           </div>
           <div className="flex items-center gap-3 border-l border-white/5 pl-3">
             <Plus size={14} className="hover:text-white cursor-pointer transition-colors" />
             <Trash2 size={14} className="hover:text-white cursor-pointer transition-colors" onClick={() => setOutput([])} />
             <X size={16} className="hover:text-[#a3e635] cursor-pointer transition-colors" onClick={onClose} />
           </div>
        </div>
      </div>

      {/* Area */}
      <div 
        ref={outputRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-4 scrollbar-none selection:bg-[#a3e635]/30"
      >
        {activeTab === "TERMINAL" && (
          <div className="animate-in fade-in duration-300">
            {output.map((line, i) => (
              <div key={i} className="mb-0.5 leading-relaxed whitespace-pre-wrap">
                {line.startsWith("[SUCCESS]") ? <span className="text-[#a3e635] font-bold">{line}</span> : line}
              </div>
            ))}
            <div className="flex items-start mt-1 relative">
                <span className="mr-2 text-[#a3e635] whitespace-nowrap font-bold">{currentDir}&gt;</span>
                <form onSubmit={handleCommand} className="flex-1 relative min-w-0">
                    <input
                        ref={inputRef}
                        autoFocus
                        type="text"
                        value={input}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-white caret-[#a3e635] caret-transparent absolute inset-0 opacity-0 z-10"
                        spellCheck={false}
                        aria-label="Terminal input"
                    />
                    <div className="relative pointer-events-none break-all flex flex-wrap">
                       <span className="text-white">{input}</span>
                       <span className="inline-block w-2 H-4 bg-[#a3e635] animate-pulse ml-0.5 mt-0.5 shadow-[0_0_8px_#a3e635]"></span>
                    </div>
                </form>
            </div>
          </div>
        )}

        {activeTab === "PROBLEMS" && (
          <div className="space-y-2 animate-in slide-in-from-bottom-1 duration-200">
            {problems.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-2 bg-red-500/5 border border-red-500/10 rounded group hover:border-red-500/30 transition-colors">
                <AlertCircle size={14} className="text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="text-[11px] text-white flex items-center justify-between">
                    <span>{p.msg}</span>
                    <span className="text-red-500/50 group-hover:text-red-500 text-[10px]">L:{p.line}</span>
                  </div>
                  <div className="text-[9px] text-gray-500 font-mono italic tracking-tighter">~/src/app/core/{p.file}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "DEBUG CONSOLE" && (
          <div className="space-y-1 font-mono text-[11px]">
            {debugLogs.map((log, i) => (
              <div key={i} className={cn(
                "py-0.5",
                log.includes("[DEBUG]") ? "text-gray-500" : 
                log.includes("[INFO]") ? "text-blue-400" :
                log.includes("[SUCCESS]") ? "text-[#a3e635]" : ""
              )}>
                {log}
              </div>
            ))}
            <div className="mt-2 text-gray-600 animate-pulse">&gt; Initializing secondary debugger...</div>
          </div>
        )}

        {activeTab === "OUTPUT" && (
          <div className="text-[11px] text-gray-400 space-y-4">
             <div className="p-3 bg-white/5 border-l-2 border-[#a3e635] italic">
                Welcome to Output Stream. Monitoring mission-critical builds.
             </div>
             <div>[09:44:00] Building statically generated pages...</div>
             <div>[09:44:02] Optimizing tactical image assets...</div>
             <div>[09:44:05] Mission deployment READY.</div>
          </div>
        )}
      </div>
    </div>
  );
}
