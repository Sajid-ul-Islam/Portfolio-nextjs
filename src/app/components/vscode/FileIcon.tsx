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
  SiTableau,
  SiPostgresql,
  SiNextdotjs,
} from "react-icons/si";
import { LuFile, LuFileText, LuGlobe } from "react-icons/lu";
import { VscCode, VscJson, VscMarkdown } from "react-icons/vsc";

import { cn } from "../../lib/cn";

const extensionColors: Record<string, string> = {
  tsx: "text-blue-400",
  jsx: "text-blue-400",
  ts: "text-blue-500",
  js: "text-yellow-400",
  json: "text-yellow-500",
  css: "text-blue-300",
  scss: "text-pink-400",
  html: "text-orange-500",
  md: "text-gray-400",
  py: "text-blue-400",
  go: "text-cyan-400",
  r: "text-blue-600",
  sql: "text-orange-400",
  tw: "text-teal-400",
  tableau: "text-blue-700",
  web: "text-blue-400",
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
      return <SiJavascript {...iconProps} />;
    case "py":
      return <SiPython {...iconProps} />;
    case "json":
      return <SiJson {...iconProps} />;
    case "html":
      return <SiHtml5 {...iconProps} />;
    case "css":
    case "scss":
      return <SiCss3 {...iconProps} />;
    case "md":
      return <SiMarkdown {...iconProps} />;
    case "r":
      return <SiR {...iconProps} />;
    case "sql":
      return <SiPostgresql {...iconProps} />;
    case "tableau":
      return <SiTableau {...iconProps} />;
    case "go":
      return <VscCode {...iconProps} />;
    case "web":
      return <LuGlobe {...iconProps} />;
    default:
      if (["md", "txt"].includes(extension)) {
        return <LuFileText {...iconProps} />;
      }
      return <LuFile {...iconProps} />;
  }
}


