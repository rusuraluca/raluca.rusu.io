#!/usr/bin/env npx tsx
/**
 * Manage tag/technology colors.
 *
 * Usage:
 *   npx tsx scripts/tag.ts list [articles|projects|experiments]
 *   npx tsx scripts/tag.ts set react "#4361ee" [Label] [articles|projects|experiments]
 */
import fs from "node:fs";
import path from "node:path";

type TagCollection = "articles" | "projects" | "experiments";

const TAG_FILES: Record<TagCollection, string> = {
  articles: path.join(process.cwd(), "content/articles/tags.json"),
  projects: path.join(process.cwd(), "content/projects/tags.json"),
  experiments: path.join(process.cwd(), "content/experiments/tags.json"),
};

type TagDefinition = {
  color: string;
  label?: string;
};

type TagRegistry = Record<string, TagDefinition>;

function resolveCollection(value?: string): TagCollection {
  if (value === "projects") return "projects";
  if (value === "experiments") return "experiments";
  return "articles";
}

function readRegistry(collection: TagCollection): TagRegistry {
  const file = TAG_FILES[collection];
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8")) as TagRegistry;
}

function writeRegistry(collection: TagCollection, registry: TagRegistry) {
  fs.writeFileSync(
    TAG_FILES[collection],
    `${JSON.stringify(registry, null, 2)}\n`,
    "utf8",
  );
}

const [, , command, ...args] = process.argv;

if (!command || command === "list") {
  const collection = resolveCollection(args[0]);
  const registry = readRegistry(collection);
  const entries = Object.entries(registry);

  if (entries.length === 0) {
    console.log(`No tags configured for ${collection}.`);
    process.exit(0);
  }

  console.log(`[${collection}]`);
  for (const [slug, tag] of entries) {
    console.log(`${slug}\t${tag.color}\t${tag.label ?? slug}`);
  }
  process.exit(0);
}

if (command === "set") {
  const maybeCollection = args[args.length - 1];
  const hasCollection =
    maybeCollection === "articles" ||
    maybeCollection === "projects" ||
    maybeCollection === "experiments";
  const collection = resolveCollection(hasCollection ? maybeCollection : undefined);
  const setArgs = hasCollection ? args.slice(0, -1) : args;

  const slug = setArgs[0]?.trim().toLowerCase();
  const color = setArgs[1]?.trim();
  const label = setArgs.slice(2).join(" ").trim();

  if (!slug || !color || !/^#[0-9a-fA-F]{6}$/.test(color)) {
    console.error(
      'Usage: npx tsx scripts/tag.ts set <slug> "#rrggbb" [Label] [articles|projects|experiments]',
    );
    process.exit(1);
  }

  const registry = readRegistry(collection);
  registry[slug] = {
    color,
    ...(label ? { label: label.toLowerCase() } : {}),
  };
  writeRegistry(collection, registry);
  console.log(`Updated ${collection} tag "${slug}" → ${color}`);
  process.exit(0);
}

console.error("Unknown command. Use: list | set");
process.exit(1);
