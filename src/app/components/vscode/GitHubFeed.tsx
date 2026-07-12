"use client";

import { useEffect, useState } from "react";
import { GitCommit, GitPullRequest, GitBranch, Github, Clock, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

type GitHubData = {
  ok: boolean;
  error?: string;
  recentCommits?: {
    repo: string;
    message: string;
    url: string;
    time: string;
  }[];
};

export default function GitHubFeed() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchGitHubData = async () => {
    try {
      const response = await fetch("/api/github");
      const payload = await response.json();
      setData(payload);
      setStatus(payload.ok ? "ready" : "error");
      setLastRefreshed(new Date());
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchGitHubData();
    // Auto-refresh every 60 seconds
    const intervalId = setInterval(fetchGitHubData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return Math.floor(seconds) + " seconds ago";
  };

  if (status === "loading" && !data) {
    return (
      <div className="glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl animate-pulse">
        <div className="h-4 bg-white/5 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-white/5 rounded w-full"></div>
          <div className="h-10 bg-white/5 rounded w-full"></div>
          <div className="h-10 bg-white/5 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (status === "error" || !data?.ok) {
    return (
      <div className="glass-panel border border-red-500/20 p-6 rounded-2xl bg-red-500/5 h-full">
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <Github size={18} />
          <h3 className="text-vscode-sm font-bold uppercase tracking-wider font-mono">GitHub Feed Error</h3>
        </div>
        <p className="text-vscode-xs text-[var(--vscode-text-secondary)]">
          {data?.error || "Unable to load GitHub activity. Please check your GITHUB_USERNAME and GITHUB_TOKEN."}
        </p>
      </div>
    );
  }

  const commits = data?.recentCommits || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[var(--vscode-accent)]/10 rounded-xl">
             <Github size={18} className="text-[var(--vscode-accent)]" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--vscode-text-primary)] font-mono">
            Live GitHub Feed
          </h3>
        </div>
        
        {lastRefreshed && (
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[var(--vscode-text-muted)]" title="Auto-refreshes every 60s">
            <RefreshCw size={10} className={status === "loading" ? "animate-spin" : ""} />
            <span>Updated {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden relative">
        {commits.length > 0 ? (
          <div className="space-y-4">
            {commits.slice(0, 4).map((commit, index) => (
              <a 
                key={index}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[var(--vscode-accent)]/30 transition-all"
              >
                <div className="mt-1 flex-shrink-0">
                  <GitCommit size={16} className="text-[var(--vscode-text-muted)] group-hover:text-[var(--vscode-accent)] transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono font-semibold text-[var(--vscode-text-primary)] truncate">
                      {commit.repo}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-mono text-[var(--vscode-text-muted)] flex-shrink-0">
                      <Clock size={10} />
                      {timeAgo(commit.time)}
                    </span>
                  </div>
                  <p className="text-vscode-xs text-[var(--vscode-text-secondary)] line-clamp-2">
                    {commit.message}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
           <div className="flex flex-col items-center justify-center py-8 text-[var(--vscode-text-secondary)] h-full">
              <GitBranch size={32} className="mb-3 opacity-20" />
              <p className="text-vscode-xs">No recent public commits found.</p>
           </div>
        )}
      </div>
    </motion.div>
  );
}
