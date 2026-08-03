"use client";

import { usePathname } from "next/navigation";
import { BlogHome } from "@/components/blog/BlogHome";
import { BlogPageShell } from "@/components/blog/BlogPageShell";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <div className="blog-home-shell">
        <BlogHome />
        <main id="main" className="visually-hidden" tabIndex={-1}>
          {children}
        </main>
      </div>
    );
  }

  return <BlogPageShell>{children}</BlogPageShell>;
}
