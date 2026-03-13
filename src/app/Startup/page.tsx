import Link from "next/link";
import { LuArrowRight, LuRocket, LuTarget } from "react-icons/lu";

import Badge from "../components/vscode/Badge";
import Panel from "../components/vscode/Panel";
import SectionHeader from "../components/vscode/SectionHeader";
import { projects, startupValues } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Startup",
  description: "Startup journey and indie hacker projects by Raj Savaliya.",
  alternates: { canonical: "/Startup" },
};

export default function StartupPage() {
  const featuredProducts = projects.filter(
    (project) =>
      project.liveUrl &&
      (project.featured ||
        project.title.includes("Aye") ||
        project.title.includes("Ninetails") ||
        project.title.includes("AyeWatch"))
  );

  return (
    <>
      <SectionHeader
        title="Startup Journey"
        description="Building products, shipping fast, and learning along the way."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4 flex items-center gap-2">
              <LuRocket size={20} className="text-[var(--vscode-accent)]" />
              Products I&apos;ve Built
            </h2>
            <div className="space-y-4">
              {featuredProducts.map((project) => (
                <Panel key={project.id} className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-vscode-lg font-medium text-[var(--vscode-text-primary)]">
                        {project.title}
                      </h3>
                      <p className="text-vscode-sm text-[var(--vscode-text-secondary)] line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.featured ? <Badge variant="success">Featured</Badge> : null}
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
                        >
                          Visit
                          <LuArrowRight size={14} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </Panel>
              ))}
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 mt-4 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
            >
              View all projects
              <LuArrowRight size={14} />
            </Link>
          </section>
        </div>
        <aside>
          <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4 flex items-center gap-2">
            <LuTarget size={20} className="text-[var(--vscode-accent)]" />
            Values
          </h2>
          <Panel className="p-4">
            <ul className="space-y-3">
              {startupValues.map((value, index) => (
                <li
                  key={`${value}-${index}`}
                  className={cn("flex items-start gap-2 text-vscode-sm text-[var(--vscode-text-secondary)]")}
                >
                  <span className="text-[var(--vscode-accent)] mt-0.5">✓</span>
                  {value}
                </li>
              ))}
            </ul>
          </Panel>
        </aside>
      </div>
    </>
  );
}
