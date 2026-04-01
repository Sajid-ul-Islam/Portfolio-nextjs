"use client";

import { useState } from "react";
import { 
  LuCode, 
  LuPlay, 
  LuTerminal, 
  LuSave, 
  LuTrash2, 
  LuRefreshCw, 
  LuGhost,
  LuCpu,
  LuDownload
} from "react-icons/lu";
import { cn } from "../../lib/cn";

type NotebookCell = {
  cell_type: "markdown" | "code";
  source: string[];
  outputs?: string[];
};

export default function CodeEditor() {
  const [code, setCode] = useState(`// Tactical OS Scripting Module
// Operative: Sajid Islam
// Task: Deploy intelligence dashboard

function deployModule() {
  console.log("INITIALIZING_SECURE_KERNEL...");
  console.log("UPLINK_STATUS: STABLE");
  console.log("ENCRYPTING_DATA_STREAMS...");
  
  return "[SUCCESS] INTEL_DASHBOARD_LIVE";
}

deployModule();`);

  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"script" | "notebook">("script");
  const defaultNotebook = `{
  "cells": [
    {"cell_type": "markdown", "source": ["# Jupyter-style Notebook\n", "Use this interactive mode for analysis.\n"]},
    {"cell_type": "code", "source": ["const series = [1,2,4,8,16];\n", "plot(series);\n", "const mean = series.reduce((a,b) => a+b,0)/series.length;\n", "console.log('mean', mean);\n"]}
  ],
  "metadata": {},
  "nbformat": 4,
  "nbformat_minor": 5
}`;

  const [notebookJson, setNotebookJson] = useState(defaultNotebook);
  const [notebookCells, setNotebookCells] = useState<NotebookCell[]>([]);
  const [notebookError, setNotebookError] = useState("");
  const [graphData, setGraphData] = useState<number[]>([]);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    setGraphData([]);

    const logs: string[] = [];
    const originalLog = console.log;

    try {
      console.log = (...args) => {
        logs.push(`> ${args.join(' ')}`);
      };
      const result = eval(code);
      if (result !== undefined) logs.push(`\nRESULT: ${result}`);
    } catch (err: any) {
      logs.push(`\n[ERROR]: ${err.message}`);
    } finally {
      console.log = originalLog;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setOutput(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 100);
  };

  const loadNotebook = () => {
    try {
      const parsed: { cells: NotebookCell[] } = JSON.parse(notebookJson);
      if (!parsed.cells || !Array.isArray(parsed.cells)) throw new Error("Invalid .ipynb format");
      setNotebookCells(parsed.cells);
      setNotebookError("");
      setGraphData([]);
    } catch (err: any) {
      setNotebookError(err.message || "Invalid JSON");
      setNotebookCells([]);
    }
  };

  const runNotebook = () => {
    if (notebookCells.length === 0) {
      setNotebookError("Load a valid notebook first.");
      return;
    }

    setNotebookError("");
    setGraphData([]);

    let newCells = notebookCells.map(cell => ({ ...cell, outputs: [] as string[] }));

    newCells = newCells.map(cell => {
      if (cell.cell_type !== "code") return cell;
      const outputs: string[] = [];

      const plot = (data: number[]) => {
        setGraphData(data);
        outputs.push(`[PLOT] ${JSON.stringify(data)}`);
      };

      const log = (...args: any[]) => outputs.push(`> ${args.join(" ")}`);

      try {
        const fn = new Function("plot", "log", cell.source.join(""));
        const result = fn(plot, log);
        if (result !== undefined) outputs.push(`RESULT: ${result}`);
      } catch (err) {
        outputs.push(`[ERROR]: ${err instanceof Error ? err.message : String(err)}`);
      }
      return { ...cell, outputs };
    });

    setNotebookCells(newCells);
  };

  const clearBuffer = () => setOutput([]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] font-mono select-none animate-in fade-in duration-500 overflow-hidden">
      <div className="p-2 flex gap-2 border-b border-white/10 bg-[#101719]">
        <button
          onClick={() => setMode("script")}
          className={cn(
            "px-3 py-1 rounded text-sm font-bold",
            mode === "script" ? "bg-[#a3e635] text-black" : "bg-white/10 text-white"
          )}
        >
          Script Editor
        </button>
        <button
          onClick={() => setMode("notebook")}
          className={cn(
            "px-3 py-1 rounded text-sm font-bold",
            mode === "notebook" ? "bg-[#a3e635] text-black" : "bg-white/10 text-white"
          )}
        >
          Notebook (.ipynb)
        </button>
      </div>
      {mode === "script" ? (
        <>
          {/* Office Style Ribbon - Code Editor (Dark Grey/Black Theme) */}
          <div className="bg-[#1e1e1e] border-b border-white/10 p-1 px-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-[#a3e635]/10 p-1.5 rounded border border-[#a3e635]/20">
            <LuCode size={18} className="text-[#a3e635]" />
          </div>
          <div>
            <h1 className="text-[10px] font-black text-[#a3e635]/50 uppercase tracking-widest leading-none mb-1">SUXO_SYSTEMS // SCRIPT_TERMINAL</h1>
            <h2 className="text-sm font-bold text-white leading-none">main_ops.tsx [ACTIVE]</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={runCode}
                disabled={isRunning}
                className={cn(
                    "p-1 px-4 rounded transition-all text-[10px] font-black flex items-center gap-2",
                    isRunning ? "bg-[#a3e635]/20 text-gray-500 cursor-not-allowed" : "bg-[#a3e635] text-black hover:scale-105"
                )}
            >
                {isRunning ? <LuRefreshCw size={14} className="animate-spin" /> : <LuPlay size={14} />}
                {isRunning ? "RUNNING_PROCESS..." : "EXECUTE_SCRIPT"}
            </button>
            <button 
                onClick={() => {
                    const blob = new Blob([code], { type: 'text/javascript' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'main_ops.tsx';
                    link.click();
                }}
                className="p-2 bg-white/5 hover:bg-white/10 text-white rounded transition-colors border border-white/5" 
                title="Download Script"
            >
                <LuDownload size={16} />
            </button>
            <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded transition-colors border border-white/5" title="Archive locally"><LuSave size={16} /></button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor Side */}
        <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-[#a3e635]/10 bg-[#051410] relative min-h-[300px]">
            <div className="absolute top-2 right-4 text-[8px] text-[#a3e635]/30 uppercase font-black tracking-widest pointer-events-none">
                SOURCE_CODE_INPUT
            </div>
            <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent p-4 sm:p-8 text-[#a3e635] text-sm leading-relaxed outline-none border-none resize-none selection:bg-[#a3e635]/20"
                spellCheck="false"
            />
        </div>

        {/* Console Side */}
        <div className="w-full lg:w-[400px] h-[200px] lg:h-full bg-black flex flex-col relative group border-t lg:border-t-0 border-[#a3e635]/10 shrink-0">
            <div className="p-3 border-b border-white/5 flex items-center justify-between text-[10px] font-black text-gray-500 bg-white/[0.02]">
                <span className="flex items-center gap-2"><LuTerminal size={14} /> SYSTEM_CONSOLE_OUTPUT</span>
                <button 
                    onClick={clearBuffer}
                    className="hover:text-red-500 transition-colors"
                >
                    <LuTrash2 size={14} />
                </button>
            </div>
            <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto custom-scroll space-y-2">
                {output.length === 0 && !isRunning && (
                    <div className="text-gray-700 flex flex-col items-center justify-center h-full gap-4 text-center">
                        <LuCpu size={40} className="text-gray-800" />
                        <span>AWAITING_COMMAND_EXECUTION...</span>
                    </div>
                )}
                {output.map((line, idx) => (
                    <div 
                        key={idx} 
                        className={cn(
                            "break-all animate-in slide-in-from-left-2 duration-300",
                            line.startsWith('[ERROR]') ? "text-red-500" : 
                            line.startsWith('RESULT:') ? "text-[#a3e635]" : "text-gray-400"
                        )}
                    >
                        {line}
                    </div>
                ))}
                {isRunning && (
                    <div className="text-[#a3e635] animate-pulse">_</div>
                )}
            </div>
            
            {/* HUD Status Decorations */}
            <div className="absolute bottom-4 right-4 text-[8px] font-black text-[#a3e635]/20 uppercase pointer-events-none text-right">
                THREAT_DETECTION: OFF<br />
                SANDBOX: ISOLATED
            </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#1e1e1e] border-t border-white/10 px-4 py-1 flex items-center justify-between text-[9px] text-[#a3e635]/60 font-bold uppercase tracking-widest">
        <div className="flex items-center gap-6">
            <span className="text-[#a3e635]">LANGUAGE: JS_TACTICAL</span>
            <span>NODES: {code.split(/\s+/).length}</span>
            <span className="flex items-center gap-1"><LuGhost size={12} /> STEALTH_MODE</span>
        </div>
        <div className="flex items-center gap-4">
            <span>UPLINK_SPEED: 4.2_GB/S</span>
            <span className="text-white px-2 bg-[#a3e635]/20 rounded">STATUS: READY</span>
        </div>
      </div>
      </>
      ) : (
      <div className="p-4 overflow-y-auto h-full">
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={loadNotebook}
            className="px-3 py-1 rounded bg-[#a3e635] text-black font-semibold"
          >
            Load .ipynb
          </button>
          <button
            onClick={runNotebook}
            className="px-3 py-1 rounded bg-[#a3e635] text-black font-semibold"
          >
            Run Notebook
          </button>
        </div>

        {notebookError && <div className="mb-3 text-sm text-red-400">{notebookError}</div>}

        <div className="mb-4">
          <label className="block text-xs text-[#a3e635]/80 mb-1">Notebook JSON (.ipynb)</label>
          <textarea
            value={notebookJson}
            onChange={(e) => setNotebookJson(e.target.value)}
            className="w-full h-36 bg-[#051410] border border-white/10 text-sm p-2 rounded outline-none focus:border-[#a3e635]"
          />
        </div>

        <div className="space-y-4">
          {notebookCells.map((cell, idx) => (
            <div key={idx} className="rounded-lg border border-white/10 p-3 bg-[#061215]">
              <div className="text-xs text-[#a3e635]/80 mb-1">
                {cell.cell_type.toUpperCase()} CELL
              </div>
              {cell.cell_type === "markdown" ? (
                <div className="prose prose-invert max-w-none text-sm">{cell.source.join("")}</div>
              ) : (
                <>
                  <pre className="whitespace-pre-wrap text-xs border border-white/10 rounded p-2 bg-[#0a1117]">{cell.source.join("")}</pre>
                  <div className="mt-2 text-xs text-[#c8f1b3]">
                    {cell.outputs?.length ? cell.outputs.map((o, j) => (<div key={j}>{o}</div>)) : <div className="text-[#999]">No output yet</div>}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {graphData.length > 0 && (
          <div className="mt-4 p-3 border border-white/10 rounded bg-[#051410]">
            <h3 className="text-sm uppercase tracking-widen text-[#a3e635] mb-2">Graph Output</h3>
            <div className="w-full h-48 relative bg-black border border-white/10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="2"
                  points={graphData
                    .map((v, i) => `${(i/(graphData.length-1))*100},${100 - (v / Math.max(...graphData))*90}`)
                    .join(" ")}
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
