"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuArrowLeft, LuExternalLink, LuGithub, LuLayoutGrid, LuFilter } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { projects } from "../data/portfolio";
import { cn } from "../lib/cn";

// Top-tier project IDs matching the strategic reordering
const TOP_PROJECT_IDS = [
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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.2 } },
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
      className={cn(
        "group flex flex-col overflow-hidden",
        "bg-[var(--vscode-sideBar-background)]",
        "border border-[var(--vscode-border)]",
        "rounded-xl",
        "project-card-glow",
      )}
    >
      <Link href={`/projects/${project.id}`} className="relative aspect-video overflow-hidden group">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[var(--vscode-editor-background)] flex items-center justify-center text-[var(--vscode-text-secondary)]">
            <span className="text-vscode-xs uppercase tracking-widest opacity-30 font-mono">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span className="text-white text-vscode-xs font-semibold flex items-center gap-2">
             View Case Study <LuArrowLeft size={14} className="rotate-[135deg]" />
           </span>
        </div>
      </Link>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Link href={`/projects/${project.id}`}>
            <h3 className="text-vscode-base font-bold text-[var(--vscode-text-primary)] hover:text-[var(--vscode-text-link)] transition-colors">
              {project.title}
            </h3>
          </Link>
          {project.featured && (
            <Badge variant="info" className="text-[9px] uppercase px-1.5 py-0 font-mono flex-shrink-0">Featured</Badge>
          )}
        </div>
        <p className="text-vscode-sm text-[var(--vscode-text-secondary)] line-clamp-2 leading-relaxed min-h-[36px] font-sans">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4 font-mono">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} className="bg-[var(--vscode-editor-background)] border-[var(--vscode-border)] text-[9px] px-1.5 py-0.5">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 ? (
            <Badge className="bg-[var(--vscode-editor-background)] border-[var(--vscode-border)] text-[9px] px-1.5 py-0.5">{`+${project.technologies.length - 3}`}</Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[var(--vscode-border)] font-mono mt-5">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-vscode-sm font-medium text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors group/link"
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
              className="flex items-center gap-1.5 text-vscode-sm font-medium text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
            >
              <LuGithub size={14} />
              Source
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

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
    <div className="space-y-6">
      <SectionHeader
        title="Projects & Case Studies"
        description="A curated list of analytics dashboards, modeling pipelines, and tools — ordered by impact."
      />

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 pb-2">
        {CATEGORIES.map((cat) => {
          const count = getCategoryCount(cat.id);
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg text-vscode-xs font-semibold font-mono uppercase tracking-wide transition-all duration-200",
                isActive
                  ? "bg-[var(--vscode-accent)] text-white shadow-md shadow-[var(--vscode-accent)]/20"
                  : "bg-[var(--vscode-sideBar-background)] text-[var(--vscode-text-secondary)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/30 hover:text-[var(--vscode-text-primary)]"
              )}
            >
              {cat.id === "all" && <LuLayoutGrid size={12} />}
              {cat.id !== "all" && <LuFilter size={12} />}
              {cat.label}
              <span
                className={cn(
                  "ml-1 px-1.5 py-0 rounded text-[9px] font-bold",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[var(--vscode-badge-background)] text-[var(--vscode-badge-foreground)]"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[var(--vscode-border)] rounded-xl">
          <p className="text-vscode-sm text-[var(--vscode-text-secondary)] font-mono">
            No projects match this filter.
          </p>
        </div>
      )}

      {otherProjects.length > 0 && (
        <div className="mt-8 text-center border-t border-[var(--vscode-border)] pt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className={cn(
              "px-6 py-2.5 text-xs font-bold font-mono uppercase tracking-widest rounded-lg transition-all duration-200",
              showAll
                ? "bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] border border-[var(--vscode-accent)]/30 hover:bg-[var(--vscode-accent)]/20"
                : "bg-[var(--vscode-button-background)] hover:bg-[var(--vscode-button-hoverBackground)] text-[var(--vscode-button-foreground)]"
            )}
          >
            {showAll ? "Show Featured Only" : `Explore All Projects (${otherProjects.length + topProjects.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
