#!/usr/bin/env npx tsx
/**
 * Scaffold a new experiment MDX file.
 *
 * Usage:
 *   npx tsx scripts/new-experiment.ts my-experiment "Experiment Title"
 */
import fs from "node:fs";
import path from "node:path";

const [, , slugArg, ...titleParts] = process.argv;
const title = titleParts.join(" ").trim();

if (!slugArg || !title) {
  console.error('Usage: npx tsx scripts/new-experiment.ts <slug> "Experiment Title"');
  process.exit(1);
}

const slug = slugArg
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9-]+/g, "-")
  .replace(/^-+|-+$/g, "");

const today = new Date().toISOString().slice(0, 10);
const target = path.join(process.cwd(), "content/experiments", `${slug}.mdx`);

if (fs.existsSync(target)) {
  console.error(`Experiment already exists: ${target}`);
  process.exit(1);
}

const template = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${today}"
tags: ["creative-coding"]
summary: "One-line experiment summary for cards and previews."
description: "Optional longer description for SEO (falls back to summary)."
image: "/experiments/${slug}.jpg"
imageAlt: "${title.replace(/"/g, '\\"')}"
featured: false
order: 99
status: "idea" # idea | wip | live | archive
highlights:
  - "First thing you explored or built"
  - "Second interesting outcome"
links:
  demo: ""
  repo: ""
embedUrl: ""
---

## Concept

Describe the idea and why you wanted to explore it.

## How it works

Explain the approach, tools, and architecture.

## What I learned

Reflect on outcomes, surprises, and next steps.
`;

fs.writeFileSync(target, template, "utf8");
console.log(`Created ${target}`);
console.log("");
console.log("Next steps:");
console.log(`  1. Add preview image at public/experiments/${slug}.jpg`);
console.log("  2. Edit tags and colors in content/experiments/tags.json");
console.log("  3. Set embedUrl for an interactive demo, or leave blank for image preview");
