"use client";

import { LuBriefcase, LuCalendar, LuMapPin, LuTrendingUp } from "react-icons/lu";
import Image from "next/image";
import { motion } from "framer-motion";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { experiences } from "../data/portfolio";
import { cn } from "../lib/cn";

// Animation settings
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

function ExperienceItem({ experience, index }: { experience: (typeof experiences)[number]; index: number }) {
  const duration = experience.current
    ? `${experience.startDate} - Present`
    : `${experience.startDate} - ${experience.endDate}`;

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "relative pl-10 pb-10 last:pb-0",
        "timeline-connector"
      )}
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
        "glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:bg-white/[0.03] hover:shadow-xl",
        experience.current ? "border-[var(--vscode-accent)]/40 shadow-lg shadow-[var(--vscode-accent)]/10" : ""
      )}>
        {/* Glow accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--vscode-accent)]/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex gap-4 items-start">
            {experience.logo && (
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white p-1.5 border border-[var(--vscode-border)] overflow-hidden relative shadow-sm">
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div>
              <h3 className="text-vscode-base font-bold text-[var(--vscode-text-primary)]">
                {experience.title}
              </h3>
              <p className="text-vscode-sm text-[var(--vscode-accent)] font-semibold font-mono mt-0.5">
                {experience.company}
              </p>
            </div>
          </div>
          {experience.current ? (
            <Badge variant="success" className="animate-pulse-glow">
              <span className="flex items-center gap-1 font-mono text-[9px] font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Current Role
              </span>
            </Badge>
          ) : null}
        </div>

        <div className="relative z-10 flex flex-wrap gap-3 text-vscode-xs text-[var(--vscode-text-secondary)] mb-4 font-mono">
          <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
            <LuCalendar size={12} className="text-[var(--vscode-accent)]" />
            {duration}
          </span>
          {experience.location ? (
            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
              <LuMapPin size={12} className="text-[var(--vscode-accent)]" />
              {experience.location}
            </span>
          ) : null}
        </div>

        <p className="relative z-10 text-vscode-sm text-[var(--vscode-text-secondary)] mb-4 leading-relaxed font-sans">
          {experience.description}
        </p>

        {experience.highlights && experience.highlights.length > 0 ? (
          <ul className="relative z-10 space-y-2 mb-4 font-sans text-vscode-sm">
            {experience.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 text-[var(--vscode-text-secondary)]"
              >
                <span className="text-[var(--vscode-accent)] mt-0.5 flex-shrink-0 font-bold">»</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {experience.technologies && experience.technologies.length > 0 ? (
          <div className="relative z-10 flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
            {experience.technologies.map((tech) => (
              <Badge key={tech} className="bg-[var(--vscode-editor-background)] border-[var(--vscode-border)] text-[9px] font-mono">{tech}</Badge>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Title Section */}
        <motion.div variants={itemVariants}>
          <SectionHeader
            title="Experience"
            description="My professional journey in business analysis, marketplace operations, and data-driven strategy."
          />
        </motion.div>

        {/* Summary Info Cards */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 px-4 py-3 glass-panel border border-[var(--vscode-border)] rounded-2xl shadow-sm">
            <div className="p-2 rounded-lg bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)]">
              <LuTrendingUp size={16} />
            </div>
            <div className="font-mono">
              <span className="text-vscode-base font-extrabold text-[var(--vscode-text-primary)]">{totalYears}+</span>
              <span className="text-[10px] text-[var(--vscode-text-secondary)] ml-2 uppercase tracking-wider">Years Experience</span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 glass-panel border border-[var(--vscode-border)] rounded-2xl shadow-sm">
            <div className="p-2 rounded-lg bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)]">
              <LuBriefcase size={16} />
            </div>
            <div className="font-mono">
              <span className="text-vscode-base font-extrabold text-[var(--vscode-text-primary)]">{experiences.length}</span>
              <span className="text-[10px] text-[var(--vscode-text-secondary)] ml-2 uppercase tracking-wider">Positions Held</span>
            </div>
          </div>
          {currentRoles.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-[var(--vscode-accent)]/5 border border-[var(--vscode-accent)]/20 rounded-2xl shadow-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full availability-pulse" />
              <span className="text-[10px] text-[var(--vscode-accent)] uppercase font-mono tracking-wider font-extrabold">
                {currentRoles.length} Active Role{currentRoles.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </motion.div>

        {/* Timeline Section */}
        <div className="max-w-4xl pt-4">
          {experiences.map((item, index) => (
            <ExperienceItem key={item.id} experience={item} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
