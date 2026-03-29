"use client";

export default function StatusBar() {
  return (
    <div className="h-6 w-full bg-[#166534] flex items-center justify-between px-3 text-[10px] text-white/90 font-mono tracking-wider z-50 animate-pulse duration-[3000ms]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 group cursor-pointer hover:bg-white/10 px-2 h-full transition-colors">
          <span className="text-xs">🌿</span>
          <span className="font-bold">main*</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <span>0 ▲</span>
          <span>0 ✖</span>
          <span className="animate-spin text-[8px]">⚙️</span>
          <span>BUILD: OK</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 opacity-60">
            <span>Spaces: 4</span>
        </div>
        <div className="flex items-center gap-1 font-bold">
            <span className="text-[#a3e635]">UTF-8</span>
        </div>
        <div className="flex items-center gap-1 font-bold group cursor-pointer hover:bg-white/10 px-2 h-full transition-colors">
            <span>PRETTIER: ✅</span>
        </div>
        <div className="flex items-center gap-1 bg-white/15 px-2 h-full">
            <span>🔔</span>
        </div>
      </div>
    </div>
  );
}
