import { ReactNode } from "react";
import { cn } from "../../lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
};

export default function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors",
        "border border-[var(--vscode-border)]",
        variant === "default" && "bg-[var(--vscode-badge-background)] text-[var(--vscode-badge-foreground)]",
        variant === "success" && "bg-green-500/10 text-green-500 border-green-500/20",
        variant === "warning" && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        variant === "error" && "bg-red-500/10 text-red-500 border-red-500/20",
        variant === "info" && "bg-blue-500/10 text-blue-400 border-blue-500/20",
        className
      )}
    >
      {children}
    </span>
  );
}
