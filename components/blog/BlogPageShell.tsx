"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { BlogModeSwitch } from "@/components/blog/BlogModeSwitch";
import { BlogNavIcon } from "@/components/blog/BlogNavIcon";
import { BlogPageNavLink } from "@/components/blog/BlogPageNavLink";
import { ScrollToTop } from "@/components/blog/ScrollToTop";
import { blogHomeAssets, type BlogHomeTheme } from "@/components/blog/blog-home-assets";
import {
  getCurrentBlogNavItem,
  getInlineBlogNavItems,
  toPageTitle,
  type BlogNavItem,
} from "@/lib/blog-nav";
import { BlogFooter } from "@/components/blog/BlogFooter";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function getServerSnapshot() {
  return false;
}

function CurrentNavItem({
  item,
  assets,
}: {
  item: BlogNavItem;
  assets: (typeof blogHomeAssets)[BlogHomeTheme];
}) {
  const className = "blog-page__nav-current blog-page__nav-current-link";
  const content = (
    <>
      <span className="blog-page-nav__label blog-page__title">
        {toPageTitle(item.label)}
      </span>
      <span className="blog-page-nav__icon-wrap blog-page__nav-current-icon-wrap">
        <BlogNavIcon
          src={assets[item.assetKey]}
          className={`blog-page-nav__icon blog-page__nav-current-icon${item.id === "resume" ? " blog-page__nav-current-icon--resume" : ""}`}
          width={item.iconWidth}
          height={item.iconHeight}
        />
      </span>
    </>
  );

  if (item.openInNewTab) {
    return (
      <a
        href={item.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-current="page"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} aria-current="page">
      {content}
    </Link>
  );
}

function MissingPageNavTitle({
  assets,
}: {
  assets: (typeof blogHomeAssets)[BlogHomeTheme];
}) {
  return (
    <div className="blog-page__nav-current">
      <span className="blog-page-nav__label blog-page__title">Page not found</span>
      <span
        className="blog-page-nav__icon-wrap blog-page__nav-current-icon-wrap"
        aria-hidden="true"
      >
        <BlogNavIcon
          src={assets.experiments}
          className="blog-page-nav__icon blog-page__nav-current-icon"
          width={119}
          height={162}
        />
      </span>
    </div>
  );
}

/** Figma inner-page shell: logo + inline nav row, current page centered below. */
export function BlogPageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const assets = blogHomeAssets[isDark ? "dark" : "light"];
  const current = getCurrentBlogNavItem(pathname);
  const inlineItems = getInlineBlogNavItems(pathname);

  return (
    <div className="blog-page-shell">
      <div className="blog-page">
        <header className="blog-page__header">
          <div className="blog-page__header-row">
            <Link href="/" className="blog-page__brand" aria-label="Home">
              <span className="blog-page__brand-line">RALUCA</span>
              <span className="blog-page__brand-line">RUSU</span>
            </Link>

            <nav aria-label="Sections" className="blog-page__nav-inline">
              {inlineItems.map((item) => (
                <BlogPageNavLink
                  key={item.id}
                  href={item.href}
                  label={item.label}
                  className={item.pageClassName}
                  openInNewTab={item.openInNewTab}
                >
                  <BlogNavIcon
                    src={assets[item.assetKey]}
                    className="blog-page-nav__icon"
                    width={item.iconWidth}
                    height={item.iconHeight}
                  />
                </BlogPageNavLink>
              ))}
            </nav>

            <BlogModeSwitch className="blog-page__mode" />
          </div>

          {current ? (
            <CurrentNavItem item={current} assets={assets} />
          ) : (
            <MissingPageNavTitle assets={assets} />
          )}
        </header>

        <main id="main" className="blog-page__main">
          <div className="blog-page__content">{children}</div>
        </main>

        <BlogFooter assets={assets} variant="page" />

        <ScrollToTop />
      </div>
    </div>
  );
}
