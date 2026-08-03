import type { MetadataRoute } from "next";
import { getArticles, getProjects, getExperiments } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/newsletters",
    "/articles",
    "/experiments",
    "/projects",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const articlePages = getArticles().map((post) => ({
    url: `${site.url}/articles/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const projectPages = getProjects().map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const experimentPages = getExperiments().map((exp) => ({
    url: `${site.url}/experiments/${exp.slug}`,
    lastModified: new Date(exp.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...articlePages, ...projectPages, ...experimentPages];
}
