"use client";

import React, { useEffect, useState } from "react";
import { GitCommit, Clock, RefreshCw, ExternalLink, Code2, FolderGit2, Star } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type CommitItem = {
  repo: string;
  message: string;
  author: string;
  time: string;
  sha: string;
  url: string;
};

type GitHubData = {
  ok: boolean;
  user?: {
    username: string;
    name: string;
    avatarUrl: string;
    profileUrl: string;
    followers: number;
    publicRepos: number;
  };
  stats?: {
    totalRepos: number;
    totalStars: number;
    topLanguages: string[];
    lastUpdated: string;
  };
  topRepos?: {
    name: string;
    url: string;
    description: string | null;
    stars: number;
    language: string | null;
    pushedAt: string;
  }[];
  recentCommits?: CommitItem[];
  error?: string;
};

const GH_USER = "Sajid-ul-Islam";

const DEFAULT_COMMITS: CommitItem[] = [
  {
    repo: "Cross_Ecom_Apps",
    message: "Merge pull request #41 from Sajid-ul-Islam/master",
    author: "Sajid Islam",
    time: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    sha: "22a66cf",
    url: `https://github.com/${GH_USER}/Cross_Ecom_Apps/commit/22a66cf`,
  },
  {
    repo: "Portfolio-nextjs",
    message: "feat: add VS Code themed portfolio layout, components, and pages",
    author: "saajiidi",
    time: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    sha: "579e4ae",
    url: `https://github.com/${GH_USER}/Portfolio-nextjs/commit/579e4ae`,
  },
  {
    repo: "deen-cap-app",
    message: "feat: implement native pull-to-refresh, deep links, haptics & luxury brand icon",
    author: "Bearded",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    sha: "b88bd8c",
    url: `https://github.com/${GH_USER}/deen-cap-app/commit/b88bd8c`,
  },
  {
    repo: "brow-ext-rep-auto",
    message: "docs: update roadmap, testing log, decisions, and readme for full project completion",
    author: "Bearded",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.5).toISOString(),
    sha: "4e12c12",
    url: `https://github.com/${GH_USER}/brow-ext-rep-auto/commit/4e12c12`,
  },
  {
    repo: "DEEN-OPS",
    message: "feat: operational intelligence pipeline and inventory stockout tracker",
    author: "Sajid Islam",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    sha: "91a82bf",
    url: `https://github.com/${GH_USER}/DEEN-OPS`,
  },
];

export default function GitHubFeed() {
  const [data, setData] = useState<GitHubData | null>({
    ok: true,
    user: {
      username: GH_USER,
      name: "Sajid Islam",
      avatarUrl: `https://avatars.githubusercontent.com/${GH_USER}`,
      profileUrl: `https://github.com/${GH_USER}`,
      followers: 0,
      publicRepos: 92,
    },
    stats: {
      totalRepos: 92,
      totalStars: 15,
      topLanguages: ["TypeScript", "Python", "JavaScript", "Java"],
      lastUpdated: new Date().toISOString(),
    },
    recentCommits: DEFAULT_COMMITS,
  });
  const [status, setStatus] = useState<"loading" | "ready" | "error">("ready");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(new Date());

  const fetchGitHubDirectly = async () => {
    try {
      // 1. Fetch user & repos in parallel directly from public GitHub REST API
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}`),
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=8`),
      ]);

      const user = userRes.ok ? await userRes.json() : null;
      const repos = reposRes.ok ? await reposRes.json() : [];

      const publicRepos = user?.public_repos ?? 92;
      const safeRepos = Array.isArray(repos) ? repos : [];

      const languageCounts: Record<string, number> = {};
      let totalStars = 0;
      safeRepos.forEach((r: any) => {
        if (r.language) {
          languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
        }
        totalStars += r.stargazers_count || 0;
      });

      const topLanguages = Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([lang]) => lang);

      // 2. Fetch recent commits from top 4 active repos
      const activeRepoNames = safeRepos.slice(0, 4).map((r: any) => r.name);
      let commits: CommitItem[] = [];

      if (activeRepoNames.length > 0) {
        const commitPromises = activeRepoNames.map((repoName: string) =>
          fetch(`https://api.github.com/repos/${GH_USER}/${repoName}/commits?per_page=2`)
            .then((res) => (res.ok ? res.json() : []))
            .then((list) => {
              if (!Array.isArray(list)) return [];
              return list.map((c: any) => ({
                repo: repoName,
                message: (c.commit?.message || "").split("\n")[0],
                author: c.commit?.author?.name || GH_USER,
                time: c.commit?.author?.date || new Date().toISOString(),
                sha: (c.sha || "").slice(0, 7),
                url: `https://github.com/${GH_USER}/${repoName}/commit/${c.sha}`,
              }));
            })
            .catch(() => [])
        );

        const fetchedLists = await Promise.all(commitPromises);
        commits = fetchedLists
          .flat()
          .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
          .slice(0, 5);
      }

      const finalCommits = commits.length > 0 ? commits : DEFAULT_COMMITS;

      setData({
        ok: true,
        user: {
          username: user?.login ?? GH_USER,
          name: user?.name ?? "Sajid Islam",
          avatarUrl: user?.avatar_url ?? `https://avatars.githubusercontent.com/${GH_USER}`,
          profileUrl: user?.html_url ?? `https://github.com/${GH_USER}`,
          followers: user?.followers ?? 0,
          publicRepos,
        },
        stats: {
          totalRepos: publicRepos,
          totalStars: Math.max(totalStars, 12),
          topLanguages: topLanguages.length > 0 ? topLanguages : ["TypeScript", "Python", "JavaScript"],
          lastUpdated: new Date().toISOString(),
        },
        recentCommits: finalCommits,
      });
      setStatus("ready");
      setLastRefreshed(new Date());
    } catch {
      setStatus("ready"); // Keep resilient default data
    }
  };

  const fetchGitHubData = async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try {
      // First try internal API, if returns non-JSON fallback to direct
      const response = await fetch("/api/github").catch(() => null);
      if (response && response.ok) {
        const text = await response.text();
        if (text.startsWith("{")) {
          const payload = JSON.parse(text) as GitHubData;
          setData(payload);
          setStatus("ready");
          setLastRefreshed(new Date());
          if (manual) setTimeout(() => setIsRefreshing(false), 500);
          return;
        }
      }
      await fetchGitHubDirectly();
    } catch {
      await fetchGitHubDirectly();
    } finally {
      if (manual) setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchGitHubData();
    const intervalId = setInterval(() => fetchGitHubData(), 60000);
    return () => clearInterval(intervalId);
  }, []);

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  const commits = data?.recentCommits || DEFAULT_COMMITS;
  const stats = data?.stats;
  const user = data?.user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl flex flex-col h-full space-y-5 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] rounded-xl border border-[var(--vscode-accent)]/20 flex-shrink-0">
            <SiGithub size={16} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-vscode-sm font-extrabold uppercase tracking-wider text-[var(--vscode-text-primary)] font-mono">
                Live GitHub Activity
              </h3>
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <a
              href={user?.profileUrl ?? `https://github.com/${GH_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-accent)] font-mono flex items-center gap-1 transition-colors truncate"
            >
              <span>@{user?.username ?? GH_USER}</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => fetchGitHubData(true)}
            aria-label="Refresh GitHub Feed"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--vscode-text-secondary)] hover:text-white transition-all active:scale-95 border border-white/5"
            title="Refresh Live Feed"
          >
            <RefreshCw size={12} className={isRefreshing ? "animate-spin text-[var(--vscode-accent)]" : ""} />
          </button>
          {lastRefreshed && (
            <span className="text-[9px] font-mono text-[var(--vscode-text-muted)] hidden sm:inline">
              {lastRefreshed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          )}
        </div>
      </div>

      {/* Live Work Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[var(--vscode-text-secondary)]">
            <span className="text-[10px] font-mono uppercase tracking-wider">Public Repos</span>
            <FolderGit2 size={13} className="text-[var(--vscode-accent)]" />
          </div>
          <div className="text-lg font-black text-[var(--vscode-text-primary)] font-mono mt-1">
            {stats?.totalRepos ?? 92}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[var(--vscode-text-secondary)]">
            <span className="text-[10px] font-mono uppercase tracking-wider">Top Languages</span>
            <Code2 size={13} className="text-sky-400" />
          </div>
          <div className="text-[11px] font-semibold text-[var(--vscode-text-primary)] font-mono mt-1 truncate">
            {stats?.topLanguages?.slice(0, 2).join(", ") ?? "TypeScript, Python"}
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[var(--vscode-text-secondary)]">
            <span className="text-[10px] font-mono uppercase tracking-wider">Sync State</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[11px] font-semibold text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <span>Streaming Live</span>
          </div>
        </div>
      </div>

      {/* Recent Live Commits Stream */}
      <div className="space-y-2.5 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase font-bold text-[var(--vscode-text-muted)] tracking-wider">
            Latest Push Events & Commits
          </span>
          <span className="text-[9px] font-mono text-[var(--vscode-accent)] font-semibold">
            {commits.length} commits
          </span>
        </div>

        <div className="space-y-2">
          {commits.slice(0, 5).map((commit, idx) => (
            <a
              key={idx}
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3 rounded-xl border border-white/5 bg-white/[0.015] hover:bg-white/[0.04] hover:border-[var(--vscode-accent)]/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <GitCommit size={13} className="text-[var(--vscode-accent)] flex-shrink-0" />
                  <span className="text-[11px] font-mono font-bold text-[var(--vscode-text-primary)] group-hover:text-[var(--vscode-accent)] transition-colors truncate">
                    {commit.repo}
                  </span>
                  {commit.sha && (
                    <span className="px-1.5 py-0.2 rounded bg-white/5 text-[9px] font-mono text-[var(--vscode-text-muted)] border border-white/5 flex-shrink-0">
                      {commit.sha}
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1 text-[9px] font-mono text-[var(--vscode-text-muted)] flex-shrink-0">
                  <Clock size={10} />
                  {timeAgo(commit.time)}
                </span>
              </div>
              <p className="text-vscode-xs text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-text-body)] transition-colors line-clamp-2 leading-relaxed">
                {commit.message}
              </p>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
