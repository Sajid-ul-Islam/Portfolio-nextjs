"use client";

import { useState, useRef, useEffect } from "react";
import { 
  LuFileText, 
  LuSave, 
  LuShare2, 
  LuBold, 
  LuItalic, 
  LuList, 
  LuType, 
  LuAlignLeft, 
  LuAlignCenter, 
  LuAlignRight,
  LuDownload,
  LuFileSearch,
  LuCheck
} from "react-icons/lu";
import { cn } from "../../lib/cn";

export default function WordWriter() {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const [isSaved, setIsSaved] = useState(false);
  const [stats, setStats] = useState({ bytes: 0, words: 0 });

  useEffect(() => {
    if (editorRef.current && !isInitialized.current) {
      editorRef.current.innerHTML = `
        <div style="color: #a3e635; font-weight: bold; margin-bottom: 20px;">MISSION_LOG_0x04: LION & TIGERS ANALYSIS</div>
        <div>Tactical Environment: Sundarbans Forest / Dense Nodes</div>
        <div>Strategy: Prowl like a tiger – silent, focused, and effective.</div>
        <br/>
        <div>Everyone wants to be a lion, but the jungle demands the tiger. The tiger's strategy, not the lion's, holds lessons for survival and success on this specific terrain.</div>
        <br/>
        <div><b>[KEY_PRINCIPLES]</b></div>
        <ul>
          <li>Stealth > Power</li>
          <li>Calculated engagement</li>
          <li>Strategic camouflage</li>
          <li>Solitary precision</li>
        </ul>
      `;
      isInitialized.current = true;
      updateStats();
    }
  }, []);

  const updateStats = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || "";
      setStats({
        bytes: new Blob([text]).size,
        words: text.trim().split(/\s+/).filter(Boolean).length
      });
    }
  };

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateStats();
    if (editorRef.current) editorRef.current.focus();
  };

  const handleSave = () => {
    const html = editorRef.current?.innerHTML || "";
    const text = editorRef.current?.innerText || "";
    
    const existingBlogs = JSON.parse(localStorage.getItem('local_blogs') || '[]');
    const newEntry = {
        id: `draft-${Date.now()}`,
        title: text.split('\n')[0] || "Untitled Intelligence Draft",
        excerpt: text.split('\n').slice(1, 3).join(' '),
        date: new Date().toISOString().split('T')[0],
        url: "#",
        tags: ["Tactical", "Draft"],
        content: html
    };
    
    localStorage.setItem('local_blogs', JSON.stringify([...existingBlogs, newEntry]));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDownload = () => {
    const text = editorRef.current?.innerText || "";
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'STRATEGY_DEPT.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] font-mono select-none animate-in fade-in duration-500 overflow-hidden">
      {/* Office Style Ribbon - Word Writer (Blue Theme) */}
      <div className="bg-[#2b579a] p-1 px-4 flex flex-wrap items-center justify-between shadow-lg gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-0.5 rounded overflow-hidden">
            <img src="/word_logo.png" alt="Word" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">OPERATIVE_WRITER // TACTICAL</h1>
            <h2 className="text-sm font-bold text-white leading-none">STRATEGY_DEPT.docx</h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
            <button 
                onClick={handleSave}
                className={cn(
                    "p-2 px-4 rounded transition-all text-[10px] font-black flex items-center gap-2",
                    isSaved ? "bg-[#a3e635] text-black" : "bg-white/10 text-white hover:bg-white/20"
                )}
            >
                {isSaved ? <LuCheck size={14} /> : <LuSave size={14} />}
                {isSaved ? "ARCHIVED_SUCCESSFULLY" : "SAVE_TO_INTEL_STREAM"}
            </button>
            <button className="p-2 hover:bg-white/10 text-white rounded transition-colors" title="Establish Secure Signal"><LuShare2 size={16} /></button>
            <button 
                onClick={handleDownload}
                className="p-2 hover:bg-white/10 text-white rounded transition-colors" 
                title="Download Dossier"
            >
                <LuDownload size={16} />
            </button>
        </div>
      </div>

      {/* Tool Bar */}
      <div className="bg-[#242424] border-b border-white/5 p-2 flex flex-wrap items-center gap-y-2 gap-x-4 shadow-sm">
        <div className="flex items-center gap-1 border-r border-white/10 pr-2 sm:pr-4">
            <button 
              onMouseDown={(e) => { e.preventDefault(); handleCommand('bold'); }}
              className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-[#a3e635] rounded transition-all"
            >
              <LuBold size={14} />
            </button>
            <button 
              onMouseDown={(e) => { e.preventDefault(); handleCommand('italic'); }}
              className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-[#a3e635] rounded transition-all"
            >
              <LuItalic size={14} />
            </button>
            <button className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-[#a3e635] rounded transition-all underline decoration-[#a3e635]"><LuType size={14} /></button>
        </div>
        <div className="flex items-center gap-1 border-r border-white/10 pr-4">
            <button 
              onMouseDown={(e) => { e.preventDefault(); handleCommand('justifyLeft'); }}
              className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-[#a3e635] rounded transition-all"
            >
              <LuAlignLeft size={14} />
            </button>
            <button 
              onMouseDown={(e) => { e.preventDefault(); handleCommand('justifyCenter'); }}
              className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-[#a3e635] rounded transition-all"
            >
              <LuAlignCenter size={14} />
            </button>
            <button 
              onMouseDown={(e) => { e.preventDefault(); handleCommand('justifyRight'); }}
              className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-[#a3e635] rounded transition-all"
            >
              <LuAlignRight size={14} />
            </button>
        </div>
        <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-[#a3e635] rounded transition-all"><LuList size={14} /></button>
            <button className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-[#a3e635] rounded transition-all"><LuFileSearch size={14} /></button>
        </div>
        <div className="ml-auto text-[10px] text-gray-600 font-bold uppercase tracking-widest px-2 border border-white/5 rounded italic">
            &gt;&gt; UPLINK_ENCRYPTED_STREAM
        </div>
      </div>

      {/* Core Editor Viewport */}
      <div className="flex-1 overflow-auto bg-[#1a1a1a] p-4 sm:p-12 flex justify-center custom-scroll">
        <div className="w-full max-w-[800px] h-fit min-h-[1000px] bg-[#051410] border border-[#a3e635]/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden p-8 sm:p-16 group/paper">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(163, 230, 53, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(163, 230, 53, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div 
            ref={editorRef}
            contentEditable
            onInput={updateStats}
            className="w-full h-full bg-transparent border-none outline-none text-gray-300 text-sm leading-relaxed focus:text-white transition-colors relative z-10 min-h-[800px]"
            spellCheck="false"
          />
          
          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#a3e635]/20 rounded-tr-lg opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#a3e635]/20 rounded-bl-lg opacity-40"></div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#2b579a] px-4 py-1 flex items-center justify-between text-[9px] text-white font-bold uppercase tracking-widest">
        <div className="flex items-center gap-6">
            <span>BYTES: {stats.bytes}</span>
            <span>WORDS: {stats.words}</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"></span> SYSTEM_LIVE</span>
        </div>
        <div className="flex items-center gap-4">
            <span>MODE: INTEL_WRITER</span>
            <span>UPLINK: 100%</span>
        </div>
      </div>
    </div>
  );
}
