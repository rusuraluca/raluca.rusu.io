import Image from "next/image";
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
  image?: string;
  imageAlt: string;
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

function ExperimentCover({
  image,
  imageAlt,
  featured,
  status,
}: {
  image?: string;
  imageAlt: string;
  featured: boolean;
  status?: ExperimentStatus;
}) {
  return (
    <div
      className={`experiment-card__cover${featured ? " experiment-card__cover--featured" : ""}`}
    >
      {status && (
        <ExperimentStatusBadge
          status={status}
          className="experiment-card__status-badge"
        />
      )}

      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 68rem"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="experiment-card__image"
        />
      ) : (
        <div className="experiment-card__cover-placeholder" aria-hidden="true">
          <span className="experiment-card__cover-label">experiment</span>
        </div>
      )}
    </div>
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

  return (
    <article
      className={`experiment-card${isFeatured ? " experiment-card--featured" : ""}`}
    >
      <Link
        href={`/experiments/${experiment.slug}`}
        className="experiment-card__link group"
      >
        <ExperimentCover
          image={experiment.image}
          imageAlt={experiment.imageAlt}
          featured={isFeatured}
          status={experiment.status}
        />

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
      </Link>
    </article>
  );
}

export function ExperimentPreview({
  title,
  image,
  imageAlt,
  embedUrl,
}: {
  title: string;
  image?: string;
  imageAlt: string;
  embedUrl?: string;
}) {
  if (embedUrl) {
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

  return (
    <div className="experiment-preview">
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          width={1400}
          height={1050}
          priority
          sizes="(max-width: 768px) 100vw, 68rem"
          className="experiment-preview__image"
        />
      ) : (
        <div className="experiment-preview__placeholder" aria-hidden="true">
          <span className="experiment-card__cover-label">interactive preview</span>
        </div>
      )}
    </div>
  );
}

export { ExperimentStatusBadge };
