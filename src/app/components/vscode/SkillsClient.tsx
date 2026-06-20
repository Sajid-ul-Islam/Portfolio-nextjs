"use client";

import Image from "next/image";
import { useState } from "react";
import { LuChevronDown, LuChevronRight, LuCode2 } from "react-icons/lu";

import { skillGroups } from "../../data/portfolio";
import { cn } from "../../lib/cn";
import SectionHeader from "./SectionHeader";

type SkillCardProps = {
  name: string;
  icon?: string;
};

function SkillCard({ name, icon }: SkillCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        "bg-[var(--vscode-sideBar-background)]",
        "border border-[var(--vscode-border)]",
        "rounded-lg",
        "hover:border-[var(--vscode-focusBorder)]",
        "transition-colors duration-200"
      )}
    >
      {icon ? (
        <div className="relative w-6 h-6 flex-shrink-0">
          <Image src={icon} alt={name} width={24} height={24} className="w-6 h-6 object-contain" />
        </div>
      ) : (
        <LuCode2 size={16} className="text-[var(--vscode-accent)] flex-shrink-0" />
      )}
      <span className="text-vscode-sm text-[var(--vscode-text-primary)] font-sans">{name}</span>
    </div>
  );
}

function SkillGrid({
  skills,
  className,
}: {
  skills: typeof skillGroups[number]["skills"];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", className)}>
      {skills.map((skill) => (
        <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
      ))}
    </div>
  );
}

export default function SkillsClient() {
  const [openSections, setOpenSections] = useState<string[]>(
    skillGroups.map((group) => group.name)
  );

  const toggleSection = (name: string) => {
    setOpenSections((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Skills & Expertise" 
        description="Outcome-grouped competencies representing specialized judgment and analytical skills." 
      />
      
      <div className="space-y-4">
        {skillGroups.map((group) => {
          const isOpen = openSections.includes(group.name);
          return (
            <div
              key={group.name}
              className="border border-[var(--vscode-border)] rounded-lg overflow-hidden bg-[var(--vscode-editor-background)]"
            >
              <button
                onClick={() => toggleSection(group.name)}
                className={cn(
                  "w-full flex items-center gap-2 px-4 py-3.5",
                  "bg-[var(--vscode-sideBar-background)]",
                  "hover:bg-[var(--vscode-list-hoverBackground)]",
                  "transition-colors text-left"
                )}
              >
                {isOpen ? (
                  <LuChevronDown size={16} className="text-[var(--vscode-text-secondary)]" />
                ) : (
                  <LuChevronRight size={16} className="text-[var(--vscode-text-secondary)]" />
                )}
                <span className="text-vscode-base font-bold text-[var(--vscode-text-primary)] font-mono">
                  {group.name}
                </span>
                <span className="ml-auto text-vscode-xs text-[var(--vscode-text-secondary)] font-mono">
                  {group.skills.length} items
                </span>
              </button>
              {isOpen ? (
                <div className="p-4 bg-[var(--vscode-editor-background)]">
                  <SkillGrid skills={group.skills} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
