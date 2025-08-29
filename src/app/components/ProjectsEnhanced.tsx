"use client";

import React, { useState } from "react";
import {
  FaProjectDiagram,
  FaExternalLinkAlt,
  FaGithub,
  FaReact,
  FaJs,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiBootstrap,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  link: string;
  github?: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

const ProjectsEnhanced = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects: Project[] = [
    {
      title: "My Portfolio with Bootstrap",
      description:
        "A responsive portfolio website built with HTML, CSS, and Bootstrap framework featuring modern design and smooth animations.",
      link: "https://saajiidi.github.io/",
      technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
      category: "Portfolio",
      featured: false,
    },
    {
      title: "My Portfolio with React App & TypeScript",
      description:
        "Advanced portfolio application built with React and TypeScript, featuring component-based architecture and type safety.",
      link: "https://saajiidi.github.io/portfolio/",
      technologies: ["React", "TypeScript", "CSS"],
      category: "Portfolio",
      featured: true,
    },
    {
      title: "My Portfolio with Next.js & Tailwind CSS",
      description:
        "Modern portfolio website built with Next.js and Tailwind CSS, optimized for performance and SEO.",
      link: "https://sajid-islam-portfolio.vercel.app/",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
      category: "Portfolio",
      featured: true,
    },
    {
      title: "E-Commerce Interface with React.js",
      description:
        "Full-featured e-commerce interface with product catalog, shopping cart, and responsive design for bike accessories.",
      link: "https://gear-master.vercel.app/",
      technologies: ["React", "JavaScript", "CSS"],
      category: "E-Commerce",
      featured: true,
    },
    {
      title: "LMS Interface with React.js",
      description:
        "Learning Management System interface with course management, user authentication, and interactive learning modules.",
      link: "https://altenaitve-school.vercel.app/",
      technologies: ["React", "JavaScript", "CSS"],
      category: "Education",
      featured: false,
    },
  ];

  const getTechIcon = (tech: string) => {
    const icons: { [key: string]: React.ComponentType } = {
      React: FaReact,
      "Next.js": SiNextdotjs,
      TypeScript: SiTypescript,
      JavaScript: FaJs,
      "Tailwind CSS": SiTailwindcss,
      Bootstrap: SiBootstrap,
      CSS: FaCss3Alt,
      HTML: FaCss3Alt,
    };
    return icons[tech] || FaProjectDiagram;
  };

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section
      className="p-3 lg:p-5 flex flex-col items-center text-white animate-fade-in"
      id="projects"
    >
      <div className="w-full max-w-6xl">
        <h2 className="mb-8 text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Projects Section */}
        {selectedCategory === "All" && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-amber-400">
              🌟 Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={`featured-${index}`}
                  project={project}
                  featured
                />
              ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) => {
  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
        featured ? "ring-2 ring-amber-400/50" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaProjectDiagram className="text-blue-400 text-xl" />
          {featured && (
            <span className="text-xs bg-amber-400 text-black px-2 py-1 rounded-full font-semibold">
              FEATURED
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            aria-label="View project"
          >
            <FaExternalLinkAlt />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors duration-200"
              aria-label="View source code"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-white hover:text-blue-400 transition-colors duration-200">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          {project.title}
        </a>
      </h3>

      <p className="text-slate-300 mb-4 text-sm leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {project.technologies.map((tech, techIndex) => {
          const IconComponent = getTechIcon(tech);
          return (
            <span
              key={techIndex}
              className="flex items-center space-x-1 bg-slate-700/50 text-xs px-2 py-1 rounded-full text-slate-300"
            >
              <IconComponent />
              <span>{tech}</span>
            </span>
          );
        })}
      </div>

      <div className="text-xs text-slate-400 font-medium">
        {project.category}
      </div>
    </div>
  );
};

export default ProjectsEnhanced;
