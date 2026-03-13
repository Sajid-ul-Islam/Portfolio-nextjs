import { LuUsers } from "react-icons/lu";

import SectionHeader from "../components/vscode/SectionHeader";
import { family } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Family",
  description: "Family information and connections of Sajid Islam.",
  alternates: { canonical: "/Family" },
};

function FamilyMemberItem({ member }: { member: (typeof family)[number] }) {
  return (
    <div
      className={cn(
        "relative pl-8 pb-8 last:pb-0",
        "before:absolute before:left-[11px] before:top-2 before:w-[2px] before:h-full",
        "before:bg-[var(--vscode-border)] last:before:hidden"
      )}
    >
      <span className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--vscode-accent)]">
        <LuUsers size={14} className="text-white" />
      </span>
      <div className="bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-[var(--vscode-border-radius-md)] p-4">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-vscode-lg font-semibold text-[var(--vscode-text-primary)]">
                {member.name}
              </h3>
              <span className="text-vscode-xs px-2 py-0.5 rounded-full bg-[var(--vscode-editor-background)] text-[var(--vscode-text-secondary)] border border-[var(--vscode-border)]">
                {member.relation}
              </span>
            </div>
            {member.nameLink ? (
              <a 
                href={member.nameLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-vscode-sm text-[var(--vscode-accent)] hover:underline block mt-1"
              >
                View Profile
              </a>
            ) : null}
            {member.occupation ? (
              <p className="text-vscode-sm text-[var(--vscode-text-secondary)] mt-2">
                {member.occupation}
              </p>
            ) : null}
            {member.link ? (
              <a 
                href={member.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] block mt-2"
              >
                Learn More
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FamilyPage() {
  return (
    <>
      <SectionHeader
        title="Family"
        description="A list of my family members and their professional backgrounds."
      />
      <div className="max-w-3xl">
        {family.map((member, index) => (
          <FamilyMemberItem key={`${member.name}-${index}`} member={member} />
        ))}
      </div>
    </>
  );
}
