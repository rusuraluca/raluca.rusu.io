export type SiteTheme = "light" | "dark";

export function updateFavicon(theme: SiteTheme) {
  if (typeof document === "undefined") return;

  const suffix = theme === "dark" ? "dark" : "light";
  const links = [
    { rel: "icon", href: `/favicon-${suffix}.png` },
    { rel: "apple-touch-icon", href: `/apple-icon-${suffix}.png` },
  ] as const;

  for (const { rel, href } of links) {
    let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.appendChild(link);
    }

    link.href = href;
  }
}

export function applyTheme(theme: SiteTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateFavicon(theme);
}
