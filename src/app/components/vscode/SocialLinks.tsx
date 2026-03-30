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
              "bg-white/5 border border-white/10",
              "rounded-md hover:bg-[#a3e635]/10 hover:border-[#a3e635]/30 group transition-all"
            )}
            title={link.name}
          >
            <Icon size={16} className="text-white group-hover:text-[#a3e635]" />
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-tighter">
              {link.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}
