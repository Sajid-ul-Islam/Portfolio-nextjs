"use client";
import React from "react";
import Image from "next/image";
import { 
  LuHeart, 
  LuFacebook, 
  LuTwitter, 
  LuLinkedin, 
  LuShare2 
} from "react-icons/lu";
import { personalInfo } from "../data";

const Hero = () => {
  return (
    <section id="hero" className="pt-28 pb-16 bg-[#051410] relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#a3e635]/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-[#a3e635]/10 rounded-full animate-pulse [animation-delay:1s]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
          <div className="text-center lg:text-right order-2 lg:order-1">
            <div className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter glow-text">
              Strategist
            </div>
            <div className="text-xs text-[#a3e635]/60 mt-3 font-mono uppercase tracking-widest">
              BI Architecture // Operational Data Intelligence.
            </div>
          </div>

          <div className="flex flex-col items-center order-1 lg:order-2">
            <div className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full p-1 border-2 border-[#a3e635]/30 shadow-[0_0_50px_rgba(163,230,53,0.15)] group">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src="/img/profile.jpg"
                  alt={personalInfo.name}
                  width={520}
                  height={520}
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  priority
                />
                
                {/* HUD Scan Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Pulsing overlay */}
                  <div className="absolute inset-0 bg-[#a3e635]/5 group-hover:bg-transparent transition-colors duration-700"></div>
                  
                  {/* Scanning bar */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#a3e635] shadow-[0_0_15px_#a3e635] opacity-80 animate-scan-line"></div>
                  
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                  
                  {/* Targeted HUD Corners */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#a3e635] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#a3e635] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#a3e635] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#a3e635] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2 right-4 bg-[#166534] text-white text-[8px] font-black px-2 py-0.5 rounded border border-[#a3e635]/50 uppercase tracking-[0.2em] transform rotate-3 shadow-lg">
                VERIFIED_OPERATIVE
              </div>
            </div>

            <h1 className="mt-4 sm:mt-8 text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase glow-text">
              {personalInfo.name}
            </h1>
            <p className="text-[#a3e635] font-mono text-[9px] sm:text-[10px] mt-2 tracking-[0.2em] sm:tracking-[0.4em] uppercase opacity-80 mb-6 sm:mb-0">
              {personalInfo.title} {"//"} NODE_01
            </p>

            <div className="mt-4 sm:mt-8 flex flex-col items-center gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto px-8 py-3 bg-[#166534] text-white font-black text-[10px] text-center uppercase tracking-widest border border-[#a3e635]/30 hover:bg-[#a3e635] hover:text-black transition-all shadow-[0_0_20px_rgba(163,230,53,0.1)]"
                >
                  Access_Portfolio
                </a>
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-3 bg-transparent text-[#a3e635] font-black text-[10px] text-center uppercase tracking-widest border border-[#a3e635]/30 hover:bg-[#a3e635]/10 transition-all font-mono"
                >
                  Secure_Comms
                </a>
              </div>

              {/* Broadcast Interface */}
              <div className="flex items-center gap-6 pt-6 border-t border-[#a3e635]/10 w-full justify-center group/broadcast">
                <div className="flex items-center gap-2 text-[8px] font-black text-[#a3e635]/40 uppercase tracking-[0.3em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"></span>
                    BROADCAST_HUB
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        className="p-2 bg-white/5 hover:bg-[#a3e635]/20 text-gray-500 hover:text-[#a3e635] rounded-full border border-white/5 transition-all outline-none"
                        title="Establish Intel Signal"
                    >
                        <LuHeart size={14} className="group-hover/broadcast:animate-pulse" />
                    </button>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://saajiidi.github.io/" target="_blank" className="p-2 bg-white/5 hover:text-[#1877F2] rounded-full border border-white/5 transition-all"><LuFacebook size={14} /></a>
                    <a href="https://twitter.com/intent/tweet?url=https://saajiidi.github.io/" target="_blank" className="p-2 bg-white/5 hover:text-white rounded-full border border-white/5 transition-all"><LuTwitter size={14} /></a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://saajiidi.github.io/" target="_blank" className="p-2 bg-white/5 hover:text-[#0A66C2] rounded-full border border-white/5 transition-all"><LuLinkedin size={14} /></a>
                    <button className="p-2 bg-white/5 hover:text-[#a3e635] rounded-full border border-white/5 transition-all"><LuShare2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left order-3">
            <div className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter glow-text">
              Analyst
            </div>
            <div className="text-xs text-[#a3e635]/60 mt-3 font-mono uppercase tracking-widest leading-relaxed">
              &gt; Data Engineering<br />
              &gt; Cloud Intelligence<br />
              &gt; Neural Visualization
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
