"use client";

import React, { useState } from 'react';
import { experience } from '../data';
import { FaBriefcase, FaChevronRight } from 'react-icons/fa';
import Panel from './vscode/Panel';

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
      {/* VS Code Syntax Header */}
      <div className="mb-6 border-b border-white/10 pb-3">
        <h2 className="text-lg md:text-xl font-bold text-[var(--vscode-text-primary)] tracking-widest flex flex-wrap items-center gap-2">
          <span className="text-[var(--vscode-accent)]">export const</span>
          <span>Experience = [</span>
        </h2>
      </div>

      <div className="relative border-l border-white/10 ml-2 md:ml-4 space-y-6 pb-4">
        {experience.map((exp, index) => (
          <div key={index} className="relative pl-6 md:pl-8">
            {/* Timeline Dot */}
            <div className={`absolute -left-[5px] top-5 w-2.5 h-2.5 rounded-full transition-colors duration-300 ${expandedIndex === index ? 'bg-[var(--vscode-accent)] shadow-[0_0_10px_var(--vscode-accent)]' : 'bg-white/20'}`} />

            <Panel
              className={`overflow-hidden transition-all duration-300 border ${expandedIndex === index ? 'border-[var(--vscode-accent)]/50' : 'border-white/5 hover:border-white/20'}`}
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleExpand(index)}
                className="p-4 cursor-pointer flex items-center justify-between bg-[var(--vscode-bg)]/50 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 w-full">
                  <FaChevronRight className={`flex-shrink-0 text-[var(--vscode-text-secondary)] text-xs transition-transform duration-300 ${expandedIndex === index ? 'rotate-90' : ''}`} />
                  <FaBriefcase className="flex-shrink-0 text-[var(--vscode-accent)] text-sm hidden sm:block" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <h3 className="text-sm md:text-base font-bold text-[var(--vscode-text-primary)]">
                      {exp.role}
                    </h3>
                    <span className="text-[var(--vscode-text-secondary)] text-xs md:text-sm hidden sm:inline">|</span>
                    <span className="text-[var(--vscode-text-secondary)] text-xs md:text-sm">
                      {exp.company}
                    </span>
                  </div>
                </div>
              </div>

              {/* Accordion Content */}
              <div className={`grid transition-all duration-300 ease-in-out ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-4 pt-0 border-t border-white/5 mt-2 space-y-3 bg-[var(--vscode-bg)]/30">
                    {exp.group && (
                      <div className="text-xs font-semibold text-[var(--vscode-accent)] mb-2 uppercase tracking-wider">
                        {`// ${exp.group}`}
                      </div>
                    )}
                    {exp.tasks.map((task, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-[var(--vscode-accent)] mt-0.5 select-none font-bold">{">"}</span>
                        <span className="text-[var(--vscode-text-secondary)] leading-relaxed">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        ))}
      </div>

      <div className="text-lg md:text-xl font-bold text-[var(--vscode-text-primary)] uppercase tracking-widest">
        ];
      </div>
    </div>
  );
}
