import type { MetadataRoute } from "next";

const BASE_URL = "https://sajid-ul-islam.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/experience",
    "/skills",
    "/projects",
    "/education",
    "/contact",
    "/settings.json",
  ];

  const projectPages = [
    "agentic-rag",
    "rag-system",
    "telegram-chatbot",
    "whatsapp-chatbot",
    "deen-ops",
    "deen-business-intel",
    "global-economics",
    "churn-analysis",
    "security-map",
  ];

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projectPages.map((id) => ({
    url: `${BASE_URL}/projects/${id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
