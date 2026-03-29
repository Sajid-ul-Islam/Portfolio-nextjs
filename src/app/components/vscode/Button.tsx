"use client";

import React from "react";
import { cn } from "../../lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

export default function Button({
  variant = "primary",
  size = "md",
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-normal rounded transition-colors",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--vscode-focusBorder)]",
    "disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" &&
      "bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] hover:bg-[var(--vscode-button-hoverBackground)]",
    variant === "secondary" &&
      "bg-[var(--vscode-button-secondaryBackground)] text-[var(--vscode-button-secondaryForeground)] hover:bg-[var(--vscode-button-secondaryHoverBackground)]",
    variant === "ghost" &&
      "bg-transparent hover:bg-[var(--vscode-list-hoverBackground)]",
    variant === "link" &&
      "bg-transparent text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] hover:underline",
    size === "sm" && "h-7 px-2 text-vscode-xs",
    size === "md" && "h-8 px-4 text-vscode-sm",
    size === "lg" && "h-10 px-6 text-vscode-base",
    className
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
