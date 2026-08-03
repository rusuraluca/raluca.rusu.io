import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compareExperimentsByStatus, normalizeExperimentStatus, type ExperimentStatus } from "@/lib/experiment-status";
import { getTagRegistry, resolveTag, resolveTags, type TagRegistry, type ResolvedTag } from "@/lib/tags";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type { TagRegistry, ResolvedTag };

export type Article = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  resolvedTags: ResolvedTag[];
  summary: string;
  image?: string;
  imageAlt: string;
  readingTime: string;
  draft: boolean;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  date: string;
  year: string;
  summary: string;
  image?: string;
  imageAlt: string;
  featured: boolean;
  order: number;
  links: { demo?: string; repo?: string };
  technologies: string[];
  resolvedTechnologies: ResolvedTag[];
  highlights: string[];
  body: string;
};

export type Experiment = {
  slug: string;
  title: string;
  date: string;
  year: string;
  summary: string;
  image?: string;
  imageAlt: string;
  featured: boolean;
  order: number;
  status?: ExperimentStatus;
  links: { demo?: string; repo?: string; source?: string };
  embedUrl?: string;
  tags: string[];
  resolvedTags: ResolvedTag[];
  highlights: string[];
  body: string;
};

function readCollection(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, content };
    });
}

function mapArticle(
  slug: string,
  data: Record<string, unknown>,
  content: string,
  registry: TagRegistry,
): Article {
  const title = data.title as string;
  const tags = ((data.tags as string[]) ?? []).map((tag) => tag.trim().toLowerCase());

  return {
    slug,
    title,
    date: data.date as string,
    tags,
    resolvedTags: resolveTags(tags, registry),
    summary: ((data.summary ?? data.description) as string) ?? "",
    image: data.image as string | undefined,
    imageAlt: ((data.imageAlt as string) ?? title) || title,
    readingTime: readingTime(content).text,
    draft: Boolean(data.draft),
    body: content,
  };
}

export function getArticles(): Article[] {
  const registry = getTagRegistry("articles");

  return readCollection("articles")
    .map(({ slug, data, content }) => mapArticle(slug, data, content, registry))
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((p) => p.slug === slug);
}

/** Older/newer neighbors in publish order (newest-first list). */
export function getAdjacentArticles(slug: string): {
  prev: Article | null;
  next: Article | null;
} {
  const articles = getArticles();
  const index = articles.findIndex((article) => article.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: articles[index + 1] ?? null,
    next: articles[index - 1] ?? null,
  };
}

export function getAllTags(): { tag: string; count: number; color: string; label: string }[] {
  const registry = getTagRegistry("articles");
  const counts = new Map<string, number>();

  for (const post of getArticles()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => {
      const resolved = resolveTag(tag, registry);
      return {
        tag: resolved.slug,
        label: resolved.label,
        color: resolved.color,
        count,
      };
    })
    .sort((a, b) => b.count - a.count);
}

function mapProject(
  slug: string,
  data: Record<string, unknown>,
  content: string,
  registry: TagRegistry,
): Project {
  const title = data.title as string;
  const rawTechnologies =
    (data.technologies as string[] | undefined) ??
    (data.tags as string[] | undefined) ??
    [];
  const technologies = rawTechnologies.map((tech) => tech.trim().toLowerCase());

  return {
    slug,
    title,
    date: data.date as string,
    year: new Date(data.date as string).getFullYear().toString(),
    summary: ((data.summary ?? data.description) as string) ?? "",
    image: data.image as string | undefined,
    imageAlt: ((data.imageAlt as string) ?? title) || title,
    featured: Boolean(data.featured),
    order: (data.order as number) ?? 99,
    links: (data.links as { demo?: string; repo?: string }) ?? {},
    technologies,
    resolvedTechnologies: resolveTags(technologies, registry),
    highlights: (data.highlights as string[]) ?? [],
    body: content,
  };
}

export function getProjects(): Project[] {
  const registry = getTagRegistry("projects");

  return readCollection("projects")
    .map(({ slug, data, content }) => mapProject(slug, data, content, registry))
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}

export function getAllProjectTechnologies(): {
  tag: string;
  label: string;
  color: string;
  count: number;
}[] {
  const registry = getTagRegistry("projects");
  const counts = new Map<string, number>();

  for (const project of getProjects()) {
    for (const tech of project.technologies) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => {
      const resolved = resolveTag(tag, registry);
      return {
        tag: resolved.slug,
        label: resolved.label,
        color: resolved.color,
        count,
      };
    })
    .sort((a, b) => b.count - a.count);
}

export function getExperiments(): Experiment[] {
  const registry = getTagRegistry("experiments");

  return readCollection("experiments")
    .map(({ slug, data, content }) => mapExperiment(slug, data, content, registry))
    .sort(
      (a, b) =>
        compareExperimentsByStatus(a.status, b.status) ||
        a.order - b.order ||
        (a.date < b.date ? 1 : -1),
    );
}

function mapExperiment(
  slug: string,
  data: Record<string, unknown>,
  content: string,
  registry: TagRegistry,
): Experiment {
  const title = data.title as string;
  const tags = ((data.tags as string[]) ?? []).map((tag) => tag.trim().toLowerCase());
  const rawLinks = (data.links as { demo?: string; repo?: string; source?: string }) ?? {};
  const legacySource = data.sourceUrl as string | undefined;
  const embedUrl = ((data.embedUrl as string) ?? "").trim() || undefined;

  const links = {
    demo: rawLinks.demo?.trim() || undefined,
    repo: rawLinks.repo?.trim() || undefined,
    source: rawLinks.source?.trim() || legacySource?.trim() || undefined,
  };

  return {
    slug,
    title,
    date: data.date as string,
    year: new Date(data.date as string).getFullYear().toString(),
    summary: ((data.summary ?? data.description) as string) ?? "",
    image: data.image as string | undefined,
    imageAlt: ((data.imageAlt as string) ?? title) || title,
    featured: Boolean(data.featured),
    order: (data.order as number) ?? 99,
    status: normalizeExperimentStatus(data.status as string | undefined),
    links,
    embedUrl,
    tags,
    resolvedTags: resolveTags(tags, registry),
    highlights: (data.highlights as string[]) ?? [],
    body: content,
  };
}

export function getExperiment(slug: string): Experiment | undefined {
  return getExperiments().find((e) => e.slug === slug);
}

export function getAdjacentExperiments(slug: string): {
  prev: Experiment | null;
  next: Experiment | null;
} {
  const experiments = getExperiments();
  const index = experiments.findIndex((experiment) => experiment.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: experiments[index - 1] ?? null,
    next: experiments[index + 1] ?? null,
  };
}
