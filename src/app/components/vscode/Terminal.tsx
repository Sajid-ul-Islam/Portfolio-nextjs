"use client";

import { useState, useRef, useEffect } from "react";

const terminalCommands = {
  help: () => `Available commands:
  help              Show this help message
  whoami            Display operative identity
  projects          List all active projects
  status            System diagnostic check
  clear             Reset terminal
  exit              Close tactical terminal`,
  
  whoami: () => `IDENTITY_CONFIRMED: SAJID ISLAM
ROLE: DATA SCIENTIST // BUSINESS ANALYST
LOCATION: DHAKA_GRID_02
CLEARANCE: LEVEL_5_ADMIN
STATUS: ACTIVE_FOR_OPS`,

  projects: () => `ACTIVE_PROJECTS:
> [DASHBOARD] E-Commerce Dashboard
> [AUTOMATION] Sheet2WhatsApp
> [SENTINEL] Sentinel Bangladesh
> [AIR_PASS] Air Passenger Forecasting`,

  status: () => `SYSTEM_DIAGN_V3: OK
DATA_GRID: SYNCED
ENCRYPTION: AES_256_ACTIVE
BATTERY: 100% (EXTERNAL_CORE)
UPTIME: ${Math.floor(performance.now() / 1000)}s`,

  clear: () => "CLEAR",
  exit: () => "EXIT",
};

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [output, setOutput] = useState<string[]>([
    "[SYSTEM] Contact terminal initialized. Type 'help' for available commands.",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newOutput = [...output, `$ ${cmd}`];
    
    if (cmd === 'clear') {
      setOutput(["[SYSTEM] Terminal reset."]);
    } else if (cmd === 'exit') {
       onClose();
    } else if (terminalCommands[cmd as keyof typeof terminalCommands]) {
      newOutput.push(terminalCommands[cmd as keyof typeof terminalCommands]());
      setOutput(newOutput);
    } else {
      newOutput.push(`Command not found: ${cmd}. Type 'help' for options.`);
      setOutput(newOutput);
    }
    
    setInput("");
  };

  return (
    <div className="absolute bottom-0 right-0 left-0 h-64 bg-black/90 border-t border-[#a3e635]/30 text-[#a3e635] font-mono p-4 z-50 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-2 border-b border-[#a3e635]/10 pb-1">
        <span className="text-xs uppercase tracking-widest">[ TERMINAL_v3.2.0 ]</span>
        <button onClick={onClose} className="hover:text-white">×</button>
      </div>
      <div ref={outputRef} className="flex-1 overflow-y-auto mb-2 text-sm whitespace-pre-wrap scrollbar-thin scrollbar-thumb-[#a3e635]/50">
        {output.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed">{line}</div>
        ))}
        <div className="flex items-center">
            <span className="mr-2">$</span>
            <form onSubmit={handleCommand} className="flex-1">
                <input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-[#a3e635] placeholder-[#a3e635]/30"
                    spellCheck={false}
                    aria-label="Terminal input"
                    placeholder="Type a command..."
                />
            </form>
        </div>
      </div>
    </div>
  );
}
