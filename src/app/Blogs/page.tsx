import Image from "next/image";
import { LuCalendar, LuExternalLink } from "react-icons/lu";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { blogPosts } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Blogs",
  description:
    "Technical articles and blog posts written by Raj Savaliya on software development, AI, and technology.",
  alternates: { canonical: "/Blogs" },
};

export default function BlogsPage() {
  return (
    <>
      <SectionHeader
        title="Blogs"
        description="Useful Articles and thoughts on software development, AI, and technology."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className={cn(
              "group flex flex-col overflow-hidden",
              "bg-[var(--vscode-sideBar-background)]",
              "border border-[var(--vscode-border)]",
              "rounded-[var(--vscode-border-radius-md)]",
              "hover:border-[var(--vscode-focusBorder)]",
              "transition-all duration-200"
            )}
          >
            {post.image ? (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video overflow-hidden"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            ) : null}
            <div className="flex flex-col flex-1 p-4">
              <div className="flex items-center gap-2 text-vscode-xs text-[var(--vscode-text-secondary)] mb-2">
                <LuCalendar size={12} />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <h2 className="text-vscode-lg font-semibold text-[var(--vscode-text-primary)] hover:text-[var(--vscode-text-link)] transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </a>
              <p className="mt-2 text-vscode-sm text-[var(--vscode-text-secondary)] line-clamp-2">
                {post.excerpt}
              </p>
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              ) : null}
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 pt-3 border-t border-[var(--vscode-border)] text-vscode-sm text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)] transition-colors"
              >
                <LuExternalLink size={14} />
                Read Article
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
