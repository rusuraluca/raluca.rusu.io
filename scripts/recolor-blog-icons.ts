/**
 * Recolor blog-home SVGs from the site palette with light/dark two-tone pairs.
 * Run: npx tsx scripts/recolor-blog-icons.ts
 */
import fs from "node:fs";
import path from "node:path";

type TonePair = { primary: string; light: string };

const PALETTE = {
  neonPink: "#f72585",
  indigoBloom: "#7209b7",
  vividRoyal: "#3a0ca3",
  electricSapphire: "#4361ee",
  skyAqua: "#4cc9f0",
} as const;

const ICON_BASE: Record<string, keyof typeof PALETTE | "neutral"> = {
  recorder: "neonPink",
  newsletter: "indigoBloom",
  laptop: "electricSapphire",
  experiments: "vividRoyal",
  projects: "skyAqua",
  resume: "neonPink",
  toggle: "neutral",
};

/** Footer social glyphs — single path, no shadow layer */
const SOCIAL_INK = {
  light: "#1f2328",
  dark: "#e6edf3",
} as const;

const LINKEDIN_BLUE = {
  light: "#0a66c2",
  dark: "#91caff",
} as const;

const NEUTRAL = {
  light: { primary: "#57606a", light: "#d0d7de" },
  dark: { primary: "#c9d1d9", light: "#484f58" },
} as const;

function mixWhite(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) + (255 - ((n >> 16) & 255)) * amount);
  const g = Math.round(((n >> 8) & 255) + (255 - ((n >> 8) & 255)) * amount);
  const b = Math.round((n & 255) + (255 - (n & 255)) * amount);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function mixBlack(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * (1 - amount));
  const g = Math.round(((n >> 8) & 255) * (1 - amount));
  const b = Math.round((n & 255) * (1 - amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function pairFor(base: string, theme: "light" | "dark", lighter = 0.58): TonePair {
  if (theme === "light") {
    return { primary: base, light: mixWhite(base, lighter) };
  }
  // Dark: brighter primary on canvas, softer shadow depth (less muddy)
  return { primary: mixWhite(base, 0.45), light: mixBlack(base, 0.38) };
}

function iconColors(): Record<string, { light: TonePair; dark: TonePair }> {
  const colors: Record<string, { light: TonePair; dark: TonePair }> = {
    toggle: NEUTRAL,
  };

  for (const [icon, key] of Object.entries(ICON_BASE)) {
    if (key === "neutral") continue;
    const base = PALETTE[key];

    if (icon === "resume") {
      colors[icon] = {
        light: pairFor(base, "light", 0.65),
        dark: {
          primary: "#ff8ab3",
          light: mixBlack(base, 0.38),
        },
      };
      continue;
    }

    colors[icon] = {
      light: pairFor(base, "light", 0.58),
      dark: pairFor(base, "dark", 0.58),
    };
  }

  colors.github = {
    light: { primary: SOCIAL_INK.light, light: SOCIAL_INK.light },
    dark: { primary: SOCIAL_INK.dark, light: SOCIAL_INK.dark },
  };
  colors.linkedin = {
    light: { primary: LINKEDIN_BLUE.light, light: LINKEDIN_BLUE.light },
    dark: { primary: LINKEDIN_BLUE.dark, light: LINKEDIN_BLUE.dark },
  };

  return colors;
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function uniqueHexes(content: string): string[] {
  return [
    ...new Set(
      [...content.matchAll(/#[0-9A-Fa-f]{6}/g)].map((match) =>
        match[0].toLowerCase(),
      ),
    ),
  ];
}

function replaceHex(content: string, from: string, to: string) {
  const upper = from.toUpperCase();
  return content.replaceAll(from, to).replaceAll(upper, to);
}

function applyTwoTone(
  content: string,
  primary: string,
  light: string,
  theme: "light" | "dark",
) {
  const present = uniqueHexes(content);
  if (present.length === 0) return content;

  if (present.length === 1) {
    return replaceHex(content, present[0]!, primary);
  }

  const sorted = [...present].sort((a, b) => luminance(a) - luminance(b));
  const dark = sorted[0]!;
  const bright = sorted[sorted.length - 1]!;

  let next = content;

  if (theme === "light") {
    next = replaceHex(next, dark, primary);
    next = replaceHex(next, bright, light);
  } else {
    next = replaceHex(next, bright, primary);
    next = replaceHex(next, dark, light);
  }

  for (const hex of present) {
    if (hex !== dark && hex !== bright) {
      next = replaceHex(next, hex, primary);
    }
  }

  return next;
}

function paintResumePath(
  match: string,
  fill: string,
  stroke: string,
  withStroke: boolean,
) {
  let next = match.replace(/fill="[^"]+"/, `fill="${fill}"`);
  next = next.replace(/\sstroke(?:-[\w-]+)?="[^"]*"/g, "");
  next = next.replace(/\s*\/?>\s*$/, "");

  if (withStroke) {
    return `${next} stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>`;
  }

  return `${next}/>`;
}

function ensureResumeTwoTone(
  content: string,
  primary: string,
  light: string,
  theme: "light" | "dark",
) {
  let next = applyTwoTone(content, primary, light, theme);

  const paperFill = theme === "light" ? light : primary;
  const frameFill = theme === "light" ? primary : light;
  const accentFill = primary;

  next = next.replace(/<path id="Vector_4"[^>]*\/>/, (match) =>
    paintResumePath(match, paperFill, primary, true),
  );
  next = next.replace(/<path id="Vector_3"[^>]*\/>/, (match) =>
    paintResumePath(match, frameFill, primary, true),
  );
  next = next.replace(/<path id="Vector_2"[^>]*\/>/, (match) =>
    paintResumePath(match, accentFill, primary, true),
  );
  next = next.replace(/<path id="Vector"[^>]*\/>/, (match) =>
    paintResumePath(match, accentFill, primary, true),
  );

  return next;
}

function ensureSocialGlyph(content: string, fill: string, groupId: string) {
  const vectorMatch = content.match(
    /<path id="Vector"[^>]*d="([^"]+)"[^>]*\/>/,
  );
  if (vectorMatch) {
    const rules = vectorMatch[0].includes("fill-rule")
      ? ' fill-rule="evenodd" clip-rule="evenodd"'
      : "";
    return `<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="${groupId}">
<path id="Vector"${rules} d="${vectorMatch[1]!}" fill="${fill}"/>
</g>
</svg>
`;
  }

  return content;
}

const iconColorMap = iconColors();
const publicDir = path.join(process.cwd(), "public", "blog-home");

for (const theme of ["light", "dark"] as const) {
  const dir = path.join(publicDir, theme);

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".svg")) continue;

    const key = file.replace(".svg", "");
    const colors = iconColorMap[key];
    if (!colors) {
      console.warn(`No palette for ${theme}/${file}, skipping`);
      continue;
    }

    const pair = colors[theme];
    const filePath = path.join(dir, file);
    const original = fs.readFileSync(filePath, "utf8");
    let updated = original;

    if (key === "resume") {
      updated = ensureResumeTwoTone(updated, pair.primary, pair.light, theme);
    } else if (key === "github" || key === "linkedin") {
      updated = ensureSocialGlyph(updated, pair.primary, `${key}-link`);
    } else {
      updated = applyTwoTone(updated, pair.primary, pair.light, theme);
    }

    if (updated !== original) {
      fs.writeFileSync(filePath, updated);
      console.log(`Updated ${theme}/${file}`);
    }
  }
}

console.log("\nPalette pairs:");
for (const [icon, pairs] of Object.entries(iconColorMap)) {
  console.log(
    `${icon}: light ${pairs.light.primary}/${pairs.light.light}, dark ${pairs.dark.primary}/${pairs.dark.light}`,
  );
}
