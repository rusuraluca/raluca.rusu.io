import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/content/ProjectsIndex";
import { getAllProjectTechnologies, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Case studies: problems, constraints, decisions, and outcomes.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects().map(
    ({
      slug,
      title,
      year,
      summary,
      image,
      imageAlt,
      featured,
      resolvedTechnologies,
      highlights,
    }) => ({
      slug,
      title,
      year,
      summary,
      image,
      imageAlt,
      featured,
      resolvedTechnologies,
      highlights,
    }),
  );
  const technologies = getAllProjectTechnologies();

  return <ProjectsIndex projects={projects} technologies={technologies} />;
}
