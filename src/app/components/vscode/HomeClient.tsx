"use client";

import Link from "next/link";
import { 
  Zap, 
  Code, 
  Folder, 
  Settings, 
  MessageSquare, 
  Star, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookOpen,
  Terminal as TerminalIcon,
  Bot
} from "lucide-react";

import SocialLinks from "./SocialLinks";
import { useRecentPagesContext } from "../../lib/recentPagesContext";

type StartLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  desc?: string;
};

function StartLink({ href, icon, label, desc }: StartLinkProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-1 p-3 rounded-md hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
    >
      <div className="flex items-center gap-3 text-[var(--vscode-text-link)] group-hover:text-[var(--vscode-text-linkHover)] transition-colors">
        <div className="p-1 px-1.5 rounded-sm bg-white/5 group-hover:bg-[#a3e635]/10 group-hover:text-[#a3e635]">
           {icon}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{label}</span>
          {desc && <span className="text-[10px] text-gray-500 uppercase tracking-tighter opacity-70">{desc}</span>}
        </div>
        <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
      </div>
    </Link>
  );
}

export default function HomeClient() {
  const { recentPages } = useRecentPagesContext();

  return (
    <div className="max-w-6xl mx-auto p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="mb-12 border-b border-white/5 pb-8 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#a3e635]/10 rounded-full blur-[80px]"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse shadow-[0_0_8px_#a3e635]"></div>
              <span className="text-[10px] uppercase tracking-widest text-[#a3e635] font-bold">TACTICAL_PORTFOLIO_OS_V2.0</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
              Sajid Islam
            </h1>
            <p className="text-xl text-gray-500 font-mono italic">
              &gt; Business & Data Analyst // <span className="text-[#a3e635]/80">BI Architect</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SocialLinks />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8 lg:space-y-12">
          {/* Start Section */}
          <section className="hud-panel p-6 lg:p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code size={120} className="text-[#a3e635]" />
            </div>
            <div className="flex items-center gap-2 mb-8 relative">
              <div className="p-2 bg-[#a3e635]/10 rounded-lg">
                <Zap size={20} className="text-[#a3e635]" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Operational_Matrix</h3>
                <p className="text-[10px] text-[#a3e635]/50 font-mono">SELECT_MISSION_TARGET_TO_BEGIN</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <StartLink 
                href="/Skills" 
                icon={<Code size={18} />} 
                label="Toolkit_Specs" 
                desc="PYTHON_SQL_VINC"
              />
              <StartLink 
                href="/projects" 
                icon={<Folder size={18} />} 
                label="Project_Archives" 
                desc="15_ACTIVE_MISSIONS"
              />
              <StartLink 
                href="/Experience" 
                icon={<BookOpen size={18} />} 
                label="Service_History" 
                desc="SECTOR_DATA_ANALYTICS"
              />
              <StartLink 
                href="/contact" 
                icon={<MessageSquare size={18} />} 
                label="Secure_Uplink" 
                desc="ENCRYPTED_COMMS"
              />
            </div>
          </section>

          {/* Featured Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <section className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-[#a3e635]/20 transition-all group">
              <div className="flex items-center gap-2 mb-4">
                <TerminalIcon size={16} className="text-[#a3e635] group-hover:animate-pulse" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/50">Tactical_Shell</h3>
              </div>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed font-mono">
                &gt; Execute direct commands via the lower buffer. Type 'help' to start.
              </p>
              <div className="flex items-center gap-2 text-[9px] text-[#a3e635]/60 font-bold bg-[#a3e635]/5 p-2 rounded border border-[#a3e635]/10 w-fit">
                <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse shadow-[0_0_8px_#a3e635]"></span>
                VULCAN_GATEWAY_ACTIVE
              </div>
            </section>

            <section className="bg-[#a3e635]/5 p-6 rounded-xl border border-[#a3e635]/20 hover:border-[#a3e635]/40 transition-all group">
              <div className="flex items-center gap-2 mb-4">
                <Bot size={16} className="text-[#a3e635] group-hover:scale-110 transition-transform" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#a3e635]">AIInsight_Engine</h3>
              </div>
              <p className="text-xs text-gray-300 mb-6 leading-relaxed font-mono italic">
                Real-time technical and business analysis of all mission parameters.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-white/80">
                <Sparkles size={10} className="text-yellow-400" />
                <span>NEURAL_NET_V1.5_ONLINE</span>
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8 lg:space-y-12">
          <section className="hud-panel p-6 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <Star size={18} className="text-[#a3e635]/40" />
              <h3 className="text-[11px] font-black uppercase tracking-widest text-white/70">Recent_Intel</h3>
            </div>
            {recentPages.length === 0 ? (
              <div className="p-10 border border-dashed border-white/5 rounded-lg text-center bg-black/20">
                <p className="text-[9px] text-gray-600 italic tracking-widest">
                  NO_INTEL_STREAMSFOUND
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentPages.map((path) => (
                  <Link
                    key={path}
                    href={path}
                    className="flex flex-col gap-1 p-2 rounded hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-2 text-[#a3e635]/70 group-hover:text-[#a3e635]">
                      <ChevronRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      <span className="font-bold text-xs">{path === "/" ? "ROOT_HUB" : path.slice(1).toUpperCase()}</span>
                    </div>
                    <span className="text-[8px] text-gray-600 pl-5 uppercase tracking-tighter">
                      SECURE_PATH: ~/root{path}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="bg-black/60 p-6 rounded-xl border border-white/5 border-l-2 border-l-[#a3e635] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <Bot size={40} />
            </div>
            <h3 className="text-xs font-black text-white mb-4 tracking-widest uppercase opacity-80">Mission_Directives</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#a3e635] text-[10px] font-bold mt-0.5">01</span>
                <div>
                   <p className="text-[11px] font-bold text-white/90 leading-tight">Published Data Research</p>
                   <p className="text-[9px] text-gray-500 uppercase">ICT4SD Proceedings 2020</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#a3e635] text-[10px] font-bold mt-0.5">02</span>
                <div>
                   <p className="text-[11px] font-bold text-white/90 leading-tight">Alibaba Group Ops</p>
                   <p className="text-[9px] text-gray-500 uppercase">Deployed Weekly BI Dashboards</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#a3e635] text-[10px] font-bold mt-0.5">03</span>
                <div>
                   <p className="text-[11px] font-bold text-white/90 leading-tight">Mission Critical Tools</p>
                   <p className="text-[9px] text-gray-500 uppercase">15+ Advanced BI Utilities</p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
