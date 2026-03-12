"use client";

import React from "react";
import { cn } from "../../lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export default function Textarea({
  label,
  error,
  id,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label htmlFor={id} className="text-vscode-sm text-[var(--vscode-text-primary)]">
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        className={cn(
          "w-full px-3 py-2 text-vscode-base min-h-[120px] resize-y",
          "bg-[var(--vscode-input-background)] text-[var(--vscode-input-foreground)]",
          "border border-[var(--vscode-input-border)] rounded-[var(--vscode-border-radius-sm)]",
          "placeholder:text-[var(--vscode-input-placeholderForeground)]",
          "focus:outline-none focus:border-[var(--vscode-focusBorder)] transition-colors",
          error && "border-[var(--vscode-error)]",
          className
        )}
        {...props}
      />
      {error ? (
        <span className="text-vscode-xs text-[var(--vscode-error)]">{error}</span>
      ) : null}
    </div>
  );
}
