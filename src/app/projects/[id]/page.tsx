import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuExternalLink, LuGithub } from "react-icons/lu";

import Badge from "../../components/vscode/Badge";
import Button from "../../components/vscode/Button";
import Panel from "../../components/vscode/Panel";
import { projects } from "../../data/portfolio";

type ProjectPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export function generateMetadata({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.id === params.id);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: project.image ? { images: [project.image] } : undefined,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.id === params.id);
  if (!project) notFound();
  const caseStudy = project.caseStudy ?? {
    problem: project.description,
    solution: project.longDescription ?? project.description,
  };

  return (
    <div className="max-w-4xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] mb-6 transition-colors"
      >
        <LuArrowLeft size={16} />
        Back to Projects
      </Link>
      <h1 className="text-vscode-3xl font-semibold text-[var(--vscode-text-primary)] mb-4">
        {project.title}
      </h1>
      <div className="relative aspect-video rounded-[var(--vscode-border-radius-md)] overflow-hidden mb-6 border border-[var(--vscode-border)]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[var(--vscode-editor-background)] flex items-center justify-center text-[var(--vscode-text-secondary)]">
            <span className="text-vscode-xs uppercase tracking-widest">
              {project.title}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        {project.liveUrl ? (
          <Button asChild variant="secondary" className="w-auto">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <LuExternalLink size={16} />
              Live Demo
            </a>
          </Button>
        ) : null}
        {project.githubUrl ? (
          <Button asChild variant="secondary">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <LuGithub size={16} />
              GitHub
            </a>
          </Button>
        ) : null}
      </div>
      <div className="mb-8">
        <p className="text-vscode-base text-[var(--vscode-text-secondary)] leading-relaxed">
          {project.longDescription ?? project.description}
        </p>
      </div>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4">
          Case Study
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Panel>
            <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] mb-2">
              Problem
            </h3>
            <p className="text-vscode-sm text-[var(--vscode-text-secondary)]">
              {caseStudy.problem}
            </p>
          </Panel>
          <Panel>
            <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] mb-2">
              Solution
            </h3>
            <p className="text-vscode-sm text-[var(--vscode-text-secondary)]">
              {caseStudy.solution}
            </p>
          </Panel>
        </div>
        {caseStudy.role || caseStudy.timeline ? (
          <div className="mt-4 flex flex-wrap gap-2 text-vscode-xs text-[var(--vscode-text-secondary)]">
            {caseStudy.role ? (
              <Badge variant="info">Role: {caseStudy.role}</Badge>
            ) : null}
            {caseStudy.timeline ? (
              <Badge variant="info">Timeline: {caseStudy.timeline}</Badge>
            ) : null}
          </div>
        ) : null}
        {caseStudy.metrics && caseStudy.metrics.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {caseStudy.metrics.map((metric) => (
              <Panel key={metric.label}>
                <div className="text-vscode-xs text-[var(--vscode-text-secondary)]">
                  {metric.label}
                </div>
                <div className="text-vscode-sm text-[var(--vscode-text-primary)] font-semibold">
                  {metric.value}
                </div>
              </Panel>
            ))}
          </div>
        ) : null}
        {caseStudy.impact && caseStudy.impact.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] mb-2">
              Impact
            </h3>
            <ul className="space-y-2">
              {caseStudy.impact.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-vscode-sm text-[var(--vscode-text-secondary)]"
                >
                  <span className="text-[var(--vscode-accent)] mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-3">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </section>
      {project.images && project.images.filter(Boolean).length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.filter(Boolean).map((image, index) => (
              <div
                key={`${project.id}-${index}`}
                className="relative aspect-video rounded-[var(--vscode-border-radius-md)] overflow-hidden border border-[var(--vscode-border)]"
              >
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
