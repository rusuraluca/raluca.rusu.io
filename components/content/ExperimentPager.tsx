import Link from "next/link";
import { ArrowRightIcon } from "@/components/illustrations/icons";
import type { Experiment } from "@/lib/content";

export function ExperimentPager({
  prev,
  next,
}: {
  prev: Experiment | null;
  next: Experiment | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="experiment-pager" aria-label="Experiment navigation">
      {prev ? (
        <Link href={`/experiments/${prev.slug}`} className="experiment-pager__link">
          <span className="experiment-pager__direction">
            <ArrowRightIcon className="experiment-pager__icon experiment-pager__icon--prev" />
            Previous
          </span>
          <span className="experiment-pager__title">{prev.title}</span>
        </Link>
      ) : (
        <span className="experiment-pager__spacer" aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/experiments/${next.slug}`}
          className="experiment-pager__link experiment-pager__link--next"
        >
          <span className="experiment-pager__direction">
            Next
            <ArrowRightIcon className="experiment-pager__icon experiment-pager__icon--next" />
          </span>
          <span className="experiment-pager__title">{next.title}</span>
        </Link>
      ) : (
        <span className="experiment-pager__spacer" aria-hidden="true" />
      )}
    </nav>
  );
}
