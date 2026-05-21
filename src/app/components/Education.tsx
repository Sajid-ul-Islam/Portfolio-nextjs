"use client";
import React from 'react';
import { education } from '../data';
import { FaGraduationCap } from 'react-icons/fa';
import Panel from './vscode/Panel';

export default function Education() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
      {/* VS Code Syntax Header */}
      <div className="mb-6 border-b border-white/10 pb-3">
        <h2 className="text-lg md:text-xl font-bold text-[var(--vscode-text-primary)] tracking-widest flex flex-wrap items-center gap-2">
          <span className="text-[var(--vscode-accent)]">export const</span>
          <span>Education = [</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-2 md:pl-4 border-l border-white/10 ml-2 md:ml-4 pb-4">
        {education.map((edu, index) => (
          <Panel key={index} className="p-5 border border-white/5 hover:border-[var(--vscode-accent)]/50 transition-colors flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
                <FaGraduationCap className="text-[var(--vscode-accent)] text-lg flex-shrink-0 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm md:text-base font-bold text-[var(--vscode-text-primary)] leading-tight">
                  {edu.institution}
                </h3>
              </div>

              <div className="text-sm text-[var(--vscode-text-secondary)] mb-6">
                <span className="text-[#a3e635] mr-2">degree:</span>
                <span className="text-[var(--vscode-text-primary)]">"{edu.degree}"</span>
              </div>
            </div>

            {edu.link && (
              <a
                href={edu.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--vscode-accent)] hover:text-white transition-colors mt-auto inline-block"
              >
                // Visit_Website
              </a>
            )}
          </Panel>
        ))}
      </div>

      <div className="text-lg md:text-xl font-bold text-[var(--vscode-text-primary)] uppercase tracking-widest mt-2">
        ];
      </div>
    </div>
  );
}
