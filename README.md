# raluca.rusu.io

Personal website.

## Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Content:** MDX with gray-matter, next-mdx-remote
- **Code Highlighting:** Shiki via rehype-pretty-code
- **PDF Generation:** @react-pdf/renderer
- **Deployment:** Netlify

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

This generates:

- Static pages for all routes
- Resume PDF at `public/resume.pdf`
- RSS feed at `/feed.xml`
- Sitemap at `/sitemap.xml`

## Site sections

| Menu label | Route |
|---|---|
| about me | `/about` |
| newsletter | `/newsletters` |
| articles | `/articles` |
| experiments | `/experiments` |
| projects | `/projects` |
| resume | `/resume.pdf` |

## Content structure

```
content/
├── about/data.json    # Resume data (PDF + structured info)
├── articles/*.mdx     # Articles
├── projects/*.mdx     # Case studies
└── experiments/*.mdx  # Experiments
```

## Adding an article

```bash
npx tsx scripts/new-article.ts my-slug "My Article Title"
```

Add the cover image at `public/articles/my-slug.jpg`, edit the generated MDX, then set `draft: false`.

See `content/articles/README.md` for frontmatter fields and tag color management.

### Tag colors

```bash
npx tsx scripts/tag.ts list
npx tsx scripts/tag.ts set engineering "#4361ee"
```

Tags are defined in `content/articles/tags.json`. Each tag has a `color` (hex) and optional `label`.

## Adding a project

```bash
npx tsx scripts/new-project.ts my-project "My Project Title"
```

Add the cover image at `public/projects/my-project.jpg`, edit the generated MDX, then set `order` and `featured`.

See `content/projects/README.md` for frontmatter fields and technology color management.

### Technology colors

```bash
npx tsx scripts/tag.ts list projects
npx tsx scripts/tag.ts set react "#4361ee" projects
```

Technologies are defined in `content/projects/tags.json`.

## Adding an experiment

```bash
npx tsx scripts/new-experiment.ts my-sketch "My Sketch"
```

Add the preview image at `public/experiments/my-sketch.jpg`, edit the generated MDX, then set `order`, `featured`, and optional `embedUrl`.

See `content/experiments/README.md` for frontmatter fields and tag color management.

### Experiment tag colors

```bash
npx tsx scripts/tag.ts list experiments
npx tsx scripts/tag.ts set generative "#4361ee" experiments
```

Tags are defined in `content/experiments/tags.json`.

### Experiment frontmatter

```mdx
---
title: "Experiment Title"
date: "2026-01-12"
tags: ["generative", "canvas"]
summary: "Brief summary for cards."
image: "/experiments/my-sketch.jpg"
imageAlt: "Preview description"
featured: false
order: 1
status: "live" # idea | wip | live | archive
highlights:
  - "Key exploration"
embedUrl: "https://…"
links:
  demo: "https://…"
  repo: "https://…"
---
```

### Project frontmatter

```mdx
---
title: "Project Title"
date: "2026-03-01"
technologies: ["react", "typescript"]
summary: "Brief summary for cards."
description: "Optional SEO description."
image: "/projects/my-project.jpg"
imageAlt: "Cover image description"
featured: false
order: 1
highlights:
  - "Key outcome one"
links:
  demo: "https://…"
  repo: "https://…"
---
```

### Article frontmatter

```mdx
---
title: "Post Title"
date: "2026-08-01"
tags: ["engineering"]
summary: "Brief summary for cards."
image: "/articles/my-slug.jpg"
imageAlt: "Cover image description"
draft: false
---
```

## Theme

Light/dark theme toggles via `data-theme` on `<html>`. Palette tokens live in `app/globals.css`.

## License

Content: All rights reserved.  
Code: MIT
