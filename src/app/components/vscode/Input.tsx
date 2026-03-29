"use client";

import React from "react";
import { cn } from "../../lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, id, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label htmlFor={id} className="text-vscode-sm text-[var(--vscode-text-primary)]">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={cn(
          "w-full px-3 py-2 text-vscode-base bg-[var(--vscode-input-background)] text-[var(--vscode-input-foreground)]",
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
