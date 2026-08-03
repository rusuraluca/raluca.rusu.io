import { site } from "@/lib/site";

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.author.email,
    jobTitle: "Software Engineer",
    sameAs: [site.author.github, site.author.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}
