"use client";

import {
  LuBraces,
  LuFile,
  LuFileText,
  LuFileType,
} from "react-icons/lu";

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
  py: "text-green-400",
  go: "text-cyan-400",
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

  if (["tsx", "jsx", "ts", "js", "json"].includes(extension)) {
    return <LuBraces {...iconProps} />;
  }

  if (["css", "scss", "html"].includes(extension)) {
    return <LuFileType {...iconProps} />;
  }

  if (extension === "md") {
    return <LuFileText {...iconProps} />;
  }

  return <LuFile {...iconProps} />;
}
