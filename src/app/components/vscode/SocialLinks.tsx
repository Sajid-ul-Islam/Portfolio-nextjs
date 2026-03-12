"use client";

import {
  LuExternalLink,
  LuGithub,
  LuLinkedin,
  LuRocket,
  LuTwitter,
  LuUsers,
} from "react-icons/lu";

import { socialLinks } from "../../data/portfolio";
import { cn } from "../../lib/cn";

const iconMap = {
  github: LuGithub,
  linkedin: LuLinkedin,
  twitter: LuTwitter,
  "product-hunt": LuRocket,
  users: LuUsers,
};

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap] ?? LuRocket;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 px-4 py-3",
              "bg-[var(--vscode-sideBar-background)]",
              "border-b-4 border-[var(--vscode-accent)]",
              "rounded-[var(--vscode-border-radius-sm)]",
              "hover:bg-[var(--vscode-list-hoverBackground)]",
              "transition-colors group"
            )}
          >
            <Icon size={20} className="text-[var(--vscode-text-primary)]" />
            <span className="text-vscode-sm text-[var(--vscode-text-primary)]">
              {link.name}
            </span>
            <LuExternalLink
              size={14}
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[var(--vscode-text-secondary)]"
            />
          </a>
        );
      })}
    </div>
  );
}
