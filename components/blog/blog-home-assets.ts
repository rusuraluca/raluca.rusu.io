/** Figma-exported homepage illustration assets (light / dark variants). */
export const blogHomeAssets = {
  light: {
    recorder: "/blog-home/light/recorder.svg",
    newsletter: "/blog-home/light/newsletter.svg",
    laptop: "/blog-home/light/laptop.svg",
    experiments: "/blog-home/light/experiments.svg",
    projects: "/blog-home/light/projects.svg",
    resume: "/blog-home/light/resume.svg",
    toggle: "/blog-home/light/toggle.svg",
    github: "/blog-home/light/github.svg",
    linkedin: "/blog-home/light/linkedin.svg",
  },
  dark: {
    recorder: "/blog-home/dark/recorder.svg",
    newsletter: "/blog-home/dark/newsletter.svg",
    laptop: "/blog-home/dark/laptop.svg",
    experiments: "/blog-home/dark/experiments.svg",
    projects: "/blog-home/dark/projects.svg",
    resume: "/blog-home/dark/resume.svg",
    toggle: "/blog-home/dark/toggle.svg",
    github: "/blog-home/dark/github.svg",
    linkedin: "/blog-home/dark/linkedin.svg",
  },
} as const;

export type BlogHomeTheme = keyof typeof blogHomeAssets;
