import Image from "next/image";
import Link from "next/link";
import { ArticleTagList } from "@/components/ui/ArticleTag";
import type { ResolvedTag } from "@/lib/tags";

export type ProjectCardData = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  image?: string;
  imageAlt: string;
  featured: boolean;
  resolvedTechnologies: ResolvedTag[];
  highlights: string[];
};

function ProjectCover({
  image,
  imageAlt,
  featured,
}: {
  image?: string;
  imageAlt: string;
  featured: boolean;
}) {
  return (
    <div
      className={`project-card__cover${featured ? " project-card__cover--featured" : ""}`}
    >
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
          className="project-card__image"
        />
      ) : (
        <div className="project-card__cover-placeholder" aria-hidden="true">
          <span className="project-card__cover-label">case study</span>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: ProjectCardData;
  featured?: boolean;
}) {
  const isFeatured = featured || project.featured;
  const previewHighlights = project.highlights.slice(0, 3);

  return (
    <article
      className={`project-card${isFeatured ? " project-card--featured" : ""}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-card__link group"
      >
        <ProjectCover
          image={project.image}
          imageAlt={project.imageAlt}
          featured={isFeatured}
        />

        <div className="project-card__body">
          <div className="project-card__meta">
            <span className="project-card__eyebrow">Case study</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <h2 className="project-card__title">{project.title}</h2>
          <p className="project-card__summary">{project.summary}</p>

          {previewHighlights.length > 0 && (
            <ul className="project-card__highlights">
              {previewHighlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}

          <ArticleTagList
            tags={project.resolvedTechnologies}
            className="project-card__technologies"
          />
        </div>
      </Link>
    </article>
  );
}

export function ProjectHero({
  image,
  imageAlt,
}: {
  image?: string;
  imageAlt: string;
}) {
  return (
    <div className="project-hero">
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          width={1400}
          height={788}
          priority
          sizes="(max-width: 768px) 100vw, 68rem"
          className="project-hero__image"
        />
      ) : (
        <div className="project-hero__placeholder" aria-hidden="true">
          <span className="project-card__cover-label">case study</span>
        </div>
      )}
    </div>
  );
}
