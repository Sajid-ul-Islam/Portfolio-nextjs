import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 3600;

type GithubUserResponse = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
};

type GithubRepoResponse = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
};

type GithubEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: { message: string; url: string }[] };
};

async function fetchGitHub<T>(url: string, token?: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    headers,
    next: { revalidate },
  });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as T;
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME ?? "saajiidi";
  const token = process.env.GITHUB_TOKEN;

  const [user, repos, events] = await Promise.all([
    fetchGitHub<GithubUserResponse>(`https://api.github.com/users/${username}`, token),
    fetchGitHub<GithubRepoResponse[]>(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      token
    ),
    fetchGitHub<GithubEvent[]>(
      `https://api.github.com/users/${username}/events/public?per_page=20`,
      token
    ),
  ]);

  if (!user || !repos) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to load GitHub data. Configure GITHUB_USERNAME or API token.",
      },
      { status: 200 }
    );
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const topRepos = [...repos]
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
    }));

  const recentCommits =
    events
      ?.filter((event) => event.type === "PushEvent")
      .flatMap((event) =>
        (event.payload?.commits ?? []).map((commit) => ({
          repo: event.repo.name,
          message: commit.message,
          url: commit.url.replace("api.github.com/repos", "github.com").replace("/commits/", "/commit/"),
          time: event.created_at,
        }))
      )
      .slice(0, 6) ?? [];

  return NextResponse.json({
    ok: true,
    user: {
      username: user.login,
      name: user.name ?? user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      followers: user.followers,
      publicRepos: user.public_repos,
    },
    stats: {
      totalStars,
      lastUpdated: new Date().toISOString(),
    },
    topRepos,
    recentCommits,
  });
}
