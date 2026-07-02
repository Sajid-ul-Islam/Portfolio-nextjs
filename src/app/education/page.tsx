"use client";

import { LuGraduationCap, LuCalendar } from "react-icons/lu";
import Image from "next/image";
import { motion } from "framer-motion";

import SectionHeader from "../components/vscode/SectionHeader";
import { education } from "../data/portfolio";
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

function EducationItem({ item }: { item: (typeof education)[number] }) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "relative pl-10 pb-8 last:pb-0",
        "timeline-connector"
      )}
    >
      {/* Timeline Node */}
      <span className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--vscode-accent)] shadow-lg shadow-[var(--vscode-accent)]/30 z-10">
        <LuGraduationCap size={12} className="text-white" />
      </span>

      {/* Card */}
      <div className="glass-panel border border-[var(--vscode-border)] bg-white/[0.01] rounded-2xl p-5 hover:bg-white/[0.03] hover:shadow-xl hover:border-[var(--vscode-accent)]/30 transition-all duration-300 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--vscode-accent)]/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 mb-3">
          <div className="flex gap-4 items-start">
            {item.logo && (
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white p-1 border border-[var(--vscode-border)] overflow-hidden relative shadow-sm">
                <Image
                  src={item.logo}
                  alt={item.institution}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div>
              <h3 className="text-vscode-base font-bold text-[var(--vscode-text-primary)]">
                {item.degree}
              </h3>
              {item.link ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-vscode-sm text-[var(--vscode-accent)] hover:text-[var(--vscode-text-linkHover)] font-medium transition-colors"
                >
                  {item.institution}
                </a>
              ) : (
                <p className="text-vscode-sm text-[var(--vscode-accent)] font-medium">
                  {item.institution}
                </p>
              )}
            </div>
          </div>
          {item.year && (
            <span className="text-vscode-xs text-[var(--vscode-text-secondary)] bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full font-mono">
              {item.year}
            </span>
          )}
        </div>
        {item.description && (
          <p className="relative z-10 text-vscode-sm text-[var(--vscode-text-secondary)] mt-2 leading-relaxed font-sans">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function EducationPage() {
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
            title="Education"
            description="My academic background and professional certifications."
          />
        </motion.div>

        {/* List Grid */}
        <div className="max-w-4xl pt-4">
          {education.map((item, index) => (
            <EducationItem key={`${item.institution}-${index}`} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
