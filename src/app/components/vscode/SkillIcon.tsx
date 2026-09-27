"use client";

import React from "react";
import {
  SiPython,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiPowerbi,
  SiTableau,
  SiGoogleanalytics,
  SiPostgresql,
  SiMysql,
  SiGooglecloud,
  SiR,
  SiMicrosoftexcel,
  SiGit,
  SiGithub,
  SiTelegram,
  SiWhatsapp,
  SiDocker,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiStreamlit,
  SiOpenai,
  SiPytorch,
  SiTensorflow,
} from "react-icons/si";
import {
  LuBot,
  LuBrain,
  LuCpu,
  LuDatabase,
  LuFileSpreadsheet,
  LuLayers,
  LuNetwork,
  LuSparkles,
  LuTarget,
  LuTrendingUp,
  LuUsers,
  LuWorkflow,
  LuCode2,
  LuLineChart,
} from "react-icons/lu";
import { cn } from "@/lib/cn";

type SkillIconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function SkillIcon({ name, size = 18, className }: SkillIconProps) {
  const n = name.toLowerCase();

  // Python & Data Science
  if (n.includes("python")) {
    return <SiPython size={size} className={cn("text-[#3776AB]", className)} />;
  }
  if (n.includes("pandas")) {
    return <SiPandas size={size} className={cn("text-[#150458] dark:text-[#E70488]", className)} />;
  }
  if (n.includes("numpy")) {
    return <SiNumpy size={size} className={cn("text-[#013243] dark:text-[#4DABCF]", className)} />;
  }
  if (n.includes("scikit") || n.includes("sklearn")) {
    return <SiScikitlearn size={size} className={cn("text-[#F7931E]", className)} />;
  }
  if (n.includes("pytorch")) {
    return <SiPytorch size={size} className={cn("text-[#EE4C2C]", className)} />;
  }
  if (n.includes("tensorflow")) {
    return <SiTensorflow size={size} className={cn("text-[#FF6F00]", className)} />;
  }

  // BI & Visualization
  if (n.includes("power bi") || n.includes("powerbi")) {
    return <SiPowerbi size={size} className={cn("text-[#F2C811]", className)} />;
  }
  if (n.includes("tableau")) {
    return <SiTableau size={size} className={cn("text-[#E97627]", className)} />;
  }
  if (n.includes("google analytics") || n.includes("analytics")) {
    if (n.includes("r,")) {
      return <SiR size={size} className={cn("text-[#276DC3]", className)} />;
    }
    return <SiGoogleanalytics size={size} className={cn("text-[#E37400]", className)} />;
  }
  if (n.includes("excel")) {
    return <SiMicrosoftexcel size={size} className={cn("text-[#107C41]", className)} />;
  }

  // Databases & SQL
  if (n.includes("sql") || n.includes("postgres") || n.includes("mysql") || n.includes("bigquery")) {
    if (n.includes("postgres")) {
      return <SiPostgresql size={size} className={cn("text-[#4169E1]", className)} />;
    }
    if (n.includes("mysql")) {
      return <SiMysql size={size} className={cn("text-[#4479A1]", className)} />;
    }
    if (n.includes("bigquery")) {
      return <SiGooglecloud size={size} className={cn("text-[#4285F4]", className)} />;
    }
    return <LuDatabase size={size} className={cn("text-[#38BDF8]", className)} />;
  }

  // AI & Chatbots
  if (n.includes("agentic rag") || n.includes("rag")) {
    return <LuBrain size={size} className={cn("text-[#A855F7]", className)} />;
  }
  if (n.includes("telegram")) {
    return <SiTelegram size={size} className={cn("text-[#26A5E4]", className)} />;
  }
  if (n.includes("whatsapp")) {
    return <SiWhatsapp size={size} className={cn("text-[#25D366]", className)} />;
  }
  if (n.includes("chatbot") || n.includes("bot")) {
    return <LuBot size={size} className={cn("text-[#38BDF8]", className)} />;
  }
  if (n.includes("hugging")) {
    return <span style={{ fontSize: `${size}px`, lineHeight: 1 }} className={cn("inline-flex items-center justify-center", className)}>🤗</span>;
  }

  // Engineering & Core
  if (n.includes("git") || n.includes("github")) {
    return <SiGit size={size} className={cn("text-[#F05032]", className)} />;
  }
  if (n.includes("docker")) {
    return <SiDocker size={size} className={cn("text-[#2496ED]", className)} />;
  }
  if (n.includes("streamlit")) {
    return <SiStreamlit size={size} className={cn("text-[#FF4B4B]", className)} />;
  }
  if (n.includes("next")) {
    return <SiNextdotjs size={size} className={cn("text-white", className)} />;
  }
  if (n.includes("react")) {
    return <SiReact size={size} className={cn("text-[#61DAFB]", className)} />;
  }
  if (n.includes("tailwind")) {
    return <SiTailwindcss size={size} className={cn("text-[#06B6D4]", className)} />;
  }

  // Strategy & Operations
  if (n.includes("strategy") || n.includes("planning")) {
    return <LuTarget size={size} className={cn("text-[#F59E0B]", className)} />;
  }
  if (n.includes("pipeline") || n.includes("workflow")) {
    return <LuWorkflow size={size} className={cn("text-[#10B981]", className)} />;
  }
  if (n.includes("decision") || n.includes("marketplace")) {
    return <LuTrendingUp size={size} className={cn("text-[#EC4899]", className)} />;
  }
  if (n.includes("team") || n.includes("stakeholder")) {
    return <LuUsers size={size} className={cn("text-[#6366F1]", className)} />;
  }
  if (n.includes("ux") || n.includes("design")) {
    return <LuLayers size={size} className={cn("text-[#8B5CF6]", className)} />;
  }

  // Fallback
  return <LuSparkles size={size} className={cn("text-[var(--vscode-accent)]", className)} />;
}
