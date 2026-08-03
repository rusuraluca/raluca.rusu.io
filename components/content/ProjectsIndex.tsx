"use client";

import { useMemo, useState } from "react";
import { ProjectCard, type ProjectCardData } from "@/components/content/ProjectCard";
import { ArticleTag } from "@/components/ui/ArticleTag";

export type ProjectTechnologyFilter = {
  tag: string;
  label: string;
  color: string;
  count: number;
};

export function ProjectsIndex({
  projects,
  technologies,
}: {
  projects: ProjectCardData[];
  technologies: ProjectTechnologyFilter[];
}) {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const featured = projects.find((project) => project.featured) ?? null;
  const filtered = useMemo(() => {
    if (!activeTech) return projects;
    return projects.filter((project) =>
      project.resolvedTechnologies.some((tech) => tech.slug === activeTech),
    );
  }, [projects, activeTech]);

  const gridProjects = filtered.filter(
    (project) => !featured || project.slug !== featured.slug,
  );

  return (
    <div className="projects-page">
      {technologies.length > 0 && (
        <div
          className="projects-toolbar__tags"
          role="group"
          aria-label="Filter by technology"
        >
          <button
            type="button"
            className={`articles-tag-filter articles-tag-filter--all${activeTech === null ? " articles-tag-filter--active" : ""}`}
            aria-pressed={activeTech === null}
            onClick={() => setActiveTech(null)}
          >
            All
          </button>
          {technologies.map(({ tag, label, color, count }) => (
            <ArticleTag
              key={tag}
              tag={{ slug: tag, label, color }}
              count={count}
              interactive
              pressed={activeTech === tag}
              onClick={() => setActiveTech(activeTech === tag ? null : tag)}
            />
          ))}
        </div>
      )}

      <p className="projects-results-meta">
        {filtered.length === 0
          ? "No projects found"
          : `${filtered.length} case stud${filtered.length === 1 ? "y" : "ies"}`}
      </p>

      {filtered.length === 0 ? (
        <p className="projects-empty">Try a different technology filter.</p>
      ) : (
        <div className="projects-layout">
          {featured && filtered.some((p) => p.slug === featured.slug) && (
            <ProjectCard project={featured} featured />
          )}

          {gridProjects.length > 0 && (
            <div className="projects-grid">
              {gridProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
