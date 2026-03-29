import { LuGraduationCap } from "react-icons/lu";

import SectionHeader from "../components/vscode/SectionHeader";
import { education } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Education",
  description: "Educational background and academic qualifications of Sajid Islam.",
  alternates: { canonical: "/Education" },
};

function EducationItem({ item }: { item: (typeof education)[number] }) {
  return (
    <div
      className={cn(
        "relative pl-8 pb-8 last:pb-0",
        "before:absolute before:left-[11px] before:top-2 before:w-[2px] before:h-full",
        "before:bg-[var(--vscode-border)] last:before:hidden"
      )}
    >
      <span className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--vscode-accent)]">
        <LuGraduationCap size={14} className="text-white" />
      </span>
        <div className="bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-[var(--vscode-border-radius-md)] p-4">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-vscode-lg font-semibold text-[var(--vscode-text-primary)]">
                {item.degree}
              </h3>
              {item.link ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-vscode-sm text-[var(--vscode-accent)] hover:underline"
                >
                  {item.institution}
                </a>
              ) : (
                <p className="text-vscode-sm text-[var(--vscode-accent)]">
                  {item.institution}
                </p>
              )}
            </div>
            {item.year && (
              <span className="text-vscode-xs text-[var(--vscode-text-secondary)] bg-[var(--vscode-badge-background)] px-2 py-0.5 rounded">
                {item.year}
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-vscode-sm text-[var(--vscode-text-secondary)] mt-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
    </div>
  );
}

export default function EducationPage() {
  return (
    <>
      <SectionHeader
        title="Education"
        description="My academic background and professional certifications."
      />
      <div className="max-w-3xl">
        {education.map((item, index) => (
          <EducationItem key={`${item.institution}-${index}`} item={item} />
        ))}
      </div>
    </>
  );
}
