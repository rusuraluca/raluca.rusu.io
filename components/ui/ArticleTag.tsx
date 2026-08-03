import type { ButtonHTMLAttributes, CSSProperties } from "react";
import type { ResolvedTag } from "@/lib/tags";

type ArticleTagProps = {
  tag: ResolvedTag;
  count?: number;
  interactive?: boolean;
  pressed?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ArticleTag({
  tag,
  count,
  interactive = false,
  pressed = false,
  className = "",
  ...props
}: ArticleTagProps) {
  const style = {
    "--tag-color": tag.color,
  } as CSSProperties;

  const label = (
    <>
      {tag.label}
      {count != null ? ` (${count})` : null}
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        style={style}
        aria-pressed={pressed}
        className={`article-tag article-tag--interactive${pressed ? " article-tag--pressed" : ""} ${className}`.trim()}
        {...props}
      >
        {label}
      </button>
    );
  }

  return (
    <span style={style} className={`article-tag ${className}`.trim()}>
      {label}
    </span>
  );
}

export function ArticleTagList({
  tags,
  className = "",
}: {
  tags: ResolvedTag[];
  className?: string;
}) {
  if (tags.length === 0) return null;

  return (
    <ul className={`article-tag-list ${className}`.trim()}>
      {tags.map((tag) => (
        <li key={tag.slug}>
          <ArticleTag tag={tag} />
        </li>
      ))}
    </ul>
  );
}
