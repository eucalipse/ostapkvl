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

/** A small node-and-edge graph motif for articles about code graphs, memory or structure. */
function ogGraphMotif() {
  const nodes: [number, number][] = [
    [40, 30], [140, 15], [230, 55], [90, 90], [200, 110], [300, 30], [280, 95],
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 5], [4, 6], [5, 6]];
  return (
    <svg width="340" height="140" viewBox="0 0 340 140" style={{ position: "absolute", right: 56, top: 64 }}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#2E4EC4" strokeOpacity={0.35} strokeWidth={1.5}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 || i === 4 ? 7 : 5} fill="#2E4EC4" fillOpacity={i === 2 || i === 4 ? 1 : 0.55} />
      ))}
    </svg>
  );
}

export function ogCard(opts: {
  eyebrow: string;
  title: string;
  subline: string;
  footer: string;
  titleSize?: number;
  graphic?: "graph";
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
          backgroundColor: "#ECEEF1",
          color: "#1A1815",
          padding: "64px 72px",
          borderTop: "10px solid #2E4EC4",
          position: "relative",
        }}
      >
        {opts.graphic === "graph" && ogGraphMotif()}
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: 24,
            color: "#69707A",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#2E4EC4",
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
              color: "#69707A",
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
            color: "#69707A",
          }}
        >
          <span>{opts.footer}</span>
          <span>ostapkvl.com</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: ogFonts() }
  );
}
