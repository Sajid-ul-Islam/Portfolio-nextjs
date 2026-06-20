"use client";

import Link from "next/link";
import {
  Zap,
  Code,
  Folder,
  MessageSquare,
  Star,
  ChevronRight,
  BookOpen,
  Terminal as TerminalIcon,
  Bot
} from "lucide-react";
import { motion } from "framer-motion";

import SocialLinks from "./SocialLinks";
import { useRecentPagesContext } from "@/lib/recentPagesContext";
import { personalInfo } from "../../data/portfolio";
import { useLayout } from "../../lib/layoutContext";

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
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group flex flex-col gap-2 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all border border-white/5 hover:border-[var(--vscode-accent)]/30"
      >
        <div className="flex items-center justify-between text-[var(--vscode-accent)]">
          <div className="p-2 rounded-lg bg-[var(--vscode-accent)]/10 group-hover:bg-[var(--vscode-accent)]/20">
            {icon}
          </div>
          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </div>
        <div className="flex flex-col mt-2">
          <span className="font-semibold text-sm text-[var(--vscode-text-primary)]">{label}</span>
          {desc && <span className="text-xs text-[var(--vscode-text-secondary)] mt-1">{desc}</span>}
        </div>
      </motion.div>
    </Link>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 }
  }
};

export default function HomeClient() {
  const { recentPages } = useRecentPagesContext();
  const { setShowTerminal, setShowAIChat } = useLayout();

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 font-sans">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.header variants={itemVariants} className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/20 transition-all duration-300 relative overflow-hidden">
            <div className="z-10 max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] text-[10px] font-bold tracking-wider border border-[var(--vscode-accent)]/20 uppercase font-mono">
                  Welcome to my portfolio workspace
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--vscode-text-primary)] mb-2 tracking-tight">
                {personalInfo.name}
              </h1>
              <p className="text-lg text-[var(--vscode-accent)] font-semibold font-mono mb-4">
                {personalInfo.title}
              </p>
              <p className="text-sm md:text-base text-[var(--vscode-text-secondary)] leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>
            <div className="z-10 flex flex-col items-end gap-4 flex-shrink-0">
              <SocialLinks />
            </div>
          </div>
        </motion.header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Navigation (Bento Box) */}
          <motion.div variants={itemVariants} className="md:col-span-8 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/20 p-8 rounded-3xl relative overflow-hidden group transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-[var(--vscode-accent)]/10 rounded-xl">
                <Zap size={22} className="text-[var(--vscode-accent)]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--vscode-text-primary)] tracking-wide">Quick Launch</h3>
                <p className="text-xs text-[var(--vscode-text-secondary)]">Navigate to different dossier sections</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 font-sans">
              <StartLink href="/Skills" icon={<Code size={20} />} label="Skills Dossier" desc="Python, SQL, Power BI, Tableau" />
              <StartLink href="/projects" icon={<Folder size={20} />} label="Project Archive" desc="Analytics, dashboards & modeling" />
              <StartLink href="/Experience" icon={<BookOpen size={20} />} label="Professional Experience" desc="Operational & BI analyst history" />
              <StartLink href="/contact" icon={<MessageSquare size={20} />} label="Contact Node" desc="Get in touch for collaborations" />
            </div>
          </motion.div>

          {/* Recent Pages / Sidebar */}
          <motion.div variants={itemVariants} className="md:col-span-4 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] p-6 rounded-3xl flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Star size={18} className="text-[var(--vscode-accent)]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--vscode-text-primary)] font-mono">Recent Pages</h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
              {recentPages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center border border-dashed border-[var(--vscode-border)] rounded-xl bg-black/10 py-8">
                  <p className="text-xs text-[var(--vscode-text-secondary)] italic">No recent pages visited</p>
                </div>
              ) : (
                recentPages.map((path) => (
                  <Link
                    key={path}
                    href={path}
                    className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-[var(--vscode-border)] group"
                  >
                    <div className="flex items-center gap-2 text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)]">
                      <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span className="font-semibold text-sm">{path === "/" ? "Welcome" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}</span>
                    </div>
                    <span className="text-[10px] text-[var(--vscode-text-secondary)]/50 pl-6 font-mono">
                      ~{path}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </motion.div>

          {/* Feature Highlight 1 - Terminal */}
          <motion.button 
            onClick={() => setShowTerminal(true)}
            variants={itemVariants} 
            className="md:col-span-4 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/20 p-6 rounded-3xl transition-all duration-300 text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[var(--vscode-accent)]/10 rounded-lg group-hover:bg-[var(--vscode-accent)]/20 transition-colors">
                <TerminalIcon size={20} className="text-[var(--vscode-accent)]" />
              </div>
              <span className="text-[9px] font-mono tracking-widest text-[var(--vscode-accent)] uppercase">Open Terminal</span>
            </div>
            <h3 className="text-sm font-bold text-[var(--vscode-text-primary)] mb-2">Integrated Terminal</h3>
            <p className="text-xs text-[var(--vscode-text-secondary)] leading-relaxed">
              Interact with a custom bash simulator directly inside the workspace to query files, check neofetch specs, or view project lists.
            </p>
          </motion.button>

          {/* Feature Highlight 2 - AI assistant */}
          <motion.button 
            onClick={() => setShowAIChat(true)}
            variants={itemVariants} 
            className="md:col-span-8 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/20 p-6 rounded-3xl transition-all duration-300 text-left cursor-pointer relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className="p-3 bg-[var(--vscode-accent)]/10 rounded-2xl group-hover:scale-105 transition-transform flex-shrink-0">
                <Bot size={32} className="text-[var(--vscode-accent)]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-[var(--vscode-text-primary)]">AI Assistant</h3>
                  <div className="px-2 py-0.5 rounded text-[9px] font-bold bg-[var(--vscode-accent)]/15 text-[var(--vscode-accent)] uppercase tracking-wider font-mono">Ready</div>
                </div>
                <p className="text-xs text-[var(--vscode-text-secondary)] leading-relaxed max-w-lg">
                  Need quick insights? Chat with the RAG-enabled AI Assistant in the bottom right corner for real-time answers about my background, technical stack, or analytics accomplishments.
                </p>
              </div>
            </div>
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
}
