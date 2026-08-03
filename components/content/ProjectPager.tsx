import Link from "next/link";
import { ArrowRightIcon } from "@/components/illustrations/icons";
import type { Project } from "@/lib/content";

export function ProjectPager({
  prev,
  next,
}: {
  prev: Project | null;
  next: Project | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="project-pager" aria-label="Project navigation">
      {prev ? (
        <Link href={`/projects/${prev.slug}`} className="project-pager__link">
          <span className="project-pager__direction">
            <ArrowRightIcon className="project-pager__icon project-pager__icon--prev" />
            Previous
          </span>
          <span className="project-pager__title">{prev.title}</span>
        </Link>
      ) : (
        <span className="project-pager__spacer" aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="project-pager__link project-pager__link--next"
        >
          <span className="project-pager__direction">
            Next
            <ArrowRightIcon className="project-pager__icon project-pager__icon--next" />
          </span>
          <span className="project-pager__title">{next.title}</span>
        </Link>
      ) : (
        <span className="project-pager__spacer" aria-hidden="true" />
      )}
    </nav>
  );
}
