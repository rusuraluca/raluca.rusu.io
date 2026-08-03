import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperimentPreview, ExperimentStatusBadge } from "@/components/content/ExperimentCard";
import { ExperimentPager } from "@/components/content/ExperimentPager";
import { Prose } from "@/components/typography/Prose";
import { ArticleTagList } from "@/components/ui/ArticleTag";
import { TextLink } from "@/components/ui/TextLink";
import { MdxContent } from "@/components/mdx/MdxContent";
import {
  getAdjacentExperiments,
  getExperiment,
  getExperiments,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getExperiments().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return {};
  return pageMetadata({
    title: experiment.title,
    description: experiment.summary,
    path: `/experiments/${experiment.slug}`,
  });
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) notFound();

  const { prev, next } = getAdjacentExperiments(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: experiment.title,
    datePublished: experiment.date,
    description: experiment.summary,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/experiments/${experiment.slug}`,
    ...(experiment.image ? { image: `${site.url}${experiment.image}` } : {}),
  };

  return (
    <article className="experiment-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="experiment-detail__header">
        <div className="experiment-detail__meta">
          <span className="experiment-detail__eyebrow">Experiment</span>
          <span aria-hidden="true">·</span>
          <time dateTime={experiment.date}>{experiment.year}</time>
        </div>

        {experiment.status && (
          <ExperimentStatusBadge
            status={experiment.status}
            className="experiment-detail__status-badge"
          />
        )}

        <h1 className="experiment-detail__title">{experiment.title}</h1>

        {experiment.summary && (
          <p className="experiment-detail__dek">{experiment.summary}</p>
        )}

        <ArticleTagList tags={experiment.resolvedTags} />

        {(experiment.links.demo ||
          experiment.links.repo ||
          experiment.links.source) && (
          <div className="experiment-detail__links">
            {experiment.links.demo && (
              <TextLink
                href={experiment.links.demo}
                external
                className="experiment-detail__link-btn"
              >
                Live demo
              </TextLink>
            )}
            {experiment.links.repo && (
              <TextLink
                href={experiment.links.repo}
                external
                className="experiment-detail__link-btn"
              >
                Source
              </TextLink>
            )}
            {experiment.links.source && (
              <TextLink
                href={experiment.links.source}
                external
                className="experiment-detail__link-btn"
              >
                View source
              </TextLink>
            )}
          </div>
        )}
      </header>

      <ExperimentPreview
        title={experiment.title}
        image={experiment.image}
        imageAlt={experiment.imageAlt}
        embedUrl={experiment.embedUrl}
      />

      {experiment.highlights.length > 0 && (
        <section className="project-detail__highlights" aria-label="Key highlights">
          <h2 className="project-detail__section-title">Key highlights</h2>
          <ul className="project-detail__highlights-list">
            {experiment.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      )}

      <Prose className="experiment-detail__prose">
        <MdxContent source={experiment.body} />
      </Prose>

      <ExperimentPager prev={prev} next={next} />
    </article>
  );
}
