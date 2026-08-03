import Link from "next/link";
import type { ReactNode } from "react";

type BlogNavLinkProps = {
  href: string;
  label: ReactNode;
  className: string;
  openInNewTab?: boolean;
  children: ReactNode;
};

export function BlogNavLink({
  href,
  label,
  className,
  openInNewTab,
  children,
}: BlogNavLinkProps) {
  return (
    <Link
      href={href}
      className={`blog-nav__item ${className}`.trim()}
      {...(openInNewTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      <span className="blog-nav__label">{label}</span>
      <span className="blog-nav__icon-wrap">{children}</span>
    </Link>
  );
}
