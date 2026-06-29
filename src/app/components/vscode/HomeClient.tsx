"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Code,
  Folder,
  MessageSquare,
  Star,
  ChevronRight,
  BookOpen,
  Terminal as TerminalIcon,
  Bot,
  BarChart3,
  Briefcase,
  Layers,
  Globe,
  Download,
  Quote,
} from "lucide-react";
import { motion } from "framer-motion";

import SocialLinks from "./SocialLinks";
import { useRecentPagesContext } from "@/lib/recentPagesContext";
import { personalInfo, metrics, projects, testimonials } from "../../data/portfolio";
import { useLayout } from "../../lib/layoutContext";

type StartLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  desc?: string;
  shortcut?: string;
};

function StartLink({ href, icon, label, desc, shortcut }: StartLinkProps) {
  return (
    <Link href={href} className="block w-full">
      <motion.div 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group flex flex-col gap-2 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all border border-white/5 hover:border-[var(--vscode-accent)]/30"
      >
        <div className="flex items-center justify-between text-[var(--vscode-accent)]">
          <div className="p-2 rounded-lg bg-[var(--vscode-accent)]/10 group-hover:bg-[var(--vscode-accent)]/20 transition-colors">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            {shortcut && (
              <span className="text-[9px] font-mono text-[var(--vscode-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 px-1.5 py-0.5 rounded">
                {shortcut}
              </span>
            )}
            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <span className="font-semibold text-sm text-[var(--vscode-text-primary)]">{label}</span>
          {desc && <span className="text-xs text-[var(--vscode-text-secondary)] mt-1">{desc}</span>}
        </div>
      </motion.div>
    </Link>
  );
}

function StatCard({ label, value, sub, icon, delay }: { label: string; value: string; sub: string; icon: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--vscode-accent)]/20 transition-all group"
    >
      <div className="p-2 rounded-lg bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] group-hover:bg-[var(--vscode-accent)]/20 transition-colors flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xl font-extrabold text-[var(--vscode-text-primary)] gradient-text">{value}</span>
        <span className="text-[10px] text-[var(--vscode-text-secondary)] uppercase tracking-wider font-mono truncate">{label}</span>
      </div>
    </motion.div>
  );
}

const statIcons = [
  <Briefcase size={18} key="briefcase" />,
  <Layers size={18} key="layers" />,
  <BarChart3 size={18} key="barchart" />,
  <Globe size={18} key="globe" />,
];

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

  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 p-4 md:p-8 rounded-3xl bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/20 transition-all duration-300 relative overflow-hidden group animate-pulse-glow">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--vscode-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="z-10 flex items-start gap-4 md:gap-6 flex-1 min-w-0">
              {/* Profile Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[var(--vscode-accent)]/30 shadow-lg shadow-[var(--vscode-accent)]/10">
                  <Image
                    src="/img/profile.jpg"
                    alt={personalInfo.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[var(--vscode-sideBar-background)] availability-pulse" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] text-[10px] font-bold tracking-wider border border-[var(--vscode-accent)]/20 uppercase font-mono">
                    Welcome to my portfolio workspace
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[var(--vscode-text-primary)] mb-1 tracking-tight">
                  {personalInfo.name}
                </h1>
                <p className="text-sm md:text-lg text-[var(--vscode-accent)] font-semibold font-mono mb-3">
                  {personalInfo.title}
                </p>
                <p className="text-xs md:text-sm text-[var(--vscode-text-secondary)] leading-relaxed line-clamp-3 md:line-clamp-none">
                  {personalInfo.bio}
                </p>
              </div>
            </div>
            <div className="z-10 flex flex-col items-start md:items-end gap-3 flex-shrink-0">
              <SocialLinks />
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--vscode-accent)] text-white font-bold text-xs uppercase tracking-widest font-mono rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[var(--vscode-accent)]/20 group/resume"
              >
                <Download size={14} className="group-hover/resume:-translate-y-0.5 transition-transform" />
                Download Resume
              </a>
            </div>
          </div>
        </motion.header>

        {/* Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((metric, i) => (
            <StatCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              sub={metric.sub}
              icon={statIcons[i]}
              delay={0.2 + i * 0.1}
            />
          ))}
        </motion.div>

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
              <StartLink href="/Skills" icon={<Code size={20} />} label="Skills Dossier" desc="Python, SQL, Power BI, Tableau" shortcut="Ctrl+1" />
              <StartLink href="/projects" icon={<Folder size={20} />} label="Project Archive" desc="Analytics, dashboards & modeling" shortcut="Ctrl+2" />
              <StartLink href="/Experience" icon={<BookOpen size={20} />} label="Professional Experience" desc="Operational & BI analyst history" shortcut="Ctrl+3" />
              <StartLink href="/contact" icon={<MessageSquare size={20} />} label="Contact Node" desc="Get in touch for collaborations" shortcut="Ctrl+4" />
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

          {/* Featured Projects Mini-Gallery */}
          <motion.div variants={itemVariants} className="md:col-span-12 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/20 p-6 rounded-3xl transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Folder size={18} className="text-[var(--vscode-accent)]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--vscode-text-primary)] font-mono">Featured Projects</h3>
              </div>
              <Link
                href="/projects"
                className="text-[10px] font-mono uppercase tracking-widest text-[var(--vscode-accent)] hover:text-[var(--vscode-text-linkHover)] transition-colors flex items-center gap-1"
              >
                View All <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProjects.map((project, i) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/40 transition-all"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-[11px] font-bold truncate">{project.title}</p>
                    <p className="text-white/60 text-[9px] font-mono truncate">{project.technologies.slice(0, 2).join(" · ")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          {testimonials && testimonials.length > 0 && (
            <motion.div variants={itemVariants} className="md:col-span-12 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/20 p-4 md:p-6 rounded-3xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-5">
                <Quote size={18} className="text-[var(--vscode-accent)]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--vscode-text-primary)] font-mono">Testimonials</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--vscode-accent)]/20 transition-all">
                    <p className="text-xs text-[var(--vscode-text-secondary)] leading-relaxed italic mb-3">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--vscode-accent)]/10 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-[var(--vscode-accent)]">{t.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[var(--vscode-text-primary)]">{t.name}</p>
                        <p className="text-[9px] text-[var(--vscode-text-secondary)] font-mono">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

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
