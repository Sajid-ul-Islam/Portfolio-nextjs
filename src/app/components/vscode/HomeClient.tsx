"use client";

import Link from "next/link";
import {
  LuCode,
  LuExternalLink,
  LuFolder,
  LuHash,
  LuMessageSquare,
} from "react-icons/lu";

import SocialLinks from "./SocialLinks";
import { useRecentPagesContext } from "../../lib/recentPagesContext";

type StartLinkProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function StartLink({ href, icon, children }: StartLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
    >
      {icon}
      <span>{children}</span>
      <LuExternalLink
        size={14}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </Link>
  );
}

export default function HomeClient() {
  const { recentPages } = useRecentPagesContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <h1 className="text-4xl font-semibold text-[var(--vscode-text-primary)] mb-2">
          Sajid Islam
        </h1>
        <h2 className="text-xl text-[var(--vscode-text-secondary)] mb-8">
          Business & Data Analyst
        </h2>
        <section className="mb-8">
          <h3 className="text-lg text-[var(--vscode-text-primary)] mb-4">
            Start
          </h3>
          <div className="space-y-2">
            <StartLink href="/Skills" icon={<LuCode size={18} />}>
              Skills...
            </StartLink>
            <StartLink href="/projects" icon={<LuFolder size={18} />}>
              Projects...
            </StartLink>
            <StartLink href="/Favorites" icon={<LuHash size={18} />}>
              Favorites...
            </StartLink>
            <StartLink href="/contact" icon={<LuMessageSquare size={18} />}>
              Get in Touch...
            </StartLink>
          </div>
        </section>
        <section>
          <h3 className="text-lg text-[var(--vscode-text-primary)] mb-4">
            Recent
          </h3>
          {recentPages.length === 0 ? (
            <p className="text-vscode-sm text-[var(--vscode-text-secondary)]">
              No recent activity
            </p>
          ) : (
            <div className="space-y-2">
              {recentPages.map((path) => (
                <Link
                  key={path}
                  href={path}
                  className="flex items-center gap-2 text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
                >
                  <span>{path.slice(1)}</span>
                  <span className="text-[var(--vscode-text-secondary)]">
                    ~/portfolio{path}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
      <div className="lg:pt-16">
        <h3 className="text-lg text-[var(--vscode-text-primary)] mb-4">
          Connect
        </h3>
        <SocialLinks />
      </div>
    </div>
  );
}
