import Image from "next/image";
import Link from "next/link";
import { LuExternalLink, LuGithub } from "react-icons/lu";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { projects } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Projects",
  description:
    "Portfolio of projects built by Raj Savaliya including AI applications, SaaS products, and web applications.",
  alternates: { canonical: "/Projects" },
};

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden",
        "bg-[var(--vscode-sideBar-background)]",
        "border border-[var(--vscode-border)]",
        "rounded-[var(--vscode-border-radius-md)]",
        "hover:border-[var(--vscode-focusBorder)]",
        "transition-all duration-200"
      )}
    >
      <Link href={`/projects/${project.id}`} className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-vscode-lg font-semibold text-[var(--vscode-text-primary)] hover:text-[var(--vscode-text-link)] transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="mt-2 text-vscode-sm text-[var(--vscode-text-secondary)] line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.technologies.length > 4 ? (
            <Badge>{`+${project.technologies.length - 4}`}</Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[var(--vscode-border)]">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
            >
              <LuExternalLink size={14} />
              Live Demo
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
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
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <>
      <SectionHeader
        title="Projects"
        description="A collection of projects I've built and contributed to."
      />
      {featured.length > 0 ? (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}
      {others.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
