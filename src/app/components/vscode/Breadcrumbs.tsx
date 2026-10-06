"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VscChevronRight, VscFolder } from "react-icons/vsc";

import { fileTree } from "../../data/portfolio";
import FileIcon from "./FileIcon";
import { soundFx } from "@/app/lib/soundFx";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const getExtension = (path: string) => {
    if (path === "/" || path === "") return "tsx";
    for (const section of fileTree) {
      const item = section.items.find(i => i.href.toLowerCase() === path.toLowerCase());
      if (item) return item.extension;
    }
    return "tsx";
  };

  if (segments.length === 0) {
    return (
      <div className="flex items-center gap-1.5 h-[22px] px-4 text-[11px] font-sans text-[var(--vscode-text-secondary)] bg-[var(--vscode-editor-background)] border-b border-[var(--vscode-border)] select-none">
        <span className="flex items-center gap-1 hover:text-white cursor-pointer" onClick={() => soundFx.playClick()}>
          <VscFolder size={13} className="text-[#007acc]" />
          <span>portfolio-nextjs</span>
        </span>
        <VscChevronRight size={11} className="opacity-50" />
        <span className="flex items-center gap-1 text-[var(--vscode-text-primary)]">
          <FileIcon filename="page.tsx" size={13} />
          <span>Welcome.tsx</span>
        </span>
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-1 h-[22px] px-4 text-[11px] font-sans text-[var(--vscode-text-secondary)] bg-[var(--vscode-editor-background)] border-b border-[var(--vscode-border)] overflow-x-auto whitespace-nowrap no-scrollbar select-none">
      <Link
        href="/"
        onClick={() => soundFx.playClick()}
        className="flex items-center gap-1 hover:text-white hover:bg-white/5 px-1 py-0.5 rounded transition-colors"
      >
        <VscFolder size={13} className="text-[#007acc]" />
        <span>portfolio-nextjs</span>
      </Link>
      <VscChevronRight size={11} className="opacity-50" />
      <span className="flex items-center gap-1 text-gray-400">
        <VscFolder size={13} className="text-[#dcb67a]" />
        <span>src</span>
      </span>
      <VscChevronRight size={11} className="opacity-50" />
      <span className="flex items-center gap-1 text-gray-400">
        <VscFolder size={13} className="text-[#dcb67a]" />
        <span>app</span>
      </span>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        const ext = getExtension(href);
        const filename = `${label}.${ext}`;

        return (
          <div key={href} className="flex items-center gap-1">
            <VscChevronRight size={11} className="opacity-50" />
            {isLast ? (
              <span className="flex items-center gap-1 text-[var(--vscode-text-primary)] font-medium">
                <FileIcon filename={filename} size={13} />
                <span>{filename}</span>
              </span>
            ) : (
              <Link
                href={href}
                onClick={() => soundFx.playClick()}
                className="hover:text-white hover:bg-white/5 px-1 py-0.5 rounded transition-colors"
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
