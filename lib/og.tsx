import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";

const fontsDir = path.join(process.cwd(), "assets", "fonts");

export const ogSize = { width: 1200, height: 630 };

export function ogFonts() {
  return [
    {
      name: "Newsreader",
      data: fs.readFileSync(path.join(fontsDir, "newsreader-500.ttf")),
      weight: 500 as const,
      style: "normal" as const,
    },
    {
      name: "IBM Plex Mono",
      data: fs.readFileSync(path.join(fontsDir, "plexmono-400.ttf")),
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}

export function ogCard(opts: {
  eyebrow: string;
  title: string;
  subline: string;
  footer: string;
  titleSize?: number;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF8F4",
          color: "#1A1815",
          padding: "64px 72px",
          borderTop: "10px solid #C05621",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: 24,
            color: "#6E675F",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#C05621",
              marginRight: 16,
              marginTop: 7,
            }}
          />
          {opts.eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: opts.titleSize ?? 76,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 1020,
            }}
          >
            {opts.title}
          </div>
          <div
            style={{
              marginTop: 26,
              fontFamily: "IBM Plex Mono",
              fontSize: 26,
              color: "#6E675F",
              maxWidth: 980,
              lineHeight: 1.45,
            }}
          >
            {opts.subline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(26,24,21,0.16)",
            paddingTop: 26,
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            color: "#6E675F",
          }}
        >
          <span>ostapkvl.com</span>
          <span>{opts.footer}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: ogFonts() }
  );
}
