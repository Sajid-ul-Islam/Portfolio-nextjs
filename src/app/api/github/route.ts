import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GH_USER = "Sajid-ul-Islam";

const FALLBACK_COMMITS = [
  {
    repo: "Cross_Ecom_Apps",
    message: "Merge pull request #41 from Sajid-ul-Islam/master",
    author: "Sajid Islam",
    time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    sha: "22a66cf",
    url: `https://github.com/${GH_USER}/Cross_Ecom_Apps/commit/22a66cf`,
  },
  {
    repo: "Portfolio-nextjs",
    message: "feat: add VS Code themed portfolio layout, components, and pages",
    author: "saajiidi",
    time: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
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

async function fetchGitHub<T>(url: string, token?: string): Promise<T | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "Sajid-Portfolio-App-FDE",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
      next: { revalidate: 30 },
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

  try {
    // 1. Fetch user profile and recently pushed repos
    const [user, repos] = await Promise.all([
      fetchGitHub<any>(`https://api.github.com/users/${username}`, token),
      fetchGitHub<any[]>(
        `https://api.github.com/users/${username}/repos?sort=pushed&per_page=12`,
        token
      ),
    ]);

    const publicReposCount = user?.public_repos ?? 92;
    const followers = user?.followers ?? 0;
    const safeRepos = Array.isArray(repos) ? repos : [];

    // Calculate language frequencies and total stars
    const languageCounts: Record<string, number> = {};
    let totalStars = 0;
    safeRepos.forEach((r) => {
      if (r.language) {
        languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
      }
      totalStars += r.stargazers_count || 0;
    });

    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lang]) => lang);

    // 2. Fetch recent commits from the most active top 5 repos
    const activeRepoNames = safeRepos.slice(0, 5).map((r) => r.name);
    let recentCommits: any[] = [];

    if (activeRepoNames.length > 0) {
      const commitsResults = await Promise.all(
        activeRepoNames.map((repoName) =>
          fetchGitHub<any[]>(
            `https://api.github.com/repos/${username}/${repoName}/commits?per_page=3`,
            token
          ).then((commits) => {
            if (!Array.isArray(commits)) return [];
            return commits.map((c) => ({
              repo: repoName,
              message: (c.commit?.message || "").split("\n")[0],
              author: c.commit?.author?.name || c.author?.login || username,
              time: c.commit?.author?.date || c.commit?.committer?.date || new Date().toISOString(),
              sha: (c.sha || "").slice(0, 7),
              url: `https://github.com/${username}/${repoName}/commit/${c.sha}`,
            }));
          })
        )
      );

      recentCommits = commitsResults
        .flat()
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 6);
    }

    // Fallback if GitHub rate limit triggers
    if (recentCommits.length === 0) {
      recentCommits = FALLBACK_COMMITS;
    }

    const topRepos = safeRepos.slice(0, 6).map((r) => ({
      name: r.name,
      url: r.html_url,
      description: r.description,
      stars: r.stargazers_count,
      language: r.language,
      pushedAt: r.pushed_at,
    }));

    return NextResponse.json(
      {
        ok: true,
        user: {
          username: user?.login ?? username,
          name: user?.name ?? "Sajid Islam",
          avatarUrl: user?.avatar_url ?? `https://avatars.githubusercontent.com/${username}`,
          profileUrl: user?.html_url ?? `https://github.com/${username}`,
          followers,
          publicRepos: publicReposCount,
        },
        stats: {
          totalRepos: publicReposCount,
          totalStars,
          topLanguages,
          lastUpdated: new Date().toISOString(),
        },
        topRepos,
        recentCommits,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
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
          totalStars: 5,
          topLanguages: ["TypeScript", "Python", "JavaScript", "Java"],
          lastUpdated: new Date().toISOString(),
        },
        recentCommits: FALLBACK_COMMITS,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30",
        },
      }
    );
  }
}
