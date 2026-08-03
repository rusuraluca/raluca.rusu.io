import type { Metadata } from "next";
import { ExperimentsIndex } from "@/components/content/ExperimentsIndex";
import { getExperiments } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Experiments",
  description: "Creative coding experiments: generative art, visualizations, prototypes, and side projects.",
  path: "/experiments",
});

export default function ExperimentsPage() {
  const experiments = getExperiments().map(
    ({
      slug,
      title,
      year,
      summary,
      image,
      imageAlt,
      featured,
      status,
      resolvedTags,
      highlights,
    }) => ({
      slug,
      title,
      year,
      summary,
      image,
      imageAlt,
      featured,
      status,
      resolvedTags,
      highlights,
    }),
  );

  return <ExperimentsIndex experiments={experiments} />;
}
