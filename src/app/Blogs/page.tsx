"use client";

import { useState } from "react";
import Image from "next/image";
import { LuCalendar, LuExternalLink, LuMaximize2 } from "react-icons/lu";

import Badge from "../components/vscode/Badge";
import SectionHeader from "../components/vscode/SectionHeader";
import { blogPosts, BlogPost } from "../data/portfolio";
import { cn } from "../lib/cn";
import BlogDetailModal from "../components/vscode/BlogDetailModal";

export default function BlogsPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <>
      <SectionHeader
        title="Blogs"
        description="Useful Articles and thoughts on software development, AI, and technology. Centralized intelligence archive."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={cn(
                "group flex flex-col overflow-hidden cursor-pointer",
                "bg-[#0a1a15]/40 backdrop-blur-sm",
                "border border-[#a3e635]/10",
                "rounded-xl",
                "hover:border-[#a3e635]/40 hover:shadow-[0_0_20px_rgba(163,230,53,0.05)]",
                "transition-all duration-300"
            )}
          >
            {post.image ? (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            ) : (
                <div className="relative aspect-video bg-[#051410] flex items-center justify-center overflow-hidden">
                    <LuFileText size={40} className="text-[#a3e635]/20 group-hover:text-[#a3e635]/40 transition-all duration-700" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-[#a3e635]/30 group-hover:bg-[#a3e635] animate-scan-line"></div>
                </div>
            )}
            <div className="flex flex-col flex-1 p-5 relative">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#a3e635]/50 mb-3 uppercase tracking-widest">
                <LuCalendar size={12} className="text-[#a3e635]" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              
              <h2 className={cn(
                  "text-sm font-black text-white hover:text-[#a3e635] transition-colors line-clamp-2 uppercase tracking-tight mb-2",
                  post.title.match(/[\u0980-\u09FF]/) && "font-[var(--font-tiro-bangla),serif] tracking-normal capitalize"
                )}>
                {post.title}
              </h2>
              
              <p className="mt-2 text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} className="text-[9px] uppercase tracking-tighter">#{tag}</Badge>
                  ))}
                </div>
              ) : null}
              
              <div className="inline-flex items-center gap-1.5 mt-6 pt-4 border-t border-white/5 text-[10px] font-black text-[#a3e635] hover:tracking-[0.1em] transition-all uppercase tracking-widest">
                <LuMaximize2 size={12} />
                Expand Intel dossier
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedPost && (
          <BlogDetailModal 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)} 
          />
      )}
    </>
  );
}

import { LuFileText } from "react-icons/lu";
