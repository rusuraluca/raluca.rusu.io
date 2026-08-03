import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/content/ProjectCard";
import { ProjectPager } from "@/components/content/ProjectPager";
import { Prose } from "@/components/typography/Prose";
import { ArticleTagList } from "@/components/ui/ArticleTag";
import { TextLink } from "@/components/ui/TextLink";
import { MdxContent } from "@/components/mdx/MdxContent";
import {
  getAdjacentProjects,
  getProject,
  getProjects,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    datePublished: project.date,
    description: project.summary,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/projects/${project.slug}`,
    ...(project.image ? { image: `${site.url}${project.image}` } : {}),
  };

  return (
    <article className="project-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="project-detail__header">
        <div className="project-detail__meta">
          <span className="project-detail__eyebrow">Case study</span>
          <span aria-hidden="true">·</span>
          <time dateTime={project.date}>{project.year}</time>
        </div>

        <h1 className="project-detail__title display-hollow">{project.title}</h1>

        {project.summary && (
          <p className="project-detail__dek">{project.summary}</p>
        )}

        <ArticleTagList tags={project.resolvedTechnologies} />

        {(project.links.demo || project.links.repo) && (
          <div className="project-detail__links">
            {project.links.demo && (
              <TextLink
                href={project.links.demo}
                external
                className="project-detail__link-btn"
              >
                Live demo
              </TextLink>
            )}
            {project.links.repo && (
              <TextLink
                href={project.links.repo}
                external
                className="project-detail__link-btn"
              >
                Source
              </TextLink>
            )}
          </div>
        )}
      </header>

      <ProjectHero image={project.image} imageAlt={project.imageAlt} />

      {project.highlights.length > 0 && (
        <section className="project-detail__highlights" aria-label="Key highlights">
          <h2 className="project-detail__section-title">Key highlights</h2>
          <ul className="project-detail__highlights-list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      )}

      <Prose className="project-detail__prose">
        <MdxContent source={project.body} />
      </Prose>

      <ProjectPager prev={prev} next={next} />
    </article>
  );
}
