"use client";
import React from 'react';
import { projects } from '../data';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="border-b-4 border-accent pb-2">Featured Projects</span>
          </h2>
          <p className="text-gray-400">Showcase of my work</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group flex flex-col h-full bg-dark-lighter rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
              {/* Card Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags?.map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-accent font-medium text-sm flex items-center gap-2 transition-colors"
                  >
                    View Project <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
