"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuChevronRight, LuHome } from "react-icons/lu";

import { cn } from "../../lib/cn";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return (
      <div className="flex items-center gap-1 px-4 py-1 text-vscode-sm text-[var(--vscode-text-secondary)] bg-[var(--vscode-editor-background)] border-b border-[var(--vscode-border)]">
        <LuHome size={14} />
        <LuChevronRight size={14} />
        <span className="text-[var(--vscode-text-primary)]">Welcome.tsx</span>
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-1 px-4 py-1 text-vscode-sm text-[var(--vscode-text-secondary)] bg-[var(--vscode-editor-background)] border-b border-[var(--vscode-border)]">
      <Link href="/" className="hover:text-[var(--vscode-text-primary)] transition-colors">
        <LuHome size={14} />
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        return (
          <div key={href} className="flex items-center gap-1">
            <LuChevronRight size={14} />
            {isLast ? (
              <span className="text-[var(--vscode-text-primary)]">{label}.tsx</span>
            ) : (
              <Link
                href={href}
                className={cn("hover:text-[var(--vscode-text-primary)] transition-colors")}
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
