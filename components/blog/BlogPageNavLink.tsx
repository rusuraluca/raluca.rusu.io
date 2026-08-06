import Link from "next/link";
import type { ReactNode } from "react";

type BlogPageNavLinkProps = {
  href: string;
  label: ReactNode;
  className?: string;
  openInNewTab?: boolean;
  children: ReactNode;
};

/** Inner-page nav link: icon on top, label below, no rest rotation. */
export function BlogPageNavLink({
  href,
  label,
  className = "",
  openInNewTab,
  children,
}: BlogPageNavLinkProps) {
  return (
    <Link
      href={href}
      className={`blog-page-nav__item ${className}`.trim()}
      {...(openInNewTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      <span className="blog-page-nav__label">{label}</span>
      <span className="blog-page-nav__icon-wrap">{children}</span>
    </Link>
  );
}
