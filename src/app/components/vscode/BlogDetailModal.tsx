"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  LuX, 
  LuCalendar, 
  LuTag, 
  LuHeart, 
  LuShare2, 
  LuFacebook, 
  LuTwitter, 
  LuLinkedin, 
  LuMessageCircle,
  LuExternalLink,
  LuCopy,
  LuCheck
} from "react-icons/lu";
import { cn } from "../../lib/cn";
import { BlogPost } from "../../data/portfolio";
import Badge from "./Badge";

type BlogDetailModalProps = {
  post: BlogPost;
  onClose: () => void;
};

export default function BlogDetailModal({ post, onClose }: BlogDetailModalProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 100) + 50);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : "";
  const shareText = `Check out this tactical insight: ${post.title}`;

  const shareLinks = [
    { name: "Facebook", icon: <LuFacebook size={16} />, url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { name: "X", icon: <LuTwitter size={16} />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}` },
    { name: "LinkedIn", icon: <LuLinkedin size={16} />, url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
    { name: "WhatsApp", icon: <LuMessageCircle size={16} />, url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}` },
  ];

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#051410] border border-[#a3e635]/20 rounded-xl shadow-[0_0_100px_rgba(163,230,53,0.1)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Ribbon */}
        <div className="bg-[#0a1a15] border-b border-[#a3e635]/10 p-3 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"></div>
            <h2 className="text-[9px] font-black text-[#a3e635]/50 uppercase tracking-[0.4em] leading-none">INTEL_ARCHIVE // SIGNAL_STABILIZED</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-[#a3e635]/10 text-gray-500 hover:text-[#a3e635] rounded-full transition-all"
          >
            <LuX size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scroll p-6 sm:px-12 sm:py-16 font-mono">
          <header className="mb-12">
            <h1 className={cn(
                "text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter glow-text mb-6 leading-[0.9]",
                post.title.match(/[\u0980-\u09FF]/) && "font-[var(--font-tiro-bangla),serif] tracking-normal capitalize leading-tight"
            )}>
                {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black border-t border-white/5 pt-6">
                <div className="flex items-center gap-2">
                    <LuCalendar size={12} className="text-[#a3e635]" />
                    <span>TIMESTAMP: {post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <LuTag size={12} className="text-[#a3e635]" />
                    <div className="flex gap-2">
                        {post.tags?.map(t => <span key={t} className="text-[#a3e635]/60 hover:text-[#a3e635] transition-colors cursor-pointer">#{t}</span>)}
                    </div>
                </div>
            </div>
          </header>

          {post.image && (
            <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden border border-[#a3e635]/10 group/img shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051410] via-transparent to-transparent"></div>
            </div>
          )}

          <div className="space-y-12">
            {/* Markdown-style content rendering */}
            <div className={cn(
                "leading-relaxed transition-all duration-300 prose-invert max-w-none",
                post.content?.match(/[\u0980-\u09FF]/) ? "font-[var(--font-tiro-bangla),serif] text-lg sm:text-xl text-gray-200" : "font-mono text-sm sm:text-base text-gray-400"
            )}>
                {post.content ? (
                    <div className="whitespace-pre-line">
                        {post.content.split('###').map((section, idx) => {
                            if (idx === 0) {
                                // Filter out the support link from the introduction if it exists there
                                const cleanContent = section.replace(/\[SUPPORT_UPLINK\]: .*/g, '').trim();
                                if (!cleanContent) return null;
                                return <p key={idx} className="mb-6">{cleanContent}</p>;
                            }
                            
                            const lines = section.split('\n');
                            const title = lines[0].trim();
                            const rest = lines.slice(1).join('\n').replace(/\[SUPPORT_UPLINK\]: .*/g, '').trim();
                            
                            return (
                                <div key={idx} className="mt-12 group/section">
                                    <h4 className="text-[#a3e635] font-black uppercase tracking-[0.3em] mb-6 border-l-4 border-[#a3e635] pl-6 text-xs sm:text-sm group-hover:pl-8 transition-all duration-300">{title}</h4>
                                    <div className="text-gray-400 pl-7">{rest}</div>
                                </div>
                            );
                        })}

                        {/* Detect and render Support Uplink as a button */}
                        {post.content.includes('[SUPPORT_UPLINK]:') && (
                            <div className="mt-16 p-8 bg-[#a3e635]/5 border border-[#a3e635]/10 rounded-2xl flex flex-col items-center gap-8 text-center animate-in slide-in-from-bottom-8 duration-1000">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-[10px] font-black text-[#a3e635]/40 uppercase tracking-[0.5em]">DEEP_RESEARCH_COORDINATES</span>
                                    <h3 className="text-xl text-white font-bold uppercase tracking-tight">Intelligence Correlation: GDP_DEBT_SECURE</h3>
                                </div>
                                <a 
                                    href={post.content.match(/\[SUPPORT_UPLINK\]: (.*)/)?.[1]?.trim()} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-12 py-4 bg-[#a3e635] text-black font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_40px_rgba(163,230,53,0.4)] rounded-sm"
                                >
                                    ESTABLISH_RESEARCH_UPLINK
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-xl sm:text-2xl text-gray-400 italic border-l-4 border-[#a3e635]/20 pl-8 py-4">{post.excerpt}</p>
                )}
            </div>

            {/* Interaction Bar - MOVED TO BOTTOM */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8 group/interaction">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleLike}
                        className={cn(
                            "flex items-center gap-3 px-6 py-3 rounded-sm border transition-all text-[11px] font-black uppercase tracking-widest",
                            liked ? "bg-[#a3e635] text-black border-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.3)]" : "border-white/10 text-gray-500 hover:border-[#a3e635] hover:text-[#a3e635]"
                        )}
                    >
                        <LuHeart size={16} fill={liked ? "currentColor" : "none"} className={liked ? "animate-pulse" : ""} />
                        <span>{likesCount} // RATIFIED_INTEL</span>
                    </button>
                    <div className="hidden sm:block text-[9px] text-gray-600 font-black uppercase tracking-widest">TRANSMIT_DATA_TO_NODES &gt;&gt;</div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={copyLink}
                        className="p-3 bg-white/5 hover:bg-[#a3e635]/20 text-gray-500 hover:text-[#a3e635] rounded-sm border border-white/5 transition-all outline-none"
                        title="Copy Coordinate"
                    >
                        {copied ? <LuCheck size={18} className="text-[#a3e635]" /> : <LuCopy size={18} />}
                    </button>
                    {shareLinks.map(link => (
                        <a 
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Broadcast on ${link.name}`}
                            className="p-3 bg-white/5 hover:bg-[#a3e635]/20 text-gray-500 hover:text-[#a3e635] rounded-sm border border-white/5 transition-all"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="text-[9px] text-gray-500 font-black uppercase tracking-[0.4em]">SIGNAL_END // ARCHIVE_VERIFIED_DATA_INTEGRITY</div>
                {post.url && post.url !== "#" ? (
                    <a 
                        href={post.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#a3e635] hover:text-white text-[10px] font-black transition-colors uppercase tracking-widest"
                    >
                        <LuExternalLink size={14} />
                        ORIGINAL_SOURCE_UPLINK
                    </a>
                ) : (
                    <div className="flex items-center gap-2 text-[#a3e635]/60 text-[10px] font-black uppercase tracking-widest">
                        <LuCheck size={14} />
                        FULL_SECURE_INTERNAL_INTELLIGENCE
                    </div>
                )}
            </div>
          </div>
        </div>


        {/* Bottom HUD elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#a3e635] shadow-[0_0_20px_#a3e635] opacity-[0.05] pointer-events-none"></div>
        <div className="absolute top-1/2 right-1 w-[1px] h-32 bg-[#a3e635]/10 pointer-events-none"></div>
      </div>
    </div>
  );
}
