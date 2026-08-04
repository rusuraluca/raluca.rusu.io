#!/usr/bin/env npx tsx
/**
 * Generate light/dark RR favicons using Luckiest Guy (site name font).
 *
 * Run: npx tsx scripts/generate-favicons.tsx
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { ImageResponse } from "next/og";

const FONT_URL =
  "https://fonts.gstatic.com/s/luckiestguy/v25/_gP_1RrxsjcxVyin9l9n_j2RSg.ttf";

const themes = {
  light: { bg: "#ffffff", fg: "#1f2328" },
  dark: { bg: "#0d1117", fg: "#e6edf3" },
} as const;

const sizes = [
  { name: "favicon", width: 32, height: 32, fontSize: 17 },
  { name: "apple-icon", width: 180, height: 180, fontSize: 92 },
] as const;

async function generateIcon(
  theme: keyof typeof themes,
  size: (typeof sizes)[number],
) {
  const { bg, fg } = themes[theme];
  const fontData = await fetch(FONT_URL).then((res) => res.arrayBuffer());

  const image = new ImageResponse(
    (
      <div
        style={{
          background: bg,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: fg,
          fontSize: size.fontSize,
          fontFamily: "Luckiest Guy",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        RR
      </div>
    ),
    {
      width: size.width,
      height: size.height,
      fonts: [
        {
          name: "Luckiest Guy",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );

  const outDir = join(process.cwd(), "public");
  const filename = `${size.name}-${theme}.png`;
  writeFileSync(join(outDir, filename), Buffer.from(await image.arrayBuffer()));
  console.log(`Created public/${filename}`);
}

async function main() {
  for (const theme of Object.keys(themes) as (keyof typeof themes)[]) {
    for (const size of sizes) {
      await generateIcon(theme, size);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
