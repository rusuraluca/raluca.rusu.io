import type { Metadata } from "next";
import { site } from "./site";

export function pageMetadata({
  title,
  description,
  path: pagePath,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${pagePath}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
