import type { Metadata } from "next";
import { ArticlesIndex } from "@/components/content/ArticlesIndex";
import { getAllTags, getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Articles",
  description: "Long-form engineering notes — tutorials, build logs, reflections.",
  path: "/articles",
});

export default function ArticlesPage() {
  const posts = getArticles().map(
    ({
      slug,
      title,
      date,
      summary,
      readingTime,
      image,
      imageAlt,
      resolvedTags,
    }) => ({
      slug,
      title,
      date,
      summary,
      readingTime,
      image,
      imageAlt,
      resolvedTags,
    }),
  );
  const tags = getAllTags();

  return <ArticlesIndex posts={posts} tags={tags} />;
}
