"use client";

import Link from "next/link";
import {
  Zap,
  Code,
  Folder,
  MessageSquare,
  Star,
  ChevronRight,
  Sparkles,
  BookOpen,
  Terminal as TerminalIcon,
  Bot
} from "lucide-react";
import { motion } from "framer-motion";

import SocialLinks from "./SocialLinks";
import { useRecentPagesContext } from "@/lib/recentPagesContext";
import GlitchText from "@/app/components/GlitchText";

type StartLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  desc?: string;
};

function StartLink({ href, icon, label, desc }: StartLinkProps) {
  return (
    <Link href={href} className="block w-full">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex flex-col gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20"
      >
        <div className="flex items-center justify-between text-[#60a5fa] group-hover:text-[#93c5fd] transition-colors">
          <div className="p-2 rounded-lg bg-[#3b82f6]/10 group-hover:bg-[#3b82f6]/20">
            {icon}
          </div>
          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </div>
        <div className="flex flex-col mt-2">
          <span className="font-semibold text-sm text-[#e2e8f0]">{label}</span>
          {desc && <span className="text-xs text-[#94a3b8] mt-1">{desc}</span>}
        </div>
      </motion.div>
    </Link>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function HomeClient() {
  const { recentPages } = useRecentPagesContext();

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.header variants={itemVariants} className="relative z-10">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#3b82f6]/20 rounded-full blur-[100px] -z-10"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl glass-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#3b82f6]/10 to-transparent pointer-events-none"></div>
            <div className="z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded-md bg-[#3b82f6]/20 text-[#60a5fa] text-[10px] uppercase font-bold tracking-widest border border-[#3b82f6]/30">
                  System Active
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-mono">
                  v2.0 Premium Build
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
                <GlitchText text="Sajid Islam" delay={600} speed={40} />
              </h1>
              <p className="text-xl text-[#94a3b8] font-mono">
                Business & Data Analyst // <span className="text-[#60a5fa]">BI Architect</span>
              </p>
            </div>
            <div className="z-10 flex flex-col items-end gap-4">
              <SocialLinks />
            </div>
          </div>
        </motion.header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Navigation (Bento Box) */}
          <motion.div variants={itemVariants} className="md:col-span-8 glass-card p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#8b5cf6]/20 rounded-full blur-[80px] -z-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-xl shadow-lg shadow-[#3b82f6]/20">
                <Zap size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">Quick Launch</h3>
                <p className="text-xs text-[#94a3b8]">Select a module to proceed</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <StartLink href="/Skills" icon={<Code size={20} />} label="Toolkit Specs" desc="Python, SQL, Tools" />
              <StartLink href="/projects" icon={<Folder size={20} />} label="Project Archives" desc="Data & Analytics Portfolios" />
              <StartLink href="/Experience" icon={<BookOpen size={20} />} label="Service History" desc="Professional Background" />
              <StartLink href="/contact" icon={<MessageSquare size={20} />} label="Secure Uplink" desc="Contact & Comm Channels" />
            </div>
          </motion.div>

          {/* Recent Intel / Sidebar */}
          <motion.div variants={itemVariants} className="md:col-span-4 glass-card p-6 rounded-3xl flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Star size={18} className="text-[#60a5fa]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e2e8f0]">Recent Intel</h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
              {recentPages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-black/20">
                  <p className="text-xs text-[#64748b] italic">No intel streams found</p>
                </div>
              ) : (
                recentPages.map((path) => (
                  <Link
                    key={path}
                    href={path}
                    className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group"
                  >
                    <div className="flex items-center gap-2 text-[#94a3b8] group-hover:text-[#60a5fa]">
                      <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span className="font-semibold text-sm">{path === "/" ? "Root Hub" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}</span>
                    </div>
                    <span className="text-[10px] text-[#64748b] pl-6 font-mono">
                      ~{path}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </motion.div>

          {/* Feature Highlight 1 */}
          <motion.div variants={itemVariants} className="md:col-span-4 glass-card p-6 rounded-3xl hover:border-[#3b82f6]/30 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[#3b82f6]/10 rounded-lg group-hover:bg-[#3b82f6]/20 transition-colors">
                <TerminalIcon size={20} className="text-[#60a5fa]" />
              </div>
              <span className="flex h-2 w-2 rounded-full bg-[#60a5fa] animate-pulse"></span>
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Integrated Terminal</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Execute commands directly in the lower buffer. Fully integrated with the application state.
            </p>
          </motion.div>

          {/* Feature Highlight 2 */}
          <motion.div variants={itemVariants} className="md:col-span-8 glass-card p-6 rounded-3xl hover:border-[#8b5cf6]/30 transition-colors relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#8b5cf6]/10 to-transparent"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className="p-3 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
                <Bot size={32} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">Neural Insight Engine</h3>
                  <div className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#8b5cf6]/20 text-[#c4b5fd] uppercase">Online</div>
                </div>
                <p className="text-sm text-[#94a3b8] leading-relaxed max-w-lg">
                  Real-time technical and business analysis powered by advanced AI integrations to augment decision making workflows.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
