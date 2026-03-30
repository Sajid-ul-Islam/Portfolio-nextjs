import { LuBriefcase, LuCalendar, LuMapPin } from "react-icons/lu";
import Image from "next/image";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { experiences } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Experience",
  description:
    "Professional experience and career journey of Raj Savaliya as a Software Development Engineer.",
  alternates: { canonical: "/Experience" },
};

function ExperienceItem({ experience }: { experience: (typeof experiences)[number] }) {
  const duration = experience.current
    ? `${experience.startDate} - Present`
    : `${experience.startDate} - ${experience.endDate}`;

  return (
    <div
      className={cn(
        "relative pl-8 pb-8 last:pb-0",
        "before:absolute before:left-[11px] before:top-2 before:w-[2px] before:h-full",
        "before:bg-[var(--vscode-border)] last:before:hidden"
      )}
    >
      <span className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--vscode-accent)]">
        <LuBriefcase size={14} className="text-white" />
      </span>
      <div className="bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-[var(--vscode-border-radius-md)] p-4">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div className="flex gap-4 items-start">
            {experience.logo && (
              <div className="flex-shrink-0 w-12 h-12 rounded bg-white p-1 border border-[var(--vscode-border)] overflow-hidden relative">
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div>
              <h3 className="text-vscode-lg font-semibold text-[var(--vscode-text-primary)]">
                {experience.title}
              </h3>
              <p className="text-vscode-sm text-[var(--vscode-accent)]">
                {experience.company}
              </p>
            </div>
          </div>
          {experience.current ? <Badge variant="success">Current</Badge> : null}
        </div>
        <div className="flex flex-wrap gap-4 text-vscode-xs text-[var(--vscode-text-secondary)] mb-3">
          <span className="flex items-center gap-1">
            <LuCalendar size={12} />
            {duration}
          </span>
          {experience.location ? (
            <span className="flex items-center gap-1">
              <LuMapPin size={12} />
              {experience.location}
            </span>
          ) : null}
        </div>
        <p className="text-vscode-sm text-[var(--vscode-text-secondary)] mb-3">
          {experience.description}
        </p>
        {experience.highlights && experience.highlights.length > 0 ? (
          <ul className="space-y-1 mb-3">
            {experience.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-vscode-sm text-[var(--vscode-text-secondary)]"
              >
                <span className="text-[var(--vscode-accent)] mt-1">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
        {experience.technologies && experience.technologies.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <>
      <SectionHeader
        title="Experience"
        description="My professional journey and work experience in software development."
      />
      <div className="max-w-3xl">
        {experiences.map((item) => (
          <ExperienceItem key={item.id} experience={item} />
        ))}
      </div>
    </>
  );
}
