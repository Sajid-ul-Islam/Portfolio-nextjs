"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LuChevronDown, LuChevronRight, LuCode2, LuSparkles } from "react-icons/lu";

import { skillGroups } from "../../data/portfolio";
import { cn } from "../../lib/cn";
import SectionHeader from "./SectionHeader";

type SkillCardProps = {
  name: string;
  icon?: string;
  category?: string;
  delay?: number;
};

function SkillCard({ name, icon, category, delay = 0 }: SkillCardProps) {
  const isCore = category === "Core";
  
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        "bg-[var(--vscode-sideBar-background)]",
        "border border-[var(--vscode-border)]",
        "rounded-lg",
        "hover:border-[var(--vscode-focusBorder)]",
        "hover:bg-white/[0.03]",
        "transition-all duration-200 group",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {icon ? (
        <div className="relative w-7 h-7 flex-shrink-0 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <Image src={icon} alt={name} width={20} height={20} className="w-5 h-5 object-contain" />
        </div>
      ) : (
        <div className="w-7 h-7 flex-shrink-0 rounded-md bg-[var(--vscode-accent)]/10 flex items-center justify-center group-hover:bg-[var(--vscode-accent)]/20 transition-colors">
          {isCore ? (
            <LuSparkles size={14} className="text-[var(--vscode-accent)]" />
          ) : (
            <LuCode2 size={14} className="text-[var(--vscode-accent)]" />
          )}
        </div>
      )}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-vscode-sm text-[var(--vscode-text-primary)] font-sans truncate">{name}</span>
        {category && (
          <span className="text-[9px] text-[var(--vscode-text-secondary)] font-mono uppercase tracking-wider">{category}</span>
        )}
      </div>
    </div>
  );
}

function AccordionSection({
  group,
  isOpen,
  onToggle,
  index,
}: {
  group: typeof skillGroups[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
      // Allow auto height after animation
      const timer = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      // Set current height first for smooth collapse
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "border border-[var(--vscode-border)] rounded-xl overflow-hidden bg-[var(--vscode-editor-background)]",
        "transition-all duration-200",
        isOpen && "border-[var(--vscode-accent)]/20 shadow-lg shadow-black/10"
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center gap-2.5 px-5 py-4",
          "bg-[var(--vscode-sideBar-background)]",
          "hover:bg-[var(--vscode-list-hoverBackground)]",
          "transition-colors text-left group"
        )}
      >
        <div className={cn(
          "transition-transform duration-200",
          isOpen && "rotate-90"
        )}>
          <LuChevronRight size={16} className="text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)] transition-colors" />
        </div>
        <div className="flex-1 flex items-center gap-3">
          <span className="text-vscode-base font-bold text-[var(--vscode-text-primary)] font-mono">
            {group.name}
          </span>
          <div className="hidden sm:flex items-center gap-1.5">
            {group.skills.filter(s => s.icon).slice(0, 3).map((s) => (
              <div key={s.name} className="w-4 h-4 rounded-sm overflow-hidden opacity-50 group-hover:opacity-80 transition-opacity">
                <Image src={s.icon!} alt="" width={16} height={16} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
        <span className={cn(
          "text-vscode-xs font-mono px-2 py-0.5 rounded-md transition-colors",
          isOpen
            ? "bg-[var(--vscode-accent)]/15 text-[var(--vscode-accent)]"
            : "bg-[var(--vscode-badge-background)] text-[var(--vscode-text-secondary)]"
        )}>
          {group.skills.length} items
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[height] duration-300 ease-out"
        style={{ height: height === undefined ? 'auto' : `${height}px` }}
      >
        <div className="p-5 bg-[var(--vscode-editor-background)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {group.skills.map((skill, i) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                category={skill.category}
                delay={isOpen ? i * 40 : 0}
              />
            ))}
          </div>
        </div>
      </div>
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

  const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Skills & Expertise" 
        description="Outcome-grouped competencies representing specialized judgment and analytical skills." 
      />

      {/* Summary bar */}
      <div className="flex items-center gap-4 px-4 py-3 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] rounded-xl">
        <div className="flex items-center gap-2 text-vscode-xs text-[var(--vscode-text-secondary)] font-mono">
          <LuCode2 size={14} className="text-[var(--vscode-accent)]" />
          <span><strong className="text-[var(--vscode-text-primary)]">{totalSkills}</strong> skills across <strong className="text-[var(--vscode-text-primary)]">{skillGroups.length}</strong> categories</span>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => {
            if (openSections.length === skillGroups.length) {
              setOpenSections([]);
            } else {
              setOpenSections(skillGroups.map(g => g.name));
            }
          }}
          className="text-[10px] font-mono uppercase tracking-wider text-[var(--vscode-accent)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
        >
          {openSections.length === skillGroups.length ? "Collapse All" : "Expand All"}
        </button>
      </div>
      
      <div className="space-y-4">
        {skillGroups.map((group, index) => {
          const isOpen = openSections.includes(group.name);
          return (
            <AccordionSection
              key={group.name}
              group={group}
              isOpen={isOpen}
              onToggle={() => toggleSection(group.name)}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
