"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuHome, LuBriefcase, LuFolderGit2, LuCalculator, LuMail, LuSliders } from "react-icons/lu";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LuHome },
  { href: "/Experience", label: "Experience", icon: LuBriefcase },
  { href: "/projects", label: "Projects", icon: LuFolderGit2 },
  { href: "/estimator", label: "Estimator", icon: LuCalculator, badge: "New" },
  { href: "/contact", label: "Contact", icon: LuMail },
  { href: "/settings.json", label: "Settings", icon: LuSliders },
];

export default function MobileNavBar() {
  const pathname = usePathname();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--vscode-sideBar-background)]/90 backdrop-blur-2xl border-t border-[var(--vscode-border)] px-2 py-1.5 flex items-center justify-around shadow-[0_-8px_25px_rgba(0,0,0,0.5)]"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = 
          item.href === "/" 
            ? pathname === "/" 
            : pathname?.toLowerCase().startsWith(item.href.toLowerCase());

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all relative group",
              isActive 
                ? "text-[var(--vscode-accent)] font-semibold" 
                : "text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] active:scale-95"
            )}
          >
            {/* Active Pill Indicator */}
            {isActive && (
              <span className="absolute -top-1.5 w-6 h-1 rounded-full bg-[var(--vscode-accent)] shadow-sm shadow-[var(--vscode-accent)] animate-in fade-in zoom-in-75 duration-300" />
            )}

            <div className="relative p-1">
              <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
              {item.badge && (
                <span className="absolute -top-0.5 -right-2 px-1 py-0.2 bg-[var(--vscode-accent)] text-black text-[8px] font-bold rounded-full animate-pulse uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </div>

            <span className="text-[10px] tracking-tight font-medium mt-0.5">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
