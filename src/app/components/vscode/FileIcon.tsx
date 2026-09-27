"use client";

import React from "react";
import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiMarkdown,
  SiPython,
  SiReact,
  SiTypescript,
  SiR,
  SiPostgresql,
  SiNextdotjs,
  SiGo,
  SiTableau,
  SiTelegram,
  SiWhatsapp,
  SiTailwindcss,
  SiSass,
  SiDocker,
  SiYaml,
  SiStreamlit,
  SiNodedotjs,
  SiGit,
} from "react-icons/si";
import {
  LuFile,
  LuFileText,
  LuGlobe,
  LuCalculator,
  LuSettings,
  LuLock,
  LuTerminal,
} from "react-icons/lu";
import { VscJson } from "react-icons/vsc";

import { cn } from "@/lib/cn";

const extensionColors: Record<string, string> = {
  tsx: "text-[#61DAFB]",
  jsx: "text-[#61DAFB]",
  ts: "text-[#3178C6]",
  js: "text-[#F7DF1E]",
  mjs: "text-[#F7DF1E]",
  json: "text-[#F1E05A]",
  css: "text-[#1572B6]",
  scss: "text-[#CC6699]",
  html: "text-[#E34F26]",
  md: "text-[#38BDF8]",
  mdx: "text-[#38BDF8]",
  py: "text-[#3776AB]",
  go: "text-[#00ADD8]",
  r: "text-[#276DC3]",
  sql: "text-[#4169E1]",
  tw: "text-[#06B6D4]",
  tableau: "text-[#E97627]",
  web: "text-[#38BDF8]",
  bot: "text-[#26A5E4]",
  telegram: "text-[#26A5E4]",
  whatsapp: "text-[#25D366]",
  sh: "text-[#4EAA25]",
  bash: "text-[#4EAA25]",
  yml: "text-[#CB171E]",
  yaml: "text-[#CB171E]",
  docker: "text-[#2496ED]",
  dockerfile: "text-[#2496ED]",
  streamlit: "text-[#FF4B4B]",
};

type FileIconProps = {
  filename: string;
  size?: number;
  className?: string;
};

export default function FileIcon({ filename, size = 16, className }: FileIconProps) {
  const lower = filename.toLowerCase();
  const extension = lower.split(".").pop() ?? "";
  const colorClass = extensionColors[extension] ?? "text-gray-400";
  const iconProps = { size, className: cn(colorClass, className) };

  // Special named file checks
  if (lower.includes("whatsapp")) {
    return <SiWhatsapp {...iconProps} className={cn("text-[#25D366]", className)} />;
  }
  if (lower.includes("estimator")) {
    return <LuCalculator {...iconProps} className={cn("text-[#A855F7]", className)} />;
  }
  if (lower.includes("setting")) {
    return <LuSettings {...iconProps} className={cn("text-[#F7DF1E]", className)} />;
  }
  if (lower.includes("cybrcraft")) {
    return <SiNextdotjs {...iconProps} className={cn("text-white", className)} />;
  }
  if (lower.includes("docker") || lower === "dockerfile") {
    return <SiDocker {...iconProps} className={cn("text-[#2496ED]", className)} />;
  }
  if (lower.includes("package.json")) {
    return <SiNodedotjs {...iconProps} className={cn("text-[#68A063]", className)} />;
  }
  if (lower.includes("tailwind")) {
    return <SiTailwindcss {...iconProps} className={cn("text-[#06B6D4]", className)} />;
  }
  if (lower.includes(".env")) {
    return <LuLock {...iconProps} className={cn("text-[#F59E0B]", className)} />;
  }
  if (lower.includes("git")) {
    return <SiGit {...iconProps} className={cn("text-[#F05032]", className)} />;
  }

  switch (extension) {
    case "tsx":
      if (lower.includes("page") || lower.includes("layout")) {
        return <SiNextdotjs {...iconProps} />;
      }
      return <SiReact {...iconProps} />;
    case "jsx":
      return <SiReact {...iconProps} />;
    case "ts":
      return <SiTypescript {...iconProps} />;
    case "js":
    case "mjs":
      return <SiJavascript {...iconProps} />;
    case "py":
      if (lower.includes("bot") || lower.includes("desco") || lower.includes("telegram")) {
        return <SiTelegram {...iconProps} className={cn("text-[#26A5E4]", className)} />;
      }
      return <SiPython {...iconProps} />;
    case "json":
      return <VscJson {...iconProps} />;
    case "html":
      return <SiHtml5 {...iconProps} />;
    case "css":
      return <SiCss3 {...iconProps} />;
    case "scss":
      return <SiSass {...iconProps} />;
    case "md":
    case "mdx":
      return <SiMarkdown {...iconProps} />;
    case "r":
      return <SiR {...iconProps} />;
    case "sql":
      return <SiPostgresql {...iconProps} />;
    case "tableau":
      return <SiTableau {...iconProps} />;
    case "go":
      return <SiGo {...iconProps} />;
    case "tw":
      return <SiTailwindcss {...iconProps} />;
    case "streamlit":
      return <SiStreamlit {...iconProps} />;
    case "bot":
    case "telegram":
      return <SiTelegram {...iconProps} className={cn("text-[#26A5E4]", className)} />;
    case "sh":
    case "bash":
      return <LuTerminal {...iconProps} className={cn("text-[#4EAA25]", className)} />;
    case "yml":
    case "yaml":
      return <SiYaml {...iconProps} />;
    case "docker":
      return <SiDocker {...iconProps} />;
    case "web":
      return <LuGlobe {...iconProps} />;
    default:
      if (["md", "txt"].includes(extension)) {
        return <LuFileText {...iconProps} />;
      }
      return <LuFile {...iconProps} />;
  }
}
