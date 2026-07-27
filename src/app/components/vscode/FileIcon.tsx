"use client";

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
  SiTailwindcss,
  SiSass,
  SiDocker,
  SiYaml,
  SiStreamlit,
} from "react-icons/si";
import { LuFile, LuFileText, LuGlobe } from "react-icons/lu";
import { VscTerminal, VscJson } from "react-icons/vsc";

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
  sh: "text-[#4EAA25]",
  bash: "text-[#4EAA25]",
  yml: "text-[#CB171E]",
  yaml: "text-[#CB171E]",
  docker: "text-[#2496ED]",
  streamlit: "text-[#FF4B4B]",
};

type FileIconProps = {
  filename: string;
  size?: number;
  className?: string;
};

export default function FileIcon({ filename, size = 16, className }: FileIconProps) {
  const extension = filename.split(".").pop()?.toLowerCase() ?? "";
  const colorClass = extensionColors[extension] ?? "text-gray-400";
  const iconProps = { size, className: cn(colorClass, className) };

  switch (extension) {
    case "tsx":
      if (filename.toLowerCase().includes("page") || filename.toLowerCase().includes("layout")) {
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
      if (filename.toLowerCase().includes("bot") || filename.toLowerCase().includes("desco")) {
        return <SiTelegram {...iconProps} />;
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
      return <SiTelegram {...iconProps} />;
    case "sh":
    case "bash":
      return <VscTerminal {...iconProps} />;
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
