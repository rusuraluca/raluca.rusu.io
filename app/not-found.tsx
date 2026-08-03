import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist or may have moved.",
  robots: { index: false, follow: true },
};

const helpfulLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experiments", label: "Experiments" },
  { href: "/articles", label: "Articles" },
] as const;

export default function NotFound() {
  return (
    <article className="not-found-page">
      <header className="not-found-page__header">
        <p className="not-found-page__meta">
          <span className="not-found-page__eyebrow">Error 404</span>
        </p>
        <p className="not-found-page__dek">
          This page doesn&apos;t exist, or maybe it moved somewhere else.
        </p>
      </header>

      <div className="not-found-page__actions">
        <Link href="/" className="not-found-page__primary">
          Go home
        </Link>
      </div>

      <section className="not-found-page__panel" aria-labelledby="not-found-links-title">
        <h2 id="not-found-links-title" className="not-found-page__panel-title">
          Try one of these
        </h2>
        <ul className="not-found-page__links">
          {helpfulLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="not-found-page__link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
