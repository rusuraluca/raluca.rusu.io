import Link from "next/link";
import { ArrowRightIcon } from "@/components/illustrations/icons";
import type { Article } from "@/lib/content";

export function ArticlePager({
  prev,
  next,
}: {
  prev: Article | null;
  next: Article | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="article-pager" aria-label="Article navigation">
      {prev ? (
        <Link href={`/articles/${prev.slug}`} className="article-pager__link">
          <span className="article-pager__direction">
            <ArrowRightIcon className="article-pager__icon article-pager__icon--prev" />
            Previous
          </span>
          <span className="article-pager__title">{prev.title}</span>
        </Link>
      ) : (
        <span className="article-pager__spacer" aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/articles/${next.slug}`}
          className="article-pager__link article-pager__link--next"
        >
          <span className="article-pager__direction">
            Next
            <ArrowRightIcon className="article-pager__icon article-pager__icon--next" />
          </span>
          <span className="article-pager__title">{next.title}</span>
        </Link>
      ) : (
        <span className="article-pager__spacer" aria-hidden="true" />
      )}
    </nav>
  );
}
