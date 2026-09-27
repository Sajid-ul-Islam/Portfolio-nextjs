"use client";

import React from "react";
import {
  SiGithub,
  SiLinkedin,
  SiX,
  SiWhatsapp,
  SiStreamlit,
} from "react-icons/si";
import { LuGlobe, LuFileText, LuSparkles, LuRocket } from "react-icons/lu";

import { socialLinks } from "../../data/portfolio";
import { cn } from "../../lib/cn";

function HuggingFaceIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <span style={{ fontSize: `${size}px`, lineHeight: 1 }} className={cn("inline-flex items-center justify-center select-none", className)}>
      🤗
    </span>
  );
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  twitter: SiX,
  x: SiX,
  huggingface: HuggingFaceIcon,
  whatsapp: SiWhatsapp,
  "message-circle": SiWhatsapp,
  streamlit: SiStreamlit,
  "layout-dashboard": SiStreamlit,
  "file-text": LuFileText,
  resume: LuFileText,
  globe: LuGlobe,
  cybrcraft: LuGlobe,
};

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap] ?? iconMap[link.id] ?? LuRocket;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 px-3 py-1.5",
              "bg-white/[0.03] border border-white/5",
              "rounded-xl hover:bg-[var(--vscode-accent)]/10 hover:border-[var(--vscode-accent)]/40 hover:scale-[1.02] active:scale-[0.98] group transition-all duration-200 shadow-sm"
            )}
            title={link.name}
          >
            <Icon size={14} className="text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)] transition-colors" />
            <span className="text-[11px] font-semibold text-[var(--vscode-text-secondary)] group-hover:text-white uppercase tracking-tight font-mono transition-colors">
              {link.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}
