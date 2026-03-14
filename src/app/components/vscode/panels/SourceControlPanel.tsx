"use client";

import { useEffect, useState } from "react";
import { LuGitBranch, LuStar } from "react-icons/lu";

import Image from "next/image";
import Panel from "../Panel";
import Badge from "../Badge";

type GitHubData = {
  ok: boolean;
  error?: string;
  user?: {
    username: string;
    name: string;
    avatarUrl: string;
    profileUrl: string;
    followers: number;
    publicRepos: number;
  };
  stats?: {
    totalStars: number;
    lastUpdated: string;
  };
  topRepos?: {
    name: string;
    url: string;
    description?: string | null;
    stars: number;
    language?: string | null;
  }[];
  recentCommits?: {
    repo: string;
    message: string;
    url: string;
    time: string;
  }[];
};

export default function SourceControlPanel() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let isMounted = true;
    fetch("/api/github")
      .then((response) => response.json())
      .then((payload) => {
        if (!isMounted) return;
        setData(payload);
        setStatus(payload.ok ? "ready" : "error");
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus("error");
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="p-4 text-vscode-sm text-[var(--vscode-text-secondary)]">
        Loading GitHub activity...
      </div>
    );
  }

  if (status === "error" || !data?.ok || !data.user || !data.stats) {
    return (
      <div className="p-4 text-vscode-sm text-[var(--vscode-text-secondary)]">
        {data?.error
          ? `Unable to load GitHub activity: ${data.error}`
          : "Unable to load GitHub activity. Set `GITHUB_USERNAME` (and optionally `GITHUB_TOKEN`) in your environment to enable it."}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Panel>
        <div className="flex items-center gap-3">
          <Image
            src={data.user.avatarUrl}
            alt={data.user.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border border-[var(--vscode-border)]"
          />
          <div className="flex-1">
            <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)]">
              {data.user.name}
            </h3>
            <a
              href={data.user.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vscode-xs text-[var(--vscode-text-link)] hover:text-[var(--vscode-text-linkHover)]"
            >
              @{data.user.username}
            </a>
          </div>
          <Badge variant="info">
            {data.user.publicRepos} repos
          </Badge>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-vscode-xs text-[var(--vscode-text-secondary)]">
          <div className="flex items-center gap-1">
            <LuStar size={12} /> {data.stats.totalStars} stars
          </div>
          <div className="flex items-center gap-1">
            <LuGitBranch size={12} /> {data.user.followers} followers
          </div>
        </div>
        <div className="mt-2 text-vscode-xs text-[var(--vscode-text-muted)]">
          Updated {new Date(data.stats.lastUpdated).toLocaleString()}
        </div>
      </Panel>

      <Panel>
        <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] mb-2">
          Top Repositories
        </h3>
        <div className="space-y-2">
          {data.topRepos?.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 rounded border border-[var(--vscode-border)] hover:border-[var(--vscode-focusBorder)] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-vscode-sm text-[var(--vscode-text-primary)]">
                  {repo.name}
                </span>
                <span className="text-vscode-xs text-[var(--vscode-text-secondary)]">
                  ★ {repo.stars}
                </span>
              </div>
              {repo.description ? (
                <p className="text-vscode-xs text-[var(--vscode-text-secondary)]">
                  {repo.description}
                </p>
              ) : null}
              {repo.language ? (
                <span className="text-vscode-xs text-[var(--vscode-text-muted)]">
                  {repo.language}
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </Panel>

      <Panel>
        <h3 className="text-vscode-sm font-semibold text-[var(--vscode-text-primary)] mb-2">
          Recent Commits
        </h3>
        <div className="space-y-2">
          {data.recentCommits && data.recentCommits.length > 0 ? (
            data.recentCommits.map((commit, index) => (
              <a
                key={`${commit.repo}-${index}`}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 rounded border border-[var(--vscode-border)] hover:border-[var(--vscode-focusBorder)] transition-colors"
              >
                <div className="text-vscode-xs text-[var(--vscode-text-secondary)]">
                  {commit.repo}
                </div>
                <div className="text-vscode-sm text-[var(--vscode-text-primary)] line-clamp-2">
                  {commit.message}
                </div>
              </a>
            ))
          ) : (
            <div className="text-vscode-xs text-[var(--vscode-text-secondary)]">
              No recent commits found.
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
}
