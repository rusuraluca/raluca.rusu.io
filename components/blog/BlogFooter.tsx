import { BlogNavIcon } from "@/components/blog/BlogNavIcon";
import type { BlogHomeTheme } from "@/components/blog/blog-home-assets";
import { blogHomeAssets } from "@/components/blog/blog-home-assets";
import { site } from "@/lib/site";

function BlogFooterEmailIcon() {
  return (
    <svg
      className="blog-footer__email-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

type BlogFooterProps = {
  assets: (typeof blogHomeAssets)[BlogHomeTheme];
  variant?: "home" | "page";
};

export function BlogFooter({ assets, variant = "home" }: BlogFooterProps) {
  const className =
    variant === "page" ? "blog-page__footer blog-footer" : "blog-footer";

  return (
    <footer className={className}>
      <a href={`mailto:${site.author.email}`} className="blog-footer__email">
        <BlogFooterEmailIcon />
        <span>{site.author.email}</span>
      </a>
      <div className="blog-footer__social">
        <a
          href={site.author.github}
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className="blog-footer__social-link"
        >
          <BlogNavIcon src={assets.github} width={44} height={44} />
        </a>
        <a
          href={site.author.linkedin}
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="blog-footer__social-link"
        >
          <BlogNavIcon src={assets.linkedin} width={44} height={44} />
        </a>
      </div>
    </footer>
  );
}
