"use client";

import {
  LuGithub,
  LuLinkedin,
  LuRocket,
  LuTwitter,
  LuUsers,
} from "react-icons/lu";

import { socialLinks } from "../../data/portfolio";
import { cn } from "../../lib/cn";

// Inline SVG for Hugging Face (no react-icons entry)
function HuggingFaceIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <span style={{ fontSize: `${size}px`, lineHeight: 1 }} className={className} role="img" aria-label="Hugging Face">
      🤗
    </span>
  );
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: LuGithub,
  linkedin: LuLinkedin,
  twitter: LuTwitter,
  "product-hunt": LuRocket,
  users: LuUsers,
  huggingface: HuggingFaceIcon,
};

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap] ?? LuRocket;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 px-3 py-1.5",
              "bg-[var(--vscode-card-bg)] border border-[var(--vscode-border)]",
              "rounded-lg hover:bg-[var(--vscode-accent)]/15 hover:border-[var(--vscode-accent)]/40 group transition-all"
            )}
            title={link.name}
          >
            <Icon size={16} className="text-[var(--vscode-text-primary)] group-hover:text-[var(--vscode-accent)] transition-colors" />
            <span className="text-[10px] font-bold text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-text-primary)] uppercase tracking-tighter transition-colors">
              {link.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}
