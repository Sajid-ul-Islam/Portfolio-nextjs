"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaTerminal } from "react-icons/fa";
import Panel from "./vscode/Panel";

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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 font-mono">
            {/* VS Code syntax header */}
            <div className="mb-6 border-b border-white/10 pb-3">
                <h2 className="text-lg md:text-xl font-bold text-[var(--vscode-text-primary)] tracking-widest flex items-center gap-2">
                    <FaTerminal className="text-cyan-400" />
                    <span className="text-purple-400">const</span>
                    <span className="text-blue-400">Projects</span>
                    <span className="text-white">=</span>
                    <span className="text-yellow-300">[</span>
                </h2>
            </div>

            <div className="ml-2 md:ml-4 border-l border-white/10 pl-4 md:pl-6 pb-4 space-y-8">
                {/* Technology Filter Bar */}
                <div className="flex flex-wrap gap-2 p-1.5 bg-[var(--vscode-bg)]/80 backdrop-blur-xl border border-white/10 rounded-xl w-fit">
                    {categories.map((tech) => (
                        <button
                            key={tech}
                            onClick={() => setFilter(tech)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 border ${filter === tech
                                ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                                : "bg-transparent border-transparent text-[var(--vscode-text-secondary)] hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {tech}
                        </button>
                    ))}
                </div>

                {/* Project Cards Grid (Bento Box Style) */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                        <Panel key={project.id} className="flex flex-col overflow-hidden group bg-[var(--vscode-bg)]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500 relative">
                            {/* Subtle Gradient Glows */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-700 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />

                            <div className="relative h-48 w-full overflow-hidden bg-black/50 border-b border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent z-10 pointer-events-none" />
                                <Image
                                    src={project.image}
                                    alt={`${project.title} screenshot`}
                                    fill
                                    className="object-cover group-hover:scale-110 group-hover:opacity-100 opacity-60 transition-all duration-700 ease-out"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow relative z-10">
                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-sans mb-2">{project.title}</h3>
                                <p className="text-sm text-[var(--vscode-text-secondary)] mb-6 flex-grow font-sans leading-relaxed">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-md hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-5 pt-4 border-t border-white/10 font-mono text-xs">
                                    <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 hover:shadow-cyan-400/50 transition-colors group/link">
                                        <FaExternalLinkAlt size={12} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" /> <span className="uppercase tracking-widest border-b border-transparent group-hover/link:border-cyan-300">Live_Demo</span>
                                    </a>
                                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group/link">
                                        <FaGithub size={14} className="group-hover/link:-translate-y-0.5 transition-transform" /> <span className="uppercase tracking-widest border-b border-transparent group-hover/link:border-purple-300">Source_Code</span>
                                    </a>
                                </div>
                            </div>
                        </Panel>
                    ))}
                </div>
            </div>

            {/* VS Code syntax footer */}
            <div className="text-lg md:text-xl font-bold text-yellow-300 tracking-widest mt-2 font-mono">
                ];
            </div>
        </div>
    );
}