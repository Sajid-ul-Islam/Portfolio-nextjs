import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";

import Badge from "../../components/vscode/Badge";
import Button from "../../components/vscode/Button";
import Panel from "../../components/vscode/Panel";
import AIInsightButton from "../../components/vscode/AIInsightButton";
import MissionReplay from "../../components/vscode/MissionReplay";
import RunProjectButton from "../../components/vscode/RunProjectButton";
import GitDiffViewer from "../../components/vscode/GitDiffViewer";
import { projects } from "../../data/portfolio";

type ProjectPageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = projects.find((item) => item.id === resolvedParams.id);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: project.image ? { images: [project.image] } : undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const currentIndex = projects.findIndex((item) => item.id === resolvedParams.id);
  const project = projects[currentIndex];
  
  if (!project) notFound();
  
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const caseStudy = project.caseStudy ?? {
    problem: project.description,
    solution: project.longDescription ?? project.description,
  };

  const isTelegramBot = project.liveUrl?.includes("t.me");

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 animate-in fade-in duration-700 font-sans">
      <nav className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-vscode-sm font-mono text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-all hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          <span>PORTFOLIO_ROOT</span>
        </Link>
        <div className="flex items-center gap-4 font-mono">
          {prevProject && (
            <Link
              href={`/projects/${prevProject.id}`}
              className="text-[10px] uppercase font-bold text-gray-500 hover:text-[var(--vscode-text-link)] transition-colors"
              title={`Previous: ${prevProject.title}`}
            >
              PREV_MISSION
            </Link>
          )}
          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="text-[10px] uppercase font-bold text-gray-500 hover:text-[var(--vscode-text-link)] transition-colors"
              title={`Next: ${nextProject.title}`}
            >
              NEXT_MISSION
            </Link>
          )}
        </div>
      </nav>

      <div className="mb-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-[#a3e635] shadow-[0_0_8px_#a3e635] rounded-full animate-pulse"></div>
        <span className="text-[10px] text-[#a3e635] font-bold uppercase tracking-widest font-mono">PRODUCT CASE STUDY</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">
        {project.title}
      </h1>

      <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center text-[var(--vscode-text-secondary)]">
            <span className="text-xs uppercase tracking-[0.4em] mb-2 opacity-50 font-mono">
              MISSION_ASSET_NULL
            </span>
            <div className="w-12 h-1 bg-white/5 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-[#a3e635]/20 animate-loading-slide"></div>
            </div>
          </div>
        )}
      </div>

      {/* Prominent Action Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-10 p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
        <RunProjectButton 
          projectId={project.id} 
          isPython={project.technologies.includes("Python")} 
        />

        {project.liveUrl ? (
          <Button asChild className="bg-[#a3e635] text-black hover:bg-[#bef264] border-none px-6 py-3.5 h-auto text-xs font-mono font-extrabold uppercase tracking-wide rounded-xl shadow-lg shadow-[#a3e635]/20">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} />
              {isTelegramBot ? "OPEN TELEGRAM BOT (@descoTGbot)" : "LAUNCH LIVE DEMO"}
            </a>
          </Button>
        ) : null}

        {project.githubUrl ? (
          <>
            <Button asChild variant="secondary" className="px-5 py-3.5 h-auto text-xs font-mono font-bold border-white/10 hover:bg-white/10 uppercase tracking-wide rounded-xl">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Code size={16} />
                GITHUB REPOSITORY
              </a>
            </Button>
            <a
              href={`${project.githubUrl}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vscode-xs font-mono text-[var(--vscode-text-secondary)] hover:text-white underline underline-offset-4 transition-colors"
            >
              View README.md &rarr;
            </a>
          </>
        ) : null}
      </div>

      {/* AI Insight Integration */}
      <AIInsightButton 
        projectTitle={project.title} 
        projectDescription={project.description} 
        technologies={project.technologies} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
        <div className="space-y-12">
          <section>
            <h2 className="text-vscode-2xl font-semibold text-[var(--vscode-text-primary)] mb-4">
              Overview
            </h2>
            <p className="text-vscode-lg text-[var(--vscode-text-secondary)] leading-relaxed">
              {project.longDescription ?? project.description}
            </p>
            <MissionReplay 
              title={project.title} 
              logs={project.missionLogs ?? [
                ">> Initializing repository sector...",
                ">> Scaffolding core architecture layers...",
                "[!] Warning: Data throughput threshold exceeded. Optimizing hooks.",
                ">> Injecting " + project.technologies.slice(0, 2).join(", ") + " logic modules...",
                ">> Finalizing mission UI/UX paradigms...",
                ">> System deployment complete. MISSION_SUCCESS."
              ]} 
            />
          </section>

          {project.gitDiff && (
            <section>
              <h2 className="text-vscode-2xl font-semibold text-[var(--vscode-text-primary)] mb-4">
                Source Control Diff
              </h2>
              <GitDiffViewer 
                filename={project.gitDiff.filename}
                oldCode={project.gitDiff.oldCode}
                newCode={project.gitDiff.newCode}
              />
            </section>
          )}

          <section>
            <h2 className="text-vscode-2xl font-semibold text-[var(--vscode-text-primary)] mb-6">
              Product Thinking
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Panel className="p-6 glass-card rounded-xl">
                <h3 className="text-vscode-sm font-bold text-[var(--vscode-text-primary)] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/30" />
                  THE PROBLEM
                </h3>
                <p className="text-vscode-sm text-[var(--vscode-text-secondary)] leading-relaxed">
                  {caseStudy.problem}
                </p>
              </Panel>
              <Panel className="p-6 glass-card rounded-xl">
                <h3 className="text-vscode-sm font-bold text-[var(--vscode-text-primary)] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30" />
                  THE APPROACH
                </h3>
                <p className="text-vscode-sm text-[var(--vscode-text-secondary)] leading-relaxed">
                  {caseStudy.solution}
                </p>
              </Panel>
            </div>

            {caseStudy.impact && caseStudy.impact.length > 0 && (
              <div className="mt-8">
                <h3 className="text-vscode-lg font-semibold text-[var(--vscode-text-primary)] mb-4">
                  Impact & Outcomes
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
                <div className="flex items-start gap-3">
                  <User size={14} className="text-[var(--vscode-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-vscode-xs text-[var(--vscode-text-muted)] mb-0.5">Role</div>
                    <div className="text-vscode-sm text-[var(--vscode-text-primary)] font-medium">{caseStudy.role}</div>
                  </div>
                </div>
              )}
              {caseStudy.timeline && (
                <div className="flex items-start gap-3">
                  <Calendar size={14} className="text-[var(--vscode-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-vscode-xs text-[var(--vscode-text-muted)] mb-0.5">Timeline</div>
                    <div className="text-vscode-sm text-[var(--vscode-text-primary)] font-medium">{caseStudy.timeline}</div>
                  </div>
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

      <div className="mt-20 pt-8 border-t border-[var(--vscode-border)] grid grid-cols-2 gap-6">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.id}`}
            className="group p-4 rounded-xl border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/30 hover:bg-[var(--vscode-list-hoverBackground)] transition-all flex items-center gap-3"
          >
            <ChevronLeft size={18} className="text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)] transition-colors flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-vscode-xs text-[var(--vscode-text-muted)] mb-1 uppercase font-mono">Previous</div>
              <div className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] group-hover:text-[var(--vscode-text-link)] transition-colors truncate">
                {prevProject.title}
              </div>
            </div>
          </Link>
        ) : <div />}
        
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.id}`}
            className="group p-4 rounded-xl border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/30 hover:bg-[var(--vscode-list-hoverBackground)] transition-all flex items-center justify-end gap-3 text-right"
          >
            <div className="min-w-0">
              <div className="text-vscode-xs text-[var(--vscode-text-muted)] mb-1 uppercase font-mono">Next</div>
              <div className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] group-hover:text-[var(--vscode-text-link)] transition-colors truncate">
                {nextProject.title}
              </div>
            </div>
            <ChevronRight size={18} className="text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)] transition-colors flex-shrink-0" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
