import type { Metadata } from "next";
import { site } from "./site";

export const seoImage = {
  path: "/seo/og-light.png",
  width: 1024,
  height: 482,
  alt: `${site.name} | Software Engineer`,
} as const;

const defaultOpenGraphImage = {
  url: seoImage.path,
  width: seoImage.width,
  height: seoImage.height,
  alt: seoImage.alt,
};

export const sharedSocialMetadata = {
  openGraph: {
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image" as const,
    images: [seoImage.path],
  },
};

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
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoImage.path],
    },
  };
}
