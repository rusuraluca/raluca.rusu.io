# Articles content guide

Articles live as MDX files in this folder. Tag colors are managed in `tags.json`.

## Create an article

```bash
npx tsx scripts/new-article.ts my-slug "My Article Title"
```

Then edit the generated `.mdx` file and add a cover image at `public/articles/my-slug.jpg`.

## Article frontmatter

```yaml
---
title: "Article title"
date: "2026-08-01"
tags: ["engineering", "typescript"]
summary: "Short preview text for cards."
description: "Optional SEO description (uses summary if omitted)."
image: "/articles/my-slug.jpg"
imageAlt: "Describe the cover image"
order: 99
draft: false
---
```

- `order` controls listing order (lower appears first); ties break by publish date (newer first)
- Set `draft: true` while writing. Only published articles (`draft: false`) appear on the site.

## Tag colors

Edit `content/articles/tags.json` directly, or use the helper script:

```bash
npx tsx scripts/tag.ts list
npx tsx scripts/tag.ts set engineering "#4361ee"
npx tsx scripts/tag.ts set career "#f72585" "Career"
```

Site palette suggestions:

- `#4361ee` — electric sapphire
- `#7209b7` — indigo bloom
- `#f72585` — neon pink
- `#4cc9f0` — sky aqua
- `#3a0ca3` — vivid royal

Tags used in articles but missing from `tags.json` still render with an automatic fallback color.
