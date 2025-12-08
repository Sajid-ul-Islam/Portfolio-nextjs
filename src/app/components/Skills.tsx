"use client";
import React from 'react';
import { skills } from '../data';

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-dark-lighter relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="border-b-4 border-primary pb-2">Technical Proficiency</span>
          </h2>
          <p className="text-gray-400">Tools and technologies I work with</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical & Tools */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-accent rounded-full"></span>
              Data Science & Analytics
            </h3>
            <div className="flex flex-wrap gap-4">
              {skills.technical.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-dark border border-white/5 hover:border-accent/50 transition-colors duration-300 group">
                  <skill.icon className="text-2xl text-gray-400 group-hover:text-accent transition-colors" />
                  <span className="text-gray-300 group-hover:text-white font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Web Dev */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Web Development
            </h3>
            <div className="flex flex-wrap gap-4">
              {skills.web.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-dark border border-white/5 hover:border-primary/50 transition-colors duration-300 group">
                  <skill.icon className="text-2xl text-gray-400 group-hover:text-primary transition-colors" />
                  <span className="text-gray-300 group-hover:text-white font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Competencies */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">Core Competencies</h3>
          <div className="flex flex-wrapjustify-center gap-4 justify-center">
            {skills.core.map((skill, idx) => (
              <span key={idx} className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
