"use client";
import Image from "next/image";
import { useState, useRef, useMemo, useEffect } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

import { skillGroups } from "../../data/portfolio";
import { cn } from "../../lib/cn";
import SectionHeader from "./SectionHeader";

type SkillCardProps = {
  name: string;
  icon?: string;
  level?: string;
};

function SkillCard({ name, icon, level }: SkillCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        "bg-[var(--vscode-sideBar-background)]",
        "border border-[var(--vscode-border)]",
        "rounded-[var(--vscode-border-radius-md)]",
        "hover:border-[var(--vscode-focusBorder)]",
        "transition-colors"
      )}
    >
      {icon ? <Image src={icon} alt={name} width={24} height={24} className="w-6 h-6" /> : null}
      <span className="text-vscode-sm text-[var(--vscode-text-primary)]">{name}</span>
      {level ? (
        <span className="ml-auto text-vscode-xs text-[var(--vscode-text-secondary)]">
          {level}
        </span>
      ) : null}
    </div>
  );
}

function SkillGrid({
  skills,
  className,
}: {
  skills: typeof skillGroups[number]["skills"];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", className)}>
      {skills.map((skill) => (
        <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
      ))}
    </div>
  );
}

function SkillSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skills = useMemo(() => skillGroups.flatMap(g => g.skills.map(s => s.name)), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const points: { x: number; y: number; z: number; text: string }[] = skills.map((text, i) => {
        const theta = Math.acos(-1 + (2 * i) / skills.length);
        const phi = Math.sqrt(skills.length * Math.PI) * theta;
        return {
            x: Math.cos(phi) * Math.sin(theta),
            y: Math.sin(phi) * Math.sin(theta),
            z: Math.cos(theta),
            text
        };
    });

    let angleX = 0.005;
    let angleY = 0.005;

    const rotate = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.textAlign = "center";
        
        points.forEach(p => {
            // Rotate Y
            const x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
            const z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);
            // Rotate X
            const y2 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
            const z2 = z1 * Math.cos(angleX) + p.y * Math.sin(angleX);
            
            p.x = x1; p.y = y2; p.z = z2;

            const scale = 300 / (300 - z2 * 150);
            const x2d = x1 * 150 * scale + width / 2;
            const y2d = y2 * 150 * scale + height / 2;

            const alpha = (z2 + 1) / 2;
            ctx.fillStyle = `rgba(163, 230, 53, ${alpha + 0.1})`;
            ctx.font = `${10 * scale}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
            ctx.fillText(p.text, x2d, y2d);
        });

        requestAnimationFrame(rotate);
    };

    rotate();
  }, [skills]);

  return <canvas ref={canvasRef} className="w-full h-[300px] mb-8 bg-black/20 rounded-xl border border-white/5 shadow-inner" />;
}

export default function SkillsClient() {
  const [openSections, setOpenSections] = useState(
    skillGroups.map((group) => group.name)
  );

  const toggleSection = (name: string) => {
    setOpenSections((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <>
      <SectionHeader title="Skills" description="Technologies and tools I work with." />
      <SkillSphere />
      <div className="space-y-4">
        {skillGroups.map((group) => {
          const isOpen = openSections.includes(group.name);
          return (
            <div
              key={group.name}
              className="border border-[var(--vscode-border)] rounded-[var(--vscode-border-radius-md)] overflow-hidden"
            >
              <button
                onClick={() => toggleSection(group.name)}
                className={cn(
                  "w-full flex items-center gap-2 px-4 py-3",
                  "bg-[var(--vscode-sideBar-background)]",
                  "hover:bg-[var(--vscode-list-hoverBackground)]",
                  "transition-colors text-left"
                )}
              >
                {isOpen ? (
                  <LuChevronDown size={16} className="text-[var(--vscode-text-secondary)]" />
                ) : (
                  <LuChevronRight size={16} className="text-[var(--vscode-text-secondary)]" />
                )}
                <span className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)]">
                  {group.name}
                </span>
                <span className="ml-auto text-vscode-xs text-[var(--vscode-text-secondary)]">
                  {group.skills.length} skills
                </span>
              </button>
              {isOpen ? (
                <div className="p-4 bg-[var(--vscode-editor-background)]">
                  <SkillGrid skills={group.skills} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
