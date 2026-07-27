"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LuArrowLeft, LuExternalLink, LuGithub, LuLayoutGrid, LuFilter } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { projects } from "../data/portfolio";
import { cn } from "../lib/cn";

// Top-tier project IDs matching the strategic reordering
const TOP_PROJECT_IDS = [
  "desco-telegram-bot",
  "woocom-telegram-bot",
  "woocom-whatsapp-bot",
  "agentic-rag",
  "rag-system",
  "telegram-chatbot",
  "whatsapp-chatbot",
  "deen-ops",
  "deen-business-intel",
  "global-economics",
  "1",
  "churn-analysis",
  "3",
];

type CategoryFilter = "all" | "dashboards" | "ml" | "web" | "tools";

const CATEGORIES: { id: CategoryFilter; label: string; match: (techs: string[]) => boolean }[] = [
  { id: "all", label: "All Projects", match: () => true },
  {
    id: "dashboards",
    label: "Dashboards & BI",
    match: (techs) =>
      techs.some((t) =>
        ["Dashboard", "Analytics", "Business Intelligence", "Tableau", "Data Visualization", "Streamlit", "Power BI"].includes(t)
      ),
  },
  {
    id: "ml",
    label: "ML & Analytics",
    match: (techs) =>
      techs.some((t) =>
        ["Machine Learning", "XGBoost", "Random Forest", "Time Series", "Data Analysis", "Statistics", "Economics", "Security Analysis"].includes(t)
      ),
  },
  {
    id: "web",
    label: "Web Apps",
    match: (techs) =>
      techs.some((t) => ["React", "Next.js", "Frontend", "E-commerce", "HTML/CSS", "JavaScript", "PWA"].includes(t)),
  },
  {
    id: "tools",
    label: "Automation",
    match: (techs) =>
      techs.some((t) => ["Automation", "Scraping", "Productivity", "Data Processing", "Utility"].includes(t)),
  },
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

const cardVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } },
};

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      layout
      whileHover={{ scale: 1.01 }}
      className={cn(
        "group flex flex-col overflow-hidden",
        "glass-panel border border-[var(--vscode-border)] bg-white/[0.01]",
        "hover:border-[var(--vscode-accent)]/30 hover:bg-white/[0.03]",
        "transition-all duration-300 rounded-2xl shadow-sm relative"
      )}
    >
      {/* Glow accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--vscode-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <Link href={`/projects/${project.id}`} className="relative aspect-video overflow-hidden border-b border-[var(--vscode-border)]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-103"
          />
        ) : (
          <div className="w-full h-full bg-[var(--vscode-editor-background)] flex items-center justify-center text-[var(--vscode-text-secondary)]">
            <span className="text-vscode-xs uppercase tracking-widest opacity-35 font-mono">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span className="text-white text-vscode-xs font-semibold flex items-center gap-1.5 font-mono uppercase tracking-wider">
             View Case Study <ChevronRightIcon />
           </span>
        </div>
      </Link>
      
      <div className="flex flex-col flex-1 p-5 relative z-10">
        <div className="flex justify-between items-start gap-3 mb-2.5">
          <Link href={`/projects/${project.id}`}>
            <h3 className="text-vscode-base font-bold text-[var(--vscode-text-primary)] hover:text-[var(--vscode-accent)] transition-colors group-hover:text-white leading-snug">
              {project.title}
            </h3>
          </Link>
          {project.featured && (
            <Badge variant="info" className="text-[9px] uppercase px-2 py-0.5 rounded-full font-mono flex-shrink-0 bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] border border-[var(--vscode-accent)]/20 font-bold tracking-wider">
              Featured
            </Badge>
          )}
        </div>
        
        <p className="text-vscode-sm text-[var(--vscode-text-secondary)] line-clamp-2 leading-relaxed min-h-[36px] font-sans">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4 font-mono">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} className="bg-[var(--vscode-editor-background)] border-[var(--vscode-border)] text-[9px] px-2 py-0.5 rounded-full">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 ? (
            <Badge className="bg-[var(--vscode-editor-background)] border-[var(--vscode-border)] text-[9px] px-2 py-0.5 rounded-full">{`+${project.technologies.length - 3}`}</Badge>
          ) : null}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5 font-mono mt-5">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-vscode-sm font-semibold text-[var(--vscode-accent)] hover:text-[var(--vscode-text-linkHover)] transition-colors group/link"
            >
              <LuExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              Live Demo
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-vscode-sm font-semibold text-[var(--vscode-text-secondary)] hover:text-white transition-colors"
            >
              <LuGithub size={14} />
              Source Code
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [gitRepos, setGitRepos] = useState<{name: string, url: string, description: string | null, stars: number, language: string | null}[]>([]);
  const [gitLoading, setGitLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then(res => res.json())
      .then(data => {
        if (data.ok && data.topRepos) {
          setGitRepos(data.topRepos);
        }
      })
      .catch(() => {})
      .finally(() => setGitLoading(false));
  }, []);

  const topProjects = projects.filter((p) => TOP_PROJECT_IDS.includes(p.id));
  const otherProjects = projects.filter((p) => !TOP_PROJECT_IDS.includes(p.id));

  const displayProjects = showAll ? projects : topProjects;

  const filteredProjects =
    activeFilter === "all"
      ? displayProjects
      : displayProjects.filter((p) => {
          const cat = CATEGORIES.find((c) => c.id === activeFilter);
          return cat ? cat.match(p.technologies) : true;
        });

  const getCategoryCount = (catId: CategoryFilter) => {
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (!cat || catId === "all") return displayProjects.length;
    return displayProjects.filter((p) => cat.match(p.technologies)).length;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Title Header */}
        <motion.div variants={itemVariants}>
          <SectionHeader
            title="Products & Case Studies"
            description="End-to-end product ownership — from problem definition to shipped analytics dashboards, ML pipelines, and operational tools."
          />
        </motion.div>

        {/* Category Filters Bar */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pb-2">
          {CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat.id);
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-vscode-xs font-semibold font-mono uppercase tracking-wide transition-all duration-300",
                  isActive
                    ? "bg-[var(--vscode-accent)] text-white shadow-md shadow-[var(--vscode-accent)]/20"
                    : "bg-white/[0.01] text-[var(--vscode-text-secondary)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/30 hover:bg-white/5 hover:text-white"
                )}
              >
                {cat.id === "all" && <LuLayoutGrid size={12} />}
                {cat.id !== "all" && <LuFilter size={12} />}
                {cat.label}
                <span
                  className={cn(
                    "ml-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold transition-colors font-mono",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-[var(--vscode-text-secondary)] border border-white/5"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-16 border border-dashed border-[var(--vscode-border)] rounded-2xl bg-black/10"
          >
            <p className="text-vscode-sm text-[var(--vscode-text-secondary)] font-mono italic">
              No projects match this filter.
            </p>
          </motion.div>
        )}

        {otherProjects.length > 0 && (
          <motion.div variants={itemVariants} className="mt-8 text-center border-t border-white/5 pt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className={cn(
                "px-6 py-3 text-xs font-bold font-mono uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.98]",
                showAll
                  ? "bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] border border-[var(--vscode-accent)]/20 hover:bg-[var(--vscode-accent)]/20 shadow-sm"
                  : "bg-[var(--vscode-accent)] text-white hover:opacity-95 shadow-md shadow-[var(--vscode-accent)]/20"
              )}
            >
              {showAll ? "Show Featured Only" : `Explore All Projects (${otherProjects.length + topProjects.length})`}
            </button>
          </motion.div>
        )}

        {/* Live GitHub Repositories Section */}
        {!gitLoading && gitRepos.length > 0 && (
          <motion.div variants={itemVariants} className="mt-16 pt-10 border-t border-white/5 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--vscode-text-primary)] mb-1">
                Live GitHub Repositories
              </h2>
              <p className="text-vscode-sm text-[var(--vscode-text-secondary)]">
                Dynamic repositories fetched directly from @Sajid-ul-Islam
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gitRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-2xl glass-panel border border-[var(--vscode-border)] bg-white/[0.01] hover:border-[var(--vscode-accent)]/30 hover:bg-white/[0.03] transition-all duration-300 relative shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--vscode-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
                    <h3 className="text-vscode-base font-bold text-[var(--vscode-text-primary)] group-hover:text-white transition-colors truncate">
                      {repo.name}
                    </h3>
                    <span className="text-[10px] text-yellow-400 font-bold font-mono bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20 flex-shrink-0 flex items-center gap-1">
                      ★ {repo.stars}
                    </span>
                  </div>
                  
                  {repo.description && (
                    <p className="text-vscode-xs text-[var(--vscode-text-secondary)] leading-relaxed line-clamp-2 mb-4 font-sans h-8">
                      {repo.description}
                    </p>
                  )}
                  
                  {repo.language && (
                    <div className="flex items-center gap-1.5 mt-2 relative z-10 font-mono text-[9px]">
                      <span className="w-1.5 h-1.5 bg-[var(--vscode-accent)] rounded-full animate-pulse" />
                      <span className="text-[var(--vscode-text-secondary)]">{repo.language}</span>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
