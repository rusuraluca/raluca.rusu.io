import type { Metadata } from "next";
import { Fredoka, Geist, JetBrains_Mono, Luckiest_Guy } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { SkipLink } from "@/components/layout/SkipLink";
import { HomeBodyClass } from "@/components/layout/HomeBodyClass";
import { sharedSocialMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  authors: [{ name: site.author.name, url: site.url }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    ...sharedSocialMetadata.openGraph,
  },
  twitter: {
    title: site.title,
    description: site.description,
    ...sharedSocialMetadata.twitter,
  },
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} ${fredoka.variable} ${luckiestGuy.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SkipLink />
        <HomeBodyClass />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
