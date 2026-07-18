import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 600;
export const dynamic = 'force-dynamic';

const GH_USER = "Sajid-ul-Islam";

const FALLBACK_DATA = {
  ok: true,
  user: {
    username: GH_USER,
    name: "Sajid Islam",
    avatarUrl: `https://avatars.githubusercontent.com/${GH_USER}`,
    profileUrl: `https://github.com/${GH_USER}`,
    followers: 0,
    publicRepos: 0,
  },
  stats: {
    totalStars: 0,
    lastUpdated: new Date().toISOString(),
  },
  topRepos: [],
  recentCommits: [
    {
      repo: `${GH_USER}/Agentic-RAG`,
      message: "Agentic multi-step reasoning pipeline",
      url: `https://github.com/${GH_USER}/Agentic-RAG`,
      time: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      repo: `${GH_USER}/RAG-System`,
      message: "Enterprise RAG platform with hybrid retrieval",
      url: `https://github.com/${GH_USER}/RAG-System`,
      time: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      repo: `${GH_USER}/Portfolio-nextjs`,
      message: "VS Code themed portfolio update",
      url: `https://github.com/${GH_USER}/Portfolio-nextjs`,
      time: new Date(Date.now() - 10800000).toISOString(),
    },
    {
      repo: `${GH_USER}/Telegram-Chatbot`,
      message: "Async stateful dialog handler",
      url: `https://github.com/${GH_USER}/Telegram-Chatbot`,
      time: new Date(Date.now() - 14400000).toISOString(),
    },
  ],
};

async function fetchGitHub<T>(url: string, token?: string): Promise<T | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "Portfolio-NextJS-App",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME ?? GH_USER;
  const token = process.env.GITHUB_TOKEN;

  // Fetch events first — this is the most important part for the feed
  const events = await fetchGitHub<any[]>(
    `https://api.github.com/users/${username}/events/public?per_page=30`,
    token
  );

  if (!events || !Array.isArray(events) || events.length === 0) {
    // Events API failed or returned empty — use fallback commits
    return NextResponse.json(FALLBACK_DATA, {
      headers: { "Cache-Control": "public, s-maxage=600" },
    });
  }

  // Extract recent commits from PushEvents
  const recentCommits = events
    .filter((e: any) => e.type === "PushEvent" && e.payload?.commits?.length)
    .flatMap((e: any) =>
      e.payload.commits.map((c: any) => ({
        repo: e.repo?.name || "",
        message: (c.message || "").split("\n")[0],
        url: `https://github.com/${e.repo?.name || ""}/commit/${c.sha}`,
        time: e.created_at,
      }))
    )
    .slice(0, 6);

  // If no PushEvents found, include other event types as activity
  const otherEvents = events
    .filter((e: any) => e.type !== "PushEvent" && e.type !== "DeleteEvent")
    .slice(0, 4)
    .map((e: any) => ({
      repo: e.repo?.name || "",
      message: getEventMessage(e),
      url: `https://github.com/${e.repo?.name || ""}`,
      time: e.created_at,
    }));

  const allCommits = recentCommits.length > 0 ? recentCommits : [...otherEvents, ...FALLBACK_DATA.recentCommits].slice(0, 6);

  // Fetch user and repos in parallel (non-blocking for the feed)
  const [user, repos] = await Promise.all([
    fetchGitHub<any>(`https://api.github.com/users/${username}`, token),
    fetchGitHub<any[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, token),
  ]);

  const totalStars = repos?.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0) ?? 0;
  const topRepos = (repos || [])
    .filter((r: any) => !r.fork)
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((r: any) => ({
      name: r.name,
      url: r.html_url,
      description: r.description,
      stars: r.stargazers_count,
      language: r.language,
    }));

  return NextResponse.json({
    ok: true,
    user: {
      username: user?.login ?? username,
      name: user?.name ?? username,
      avatarUrl: user?.avatar_url ?? `https://avatars.githubusercontent.com/${username}`,
      profileUrl: user?.html_url ?? `https://github.com/${username}`,
      followers: user?.followers ?? 0,
      publicRepos: user?.public_repos ?? 0,
    },
    stats: {
      totalStars,
      lastUpdated: new Date().toISOString(),
    },
    topRepos,
    recentCommits: allCommits,
  }, {
    headers: { "Cache-Control": "public, s-maxage=600" },
  });
}

function getEventMessage(event: any): string {
  switch (event.type) {
    case "CreateEvent":
      return `Created ${event.payload?.ref_type || "repository"}`;
    case "ForkEvent":
      return "Forked repository";
    case "WatchEvent":
      return "Starred repository";
    case "PullRequestEvent":
      return `${event.payload?.action || "opened"} pull request`;
    case "IssuesEvent":
      return `${event.payload?.action || "opened"} issue`;
    case "ReleaseEvent":
      return `Released ${event.payload?.release?.tag_name || ""}`;
    default:
      return event.type?.replace("Event", "") || "Activity";
  }
}
