"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Plus, Trash2, X, ChevronRight, Terminal as TerminalIcon, AlertCircle } from "lucide-react";
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

const INITIAL_FS = {
  "/": ["home", "etc", "bin", "var"],
  "/home": ["sajid"],
  "/home/sajid": ["projects", "skills", "experience", "README.md", "identity.json"],
  "/home/sajid/projects": ["ecommerce.tsx", "sentinel.py", "ramadan.js", "automation.sh"],
  "/home/sajid/skills": ["tech_stack.json", "analytics_tools.txt"],
  "/home/sajid/experience": ["work_history.md"],
};

const FILE_CONTENT: Record<string, string> = {
  "readme.md": "# SAJID_ISLAM_ARCHIVE\nOperational dossier for Sajid Islam. All data verified.\n\nWelcome to my tactical portfolio terminal. Type 'help' to begin.",
  "identity.json": '{\n  "operative": "Sajid Islam",\n  "role": "Data Engineer / BI Strategist",\n  "clearance": "Level 5",\n  "status": "Active"\n}',
  "ecommerce.tsx": "export default function EcomMission() {\n  return <div>Mission Critical E-Commerce Dashboard</div>;\n}",
  "sentinel.py": "import sentinel_core\ndef analyze_security():\n    return sentinel_core.scan_vulnerability()",
  "tech_stack.json": '{\n  "frontend": ["Next.js", "React", "Tailwind"],\n  "data": ["Python", "SQL", "Tableau", "PowerBI"],\n  "devops": ["Vercel", "Git", "GitHub Actions"]\n}',
  "work_history.md": "### Professional Dossier\n- Data Analyst @ Pathao\n- IT Strategist @ Multiple Missions\n- Open Source Operative",
};

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<TerminalTab>("TERMINAL");
  const [currentDir, setCurrentDir] = useState("/home/sajid");
  const [output, setOutput] = useState<string[]>([
    "Tactical_OS [Version 2.4.110]",
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
  const [fs, setFs] = useState(INITIAL_FS);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, activeTab]);

  const availableCommands = useMemo(() => [
    "help", "ls", "cd", "pwd", "cat", "neofetch", "whoami", "projects", "status", "clear", "exit", "mkdir", "touch", "date"
  ], []);

  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!input) return;

    setHistory(prev => [cmd, ...prev].slice(0, 50));
    setHistoryIdx(-1);

    const fullCmd = `\u001b[32m${currentDir}\u001b[0m \u276f ${cmd}`;
    const [baseCmd, ...args] = cmd.toLowerCase().split(' ');
    
    let response = "";

    if (cmd === "sudo unlock_vault") {
        setIsUnlocked(true);
        response = "[SUCCESS] SECTOR_07_ENCRYPTION_BYPASSED. NEW_DATA_SOURCE_FOUND: secret.txt";
    } else {
        switch (baseCmd) {
            case "help":
                response = `AVAILABLE_OPS:
  help              Display tactical assistance
  ls                List archive contents
  cd [dir]          Change operational directory
  pwd               Print working directory
  cat [file]        Read encrypted data stream
  neofetch          Display system specifications
  whoami            Verification of operative identity
  projects          Summary of active mission projects
  status            Internal hardware diagnostics
  mkdir [name]      Create secondary directory
  touch [name]      Initialize new data file
  date              Retrieve temporal coordinates
  clear             Purge terminal buffer
  exit              Terminate session
  sudo unlock_vault Uncover clandestine dossiers`;
                break;
            case "cat":
                const file = args[0]?.toLowerCase();
                if (file === "secret.txt") {
                    if (isUnlocked) {
                        response = `[CLANDESTINE_DOSSIER_OPEN]
        
    .--------.
   / .------. \\
  / /        \\ \\
  | |        | |
 _| |________| |_
.' |_|        |_| '.
'._____ ____ _____.'
|     .'    '.     |
'-----'------'-----'
[INTEL]: Sajid actually loves 80s synthwave and deep-sea diving.
[LOCATION]: secret_location_0x42
[SIGNATURE]: Mission_Accomplished`;
                    } else {
                        response = "cat: secret.txt: Access Denied. Sudo Clearance Required.";
                    }
                } else {
                    response = FILE_CONTENT[file!] || `cat: ${file}: Unable to read sector.`;
                }
                break;
            case "ls":
                const contents = [...(fs[currentDir as keyof typeof fs] || [])];
                if (isUnlocked && currentDir === "/home/sajid") contents.push("secret.txt");
                response = contents.length > 0 ? contents.join("  ") : "directory is empty";
                break;
      case "mkdir":
        if (!args[0]) {
           response = "mkdir: missing operation target";
        } else {
           const newDir = `${currentDir === "/" ? "" : currentDir}/${args[0]}`;
           setFs(prev => ({ ...prev, [newDir]: [], [currentDir]: [...(prev[currentDir as keyof typeof prev] || []), args[0]] }));
           response = `Created directory: ${args[0]}`;
        }
        break;
      case "touch":
        if (!args[0]) {
            response = "touch: missing file target";
        } else {
            setFs(prev => ({ ...prev, [currentDir]: [...(prev[currentDir as keyof typeof prev] || []), args[0]] }));
            response = `Initialized file: ${args[0]}`;
        }
        break;
      case "date":
        response = new Date().toLocaleString();
        break;
      case "projects":
        response = "ACTIVE_MISSION_SESSIONS (LIVE):\n[01] E-Commerce Dashboard\n[02] Sheet2WhatsApp\n[03] Sentinel Bangladesh\n[04] Ramadan Compass";
        break;
      case "status":
        const batt = (window as any).batteryLevel ? `${(window as any).batteryLevel}%` : "100%";
        const mem = (performance as any).memory ? `${Math.round((performance as any).memory.usedJSHeapSize / 1048576)}MB` : "24MB";
        response = `[DIAGNOSTICS]
OPERATIVE: SAJID_ISLAM
STATION: TERMINAL_0x07
UPTIME: ${Math.floor(performance.now() / 60000)}m
MEM_LOAD: ${mem} [OK]
BATT_LVL: ${batt}
UPLINK: ENCRYPTED_V5
CORE_TEMP: 42°C [STABLE]`;
        break;
      case "whoami":
        response = "SAJID_ISLAM // OPERATIVE_ID: 0x29A // CLEARANCE: LEVEL_5";
        break;
      case "clear":
        setOutput([]);
        setInput("");
        return;
      case "exit":
        onClose();
        return;
      case "neofetch":
        response = `\u001b[32m${NEO_ASCII}\u001b[0m
  \u001b[32mOS\u001b[0m: Tactical_OS v2.4.1 [Night Ops]
  \u001b[32mHOST\u001b[0m: Sajid-Intelligence-Station-0x7
  \u001b[32mKERNEL\u001b[0m: 6.5.0-operative-next
  \u001b[32mUPTIME\u001b[0m: ${Math.floor(performance.now() / 60000)}m
  \u001b[32mSHELL\u001b[0m: bash --operative-saj
  \u001b[32mRESOLUTION\u001b[0m: ${window.innerWidth}x${window.innerHeight}
  \u001b[32mTHEME\u001b[0m: Midnight_Hacker_V5
  \u001b[32mCPU\u001b[0m: Neural_Link_Core_i9 (Virtual)
  \u001b[32mGPU\u001b[0m: RTX_Nvidia_Intelligence_Stream
  \u001b[32mMEMORY\u001b[0m: ${Math.round((performance as any).memory?.usedJSHeapSize / 1048576 || 24)}MB / 4096MB`;
        break;
      default:
        response = `Term: '${cmd}' not recognized in current tactical context. Type 'help' for ops.`;
    }
  }

    setOutput(prev => [...prev, fullCmd, response, ""]);
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
    } else if (e.key === "Tab") {
      e.preventDefault();
      const currentInput = input.trim();
      if (!currentInput) return;
      
      const parts = currentInput.split(' ');
      const lastPart = parts[parts.length - 1];
      
      if (parts.length === 1) {
        // Autocomplete commands
        const matches = availableCommands.filter(c => c.startsWith(lastPart.toLowerCase()));
        if (matches.length === 1) setInput(matches[0] + " ");
      } else {
        // Autocomplete files/dirs
        const contents = fs[currentDir as keyof typeof fs] || [];
        const matches = contents.filter(f => f.toLowerCase().startsWith(lastPart.toLowerCase()));
        if (matches.length === 1) {
            parts[parts.length - 1] = matches[0];
            setInput(parts.join(' ') + " ");
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#080808] border-t border-white/10 text-[#cccccc] font-mono text-[11px] select-text">
      {/* Tab Bar */}
      <div className="flex items-center justify-between px-3 bg-[#111111] h-8 border-b border-white/5">
        <div className="flex items-center gap-4 h-full">
          {["PROBLEMS", "OUTPUT", "DEBUG CONSOLE", "TERMINAL"].reverse().map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TerminalTab)}
              className={cn(
                "h-full px-2 flex items-center text-[10px] font-bold tracking-tight transition-all border-b-2",
                activeTab === tab ? "border-[#a3e635] text-white" : "border-transparent text-gray-500 hover:text-gray-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 text-gray-500">
           <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 rounded text-[9px] text-[#a3e635]/80 font-bold border border-white/5">
              <ChevronRight size={10} />
              <span>bash --operative-saj</span>
           </div>
           <Trash2 size={13} className="hover:text-white cursor-pointer" onClick={() => setOutput([])} />
           <X size={14} className="hover:text-[#a3e635] cursor-pointer" onClick={onClose} />
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={outputRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-4 custom-editor-scroll selection:bg-[#a3e635]/20"
      >
        {activeTab === "TERMINAL" ? (
          <div className="space-y-1">
            {output.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap leading-relaxed">
                {line.includes("[SUCCESS]") ? <span className="text-[#a3e635] font-bold">{line}</span> : 
                 line.includes("\u001b[32m") ? <span dangerouslySetInnerHTML={{ __html: line.replace(/\u001b\[32m/g, '<span class="text-[#a3e635]">').replace(/\u001b\[0m/g, '</span>') }} /> : line}
              </div>
            ))}
            <div className="flex items-center pt-1 group">
                <span className="text-[#a3e635] font-bold mr-2">{currentDir} \u276f</span>
                <div className="relative flex-1">
                    <input
                        ref={inputRef}
                        autoFocus
                        type="text"
                        value={input}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-white caret-transparent"
                        spellCheck={false}
                    />
                    <div className="absolute top-0 left-0 pointer-events-none flex items-center">
                        <span className="text-white invisible">{input}</span>
                        <span className="w-1.5 h-3.5 bg-[#a3e635] shadow-[0_0_8px_#a3e635] animate-pulse"></span>
                    </div>
                </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 italic">
            [DATA_STREAM_WAITING_FOR_UPLINK]
          </div>
        )}
      </div>
    </div>
  );
}
