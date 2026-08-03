#!/usr/bin/env npx tsx
/**
 * Scaffold a new project case study MDX file.
 *
 * Usage:
 *   npx tsx scripts/new-project.ts my-project-slug "Project Title"
 */
import fs from "node:fs";
import path from "node:path";

const [, , slugArg, ...titleParts] = process.argv;
const title = titleParts.join(" ").trim();

if (!slugArg || !title) {
  console.error('Usage: npx tsx scripts/new-project.ts <slug> "Project Title"');
  process.exit(1);
}

const slug = slugArg
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9-]+/g, "-")
  .replace(/^-+|-+$/g, "");

const today = new Date().toISOString().slice(0, 10);
const target = path.join(process.cwd(), "content/projects", `${slug}.mdx`);

if (fs.existsSync(target)) {
  console.error(`Project already exists: ${target}`);
  process.exit(1);
}

const template = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${today}"
technologies: ["typescript"]
summary: "One-line case study summary for cards and previews."
description: "Optional longer description for SEO (falls back to summary)."
image: "/projects/${slug}.jpg"
imageAlt: "${title.replace(/"/g, '\\"')}"
featured: false
order: 99
highlights:
  - "First key outcome or highlight"
  - "Second key outcome or highlight"
links:
  demo: ""
  repo: ""
---

## Problem

Describe the problem and why it mattered.

## Constraints

- Constraint one
- Constraint two

## Approach

Explain the approach and architecture.

## Outcome

Share results, metrics, and impact.

## What I'd do differently

Reflect on tradeoffs and next steps.
`;

fs.writeFileSync(target, template, "utf8");
console.log(`Created ${target}`);
console.log("");
console.log("Next steps:");
console.log(`  1. Add cover image at public/projects/${slug}.jpg`);
console.log("  2. Edit technologies and colors in content/projects/tags.json");
console.log(`  3. Set order and featured in frontmatter`);
