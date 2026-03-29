"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LuExternalLink, LuSearch } from "react-icons/lu";

import { cn } from "../../../lib/cn";
import { filterSearchItems, getSearchItems } from "../../../lib/search";
import Input from "../Input";

const typeLabel: Record<string, string> = {
  file: "File",
  project: "Project",
  experience: "Experience",
  blog: "Blog",
  page: "Page",
};

export default function SearchPanel() {
  const [query, setQuery] = useState("");
  const baseItems = useMemo(() => getSearchItems(), []);
  const results = useMemo(
    () => filterSearchItems(baseItems, query).slice(0, 20),
    [baseItems, query]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-3 border-b border-[var(--vscode-border)]">
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--vscode-text-muted)]" size={14} />
          <Input
            placeholder="Search files, projects, blogs, experience..."
            aria-label="Search items"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {results.length === 0 ? (
          <div className="px-4 py-6 text-vscode-sm text-[var(--vscode-text-secondary)]">
            No results found.
          </div>
        ) : (
          <ul className="py-2">
            {results.map((item) => {
              const content = (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-vscode-sm text-[var(--vscode-text-primary)]">
                      {item.title}
                    </span>
                    {item.subtitle ? (
                      <span className="text-vscode-xs text-[var(--vscode-text-secondary)]">
                        {item.subtitle}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 text-vscode-xs text-[var(--vscode-text-secondary)]">
                    <span className="px-2 py-0.5 rounded border border-[var(--vscode-border)] uppercase tracking-wider">
                      {typeLabel[item.type] ?? item.type}
                    </span>
                    {item.external ? <LuExternalLink size={12} /> : null}
                  </div>
                </div>
              );

              return (
                <li key={item.id}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "block px-4 py-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
                      )}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors"
                      )}
                    >
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
