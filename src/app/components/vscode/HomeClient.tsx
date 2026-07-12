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
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import SocialLinks from "./SocialLinks";
import GitHubFeed from "./GitHubFeed";
import { useRecentPagesContext } from "@/lib/recentPagesContext";
import { personalInfo, metrics, projects, testimonials, type Project, type Testimonial } from "../../data/portfolio";
import { useLayout } from "../../lib/layoutContext";

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────────────────────

interface StartLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  desc?: string;
  shortcut?: string;
}

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
            <ChevronRight
              size={16}
              className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
            />
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <span className="font-semibold text-vscode-sm text-[var(--vscode-text-primary)]">
            {label}
          </span>
          {desc && (
            <span className="text-vscode-xs text-[var(--vscode-text-secondary)] mt-1">
              {desc}
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  delay: number;
}

function StatCard({ label, value, sub, icon, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--vscode-accent)]/20 transition-all group"
    >
      <div className="p-3 rounded-lg bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] group-hover:bg-[var(--vscode-accent)]/20 transition-colors flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xl md:text-2xl font-extrabold text-[var(--vscode-text-primary)] leading-none mb-1">
          {value}
        </span>
        <span className="text-[10px] text-[var(--vscode-text-secondary)] uppercase tracking-wider font-mono truncate">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Redesigned Welcome Page Component
// ─────────────────────────────────────────────────────────────────────────────

const statIcons = [
  <Briefcase size={20} key="briefcase" />,
  <Layers size={20} key="layers" />,
  <BarChart3 size={20} key="barchart" />,
  <Globe size={20} key="globe" />,
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function HomeClient() {
  const { recentPages } = useRecentPagesContext();
  const { setShowTerminal, setShowAIChat } = useLayout();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  // Dynamic paragraph rendering for the bio (splitting on sentences for clear scannability)
  const bioParagraphs = personalInfo.bio
    .split(/(?<=\.)\s+/)
    .filter((p) => p.trim().length > 0);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.header variants={itemVariants} className="relative z-10">
          <div className="flex flex-col gap-6 p-6 sm:p-8 glass-panel border border-[var(--vscode-border)] rounded-2xl relative overflow-hidden group shadow-xl">
            {/* Hover overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--vscode-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="z-10 flex flex-col sm:flex-row items-start gap-5 sm:gap-6 w-full min-w-0">
              {/* Profile Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[var(--vscode-accent)]/30 shadow-lg shadow-[var(--vscode-accent)]/10">
                  <Image
                    src="/img/profile.jpg"
                    alt={personalInfo.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[var(--vscode-sideBar-background)] availability-pulse" />
              </div>

              {/* Bio & Details */}
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] text-[9px] font-bold tracking-wider border border-[var(--vscode-accent)]/20 uppercase font-mono">
                    Workspace Active
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--vscode-text-primary)] tracking-tight leading-tight">
                    {personalInfo.name}
                  </h1>
                  <p className="text-vscode-sm sm:text-vscode-base text-[var(--vscode-accent)] font-semibold font-mono mt-1">
                    {personalInfo.title}
                  </p>
                </div>
                {/* Properly structured paragraph blocks - full width */}
                <div className="space-y-3 text-vscode-sm text-[var(--vscode-text-secondary)] leading-relaxed w-full">
                  {bioParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Link Actions - placed at the bottom */}
            <div className="z-10 flex flex-row items-center justify-between gap-4 flex-wrap mt-2 pt-6 border-t border-white/5 w-full">
              <div className="flex items-center gap-3">
                <SocialLinks />
              </div>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--vscode-accent)] text-white font-bold text-xs uppercase tracking-widest font-mono rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[var(--vscode-accent)]/20 group/resume"
              >
                <Download size={14} className="group-hover/resume:-translate-y-0.5 transition-transform" />
                Download Resume
              </a>
            </div>
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <StatCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              sub={metric.sub}
              icon={statIcons[i]}
              delay={0.15 + i * 0.08}
            />
          ))}
        </motion.div>

        {/* Navigation & Recent Files Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick actions panel */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 glass-panel border border-[var(--vscode-border)] p-6 sm:p-8 rounded-2xl relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[var(--vscode-accent)]/10 rounded-xl">
                <Zap size={22} className="text-[var(--vscode-accent)]" />
              </div>
              <div>
                <h3 className="text-vscode-base font-bold text-[var(--vscode-text-primary)]">Quick Launch</h3>
                <p className="text-vscode-xs text-[var(--vscode-text-secondary)]">Navigate directly to key sections</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <StartLink href="/skills" icon={<Code size={20} />} label="Skills Dossier" desc="Python, SQL, Power BI, Tableau" shortcut="Ctrl+1" />
              <StartLink href="/projects" icon={<Folder size={20} />} label="Project Archive" desc="Analytics, dashboards & modeling" shortcut="Ctrl+2" />
              <StartLink href="/experience" icon={<BookOpen size={20} />} label="Professional Experience" desc="Operational & BI analyst history" shortcut="Ctrl+3" />
              <StartLink href="/contact" icon={<MessageSquare size={20} />} label="Contact Node" desc="Get in touch for collaborations" shortcut="Ctrl+4" />
            </div>
          </motion.div>

          {/* Recent Files panel */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star size={18} className="text-[var(--vscode-accent)]" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--vscode-text-primary)] font-mono">
                  Recent Pages
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                {recentPages.length === 0 ? (
                  <div className="flex items-center justify-center border border-dashed border-[var(--vscode-border)] rounded-xl bg-black/10 py-8">
                    <p className="text-vscode-xs text-[var(--vscode-text-secondary)] italic">No recent pages visited</p>
                  </div>
                ) : (
                  recentPages.map((path) => (
                    <Link
                      key={path}
                      href={path}
                      className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-[var(--vscode-border)] group"
                    >
                      <div className="flex items-center gap-2 text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)]">
                        <ChevronRight
                          size={14}
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        />
                        <span className="font-semibold text-vscode-sm">
                          {path === "/"
                            ? "Welcome"
                            : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--vscode-text-secondary)]/50 pl-6 font-mono">
                        ~{path}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub Activity Feed */}
        <motion.div variants={itemVariants} className="h-96">
          <GitHubFeed />
        </motion.div>

        {/* Featured Projects Mini-Gallery */}
        <motion.div
          variants={itemVariants}
          className="glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Folder size={18} className="text-[var(--vscode-accent)]" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--vscode-text-primary)] font-mono">
                Featured Projects
              </h3>
            </div>
            <Link
              href="/projects"
              className="text-[10px] font-mono uppercase tracking-widest text-[var(--vscode-accent)] hover:text-[var(--vscode-text-linkHover)] transition-colors flex items-center gap-1"
            >
              View All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group relative aspect-video rounded-xl overflow-hidden border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/40 transition-all shadow-sm"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-[11px] font-bold truncate">{project.title}</p>
                  <p className="text-white/60 text-[9px] font-mono truncate">
                    {project.technologies.slice(0, 2).join(" · ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-5">
              <Quote size={18} className="text-[var(--vscode-accent)]" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--vscode-text-primary)] font-mono">
                Testimonials
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--vscode-accent)]/20 transition-all"
                >
                  <p className="text-vscode-sm text-[var(--vscode-text-secondary)] leading-relaxed italic mb-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--vscode-accent)]/10 flex items-center justify-center flex-shrink-0 border border-[var(--vscode-accent)]/20">
                      <span className="text-[10px] font-bold text-[var(--vscode-accent)]">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-vscode-sm font-bold text-[var(--vscode-text-primary)]">{t.name}</p>
                      <p className="text-[9px] text-[var(--vscode-text-secondary)] font-mono">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Interactive Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Terminal control card */}
          <motion.button
            onClick={() => setShowTerminal(true)}
            variants={itemVariants}
            className="md:col-span-5 glass-panel border border-[var(--vscode-border)] p-6 transition-all duration-300 text-left cursor-pointer group hover:border-[var(--vscode-accent)]/30 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[var(--vscode-accent)]/10 rounded-lg group-hover:bg-[var(--vscode-accent)]/20 transition-colors">
                <TerminalIcon size={20} className="text-[var(--vscode-accent)]" />
              </div>
              <span className="text-[9px] font-mono tracking-widest text-[var(--vscode-accent)] uppercase">
                Open Terminal
              </span>
            </div>
            <h3 className="text-vscode-base font-bold text-[var(--vscode-text-primary)] mb-2">
              Integrated Terminal
            </h3>
            <p className="text-vscode-sm text-[var(--vscode-text-secondary)] leading-relaxed">
              Interact with a custom bash simulator directly inside the workspace to query files, check neofetch
              specs, or view projects.
            </p>
          </motion.button>

          {/* AI control card */}
          <motion.button
            onClick={() => setShowAIChat(true)}
            variants={itemVariants}
            className="md:col-span-7 glass-panel border border-[var(--vscode-border)] p-6 transition-all duration-300 text-left cursor-pointer group hover:border-[var(--vscode-accent)]/30 rounded-2xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="p-3 bg-[var(--vscode-accent)]/10 rounded-2xl group-hover:scale-105 transition-transform flex-shrink-0 w-max">
                <Bot size={32} className="text-[var(--vscode-accent)]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-vscode-base font-bold text-[var(--vscode-text-primary)]">AI Assistant</h3>
                  <div className="px-2 py-0.5 rounded text-[8px] font-bold bg-[var(--vscode-accent)]/15 text-[var(--vscode-accent)] uppercase tracking-wider font-mono">
                    Online
                  </div>
                </div>
                <p className="text-vscode-sm text-[var(--vscode-text-secondary)] leading-relaxed">
                  Need quick answers? Chat with the RAG-enabled AI Assistant in the bottom right corner for instant answers
                  regarding skills, background, or data accomplishments.
                </p>
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
