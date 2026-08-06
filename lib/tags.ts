import fs from "node:fs";
import path from "node:path";

/** Site palette, used as fallbacks for tags without a custom color. */
const TAG_PALETTE = [
  "#4361ee",
  "#7209b7",
  "#f72585",
  "#4cc9f0",
  "#3a0ca3",
  "#57606a",
] as const;

export type TagDefinition = {
  color: string;
  label?: string;
};

export type TagRegistry = Record<string, TagDefinition>;

export type ResolvedTag = {
  slug: string;
  label: string;
  color: string;
};

export type TagCollection = "articles" | "projects" | "experiments";

const TAG_FILES: Record<TagCollection, string> = {
  articles: path.join(process.cwd(), "content/articles/tags.json"),
  projects: path.join(process.cwd(), "content/projects/tags.json"),
  experiments: path.join(process.cwd(), "content/experiments/tags.json"),
};

function hashTag(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getTagRegistry(collection: TagCollection = "articles"): TagRegistry {
  const file = TAG_FILES[collection];
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8")) as TagRegistry;
}

export function resolveTag(
  name: string,
  registry: TagRegistry = getTagRegistry("articles"),
): ResolvedTag {
  const slug = name.trim().toLowerCase();
  const entry = registry[slug];

  if (entry) {
    return {
      slug,
      label: entry.label ?? slug,
      color: entry.color,
    };
  }

  return {
    slug,
    label: slug,
    color: TAG_PALETTE[hashTag(slug) % TAG_PALETTE.length],
  };
}

export function resolveTags(
  names: string[],
  registry: TagRegistry = getTagRegistry("articles"),
): ResolvedTag[] {
  return names.map((name) => resolveTag(name, registry));
}
