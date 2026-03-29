import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuExternalLink, LuGithub } from "react-icons/lu";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { projects } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Projects",
  description:
    "Portfolio of projects built by Sajid Islam including AI applications, SaaS products, and data analytics tools.",
  alternates: { canonical: "/projects" },
};

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden",
        "bg-[var(--vscode-sideBar-background)]",
        "border border-[var(--vscode-border)]",
        "rounded-xl",
        "hover:border-[var(--vscode-focusBorder)]",
        "hover:shadow-2xl hover:shadow-[var(--vscode-focusBorder)]/10",
        "transition-all duration-300 hover:-translate-y-1"
      )}
    >
      <Link href={`/projects/${project.id}`} className="relative aspect-video overflow-hidden group">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-[var(--vscode-editor-background)] flex items-center justify-center text-[var(--vscode-text-secondary)]">
            <span className="text-vscode-xs uppercase tracking-widest opacity-30">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span className="text-white text-vscode-xs font-semibold flex items-center gap-2">
             View Details <LuArrowLeft size={14} className="rotate-[135deg]" />
           </span>
        </div>
      </Link>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Link href={`/projects/${project.id}`}>
            <h3 className="text-vscode-lg font-bold text-[var(--vscode-text-primary)] group-hover:text-[var(--vscode-accent)] transition-colors">
              {project.title}
            </h3>
          </Link>
          {project.featured && (
            <Badge variant="info" className="text-[10px] uppercase px-1.5 py-0">Featured</Badge>
          )}
        </div>
        <p className="text-vscode-sm text-[var(--vscode-text-secondary)] line-clamp-2 leading-relaxed h-[40px]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} className="bg-[var(--vscode-editor-background)] border-[var(--vscode-border)] text-[10px]">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 ? (
            <Badge className="bg-[var(--vscode-editor-background)] border-[var(--vscode-border)] text-[10px]">{`+${project.technologies.length - 3}`}</Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[var(--vscode-border)]">
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
  return (
    <>
      <SectionHeader
        title="Projects"
        description="A complete list of my professional work, indie projects, and academic contributions."
      />
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

