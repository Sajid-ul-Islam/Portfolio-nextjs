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
  const currentIndex = projects.findIndex((item) => item.id === params.id);
  const project = projects[currentIndex];
  
  if (!project) notFound();
  
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const caseStudy = project.caseStudy ?? {
    problem: project.description,
    solution: project.longDescription ?? project.description,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-6 flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
        >
          <LuArrowLeft size={16} />
          Back to Projects
        </Link>
        <div className="flex items-center gap-4">
          {prevProject && (
            <Link
              href={`/projects/${prevProject.id}`}
              className="text-vscode-xs text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-link)] transition-colors"
              title={`Previous: ${prevProject.title}`}
            >
              Previous
            </Link>
          )}
          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="text-vscode-xs text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-link)] transition-colors"
              title={`Next: ${nextProject.title}`}
            >
              Next
            </Link>
          )}
        </div>
      </nav>

      <h1 className="text-vscode-3xl md:text-vscode-4xl font-semibold text-[var(--vscode-text-primary)] mb-4">
        {project.title}
      </h1>

      <div className="relative aspect-video rounded-[var(--vscode-border-radius-lg)] overflow-hidden mb-8 border border-[var(--vscode-border)] shadow-xl translate-z-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[var(--vscode-editor-background)] flex items-center justify-center text-[var(--vscode-text-secondary)]">
            <span className="text-vscode-sm uppercase tracking-[0.2em] opacity-50">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {project.liveUrl ? (
          <Button asChild className="px-6 py-2 h-auto text-vscode-sm">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <LuExternalLink size={18} />
              Launch Project
            </a>
          </Button>
        ) : null}
        {project.githubUrl ? (
          <Button asChild variant="secondary" className="px-6 py-2 h-auto text-vscode-sm">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <LuGithub size={18} />
              Source Code
            </a>
          </Button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
        <div className="space-y-12">
          <section>
            <h2 className="text-vscode-2xl font-semibold text-[var(--vscode-text-primary)] mb-4">
              Overview
            </h2>
            <p className="text-vscode-lg text-[var(--vscode-text-secondary)] leading-relaxed">
              {project.longDescription ?? project.description}
            </p>
          </section>

          <section>
            <h2 className="text-vscode-2xl font-semibold text-[var(--vscode-text-primary)] mb-6">
              Case Study
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Panel className="p-6">
                <h3 className="text-vscode-sm font-bold text-[var(--vscode-text-primary)] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  THE CHALLENGE
                </h3>
                <p className="text-vscode-sm text-[var(--vscode-text-secondary)] leading-relaxed">
                  {caseStudy.problem}
                </p>
              </Panel>
              <Panel className="p-6">
                <h3 className="text-vscode-sm font-bold text-[var(--vscode-text-primary)] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  THE SOLUTION
                </h3>
                <p className="text-vscode-sm text-[var(--vscode-text-secondary)] leading-relaxed">
                  {caseStudy.solution}
                </p>
              </Panel>
            </div>

            {caseStudy.impact && caseStudy.impact.length > 0 && (
              <div className="mt-8">
                <h3 className="text-vscode-lg font-semibold text-[var(--vscode-text-primary)] mb-4">
                  Key Outcomes & Impact
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {caseStudy.impact.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 p-3 rounded-md bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] text-vscode-sm text-[var(--vscode-text-secondary)]"
                    >
                      <span className="text-[var(--vscode-accent)] font-bold">»</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {project.images && project.images.filter(Boolean).length > 0 && (
            <section>
              <h2 className="text-vscode-2xl font-semibold text-[var(--vscode-text-primary)] mb-6">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.filter(Boolean).map((image, index) => (
                  <div
                    key={`${project.id}-${index}`}
                    className="relative aspect-video rounded-[var(--vscode-border-radius-md)] overflow-hidden border border-[var(--vscode-border)] hover:border-[var(--vscode-focusBorder)] transition-colors cursor-zoom-in"
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
          )}
        </div>

        <aside className="space-y-8">
          <div>
            <h3 className="text-vscode-sm font-bold text-[var(--vscode-text-muted)] uppercase tracking-wider mb-4 border-b border-[var(--vscode-border)] pb-2">
              Metadata
            </h3>
            <div className="space-y-4">
              {caseStudy.role && (
                <div>
                  <div className="text-vscode-xs text-[var(--vscode-text-muted)] mb-1">Role</div>
                  <div className="text-vscode-sm text-[var(--vscode-text-primary)] font-medium">{caseStudy.role}</div>
                </div>
              )}
              {caseStudy.timeline && (
                <div>
                  <div className="text-vscode-xs text-[var(--vscode-text-muted)] mb-1">Timeline</div>
                  <div className="text-vscode-sm text-[var(--vscode-text-primary)] font-medium">{caseStudy.timeline}</div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-vscode-sm font-bold text-[var(--vscode-text-muted)] uppercase tracking-wider mb-4 border-b border-[var(--vscode-border)] pb-2">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} className="bg-[var(--vscode-badge-background)] text-[var(--vscode-badge-foreground)] border-none">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div>
              <h3 className="text-vscode-sm font-bold text-[var(--vscode-text-muted)] uppercase tracking-wider mb-4 border-b border-[var(--vscode-border)] pb-2">
                Metrics
              </h3>
              <div className="space-y-3">
                {caseStudy.metrics.map((metric) => (
                  <div key={metric.label} className="p-3 bg-[var(--vscode-editor-background)] border border-[var(--vscode-border)] rounded">
                    <div className="text-vscode-xs text-[var(--vscode-text-muted)]">{metric.label}</div>
                    <div className="text-vscode-lg font-bold text-[var(--vscode-accent)]">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {project.caseStudy?.highlights && project.caseStudy.highlights.length > 0 && (
            <div>
              <h3 className="text-vscode-sm font-bold text-[var(--vscode-text-muted)] uppercase tracking-wider mb-4 border-b border-[var(--vscode-border)] pb-2">
                Highlights
              </h3>
              <ul className="space-y-2">
                {project.caseStudy.highlights.map((highlight) => (
                  <li key={highlight} className="text-vscode-xs text-[var(--vscode-text-secondary)] leading-relaxed flex gap-2">
                    <span className="text-[var(--vscode-accent)]">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-20 pt-8 border-t border-[var(--vscode-border)] flex items-center justify-between gap-6">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.id}`}
            className="group flex-1 p-4 rounded-lg border border-[var(--vscode-border)] hover:bg-[var(--vscode-list-hoverBackground)] transition-all"
          >
            <div className="text-vscode-xs text-[var(--vscode-text-muted)] mb-1">Previous Project</div>
            <div className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] group-hover:text-[var(--vscode-text-link)] transition-colors">
              {prevProject.title}
            </div>
          </Link>
        ) : <div className="flex-1" />}
        
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.id}`}
            className="group flex-1 p-4 rounded-lg border border-[var(--vscode-border)] hover:bg-[var(--vscode-list-hoverBackground)] transition-all text-right"
          >
            <div className="text-vscode-xs text-[var(--vscode-text-muted)] mb-1">Next Project</div>
            <div className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] group-hover:text-[var(--vscode-text-link)] transition-colors">
              {nextProject.title}
            </div>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  );
}
