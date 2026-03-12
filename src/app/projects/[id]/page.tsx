import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuExternalLink, LuGithub } from "react-icons/lu";

import Badge from "../../components/vscode/Badge";
import Button from "../../components/vscode/Button";
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
    openGraph: { images: [project.image] },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.id === params.id);
  if (!project) notFound();

  return (
    <div className="max-w-4xl">
      <Link
        href="/Projects"
        className="inline-flex items-center gap-2 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] mb-6 transition-colors"
      >
        <LuArrowLeft size={16} />
        Back to Projects
      </Link>
      <h1 className="text-vscode-3xl font-semibold text-[var(--vscode-text-primary)] mb-4">
        {project.title}
      </h1>
      <div className="relative aspect-video rounded-[var(--vscode-border-radius-md)] overflow-hidden mb-6 border border-[var(--vscode-border)]">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        {project.liveUrl ? (
          <Button asChild variant="secondary" className="w-auto">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <LuExternalLink size={16} />
            </a>
          </Button>
        ) : null}
        {project.githubUrl ? (
          <Button asChild variant="secondary">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <LuGithub size={16} />
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
        <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-3">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </section>
      {project.images && project.images.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image, index) => (
              <div
                key={`${project.id}-${index}`}
                className="relative aspect-video rounded-[var(--vscode-border-radius-md)] overflow-hidden border border-[var(--vscode-border)]"
              >
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
