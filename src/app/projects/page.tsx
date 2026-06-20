"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuArrowLeft, LuExternalLink, LuGithub } from "react-icons/lu";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { projects } from "../data/portfolio";
import { cn } from "../lib/cn";

const TOP_PROJECT_IDS = [
  "deen-ops",
  "deen-business-intel",
  "churn-analysis",
  "security-map",
  "global-economics",
  "1"
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden",
        "bg-[var(--vscode-sideBar-background)]",
        "border border-[var(--vscode-border)]",
        "rounded-xl",
        "hover:border-[var(--vscode-focusBorder)]",
        "hover:shadow-lg",
        "transition-all duration-200"
      )}
    >
      <Link href={`/projects/${project.id}`} className="relative aspect-video overflow-hidden group">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[var(--vscode-editor-background)] flex items-center justify-center text-[var(--vscode-text-secondary)]">
            <span className="text-vscode-xs uppercase tracking-widest opacity-30 font-mono">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
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
            <Badge variant="info" className="text-[9px] uppercase px-1.5 py-0 font-mono">Featured</Badge>
          )}
        </div>
        <p className="text-vscode-sm text-[var(--vscode-text-secondary)] line-clamp-2 leading-relaxed h-[40px] font-sans">
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
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[var(--vscode-border)] font-mono">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-vscode-sm font-medium text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
            >
              <LuExternalLink size={14} />
              Demo
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
              Code
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);

  const topProjects = projects.filter(p => TOP_PROJECT_IDS.includes(p.id));
  const otherProjects = projects.filter(p => !TOP_PROJECT_IDS.includes(p.id));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Projects & Case Studies"
        description="A list of my key analytics dashboards, modeling pipelines, and tools."
      />
      
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {showAll && (
        <section className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h2 className="text-vscode-sm font-bold uppercase tracking-wider text-[var(--vscode-text-secondary)] mb-6 font-mono">
            // Additional Projects Archive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {otherProjects.length > 0 && (
        <div className="mt-12 text-center border-t border-[var(--vscode-border)] pt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 bg-[var(--vscode-button-background)] hover:bg-[var(--vscode-button-hoverBackground)] text-[var(--vscode-button-foreground)] text-xs font-bold font-mono uppercase tracking-widest rounded transition-colors"
          >
            {showAll ? "Show Featured Only" : `Show More Projects (${otherProjects.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
