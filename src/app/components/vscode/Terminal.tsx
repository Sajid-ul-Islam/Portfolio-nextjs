"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Trash2, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

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
  "/home/sajid/projects": ["deen-ops.py", "deen-bi.py", "ecommerce.tsx", "sentinel.py", "ramadan.tsx"],
  "/home/sajid/skills": ["tech_stack.json"],
  "/home/sajid/experience": ["work_history.md"],
};

const FILE_CONTENT: Record<string, string> = {
  "readme.md": "# Sajid Islam Portfolio\nWelcome to Sajid's interactive portfolio terminal. Type 'help' to view available commands.",
  "identity.json": '{\n  "name": "Sajid Islam",\n  "role": "Business & Data Analyst",\n  "status": "Available"\n}',
  "ecommerce.tsx": "export default function EcomDashboard() {\n  return <div>E-Commerce Dashboard analytics</div>;\n}",
  "sentinel.py": "def analyze_security():\n    return 'Security Incident Mapping'",
  "tech_stack.json": '{\n  "skills": ["Python", "SQL", "Power BI", "Tableau", "React", "Next.js"]\n}',
  "work_history.md": "### Work History\n- Business Analyst @ Deen Commerce\n- IT Executive @ NZ TEX GROUP\n- Associate @ Thriving Skills\n- Jr. Executive @ Daraz Bangladesh",
};

type TerminalProps = {
  onClose: () => void;
};

export default function Terminal({ onClose }: TerminalProps) {
  const [activeTab, setActiveTab] = useState<TerminalTab>("TERMINAL");
  const [currentDir, setCurrentDir] = useState("/home/sajid");
  const [output, setOutput] = useState<string[]>([
    "Developer Shell [Version 1.0.0]",
    "(c) 2026 Sajid Islam. All rights reserved.",
    "",
    "Welcome to Sajid's interactive portfolio terminal.",
    "Type 'help' to view available commands.",
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
    "help", "ls", "cd", "pwd", "cat", "neofetch", "whoami", "projects", "status", "clear", "exit", "mkdir", "touch", "date", "hire", "sudo", "npm"
  ], []);

  const executeCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim();
    if (!cmd) return;

    setHistory(prev => [cmd, ...prev].slice(0, 50));
    setHistoryIdx(-1);

    const fullCmd = `\u001b[32m${currentDir}\u001b[0m ❯ ${cmd}`;
    const [baseCmd, ...args] = cmd.toLowerCase().split(' ');
    
    let response = "";

    switch (baseCmd) {
      case "help":
        response = `AVAILABLE COMMANDS:
  help              Display help information
  ls                List directory contents
  cd [dir]          Change directory
  pwd               Print working directory
  cat [file]        Display file content
  neofetch          Display system configurations
  whoami            Print current user name
  projects          List summary of projects
  status            Print system status
  mkdir [name]      Create a new directory
  touch [name]      Create a new file
  date              Display current system date
  clear             Clear the terminal screen
  exit              Close the terminal`;
        break;
      case "cd":
        {
          const targetDir = args[0];
          if (!targetDir) {
            setCurrentDir("/home/sajid");
            response = "";
          } else if (targetDir === "..") {
            if (currentDir === "/") {
              response = "";
            } else {
              const parts = currentDir.split("/");
              parts.pop();
              const parent = parts.join("/") || "/";
              setCurrentDir(parent);
              response = "";
            }
          } else if (targetDir === ".") {
            response = "";
          } else {
            // Resolve relative or absolute path
            let resolved = targetDir.startsWith("/") ? targetDir : `${currentDir === "/" ? "" : currentDir}/${targetDir}`;
            if (resolved.endsWith("/") && resolved.length > 1) {
              resolved = resolved.slice(0, -1);
            }
            if (resolved in fs) {
              setCurrentDir(resolved);
              response = "";
            } else {
              response = `bash: cd: ${targetDir}: No such file or directory`;
            }
          }
        }
        break;
      case "pwd":
        response = currentDir;
        break;
      case "cat":
        const file = args[0]?.toLowerCase();
        response = FILE_CONTENT[file!] || `cat: ${file}: No such file or directory.`;
        break;
      case "ls":
        const contents = [...(fs[currentDir as keyof typeof fs] || [])];
        response = contents.length > 0 ? contents.join("  ") : "directory is empty";
        break;
      case "mkdir":
        if (!args[0]) {
           response = "mkdir: missing operand";
        } else {
           const newDir = `${currentDir === "/" ? "" : currentDir}/${args[0]}`;
           setFs(prev => ({ ...prev, [newDir]: [], [currentDir]: [...(prev[currentDir as keyof typeof prev] || []), args[0]] }));
           response = `Created directory: ${args[0]}`;
        }
        break;
      case "touch":
        if (!args[0]) {
            response = "touch: missing file operand";
        } else {
            setFs(prev => ({ ...prev, [currentDir]: [...(prev[currentDir as keyof typeof prev] || []), args[0]] }));
            response = `Created file: ${args[0]}`;
        }
        break;
      case "date":
        response = new Date().toLocaleString();
        break;
      case "projects":
        response = "Sajid's Featured Projects:\n- Deen Ops Dashboard (Python/Streamlit)\n- Deen Business Intel (Python/Streamlit)\n- ECommerce Dashboard (React/Analytics)\n- Sheet2WhatsApp (Python/Streamlit)\n- Sentinel Bangladesh (Python/Map Visualization)";
        break;
      case "status":
        const mem = (performance as any).memory ? `${Math.round((performance as any).memory.usedJSHeapSize / 1048576)}MB` : "24MB";
        response = `System Status:
User: sajidislam
Uptime: ${Math.floor(performance.now() / 60000)}m
Memory usage: ${mem}
Terminal shell: bash`;
        break;
      case "whoami":
        response = "sajidislam";
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
  \u001b[32mOS\u001b[0m: Portfolio OS v1.0.0
  \u001b[32mHOST\u001b[0m: Sajid-Workspace
  \u001b[32mKERNEL\u001b[0m: 14.2.35-next
  \u001b[32mUPTIME\u001b[0m: ${Math.floor(performance.now() / 60000)}m
  \u001b[32mSHELL\u001b[0m: bash --vscode
  \u001b[32mRESOLUTION\u001b[0m: ${window.innerWidth}x${window.innerHeight}
  \u001b[32mTHEME\u001b[0m: VSCode Modern Dark
  \u001b[32mCPU\u001b[0m: Virtual Processor (Vercel)
  \u001b[32mMEMORY\u001b[0m: ${Math.round((performance as any).memory?.usedJSHeapSize / 1048576 || 24)}MB / 4096MB`;
        break;
      case "hire":
        response = `\u001b[32m🎉 Success!\u001b[0m Sajid has been notified of your interest. 
He is available for immediate hire. Please reach out to sajid.islam.9977@gmail.com!`;
        break;
      case "sudo":
        response = `sajidislam is not in the sudoers file. This incident will be reported.`;
        break;
      case "npm":
        if (args[0] === "run" && args[1] === "dev") {
          response = `> Portfolio-nextjs@0.1.0 dev
> next dev

▲ Next.js 14.2.35
- Local:        http://localhost:3000
- Environments: .env

 ✓ Starting...
 ✓ Ready in 1250ms`;
        } else {
          response = `npm: command not found`;
        }
        break;
      default:
        // Handle "python" simulated run
        if (baseCmd === "python" || baseCmd === "python3") {
           response = `Executing ${args[0] || 'script'}...
[SUCCESS] Pipeline completed in 1.42s
Data successfully processed and output generated.`;
        } else {
           response = `bash: ${cmd}: command not found. Type 'help' for available commands.`;
        }
    }

    setOutput(prev => [...prev, fullCmd, response, ""]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  };

  useEffect(() => {
    const handleTerminalRun = (e: CustomEvent<string>) => {
      executeCommand(e.detail);
    };

    window.addEventListener('terminal-run', handleTerminalRun as EventListener);
    return () => window.removeEventListener('terminal-run', handleTerminalRun as EventListener);
  }, [currentDir, fs]); // Dependencies needed for executeCommand closures

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
    <div 
      style={{ fontSize: "var(--terminal-font-size, 11px)" }}
      className="flex flex-col h-full bg-[var(--vscode-editor-background)] border-t border-[var(--vscode-border)] text-[var(--vscode-editor-foreground)] font-mono select-text"
    >
      {/* Tab Bar */}
      <div className="flex items-center justify-between px-3 bg-[var(--vscode-sideBar-background)] h-8 border-b border-[var(--vscode-border)]">
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
           <div className="flex items-center gap-2 px-2 py-0.5 bg-[var(--vscode-accent)]/10 rounded text-[9px] text-[var(--vscode-accent)] font-bold border border-[var(--vscode-border)]">
              <ChevronRight size={10} />
              <span>bash --vscode</span>
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
                <span className="text-[#a3e635] font-bold mr-2">{currentDir} ❯</span>
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
            No problems or output streams active.
          </div>
        )}
      </div>
    </div>
  );
}
