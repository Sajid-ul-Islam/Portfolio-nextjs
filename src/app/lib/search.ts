import { blogPosts, experiences, fileTree, projects } from "../data/portfolio";

export type SearchItemType =
  | "file"
  | "project"
  | "experience"
  | "blog"
  | "page";

export type SearchItem = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  type: SearchItemType;
  external?: boolean;
  keywords?: string[];
};

const baseItems: SearchItem[] = [
  ...fileTree.flatMap((section) =>
    section.items.map((item) => ({
      id: `file-${item.id}`,
      title: `${item.label}.${item.extension}`,
      subtitle: section.label,
      href: item.href,
      type: "file" as const,
      keywords: [item.label, item.extension, section.label],
    }))
  ),
  ...projects.map((project) => ({
    id: `project-${project.id}`,
    title: project.title,
    subtitle: "Project",
    href: `/projects/${project.id}`,
    type: "project" as const,
    keywords: project.technologies,
  })),
  ...experiences.map((experience) => ({
    id: `experience-${experience.id}`,
    title: `${experience.title} · ${experience.company}`,
    subtitle: "Experience",
    href: "/Experience",
    type: "experience" as const,
    keywords: experience.technologies,
  })),
  ...blogPosts.map((post) => ({
    id: `blog-${post.id}`,
    title: post.title,
    subtitle: "Blog",
    href: post.url,
    type: "blog" as const,
    external: true,
    keywords: post.tags,
  })),
  {
    id: "projects-index",
    title: "Projects Index",
    subtitle: "Page",
    href: "/projects",
    type: "page",
  },
];

export function getSearchItems() {
  return baseItems;
}

export function filterSearchItems(items: SearchItem[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  const tokens = normalized.split(/\s+/g);
  const typeWeight: Record<SearchItemType, number> = {
    file: 0,
    page: 2,
    project: 4,
    experience: 6,
    blog: 8,
  };

  return items
    .map((item) => {
      const title = item.title.toLowerCase();
      const subtitle = (item.subtitle ?? "").toLowerCase();
      const keywords = (item.keywords ?? []).join(" ").toLowerCase();
      const full = `${title} ${subtitle} ${keywords}`;

      let score = typeWeight[item.type] ?? 10;
      for (const token of tokens) {
        let tokenScore = 999;
        if (title === token) tokenScore = 0;
        else if (title.startsWith(token)) tokenScore = 1;
        else if (title.includes(token)) tokenScore = 4;
        else if (keywords.includes(token)) tokenScore = 9;
        else if (subtitle.includes(token)) tokenScore = 12;
        else if (full.includes(token)) tokenScore = 16;
        else return null;
        score += tokenScore;
      }

      if (title.includes(normalized)) score -= 2;
      if (title.startsWith(normalized)) score -= 4;
      if (normalized.length > 3 && keywords.includes(normalized)) score -= 1;

      return { item, score };
    })
    .filter((entry): entry is { item: SearchItem; score: number } => !!entry)
    .sort((a, b) => a.score - b.score)
    .map((entry) => entry.item);
}
