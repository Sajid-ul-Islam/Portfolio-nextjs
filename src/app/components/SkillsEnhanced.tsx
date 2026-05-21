"use client";

import React, { useEffect, useState } from "react";
import Panel from "./vscode/Panel";

const skillsData = [
    {
        category: "Frontend",
        skills: [
            { name: "React / Next.js", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "Tailwind CSS", level: 95 },
        ],
    },
    {
        category: "Backend",
        skills: [
            { name: "Node.js", level: 80 },
            { name: "PostgreSQL", level: 75 },
            { name: "Express", level: 70 },
        ],
    },
    {
        category: "Tools & DevOps",
        skills: [
            { name: "Git & GitHub", level: 88 },
            { name: "Docker", level: 65 },
            { name: "Vercel", level: 80 },
        ],
    },
];

export default function SkillsEnhanced() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Trigger animation slightly after mount for a smooth effect
        const timeout = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsData.map((group, idx) => (
                    <Panel key={idx} className="p-6">
                        <h3 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-6 border-b border-white/5 pb-2">
                            {group.category}
                        </h3>
                        <div className="space-y-6">
                            {group.skills.map((skill, sIdx) => (
                                <div key={sIdx}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-[var(--vscode-text-secondary)]">{skill.name}</span>
                                        <span className="text-[#a3e635] font-mono text-xs">{skill.level}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-[#0d1117] rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="h-full bg-[#a3e635] rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: mounted ? `${skill.level}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Panel>
                ))}
            </div>
        </div>
    );
}