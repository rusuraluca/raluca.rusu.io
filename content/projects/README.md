# Projects / case studies guide

Case studies live as MDX files in this folder. Technology colors are managed in `tags.json`.

## Create a project

```bash
npx tsx scripts/new-project.ts my-project "My Project Title"
```

Add a cover image at `public/projects/my-project.jpg`, then edit the generated MDX.

## Project frontmatter

```yaml
---
title: "Project title"
date: "2026-03-01"
technologies: ["react", "typescript", "aws"]
summary: "Short preview for cards."
description: "Optional SEO description."
image: "/projects/my-project.jpg"
imageAlt: "Cover image description"
featured: true
order: 1
highlights:
  - "Key outcome one"
  - "Key outcome two"
links:
  demo: "https://…"
  repo: "https://…"
---
```

- `order` controls listing order (lower appears first); ties break by project date (newer first)
- `featured: true` gives the project a large hero card on the index page
- `highlights` appear on cards and the case study page

## Technology colors

```bash
npx tsx scripts/tag.ts list projects
npx tsx scripts/tag.ts set react "#4361ee" projects
```

Edit `content/projects/tags.json` directly or use the script above.
