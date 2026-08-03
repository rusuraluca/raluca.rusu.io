# Experiments guide

Experiments live as MDX files in this folder. Tag colors are managed in `tags.json`.

## Create an experiment

```bash
npx tsx scripts/new-experiment.ts my-sketch "My Sketch"
```

Add a preview image at `public/experiments/my-sketch.jpg` only if you want a cover image on the card or detail page. Experiments work without one.

## Experiment frontmatter

```yaml
---
title: "Experiment title"
date: "2026-01-12"
tags: ["generative", "canvas"]
summary: "Short preview for cards."
description: "Optional SEO description."
featured: true
order: 1
status: "live" # idea | wip | live | archive
highlights:
  - "Key exploration or outcome"
embedUrl: "https://…" # optional interactive demo iframe
links:
  demo: "https://…"
  repo: "https://…"
  source: "https://…"
---
```

- `order` controls listing order (lower appears first)
- `featured: true` gives the experiment a large hero card on the index page
- `embedUrl` replaces the hero image with an interactive iframe on the detail page
- `status` shows a badge on cards and detail pages

## Tag colors

```bash
npx tsx scripts/tag.ts list experiments
npx tsx scripts/tag.ts set generative "#4361ee" experiments
```

Edit `content/experiments/tags.json` directly or use the script above.
