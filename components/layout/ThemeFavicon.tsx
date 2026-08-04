"use client";

import { useEffect } from "react";
import { updateFavicon, type SiteTheme } from "@/lib/theme-client";

function getThemeFromDocument(): SiteTheme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** Keeps favicon in sync when theme changes after hydration (e.g. mode toggle). */
export function ThemeFavicon() {
  useEffect(() => {
    updateFavicon(getThemeFromDocument());

    const observer = new MutationObserver(() => {
      updateFavicon(getThemeFromDocument());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
