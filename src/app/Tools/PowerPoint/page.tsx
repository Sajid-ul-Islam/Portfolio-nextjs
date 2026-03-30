"use client";

import { useState } from "react";
import { 
  LuPresentation, 
  LuSave, 
  LuPlay, 
  LuChevronLeft, 
  LuChevronRight, 
  LuPlus, 
  LuMonitor,
  LuShare2,
  LuLayout,
  LuDownload
} from "react-icons/lu";
import { cn } from "../../lib/cn";

const SLIDES = [
  {
    type: "title",
    title: "STRATEGIC_BRIEFING_0x4",
    subtitle: "Dossier Analysis: Lion vs Tiger Deployment",
    footer: "OPERATIVE // SAJID_ISLAM",
  },
  {
    type: "content",
    title: "THE_TERRAIN_CONFLICT",
    content: [
      "Head-on confrontation: Fails in modern jungle",
      "Visibility = Vulnerability in dense nodes",
      "Adaptability required per terrain sector",
    ],
    footer: "SECTOR_ANALYSIS_A1",
  },
  {
    type: "impact",
    title: "MISSION_IMPACT",
    content: [
      "+40% Efficiency in stealth navigation",
      "-75% Resource consumption in calculated hunts",
      "100% Survival rate via strategic camouflage",
    ],
    footer: "METRIC_REPORT_Z9",
  }
];

export default function PowerPointDeck() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[activeSlide];

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] font-mono select-none animate-in fade-in duration-500 overflow-hidden">
      {/* Office Style Ribbon - PowerPoint Presenter (Orange Theme) */}
      <div className="bg-[#b7472a] p-1 px-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-1.5 rounded w-9 h-9 flex items-center justify-center border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#a3e635]/20 to-transparent"></div>
            <span className="text-[#a3e635] font-black text-lg drop-shadow-[0_0_8px_rgba(163,230,53,0.8)]">P</span>
          </div>
          <div>
            <h1 className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">OPERATIVE_VISUAL // PRESENTER</h1>
            <h2 className="text-sm font-bold text-white leading-none">STRATEGY_DECK.pptx [LOCKED]</h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/10 text-white rounded transition-colors"><LuSave size={16} /></button>
            <button className="p-2 hover:bg-white/10 text-white rounded transition-colors"><LuShare2 size={16} /></button>
            <button className="p-2 hover:bg-white/10 text-white rounded transition-colors"><LuPlay size={16} /></button>
        </div>
      </div>

      {/* Slide Navigator & Editor */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar thumbnails */}
        <div className="w-full lg:w-[180px] h-[100px] lg:h-full bg-[#242424] border-b lg:border-b-0 lg:border-r border-white/5 p-2 sm:p-4 flex flex-row lg:flex-col gap-2 sm:gap-4 overflow-x-auto lg:overflow-y-auto custom-scroll shrink-0">
            {SLIDES.map((s, i) => (
                <div 
                    key={i} 
                    onClick={() => setActiveSlide(i)}
                    className={cn(
                        "relative aspect-video bg-[#051410] border rounded cursor-pointer group transition-all p-1 sm:p-2 shrink-0 w-[120px] lg:w-full",
                        activeSlide === i ? "border-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.15)] scale-[1.02]" : "border-white/5 hover:border-white/20"
                    )}
                >
                    <span className="absolute -left-1 sm:-left-2 top-0 text-[8px] font-black text-gray-600">{i + 1}</span>
                    <div className="w-full h-full flex flex-col gap-1 overflow-hidden opacity-50">
                        <div className="h-1 bg-white/20 w-3/4"></div>
                        <div className="h-0.5 bg-white/10 w-full"></div>
                    </div>
                </div>
            ))}
            <button className="hidden lg:flex w-full aspect-video border-2 border-dashed border-white/5 rounded items-center justify-center text-white/10 hover:border-[#a3e635]/20 hover:text-[#a3e635]/20 hover:bg-[#a3e635]/5 transition-all">
                <LuPlus size={24} />
            </button>
        </div>

        {/* Slide Viewport */}
        <div className="flex-1 bg-[#1a1a1a] p-4 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden group/stage">
          <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 z-20">
            <button className="p-2 bg-white/5 text-gray-500 hover:text-white rounded transition-all"><LuMonitor size={16} /></button>
            <button className="p-2 bg-white/5 text-gray-500 hover:text-white rounded transition-all"><LuLayout size={16} /></button>
            <button className="p-2 bg-white/5 text-gray-500 hover:text-white rounded transition-all"><LuDownload size={16} /></button>
          </div>

          <div className="w-full max-w-[900px] aspect-video bg-[#051410] border border-[#a3e635]/10 shadow-[0_0_150px_rgba(0,0,0,0.4)] relative flex flex-col p-6 sm:p-16 animate-in zoom-in duration-300 overflow-hidden">
            {/* Background HUD Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(163, 230, 53, 0.4) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
            
            {/* Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#a3e635] shadow-[0_0_15px_#a3e635] opacity-[0.05] animate-scan-line"></div>

            {/* Slide Content Rendering */}
            <div className="flex-1 flex flex-col relative z-10">
                {slide.type === "title" && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 border-y-2 border-[#a3e635]/10 py-12">
                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter glow-text leading-none">{slide.title}</h2>
                        <div className="w-24 h-1 bg-[#a3e635]"></div>
                        <p className="text-[#a3e635] text-sm uppercase tracking-[0.4em] font-mono opacity-80">{slide.subtitle}</p>
                    </div>
                )}

                {slide.type === "content" && (
                    <div className="flex-1 flex flex-col gap-10">
                        <h2 className="text-3xl font-black text-white border-b-2 border-[#a3e635]/20 pb-4 uppercase tracking-tighter">{slide.title}</h2>
                        <ul className="space-y-6">
                            {slide.content?.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-6 text-xl text-gray-300 font-mono">
                                    <span className="text-[#a3e635] font-black">[0{idx + 1}]</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {slide.type === "impact" && (
                    <div className="flex-1 flex flex-col gap-10">
                        <h2 className="text-3xl font-black text-white border-b-2 border-[#a3e635]/20 pb-4 uppercase tracking-tighter">{slide.title}</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {slide.content?.map((item, idx) => (
                                <div key={idx} className="p-6 bg-[#a3e635]/5 border border-[#a3e635]/20 rounded-lg flex items-center justify-between group">
                                    <span className="text-xl text-gray-300 font-mono tracking-tight">{item}</span>
                                    <div className="w-12 h-1 bg-[#a3e635]/20 group-hover:bg-[#a3e635] transition-all"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <footer className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between text-[8px] font-black text-gray-600 uppercase tracking-widest relative z-10">
                <span>{slide.footer}</span>
                <span>SLIDE_0{activeSlide + 1}_OF_03</span>
            </footer>
          </div>

          {/* Navigation Controls Overlay */}
          <div className="absolute bottom-8 flex items-center gap-4 bg-black/60 p-2 px-8 rounded-full border border-white/10 backdrop-blur-md opacity-0 group-hover/stage:opacity-100 transition-opacity">
            <button onClick={prevSlide} className="p-2 text-white hover:text-[#a3e635] transition-all"><LuChevronLeft size={20} /></button>
            <span className="text-[10px] text-white font-bold px-4">{activeSlide + 1} / {SLIDES.length}</span>
            <button onClick={nextSlide} className="p-2 text-white hover:text-[#a3e635] transition-all"><LuChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#b7472a] px-4 py-1 flex items-center justify-between text-[9px] text-white font-bold uppercase tracking-widest">
        <div className="flex items-center gap-6">
            <span>SLIDE: {activeSlide + 1}</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"></span> PROJECTOR_LINK_STABLE</span>
            <span className="opacity-50 underline decoration-[#a3e635]">AUTO_SAVE: ON</span>
        </div>
        <div className="flex items-center gap-4">
            <span>TRANSITION: FADE_GLITCH</span>
            <span>ZOOM: 100%_OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
