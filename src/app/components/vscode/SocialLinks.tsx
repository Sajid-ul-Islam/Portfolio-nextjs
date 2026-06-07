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
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zM8.5 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7.3 4.5c.28 1.63 1.62 2.75 3.8 2.75s3.52-1.12 3.8-2.75H8.2z" />
    </svg>
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
