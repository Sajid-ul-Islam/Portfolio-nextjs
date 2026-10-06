"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Trash2, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { experiences, projects, metrics, skillGroups, personalInfo } from "../../data/portfolio";

import { soundFx } from "@/app/lib/soundFx";

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
  "/home/sajid/projects": ["cybrcraft.tsx", "deen-ops.py", "deen-bi.py", "ecommerce.tsx", "sentinel.py", "ramadan.tsx"],
  "/home/sajid/skills": ["tech_stack.json"],
  "/home/sajid/experience": ["work_history.md"],
};

const FILE_CONTENT: Record<string, string> = {
  "readme.md": "# Sajid Islam Portfolio\nWelcome to Sajid's interactive portfolio terminal. Type 'help' to view available commands.",
  "identity.json": '{\n  "name": "Sajid Islam",\n  "role": "Co-Founder @ CybrCraft | Business & Data Analyst",\n  "status": "Available"\n}',
  "cybrcraft.tsx": "// CybrCraft - Software Solutions & Digital Engineering\nexport default function CybrCraft() {\n  return <a href='https://cybrcraft.com'>Visit CybrCraft</a>;\n}",
  "ecommerce.tsx": "export default function EcomDashboard() {\n  return <div>E-Commerce Dashboard analytics</div>;\n}",
  "sentinel.py": "def analyze_security():\n    return 'Security Incident Mapping'",
  "tech_stack.json": '{\n  "skills": ["Next.js", "React", "Python", "SQL", "WordPress", "WooCommerce", "Power BI"]\n}',
  "work_history.md": "### Work History\n- Co-Founder @ CybrCraft (https://cybrcraft.com)\n- Business Analyst @ Deen Commerce\n- IT Executive @ NZ TEX GROUP\n- Associate @ Thriving Skills\n- Jr. Executive @ Daraz Bangladesh",
};

function formatSqlTable(headers: string[], rows: (string | number)[][]): string {
  const colWidths = headers.map((h, i) => Math.max(h.length, ...rows.map(r => String(r[i] ?? "").length)));
  const separator = "+-" + colWidths.map(w => "-".repeat(w)).join("-+-") + "-+";
  const headerRow = "| " + headers.map((h, i) => h.padEnd(colWidths[i])) + " |";
  const dataRows = rows.map(r => "| " + r.map((c, i) => String(c ?? "").padEnd(colWidths[i])).join(" | ") + " |");
  return [separator, headerRow, separator, ...dataRows, separator, `(${rows.length} rows in set)`].join("\n");
}

type TerminalProps = {
  onClose: () => void;
};

export default function Terminal({ onClose }: TerminalProps) {
  const [activeTab, setActiveTab] = useState<TerminalTab>("TERMINAL");
  const [currentDir, setCurrentDir] = useState("/home/sajid");
  const [output, setOutput] = useState<string[]>([
    "Developer Shell [Version 2099.4.0-CYBER]",
    "(c) 2026-2099 Sajid Islam. All rights reserved.",
    "",
    "Welcome to Sajid's Neural Portfolio Shell.",
    "Type 'help' for commands or try 'cyber', 'matrix', 'overclock', 'hack'.",
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
    "help", "cyber", "matrix", "overclock", "hack", "sfx", "fde", "cybrcraft", "sql", "curl", "estimate", "skills", "projects", "experience", "contact", "neofetch", "whoami", "status", "clear", "exit", "date", "hire", "npm", "ls", "cd", "pwd", "cat"
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
        response = `AVAILABLE 2099 FUTURISTIC COMMANDS:
  cyber             Display CybrCraft Quantum Architecture & AI Specifications
  matrix            Initiate neural holographic digital stream
  overclock         Simulate CPU turbo boost & trigger cyber graphics
  hack              Simulate automated penetration & system bypass
  sfx               Toggle futuristic Web Audio UI sound effects
  fde               Forward Deployed Engineering methodology & philosophy
  cybrcraft         Display CybrCraft software company info & services
  sql [query]       Query live portfolio datasets (e.g. sql SELECT * FROM metrics)
  curl [url]        Simulate HTTP GET requests (e.g. curl https://cybrcraft.com)
  estimate          Generate project scope & timeline estimate
  skills            Display categorized technical skill stacks
  experience        Display professional operational history
  projects          List summary of featured projects
  contact           Show direct contact coordinates & WhatsApp
  ls                List directory contents
  cd [dir]          Change directory
  pwd               Print working directory
  cat [file]        Display file content
  neofetch          Display system specifications
  whoami            Print current identity
  status            Print system memory & uptime status
  clear             Clear the terminal screen
  exit              Close the terminal`;
        break;
      case "cyber":
        soundFx.playCommandPing();
        response = `\u001b[36m========================================================
[CYBRCRAFT QUANTUM ARCHITECTURE // CO-FOUNDER SAJID ISLAM]
========================================================\u001b[0m
- CORE CO-FOUNDER : Sajid Islam (Product Mindset & Solutions Architect)
- AGENCY LINK     : https://cybrcraft.com/
- NEURAL ENGINE   : Multi-Agent RAG with LangGraph & Pinecone Dense Index
- REASONING DEPTH : Multi-Hop Decomposition + BM25 Hybrid Lexical Search
- AUTONOMOUS BOTS : High-concurrency Webhook Daemons (Telegram & WhatsApp API)
- E-COMMERCE CORE : Deen Commerce Real-Time Telemetry & Inventory Sync
- STREAMING MEDIA : Deakho TV Live TV Aggregation & Telemetry Platform
- ZERO-TRUST SEC  : TLS 1.3 / Quantum-Resistant Strict Content Security
- LATENCY BENCH   : <85ms Vector Lookups | 94.2% Domain Retrieval Precision
\u001b[32m>> ALL NEURAL & BUSINESS ANALYTICS SYSTEMS NOMINAL.\u001b[0m`;
        break;
      case "matrix":
        soundFx.playGlitch();
        response = `\u001b[32m01001001 01001110 01001001 01010100 01001001 01000001 01010100 01001001
ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ
ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン
0 1 0 1 1 0 1 0 1 1 0 0 1 0 1 1 0 1 0 1 0 1 1 1 0 1 0 0 1 0 1 0
>> WAKE UP, VISITOR...
>> THE MATRIX HAS YOU.
>> FOLLOW THE WHITE RABBIT TO: https://cybrcraft.com/
>> NEURAL HOLOGRAPHIC CONNECTION STABLE.\u001b[0m`;
        break;
      case "overclock":
        soundFx.playGlitch();
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("overclock-active");
        }
        response = `\u001b[33m⚡ TURBO OVERCLOCK PROTOCOL ENGAGED!
>> CLOCK FREQUENCY BOOSTED: 5.8 GHz -> 8.2 GHz (QUANTUM HARMONIC)
>> VOLTAGE RAILS: 1.35V LOCKED
>> THERMAL SENSORS: 48°C [LIQUID NITROGEN ACTIVE]
>> UI NEON GLOW CHROMA ACCELERATION: ACTIVE (Toggle with 'overclock' again)\u001b[0m`;
        break;
      case "hack":
        soundFx.playCommandPing();
        response = `\u001b[31m[!] INITIATING SECURE PENETRATION SEQUENCE...\u001b[0m
>> PROBING GATEWAY: 192.168.0.1:443 [SYN SENT]
>> BYPASSING FIREWALL RULES... [████████████████████] 100%
>> EXPLOITING BUFFER IN /api/auth... [OVERFLOW CONFIRMED]
>> EXTRACTING ROOT CERTIFICATE: 0x9AF8310E... [SUCCESS]
\u001b[32m[+] ROOT ACCESS GRANTED: WELCOME TO SAJID ISLAM MAINFRAME.
[+] RECRUITMENT HANDSHAKE ESTABLISHED: Contact sajid.islam.9977@gmail.com\u001b[0m`;
        break;
      case "sfx":
        {
          const nowOn = soundFx.toggle();
          response = `Futuristic Web Audio Sound Effects: ${nowOn ? "\u001b[32mENABLED (Active)\u001b[0m" : "\u001b[31mMUTED\u001b[0m"}`;
        }
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
      case "cybrcraft":
        response = `\u001b[35m=== CybrCraft Software Solutions ===\u001b[0m
Official Website: https://cybrcraft.com/
Co-Founder: Sajid Islam
Nature: Software Solutions & Digital Engineering

CORE SERVICES:
1. Custom Web Development (Next.js, React, TypeScript, Tailwind)
2. E-Commerce Solutions & Sync Mobile Apps (WooCommerce, REST API)
3. LMS Platforms (Course management, Video streaming, Payments)
4. AI Bots & Business Automation (Telegram Bot API, WhatsApp, RAG)
5. Ongoing Maintenance & 24/7 Support Mindset

DELIVERED CLIENTS:
- Epscy (E-Commerce)
- Normal Delivery BD (Healthcare & Doctor Directory)
- Rihab Typing (Typing & PRO Services)
- Solevia Shop (E-Commerce)
- Shotomul (Business & Legal Services)
Direct Consultation: Type 'estimate' or visit /estimator`;
        break;
      case "fde":
      case "forward-deployed":
      case "forwarddeployed":
        response = `FORWARD DEPLOYED ENGINEERING (FDE) BLUEPRINT:

Definition:
Forward Deployed Engineers (FDEs) sit at the direct intersection of customer operations, systems architecture, and production software engineering. Rather than building in an ivory tower, an FDE embeds directly with stakeholders on the ground to convert ambiguous business friction into battle-tested software and AI pipelines.

CORE FDE PILLARS:
1. DOMAIN IMMERSION & ROOT-CAUSE SCOPING
   - Deep on-the-ground analysis of operational workflows and data silos.
   - Translating executive objectives into strict technical specifications.

2. RAPID PRODUCTION PROTOTYPING (PoC to Production)
   - Delivering working Next.js web applications, SQL pipelines, and Agentic RAG workflows in days, not quarters.
   - Eliminating bloat: building high-leverage software that directly addresses high-friction bottlenecks.

3. QUANTIFIABLE ENTERPRISE ROI & SUSTAINABILITY
   - Designing self-healing data pipelines and automated bot integrations (Telegram/WhatsApp).
   - Training internal teams and instrumenting telemetry dashboards for sustained adoption.

TRACK RECORD:
- CybrCraft (cybrcraft.com): Forward-deployed digital engineering for e-commerce, LMS & businesses.
- Deen Commerce: Real-time inventory intelligence, reducing stockout latency.
- Daraz (Alibaba Group): Automated partner acquisition pipeline yielding 50% vendor network growth.`;
        break;
      case "sql":
        {
          const sqlQuery = cmd.slice(3).trim();
          if (!sqlQuery) {
            response = "Usage: sql SELECT * FROM [experiences | projects | metrics | skills]";
            break;
          }
          const lower = sqlQuery.toLowerCase();
          if (lower.includes("from experiences") || lower.includes("from experience")) {
            const headers = ["ID", "Role", "Company", "Period", "Status"];
            const rows = experiences.map(e => [
              e.id,
              e.title.slice(0, 24),
              e.company.slice(0, 20),
              e.startDate,
              e.current ? "Active" : "Completed"
            ]);
            response = formatSqlTable(headers, rows);
          } else if (lower.includes("from projects") || lower.includes("from project")) {
            const headers = ["ID", "Title", "Tech Stack", "Featured"];
            const rows = projects.slice(0, 8).map(p => [
              p.id,
              p.title.slice(0, 28),
              p.technologies.slice(0, 3).join(", "),
              p.featured ? "YES" : "NO"
            ]);
            response = formatSqlTable(headers, rows);
          } else if (lower.includes("from metrics") || lower.includes("from stats")) {
            const headers = ["Metric", "Value", "Scope"];
            const rows = metrics.map(m => [m.label, m.value, m.sub]);
            response = formatSqlTable(headers, rows);
          } else if (lower.includes("from skills") || lower.includes("from skill")) {
            const headers = ["Domain", "Total Skills", "Key Technologies"];
            const rows = skillGroups.map(g => [
              g.name,
              g.skills.length,
              g.skills.slice(0, 3).map(s => s.name).join(", ")
            ]);
            response = formatSqlTable(headers, rows);
          } else {
            response = `MySQL Error: Table not recognized. Available tables: 'experiences', 'projects', 'metrics', 'skills'.`;
          }
        }
        break;
      case "curl":
        {
          const url = args[0] || "https://cybrcraft.com/api/status";
          if (url.includes("cybrcraft")) {
            response = `HTTP/2 200 OK
content-type: application/json; charset=utf-8
server: cybrcraft-edge-gateway

{
  "status": "ONLINE",
  "company": "CybrCraft",
  "url": "https://cybrcraft.com/",
  "services": ["Web Development", "E-Commerce", "LMS", "AI Automation"],
  "coFounder": "Sajid Islam",
  "rating": "5.0 ★★★★★"
}`;
          } else if (url.includes("metrics")) {
            response = `HTTP/2 200 OK
content-type: application/json

${JSON.stringify(metrics, null, 2)}`;
          } else {
            response = `HTTP/2 200 OK
date: ${new Date().toUTCString()}
content-type: application/json

{
  "name": "${personalInfo.name}",
  "title": "${personalInfo.title}",
  "email": "${personalInfo.email}",
  "github": "${personalInfo.github}"
}`;
          }
        }
        break;
      case "estimate":
        response = `\u001b[36m=== CybrCraft Project Scope Estimator ===\u001b[0m
- Web Apps: ~14 days (Next.js, React, Tailwind)
- E-Commerce: ~20 days (WooCommerce, Multi-channel Sync)
- LMS Platforms: ~25 days (Video Streaming, Portals)
- AI & Chatbots: ~10 days (Telegram Bot, WhatsApp, RAG)

Interactive Calculator available at route: /estimator
Or initiate inquiry directly: https://wa.me/+8801824526054`;
        break;
      case "skills":
        response = skillGroups.map(g => `\u001b[33m[${g.name}]\u001b[0m\n  ${g.skills.map(s => s.name).join(" · ")}`).join("\n\n");
        break;
      case "experience":
        response = experiences.map(e => `• \u001b[32m${e.title}\u001b[0m @ ${e.company} (${e.startDate}${e.endDate ? ` - ${e.endDate}` : " - Present"})\n  ${e.description}`).join("\n\n");
        break;
      case "contact":
        response = `Contact Sajid Islam:
- Email:    ${personalInfo.email}
- WhatsApp: ${personalInfo.whatsapp}
- GitHub:   ${personalInfo.github}
- Website:  https://cybrcraft.com/`;
        break;
      case "projects":
        response = projects.slice(0, 6).map(p => `• \u001b[34m${p.title}\u001b[0m (${p.technologies.slice(0, 3).join(", ")})\n  ${p.description}`).join("\n\n");
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
    if (e.key === "Enter") {
      e.preventDefault();
      soundFx.playClick();
      executeCommand(input);
      setInput("");
      return;
    }
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
        
        <div className="flex items-center gap-2 text-gray-400">
           <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/30 rounded text-[10px] text-gray-300 font-mono border border-white/10 hover:border-white/20 cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>1: bash</span>
           </div>
           <button
             onClick={() => {
               soundFx.playClick();
               setOutput(prev => [...prev, "", "[SPLIT TERMINAL CREATED // 2: node]"]);
             }}
             className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
             title="Split Terminal (Ctrl+Shift+5)"
           >
             <span className="text-[12px] font-bold">＋</span>
           </button>
           <button
             onClick={() => {
               soundFx.playClick();
               setOutput([]);
             }}
             className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
             title="Clear Terminal (Ctrl+K)"
           >
             <Trash2 size={13} />
           </button>
           <button
             onClick={() => {
               soundFx.playClick();
               onClose();
             }}
             className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
             title="Close Panel"
           >
             <X size={14} />
           </button>
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
                        onChange={(e) => {
                          soundFx.playTerminalKey();
                          setInput(e.target.value);
                        }}
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
