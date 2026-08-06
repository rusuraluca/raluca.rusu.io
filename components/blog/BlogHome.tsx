"use client";

import { useSyncExternalStore } from "react";
import { BlogModeSwitch } from "@/components/blog/BlogModeSwitch";
import { BlogNavIcon } from "@/components/blog/BlogNavIcon";
import { BlogNavLink } from "@/components/blog/BlogNavLink";
import { blogHomeAssets } from "@/components/blog/blog-home-assets";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { blogNavItems } from "@/lib/blog-nav";

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

/** Figma Blog homepage: full-bleed gate with illustrated nav row. */
export function BlogHome() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const assets = blogHomeAssets[isDark ? "dark" : "light"];

  return (
    <div className="blog-home">
      <div className="blog-home__center">
        <div className="blog-nav-row">
          <nav aria-label="Sections" className="blog-nav">
            {blogNavItems.map((item) => (
              <BlogNavLink
                key={item.id}
                href={item.href}
                label={item.label}
                className={item.homeClassName}
                openInNewTab={item.openInNewTab}
              >
                <BlogNavIcon
                  src={assets[item.assetKey]}
                  width={item.iconWidth}
                  height={item.iconHeight}
                />
              </BlogNavLink>
            ))}
          </nav>

          <BlogModeSwitch className="blog-home__mode" />
        </div>

        <header className="blog-hero">
          <h1 className="blog-hero__name">
            <span className="blog-hero__name-line">RALUCA</span>
            <span className="blog-hero__name-line">RUSU</span>
          </h1>
          <p className="blog-hero__title">
            <span className="blog-hero__title-line">SOFTWARE</span>
            <span className="blog-hero__title-line">ENGINEER</span>
          </p>
        </header>
      </div>

      <BlogFooter assets={assets} variant="home" />
    </div>
  );
}
