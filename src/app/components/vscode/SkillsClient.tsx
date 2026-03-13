"use client";
import Image from "next/image";
import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

import { skillGroups } from "../../data/portfolio";
import { cn } from "../../lib/cn";
import SectionHeader from "./SectionHeader";

type SkillCardProps = {
  name: string;
  icon?: string;
  level?: string;
};

function SkillCard({ name, icon, level }: SkillCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        "bg-[var(--vscode-sideBar-background)]",
        "border border-[var(--vscode-border)]",
        "rounded-[var(--vscode-border-radius-md)]",
        "hover:border-[var(--vscode-focusBorder)]",
        "transition-colors"
      )}
    >
      {icon ? <Image src={icon} alt={name} width={24} height={24} className="w-6 h-6" /> : null}
      <span className="text-vscode-sm text-[var(--vscode-text-primary)]">{name}</span>
      {level ? (
        <span className="ml-auto text-vscode-xs text-[var(--vscode-text-secondary)]">
          {level}
        </span>
      ) : null}
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
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", className)}>
      {skills.map((skill) => (
        <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
      ))}
    </div>
  );
}

export default function SkillsClient() {
  const [openSections, setOpenSections] = useState(
    skillGroups.map((group) => group.name)
  );

  const toggleSection = (name: string) => {
    setOpenSections((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <>
      <SectionHeader title="Skills" description="Technologies and tools I work with." />
      <div className="space-y-4">
        {skillGroups.map((group) => {
          const isOpen = openSections.includes(group.name);
          return (
            <div
              key={group.name}
              className="border border-[var(--vscode-border)] rounded-[var(--vscode-border-radius-md)] overflow-hidden"
            >
              <button
                onClick={() => toggleSection(group.name)}
                className={cn(
                  "w-full flex items-center gap-2 px-4 py-3",
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
                <span className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)]">
                  {group.name}
                </span>
                <span className="ml-auto text-vscode-xs text-[var(--vscode-text-secondary)]">
                  {group.skills.length} skills
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
    </>
  );
}
