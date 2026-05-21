"use client";
import React from 'react';
import { education } from '../data';
import { FaGraduationCap } from 'react-icons/fa';
import Panel from './vscode/Panel';

const Education = () => {
  export default function Education() {
    return (
      <section id="education" className="py-20 bg-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="border-b-4 border-accent pb-2">Education</span>
            </h2>
            <p className="text-gray-400">My academic background</p>
          </div>
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
            {/* VS Code Syntax Header */}
            <div className="mb-6 border-b border-white/10 pb-3">
              <h2 className="text-lg md:text-xl font-bold text-[var(--vscode-text-primary)] tracking-widest flex flex-wrap items-center gap-2">
                <span className="text-[var(--vscode-accent)]">export const</span>
                <span>Education = [</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {education.map((edu, index) => (
            <div key={index} className="group relative p-8 rounded-2xl bg-dark-lighter border border-white/5 hover:border-accent/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaGraduationCap size={24} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-2 md:pl-4 border-l border-white/10 ml-2 md:ml-4 pb-4">
        {education.map((edu, index) => (
          <Panel key={index} className="p-5 border border-white/5 hover:border-[var(--vscode-accent)]/50 transition-colors flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
                <FaGraduationCap className="text-[var(--vscode-accent)] text-lg flex-shrink-0 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm md:text-base font-bold text-[var(--vscode-text-primary)] leading-tight">
                  {edu.institution}
                </h3>

                <p className="text-gray-300 font-medium mb-4">
                  {edu.degree}
                </p>

                <a
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  Visit Website &rarr;
                </a>
              </div>
              
              <div className="text-sm text-[var(--vscode-text-secondary)] mb-6">
                <span className="text-[#a3e635] mr-2">degree:</span>
                <span className="text-[var(--vscode-text-primary)]">"{edu.degree}"</span>
              </div>
            </div>
          ))}
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
    </section>

      <div className="text-lg md:text-xl font-bold text-[var(--vscode-text-primary)] uppercase tracking-widest mt-2">
        ];
      </div>
    </div>
            );
};

            export default Education;
}
