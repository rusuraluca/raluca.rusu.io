import { Children, Fragment, isValidElement, type ReactNode } from "react";

export type BlogNavItemId =
  | "about"
  | "newsletter"
  | "articles"
  | "experiments"
  | "projects"
  | "resume";

export type BlogNavItem = {
  id: BlogNavItemId;
  href: string;
  label: ReactNode;
  homeClassName: string;
  pageClassName: string;
  assetKey:
    | "recorder"
    | "newsletter"
    | "laptop"
    | "experiments"
    | "projects"
    | "resume";
  iconWidth: number;
  iconHeight: number;
  openInNewTab?: boolean;
  matches: (pathname: string) => boolean;
};

export const blogNavItems: BlogNavItem[] = [
  {
    id: "about",
    href: "/about",
    label: "about me",
    homeClassName: "blog-nav__item--about",
    pageClassName: "blog-page-nav__item--about",
    assetKey: "recorder",
    iconWidth: 179,
    iconHeight: 170,
    matches: (pathname) => pathname === "/about",
  },
  {
    id: "newsletter",
    href: "/newsletters",
    label: (
      <>
        newsletter
        <br />
        &lsquo;of choice&rsquo;
      </>
    ),
    homeClassName: "blog-nav__item--newsletter",
    pageClassName: "blog-page-nav__item--newsletter",
    assetKey: "newsletter",
    iconWidth: 153,
    iconHeight: 146,
    matches: (pathname) => pathname === "/newsletters",
  },
  {
    id: "articles",
    href: "/articles",
    label: "articles",
    homeClassName: "blog-nav__item--articles",
    pageClassName: "blog-page-nav__item--articles",
    assetKey: "laptop",
    iconWidth: 210,
    iconHeight: 170,
    matches: (pathname) =>
      pathname === "/articles" || pathname.startsWith("/articles/"),
  },
  {
    id: "experiments",
    href: "/experiments",
    label: "experiments",
    homeClassName: "blog-nav__item--experiments",
    pageClassName: "blog-page-nav__item--experiments",
    assetKey: "experiments",
    iconWidth: 119,
    iconHeight: 162,
    matches: (pathname) =>
      pathname === "/experiments" || pathname.startsWith("/experiments/"),
  },
  {
    id: "projects",
    href: "/projects",
    label: "projects",
    homeClassName: "blog-nav__item--projects",
    pageClassName: "blog-page-nav__item--projects",
    assetKey: "projects",
    iconWidth: 155,
    iconHeight: 178,
    matches: (pathname) =>
      pathname === "/projects" || pathname.startsWith("/projects/"),
  },
  {
    id: "resume",
    href: "/resume.pdf",
    label: "resume",
    homeClassName: "blog-nav__item--resume",
    pageClassName: "blog-page-nav__item--resume",
    assetKey: "resume",
    iconWidth: 138,
    iconHeight: 141,
    openInNewTab: true,
    matches: (pathname) => pathname === "/resume.pdf",
  },
];

export function getCurrentBlogNavItem(pathname: string): BlogNavItem | null {
  return blogNavItems.find((item) => item.matches(pathname)) ?? null;
}

export function getInlineBlogNavItems(pathname: string): BlogNavItem[] {
  const current = getCurrentBlogNavItem(pathname);
  if (!current) return blogNavItems;
  return blogNavItems.filter((item) => item.id !== current.id);
}

/** Flatten nav label ReactNode to a single line of text. */
function flattenLabelText(label: ReactNode): string {
  if (typeof label === "string") {
    return label.replace(/\s+/g, " ").trim();
  }
  if (typeof label === "number") {
    return String(label);
  }
  if (Array.isArray(label)) {
    return label
      .map(flattenLabelText)
      .filter(Boolean)
      .join(" ");
  }
  if (isValidElement<{ children?: ReactNode }>(label)) {
    if (label.type === "br") return "";
    if (label.type === Fragment) {
      return Children.toArray(label.props.children)
        .map(flattenLabelText)
        .filter(Boolean)
        .join(" ");
    }
    if (label.props.children != null) {
      return flattenLabelText(label.props.children);
    }
  }
  return "";
}

/** Sentence-case, single-line title for the current page header. */
export function toPageTitle(label: ReactNode): string {
  const text = flattenLabelText(label);
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
