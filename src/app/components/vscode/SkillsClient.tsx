"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LuChevronDown, LuChevronRight, LuCode2, LuSparkles, LuLayers } from "react-icons/lu";
import { motion } from "framer-motion";

import { skillGroups } from "../../data/portfolio";
import { cn } from "../../lib/cn";
import SectionHeader from "./SectionHeader";

// ─────────────────────────────────────────────────────────────────────────────
// Framer Motion Animation Settings
// ─────────────────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

type SkillCardProps = {
  name: string;
  icon?: string;
  category?: string;
};

function SkillCard({ name, icon, category }: SkillCardProps) {
  const isCore = category === "Core";

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl",
        "bg-white/[0.02] border border-white/5",
        "hover:border-[var(--vscode-accent)]/30 hover:bg-white/[0.05]",
        "transition-all duration-300 group shadow-sm"
      )}
    >
      {icon ? (
        <div className="relative w-8 h-8 flex-shrink-0 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <Image src={icon} alt={name} width={20} height={20} className="w-5 h-5 object-contain" />
        </div>
      ) : (
        <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[var(--vscode-accent)]/10 flex items-center justify-center group-hover:bg-[var(--vscode-accent)]/20 transition-colors">
          {isCore ? (
            <LuSparkles size={14} className="text-[var(--vscode-accent)]" />
          ) : (
            <LuCode2 size={14} className="text-[var(--vscode-accent)]" />
          )}
        </div>
      )}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-vscode-sm text-[var(--vscode-text-primary)] font-sans font-medium truncate group-hover:text-white transition-colors">
          {name}
        </span>
        {category && (
          <span className="text-[9px] text-[var(--vscode-text-secondary)] font-mono uppercase tracking-wider mt-0.5">
            {category}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function AccordionSection({
  group,
  isOpen,
  onToggle,
}: {
  group: typeof skillGroups[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [isOpen]);

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "border border-[var(--vscode-border)] rounded-2xl overflow-hidden bg-white/[0.01] backdrop-blur-sm",
        "transition-all duration-300",
        isOpen && "border-[var(--vscode-accent)]/30 shadow-lg shadow-black/10 bg-white/[0.02]"
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-5 py-4",
          "bg-transparent hover:bg-white/[0.03]",
          "transition-colors text-left group"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-90"
          )}>
            <LuChevronRight size={16} className="text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)] transition-colors" />
          </div>
          <span className="text-vscode-base font-extrabold text-[var(--vscode-text-primary)] font-mono tracking-tight truncate group-hover:text-white">
            {group.name}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            {group.skills.filter(s => s.icon).slice(0, 4).map((s) => (
              <div key={s.name} className="w-4 h-4 rounded-sm overflow-hidden relative">
                <Image src={s.icon!} alt="" fill className="object-contain" />
              </div>
            ))}
          </div>
          <span className={cn(
            "text-vscode-xs font-mono px-2.5 py-0.5 rounded-full font-bold transition-all border",
            isOpen
              ? "bg-[var(--vscode-accent)]/15 text-[var(--vscode-accent)] border-[var(--vscode-accent)]/30"
              : "bg-white/5 text-[var(--vscode-text-secondary)] border-white/5"
          )}>
            {group.skills.length} Items
          </span>
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-[height] duration-300 ease-out"
        style={{ height: height === undefined ? 'auto' : `${height}px` }}
      >
        <div className="p-5 border-t border-[var(--vscode-border)] bg-black/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {group.skills.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                category={skill.category}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header Title Section */}
        <motion.div variants={itemVariants}>
          <SectionHeader 
            title="Skills & Expertise" 
            description="Outcome-grouped competencies representing specialized judgment and analytical skillsets." 
          />
        </motion.div>

        {/* Summary Info bar */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between gap-4 px-6 py-4 glass-panel border border-[var(--vscode-border)] rounded-2xl relative overflow-hidden"
        >
          <div className="flex items-center gap-2.5 text-vscode-xs text-[var(--vscode-text-secondary)] font-mono">
            <div className="p-1.5 rounded-lg bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)]">
              <LuLayers size={14} />
            </div>
            <span>
              <strong className="text-[var(--vscode-text-primary)] font-bold">{totalSkills}</strong> skills mapped across <strong className="text-[var(--vscode-text-primary)] font-bold">{skillGroups.length}</strong> categories
            </span>
          </div>
          <button
            onClick={() => {
              if (openSections.length === skillGroups.length) {
                setOpenSections([]);
              } else {
                setOpenSections(skillGroups.map(g => g.name));
              }
            }}
            className="text-[10px] font-mono uppercase tracking-wider text-[var(--vscode-accent)] hover:text-[var(--vscode-text-linkHover)] transition-all font-semibold"
          >
            {openSections.length === skillGroups.length ? "Collapse All" : "Expand All"}
          </button>
        </motion.div>
        
        {/* Accordions List */}
        <div className="space-y-4">
          {skillGroups.map((group) => {
            const isOpen = openSections.includes(group.name);
            return (
              <AccordionSection
                key={group.name}
                group={group}
                isOpen={isOpen}
                onToggle={() => toggleSection(group.name)}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
