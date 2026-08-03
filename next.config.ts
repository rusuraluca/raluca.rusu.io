import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      {
        source: "/writing",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/writing/:slug",
        destination: "/articles/:slug",
        permanent: true,
      },
      { source: "/contact", destination: "/", permanent: false },
      { source: "/speaking", destination: "/", permanent: false },
      { source: "/uses", destination: "/", permanent: false },
      { source: "/resume", destination: "/resume.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
