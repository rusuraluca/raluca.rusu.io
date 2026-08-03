#!/usr/bin/env npx tsx
/**
 * Scaffold a new article MDX file.
 *
 * Usage:
 *   npx tsx scripts/new-article.ts my-article-slug "Article Title"
 */
import fs from "node:fs";
import path from "node:path";

const [, , slugArg, ...titleParts] = process.argv;
const title = titleParts.join(" ").trim();

if (!slugArg || !title) {
  console.error('Usage: npx tsx scripts/new-article.ts <slug> "Article Title"');
  process.exit(1);
}

const slug = slugArg
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9-]+/g, "-")
  .replace(/^-+|-+$/g, "");

const today = new Date().toISOString().slice(0, 10);
const target = path.join(process.cwd(), "content/articles", `${slug}.mdx`);

if (fs.existsSync(target)) {
  console.error(`Article already exists: ${target}`);
  process.exit(1);
}

const template = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${today}"
tags: ["engineering"]
summary: "One-line description shown on cards and in previews."
description: "Optional longer description for SEO (falls back to summary)."
image: "/articles/${slug}.jpg"
imageAlt: "${title.replace(/"/g, '\\"')}"
draft: true
---

Write your article here.

## Section heading

Start with the hook, then expand.
`;

fs.writeFileSync(target, template, "utf8");
console.log(`Created ${target}`);
console.log("");
console.log("Next steps:");
console.log(`  1. Add cover image at public/articles/${slug}.jpg`);
console.log("  2. Edit tags in frontmatter and colors in content/articles/tags.json");
console.log("  3. Set draft: false when ready to publish");
