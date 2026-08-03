import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/content/ArticleCard";
import { ArticlePager } from "@/components/content/ArticlePager";
import { Prose } from "@/components/typography/Prose";
import { ArticleTagList } from "@/components/ui/ArticleTag";
import { MdxContent } from "@/components/mdx/MdxContent";
import { getAdjacentArticles, getArticle, getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getArticles().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getArticle(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/articles/${post.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getArticle(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentArticles(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.summary,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/articles/${post.slug}`,
    ...(post.image ? { image: `${site.url}${post.image}` } : {}),
  };

  return (
    <article className="article-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="article-detail__header">
        <div className="article-detail__meta">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="article-detail__title">{post.title}</h1>

        {post.summary && (
          <p className="article-detail__dek">{post.summary}</p>
        )}

        <ArticleTagList tags={post.resolvedTags} />
      </header>

      <ArticleHero image={post.image} imageAlt={post.imageAlt} />

      <Prose className="article-detail__prose">
        <MdxContent source={post.body} />
      </Prose>

      <ArticlePager prev={prev} next={next} />
    </article>
  );
}
