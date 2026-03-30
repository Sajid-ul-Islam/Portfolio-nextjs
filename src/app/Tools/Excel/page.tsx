"use client";

import { useState } from "react";
import { 
  LuTable, 
  LuSave, 
  LuFilter, 
  LuBarChart, 
  LuTrendingUp, 
  LuChevronDown, 
  LuPlus, 
  LuSearch,
  LuDownload,
  LuShare2,
  LuSettings2
} from "react-icons/lu";
import { cn } from "../../lib/cn";

const INITIAL_DATA = [
  ["MISSION_ID", "CODE_NAME", "STATUS", "EFFICIENCY", "IMPACT", "RISK_LEVEL"],
  ["0xA1", "SENTINEL", "DEPLOYED", "94.2%", "+12%_VIS", "LOW"],
  ["0xB2", "ECOM_DASH", "ACTIVE", "89.5%", "+22%_REV", "MED"],
  ["0xC3", "WASH_AUTO", "STANDBY", "100.0%", "-40%_TTR", "LOW"],
  ["0xD4", "CHURN_PRED", "ANALYZING", "85.4%", "-15%_CH", "HIGH"],
  ["0xE5", "RAMADAN_CP", "ARCHIVED", "98.1%", "SYST_OK", "MIN"],
  ["0xF6", "TAC_OFFICE", "DEVELOPING", "72.0%", "NEW_TECH", "MED"],
];

const ROWS = 20;
const COLS = 12;

export default function ExcelGrid() {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeCell, setActiveCell] = useState({ r: 1, c: 1 });

  const getCellContent = (r: number, c: number) => {
    if (r < data.length && c < data[r].length) return data[r][c];
    return "";
  };

  const handleCellChange = (r: number, c: number, value: string) => {
    const newData = [...data];
    if (!newData[r]) {
        while (newData.length <= r) newData.push([]);
    }
    newData[r][c] = value;
    setData(newData);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] font-mono select-none animate-in fade-in duration-500 overflow-hidden">
      {/* Office Style Ribbon - Excel Analyzer (Green Theme) */}
      <div className="bg-[#217346] p-1 px-4 flex flex-wrap items-center justify-between shadow-lg gap-2">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-0.5 rounded overflow-hidden">
            <img src="/excel_logo.png" alt="Excel" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">OPERATIVE_DATA // ANALYZER</h1>
            <h2 className="text-sm font-bold text-white leading-none">TACTICAL_GRID.xlsx [SYNCED]</h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
            <button 
                onClick={() => {
                   const csv = data.map(row => row.join(",")).join("\n");
                   const blob = new Blob([csv], { type: 'text/csv' });
                   const url = URL.createObjectURL(blob);
                   const link = document.createElement('a');
                   link.href = url;
                   link.download = 'TACTICAL_GRID.csv';
                   link.click();
                }}
                className="p-2 hover:bg-white/10 text-white rounded transition-colors" title="Download Intelligence"
            >
                <LuDownload size={16} />
            </button>
            <button className="p-2 hover:bg-white/10 text-white rounded transition-colors" title="Save to local Intel"><LuSave size={16} /></button>
            <button className="p-2 hover:bg-white/10 text-white rounded transition-colors" title="Secure Link Transfer"><LuShare2 size={16} /></button>
            <button className="p-2 hover:bg-white/10 text-white rounded transition-colors" title="Visual Analytics"><LuBarChart size={16} /></button>
        </div>
      </div>

      {/* Tool Bar & Formula Bar */}
      <div className="bg-[#242424] border-b border-white/5 p-2 flex flex-col gap-2">
        <div className="flex items-center gap-4 shadow-sm">
            <div className="flex items-center gap-1 border-r border-white/10 pr-4">
                <button className="p-1 px-3 bg-[#a3e635]/10 text-[#a3e635] text-[10px] font-black rounded border border-[#a3e635]/20 hover:bg-[#a3e635]/20 transition-all uppercase tracking-widest flex items-center gap-2">
                    <LuFilter size={12} /> FILTER_ACTIVE
                </button>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
                <button className="hover:text-[#a3e635] transition-all"><LuBarChart size={14} /></button>
                <button className="hover:text-[#a3e635] transition-all"><LuTrendingUp size={14} /></button>
                <button className="hover:text-[#a3e635] transition-all"><LuPlus size={14} /></button>
                <button className="hover:text-[#a3e635] transition-all"><LuSearch size={14} /></button>
                <button className="hover:text-[#a3e635] transition-all"><LuSettings2 size={14} /></button>
            </div>
        </div>
        <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/5 p-1 px-4 rounded">
            <span className="text-[10px] font-black text-[#a3e635] border-r border-white/10 pr-4 uppercase tracking-tighter w-12 text-center">
                {String.fromCharCode(65 + activeCell.c)}{activeCell.r + 1}
            </span>
            <input 
                type="text"
                value={getCellContent(activeCell.r, activeCell.c)}
                onChange={(e) => handleCellChange(activeCell.r, activeCell.c, e.target.value)}
                className="bg-transparent border-none outline-none text-[#a3e635] text-[11px] font-bold flex-1"
                placeholder="f(x) Tactical formula..."
            />
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto custom-scroll relative">
        <table className="border-collapse w-max">
            <thead>
                <tr>
                    <th className="bg-[#222] border border-white/5 min-w-[40px] sticky top-0 left-0 z-50"></th>
                    {Array.from({ length: COLS }).map((_, i) => (
                        <th key={i} className="bg-[#222] border border-white/5 text-[10px] text-gray-500 font-black p-1 min-w-[120px] sticky top-0 z-40">
                            {String.fromCharCode(65 + i)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: ROWS }).map((_, r) => (
                    <tr key={r}>
                        <td className="bg-[#222] border border-white/5 text-[10px] text-gray-500 font-bold p-1 text-center sticky left-0 z-30">
                            {r + 1}
                        </td>
                        {Array.from({ length: COLS }).map((_, c) => {
                            const isHeader = r === 0;
                            const isActive = activeCell.r === r && activeCell.c === c;
                            const content = getCellContent(r, c);
                            
                            return (
                                <td 
                                    key={c} 
                                    onClick={() => setActiveCell({ r, c })}
                                    className={cn(
                                        "border border-white/5 p-1.5 text-[11px] transition-all min-width-[120px] group",
                                        isActive ? "bg-[#a3e635]/10 ring-1 ring-[#a3e635] z-10" : "hover:bg-white/[0.02]",
                                        isHeader ? "text-[#a3e635] font-black bg-[#a3e635]/5" : "text-gray-400 font-medium"
                                    )}
                                >
                                    <input 
                                        type="text"
                                        value={content}
                                        onChange={(e) => handleCellChange(r, c, e.target.value)}
                                        className="bg-transparent border-none outline-none w-full h-full text-inherit cursor-default focus:cursor-text"
                                        readOnly={!isActive}
                                    />
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
        
        {/* Decorative Grid Overlay */}
        <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
            <LuTrendingUp size={120} className="text-[#a3e635]/10" />
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#217346] px-4 py-1 flex items-center justify-between text-[9px] text-white font-bold uppercase tracking-widest">
        <div className="flex items-center gap-6">
            <span>CELL_REF: {String.fromCharCode(65 + activeCell.c)}{activeCell.r + 1}</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"></span> ANALYTICS_READY</span>
            <span className="opacity-50">COMPUTE_ENGINE: ONLINE</span>
        </div>
        <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><LuSettings2 size={10} /> ENGINE_ACTIVE</span>
            <span>ZOOM: 100%_OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
