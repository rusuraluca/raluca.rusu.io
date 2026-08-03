import type { ThemeRegistration } from "shiki";

/** Syntax colors aligned with the site palette (see scripts/recolor-blog-icons.ts). */
const palette = {
  light: {
    ink: "#1f2328",
    muted: "#656d76",
    sapphire: "#4361ee",
    royal: "#3a0ca3",
    indigo: "#7209b7",
    pink: "#f72585",
    aqua: "#4cc9f0",
    code: "#2d6a4f",
    accent: "#e85d4c",
    bg: "#ffffff",
  },
  dark: {
    ink: "#e6edf3",
    muted: "#9ba3ad",
    sapphire: "#98a8f6",
    royal: "#9379cc",
    indigo: "#b178d7",
    pink: "#fb87bc",
    aqua: "#9de1f7",
    code: "#3dffab",
    accent: "#ff7a66",
    bg: "#0d1117",
  },
} as const;

function tokenColors(mode: "light" | "dark") {
  const c = palette[mode];

  return [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: c.muted, fontStyle: "italic" },
    },
    {
      scope: ["string", "constant.other.symbol", "constant.other.key"],
      settings: { foreground: c.aqua },
    },
    {
      scope: [
        "constant.numeric",
        "number",
        "constant.language.boolean",
        "constant.language.null",
        "constant.language.undefined",
      ],
      settings: { foreground: c.pink },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "keyword.control",
        "keyword.operator.new",
      ],
      settings: { foreground: c.royal },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "variable.function",
      ],
      settings: { foreground: c.sapphire },
    },
    {
      scope: [
        "entity.name.type",
        "support.type",
        "entity.other.inherited-class",
        "storage.type.cs",
      ],
      settings: { foreground: c.indigo },
    },
    {
      scope: ["entity.name.tag", "support.class.component"],
      settings: { foreground: c.code },
    },
    {
      scope: ["variable", "identifier", "meta.definition.variable"],
      settings: { foreground: c.ink },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "keyword.operator",
        "punctuation.definition.string",
      ],
      settings: { foreground: c.muted },
    },
    {
      scope: ["constant", "entity.name.constant", "support.constant"],
      settings: { foreground: c.accent },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: c.accent, fontStyle: "italic" },
    },
  ];
}

export const siteLightTheme: ThemeRegistration = {
  name: "site-light",
  type: "light",
  colors: {
    "editor.background": palette.light.bg,
    "editor.foreground": palette.light.ink,
  },
  tokenColors: tokenColors("light"),
};

export const siteDarkTheme: ThemeRegistration = {
  name: "site-dark",
  type: "dark",
  colors: {
    "editor.background": palette.dark.bg,
    "editor.foreground": palette.dark.ink,
  },
  tokenColors: tokenColors("dark"),
};

export const shikiThemes = {
  light: siteLightTheme,
  dark: siteDarkTheme,
} as const;
