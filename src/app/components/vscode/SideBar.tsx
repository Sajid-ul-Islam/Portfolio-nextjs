"use client";

const sections = [
  { id: 'about', label: 'About.py', icon: '🐍' },
  { id: 'experience', label: 'work_history.json', icon: '📄' },
  { id: 'education', label: 'education.txt', icon: '📝' },
  { id: 'skills', label: 'skills.sh', icon: '🐚' },
  { id: 'projects', label: 'ProjectList.tsx', icon: '⚛️' },
  { id: 'awards', label: 'achievements.log', icon: '🛡️' },
];

export default function SideBar({ active, onChange }: { active: string, onChange: (id: string) => void }) {
  return (
    <div className="w-64 h-screen bg-[#0d0d0d]/90 border-r border-[#a3e635]/15 flex flex-col font-mono text-xs z-40 overflow-hidden backdrop-blur-md">
      <div className="p-4 uppercase tracking-[0.2em] text-[#a3e635]/60 font-bold border-b border-[#a3e635]/10 flex justify-between">
        <span>EXPLORER</span>
        <span className="cursor-pointer hover:text-white">...</span>
      </div>
      
      <div className="flex-1 overflow-y-auto pt-2 scrollbar-thin scrollbar-thumb-[#a3e635]/10">
        <details open className="group mb-2">
            <summary className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-colors text-[#a3e635]/80">
                <span className="transform transition-transform group-open:rotate-90">▶</span>
                <span className="uppercase font-bold tracking-widest text-[10px]">SAJID_PORTFOLIO</span>
            </summary>
            
            <div className="space-y-0.5 ml-2 mt-1 border-l border-[#a3e635]/10 pl-2">
                {sections.map(s => (
                    <button
                        key={s.id}
                        onClick={() => onChange(s.id)}
                        className={`w-full text-left px-4 py-1.5 flex items-center gap-3 transition-all duration-200 border-r-2 ${
                            active === s.id 
                                ? 'bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]' 
                                : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-300'
                        }`}
                    >
                        <span>{s.icon}</span>
                        <span>{s.label}</span>
                    </button>
                ))}
            </div>
        </details>
      </div>
      
      <div className="mt-auto p-3 border-t border-[#a3e635]/10 bg-black/40">
        <div className="flex items-center gap-2 text-[10px] text-[#a3e635]/40 italic">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>SYNC_IN_PROGRESS: DHAKA_GRID_02</span>
        </div>
      </div>
    </div>
  );
}
