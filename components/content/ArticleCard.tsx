import Image from "next/image";
import Link from "next/link";
import { ArticleTagList } from "@/components/ui/ArticleTag";
import type { ResolvedTag } from "@/lib/tags";

export type ArticleCardData = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readingTime: string;
  image?: string;
  imageAlt: string;
  resolvedTags: ResolvedTag[];
};

function ArticleCover({
  image,
  imageAlt,
}: {
  image?: string;
  imageAlt: string;
}) {
  return (
    <div className="article-card__cover">
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="article-card__image"
        />
      ) : (
        <div className="article-card__cover-placeholder" aria-hidden="true">
          <span className="article-card__cover-label">article</span>
        </div>
      )}
    </div>
  );
}

export function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <article className="article-card">
      <Link href={`/articles/${article.slug}`} className="article-card__link group">
        <ArticleCover
          image={article.image}
          imageAlt={article.imageAlt}
        />

        <div className="article-card__body">
          <div className="article-card__meta">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>

          <h2 className="article-card__title">{article.title}</h2>
          <p className="article-card__summary">{article.summary}</p>

          <ArticleTagList tags={article.resolvedTags} className="article-card__tags" />
        </div>
      </Link>
    </article>
  );
}

export function ArticleHero({
  image,
  imageAlt,
}: {
  image?: string;
  imageAlt: string;
}) {
  return (
    <div className="article-hero">
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          width={1200}
          height={675}
          priority
          sizes="(max-width: 768px) 100vw, 52rem"
          className="article-hero__image"
        />
      ) : (
        <div className="article-hero__placeholder" aria-hidden="true">
          <span className="article-card__cover-label">article</span>
        </div>
      )}
    </div>
  );
}
