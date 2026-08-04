import Link from "next/link";
import type { CSSProperties } from "react";
import { ArticleTagList } from "@/components/ui/ArticleTag";
import {
  getExperimentStatusMeta,
  type ExperimentStatus,
} from "@/lib/experiment-status";
import type { ResolvedTag } from "@/lib/tags";

export type ExperimentCardData = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  featured: boolean;
  status?: ExperimentStatus;
  resolvedTags: ResolvedTag[];
  highlights: string[];
};

function ExperimentStatusBadge({
  status,
  className = "",
}: {
  status: ExperimentStatus;
  className?: string;
}) {
  const meta = getExperimentStatusMeta(status);
  if (!meta) return null;

  return (
    <span
      className={`experiment-status-badge experiment-status-badge--${status} ${className}`.trim()}
      style={{ "--status-base": meta.color } as CSSProperties}
    >
      {meta.label}
    </span>
  );
}

export function ExperimentCard({
  experiment,
  featured = false,
}: {
  experiment: ExperimentCardData;
  featured?: boolean;
}) {
  const isFeatured = featured || experiment.featured;
  const previewHighlights = experiment.highlights.slice(0, 2);
  const statusMeta = experiment.status
    ? getExperimentStatusMeta(experiment.status)
    : null;

  return (
    <article
      className={`experiment-card${isFeatured ? " experiment-card--featured" : ""}`}
      data-status={experiment.status}
      style={
        statusMeta
          ? ({ "--folder-accent": statusMeta.color } as CSSProperties)
          : undefined
      }
    >
      <Link
        href={`/experiments/${experiment.slug}`}
        className="experiment-card__link group"
      >
        <div className="experiment-card__folder">
          <div className="experiment-card__tab">
            <span className="experiment-card__tab-label">
              {statusMeta?.label ?? "Experiment"}
            </span>
          </div>

          <div className="experiment-card__body">
            <div className="experiment-card__meta">
              <span className="experiment-card__eyebrow">Experiment</span>
              <span aria-hidden="true">·</span>
              <span>{experiment.year}</span>
            </div>

            <h2 className="experiment-card__title">{experiment.title}</h2>
            <p className="experiment-card__summary">{experiment.summary}</p>

            {previewHighlights.length > 0 && (
              <ul className="experiment-card__highlights">
                {previewHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            <ArticleTagList
              tags={experiment.resolvedTags}
              className="experiment-card__tags"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function ExperimentPreview({
  title,
  embedUrl,
}: {
  title: string;
  embedUrl?: string;
}) {
  if (!embedUrl) return null;

  return (
    <div className="experiment-preview experiment-preview--embed">
      <iframe
        src={embedUrl}
        title={`${title} interactive preview`}
        className="experiment-preview__iframe"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}

export { ExperimentStatusBadge };
