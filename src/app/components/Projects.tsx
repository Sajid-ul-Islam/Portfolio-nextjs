"use client";
import React from "react";
import { projects } from "../data";

const Projects = () => {
  const latest = projects.slice(0, 6);

  return (
    <section id="portfolio" className="py-20 bg-paper">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2">
              Latest Work
            </h2>
            <p className="text-ink/70">Selected projects and products</p>
          </div>
          <a
            href="#"
            className="text-ink/70 hover:text-ink underline decoration-dotted"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latest.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white border border-ink/10 hover:border-ink/40 transition-all"
            >
              <div className="text-xs uppercase tracking-wider text-ink/60 mb-3">
                {project.tags?.[0] || "Project"}
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">
                {project.title}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                {project.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
