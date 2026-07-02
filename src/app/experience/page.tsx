import { LuBriefcase, LuCalendar, LuMapPin, LuTrendingUp } from "react-icons/lu";
import Image from "next/image";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { experiences } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Experience",
  description:
    "Professional experience and career journey of Sajid Islam as a Business Analyst and Data Analyst.",
  alternates: { canonical: "/experience" },
};

function ExperienceItem({ experience, index }: { experience: (typeof experiences)[number]; index: number }) {
  const duration = experience.current
    ? `${experience.startDate} - Present`
    : `${experience.startDate} - ${experience.endDate}`;

  return (
    <div
      className={cn(
        "relative pl-10 pb-10 last:pb-0",
        "timeline-connector"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Timeline Node */}
      <span className={cn(
        "absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full z-10",
        experience.current
          ? "bg-[var(--vscode-accent)] shadow-lg shadow-[var(--vscode-accent)]/30"
          : "bg-[var(--vscode-sideBar-background)] border-2 border-[var(--vscode-border)]"
      )}>
        <LuBriefcase size={12} className={experience.current ? "text-white" : "text-[var(--vscode-text-secondary)]"} />
      </span>

      {/* Card */}
      <div className={cn(
        "glass-card p-5",
        "hover:shadow-2xl hover:shadow-black/20",
        experience.current && "border-[var(--vscode-accent)]/40 shadow-lg shadow-[var(--vscode-accent)]/10"
      )}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex gap-4 items-start">
            {experience.logo && (
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white p-1.5 border border-[var(--vscode-border)] overflow-hidden relative shadow-sm">
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div>
              <h3 className="text-vscode-lg font-bold text-[var(--vscode-text-primary)]">
                {experience.title}
              </h3>
              <p className="text-vscode-sm text-[var(--vscode-accent)] font-semibold">
                {experience.company}
              </p>
            </div>
          </div>
          {experience.current ? (
            <Badge variant="success" className="animate-pulse-glow">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Current
              </span>
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-4 text-vscode-xs text-[var(--vscode-text-secondary)] mb-4">
          <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-md">
            <LuCalendar size={12} className="text-[var(--vscode-accent)]" />
            {duration}
          </span>
          {experience.location ? (
            <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-md">
              <LuMapPin size={12} className="text-[var(--vscode-accent)]" />
              {experience.location}
            </span>
          ) : null}
        </div>

        <p className="text-vscode-sm text-[var(--vscode-text-secondary)] mb-4 leading-relaxed">
          {experience.description}
        </p>

        {experience.highlights && experience.highlights.length > 0 ? (
          <ul className="space-y-2 mb-4">
            {experience.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 text-vscode-sm text-[var(--vscode-text-secondary)]"
              >
                <span className="text-[var(--vscode-accent)] mt-0.5 flex-shrink-0">»</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {experience.technologies && experience.technologies.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
            {experience.technologies.map((tech) => (
              <Badge key={tech} className="bg-[var(--vscode-editor-background)] border-[var(--vscode-border)] text-[9px]">{tech}</Badge>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  const currentRoles = experiences.filter((e) => e.current);
  const totalYears = (() => {
    const earliest = experiences.reduce((min, e) => {
      const year = parseInt(e.startDate.match(/\d{4}/)?.[0] ?? "2024");
      return year < min ? year : min;
    }, 9999);
    return new Date().getFullYear() - earliest;
  })();

  return (
    <>
      <SectionHeader
        title="Experience"
        description="My professional journey in business analysis, marketplace operations, and data-driven strategy."
      />

      {/* Summary Stats */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-xl">
          <LuTrendingUp size={16} className="text-[var(--vscode-accent)]" />
          <div>
            <span className="text-vscode-xl font-extrabold text-[var(--vscode-text-primary)] gradient-text">{totalYears}+</span>
            <span className="text-[10px] text-[var(--vscode-text-secondary)] ml-2 uppercase font-mono tracking-wider">Years in Industry</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-xl">
          <LuBriefcase size={16} className="text-[var(--vscode-accent)]" />
          <div>
            <span className="text-vscode-xl font-extrabold text-[var(--vscode-text-primary)] gradient-text">{experiences.length}</span>
            <span className="text-[10px] text-[var(--vscode-text-secondary)] ml-2 uppercase font-mono tracking-wider">Positions</span>
          </div>
        </div>
        {currentRoles.length > 0 && (
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[var(--vscode-accent)]/5 border border-[var(--vscode-accent)]/20 rounded-xl">
            <span className="w-2 h-2 bg-emerald-400 rounded-full availability-pulse" />
            <span className="text-[10px] text-[var(--vscode-accent)] uppercase font-mono tracking-wider font-bold">
              {currentRoles.length} Active Role{currentRoles.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      <div className="max-w-3xl">
        {experiences.map((item, index) => (
          <ExperienceItem key={item.id} experience={item} index={index} />
        ))}
      </div>
    </>
  );
}
