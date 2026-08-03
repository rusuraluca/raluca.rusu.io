"use client";

import { useMemo, useState } from "react";
import { ArticleCard, type ArticleCardData } from "@/components/content/ArticleCard";
import { ArticlesPagination } from "@/components/content/ArticlesPagination";
import { ArticleTag } from "@/components/ui/ArticleTag";

export type ArticleTagFilter = {
  tag: string;
  label: string;
  color: string;
  count: number;
};

const PAGE_SIZE = 6;

export function ArticlesIndex({
  posts,
  tags,
}: {
  posts: ArticleCardData[];
  tags: ArticleTagFilter[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeTag && !post.resolvedTags.some((tag) => tag.slug === activeTag)) {
        return false;
      }
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.resolvedTags.some((tag) => tag.label.toLowerCase().includes(q))
      );
    });
  }, [posts, query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="articles-page">
      <div className="articles-toolbar">
        <label className="articles-search">
          <span className="visually-hidden">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search articles…"
            className="articles-search__input"
          />
        </label>

        {tags.length > 0 && (
          <div className="articles-toolbar__tags" role="group" aria-label="Filter by tag">
            <button
              type="button"
              className={`articles-tag-filter articles-tag-filter--all${activeTag === null ? " articles-tag-filter--active" : ""}`}
              aria-pressed={activeTag === null}
              onClick={() => {
                setActiveTag(null);
                setPage(1);
              }}
            >
              All
            </button>
            {tags.map(({ tag, label, color, count }) => (
              <ArticleTag
                key={tag}
                tag={{ slug: tag, label, color }}
                count={count}
                interactive
                pressed={activeTag === tag}
                onClick={() => {
                  setActiveTag(activeTag === tag ? null : tag);
                  setPage(1);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <p className="articles-results-meta">
        {filtered.length === 0
          ? "No articles found"
          : `${filtered.length} article${filtered.length === 1 ? "" : "s"}`}
      </p>

      {filtered.length === 0 ? (
        <p className="articles-empty">Try a different search or tag filter.</p>
      ) : (
        <>
          <div className="articles-grid">
            {paginated.map((post) => (
              <ArticleCard key={post.slug} article={post} />
            ))}
          </div>

          <ArticlesPagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
