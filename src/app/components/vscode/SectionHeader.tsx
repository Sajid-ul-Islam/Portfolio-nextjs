"use client";

import { cn } from "../../lib/cn";

type SectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeader({
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-vscode-3xl font-semibold text-[var(--vscode-text-primary)] mb-2">
        {title}
      </h1>
      {description ? (
        <p className="text-vscode-base text-[var(--vscode-text-secondary)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
