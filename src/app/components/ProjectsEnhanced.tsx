"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Panel from "./vscode/Panel";
import Badge from "./vscode/Badge";

const projectsData = [
    {
        id: 1,
        title: "VS Code Themed Portfolio",
        description: "A fully functional developer portfolio designed to look and feel exactly like Visual Studio Code.",
        image: "https://via.placeholder.com/600x400?text=Portfolio",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/saajiidi/example-app-nextjs",
        liveDemoUrl: "https://sajid-islam-portfolio.vercel.app/"
    },
    {
        id: 2,
        title: "AI Chat Agent Workspace",
        description: "A centralized workspace featuring different AI model selections and document scraping endpoints.",
        image: "https://via.placeholder.com/600x400?text=AI+Agent",
        techStack: ["Next.js", "React", "Node.js"],
        githubUrl: "#",
        liveDemoUrl: "#"
    },
    {
        id: 3,
        title: "Terminal Snake Game",
        description: "A retro-style terminal Nokia Snake game built directly into the browser.",
        image: "https://via.placeholder.com/600x400?text=Snake+Game",
        techStack: ["React", "TypeScript", "CSS"],
        githubUrl: "#",
        liveDemoUrl: "#"
    }
];

export default function ProjectsEnhanced() {
    const [filter, setFilter] = useState("All");

    // Extract unique technologies for the filter buttons
    const categories = useMemo(() => {
        const allTechs = projectsData.flatMap(p => p.techStack);
        return ["All", ...Array.from(new Set(allTechs))];
    }, []);

    const filteredProjects = filter === "All"
        ? projectsData
        : projectsData.filter(p => p.techStack.includes(filter));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Technology Filter Bar */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((tech) => (
                    <button
                        key={tech}
                        onClick={() => setFilter(tech)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === tech
                                ? "bg-[var(--vscode-accent)] text-black"
                                : "bg-white/5 text-[var(--vscode-text-secondary)] hover:bg-white/10"
                            }`}
                    >
                        {tech}
                    </button>
                ))}
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                    <Panel key={project.id} className="flex flex-col overflow-hidden group border border-white/5 hover:border-[var(--vscode-accent)] transition-colors">
                        <div className="relative h-48 w-full overflow-hidden bg-[#0d1117]">
                            <Image
                                src={project.image}
                                alt={`${project.title} screenshot`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-[var(--vscode-text-primary)] mb-2">{project.title}</h3>
                            <p className="text-sm text-[var(--vscode-text-secondary)] mb-4 flex-grow">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techStack.map(tech => (
                                    <Badge key={tech}>{tech}</Badge>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[var(--vscode-accent)] hover:underline">
                                    <FaExternalLinkAlt size={12} /> Live Demo
                                </a>
                                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[var(--vscode-text-secondary)] hover:text-white transition-colors">
                                    <FaGithub size={14} /> Source Code
                                </a>
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
        </div>
    );
}