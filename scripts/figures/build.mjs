// Builds the article figures as SVG into public/writing/<slug>/.
// Every figure gets the ostapkvl.com watermark (WRITING.md). No dependencies: node scripts/figures/build.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const C = { paper: "#FAF8F4", ink: "#1A1815", accent: "#C05621", muted: "#6E675F", line: "#E3DED6", soft: "#F1ECE4", green: "#3F7D5A", amber: "#B7791F", red: "#B23B2E" };
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO = "Menlo, Consolas, monospace";
const W = 1200, H = 675;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const text = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${o.font || SANS}" font-size="${o.size || 18}" fill="${o.fill || C.ink}"` +
  `${o.weight ? ` font-weight="${o.weight}"` : ""}${o.anchor ? ` text-anchor="${o.anchor}"` : ""}` +
  `${o.style ? ` font-style="${o.style}"` : ""}${o.ls ? ` letter-spacing="${o.ls}"` : ""}>${esc(s)}</text>`;
const lines = (x, y, arr, o = {}) => arr.map((s, i) => text(x, y + i * (o.lh || 24), s, o)).join("");
const rect = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 10}" fill="${o.fill || "#fff"}" stroke="${o.stroke || C.line}" stroke-width="${o.sw || 1.5}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;
const arrow = (x1, y1, x2, y2, o = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.color || C.muted}" stroke-width="${o.w || 2}" marker-end="url(#arr${o.accent ? "A" : ""})"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;
const chip = (x, y, label, color) => {
  const w = label.length * 8.2 + 22;
  return `<rect x="${x}" y="${y}" width="${w}" height="26" rx="13" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-opacity="0.5"/>` +
    text(x + w / 2, y + 18, label, { font: MONO, size: 13, fill: color, anchor: "middle" });
};

function svg(title, body, { w = W, h = H, subtitle } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<defs>
<marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.muted}"/></marker>
<marker id="arrA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.accent}"/></marker>
</defs>
<rect width="100%" height="100%" fill="${C.paper}"/>
${text(48, 62, title, { font: SERIF, size: 30, fill: C.ink })}
${subtitle ? text(48, 92, subtitle, { size: 17, fill: C.muted }) : ""}
${body}
${text(w - 28, h - 22, "ostapkvl.com", { font: MONO, size: 15, fill: C.muted, anchor: "end", ls: 0.5 })}
</svg>
`;
}

const figures = {};

// ---------- human-attention-is-the-bottleneck ----------
figures["human-attention-is-the-bottleneck/risk-matrix"] = () => {
  const x0 = 150, y0 = 130, gw = 900, gh = 440;
  const zones = [
    // [col, row, w, h, label, color] in thirds; row 0 = high impact (top)
    [0, 2, 2, 1, "Do it, log it", C.green],
    [0, 1, 1, 1, "Do it, sample it", C.green],
    [1, 1, 1, 1, "Propose, person approves", C.amber],
    [2, 2, 1, 1, "Propose, person approves", C.amber],
    [0, 0, 1, 1, "Propose, person approves", C.amber],
    [1, 0, 2, 1, "Person decides, AI prepares", C.red],
    [2, 1, 1, 1, "Person decides, AI prepares", C.red],
  ];
  let b = "";
  for (const [c, r, w, h, label, col] of zones) {
    const x = x0 + (c * gw) / 3, y = y0 + (r * gh) / 3, ww = (w * gw) / 3, hh = (h * gh) / 3;
    b += `<rect x="${x}" y="${y}" width="${ww}" height="${hh}" fill="${col}" fill-opacity="0.09" stroke="${C.paper}" stroke-width="3"/>`;
    b += text(x + 14, y + hh - 14, label, { size: 15, fill: col, weight: 600 });
  }
  b += rect(x0, y0, gw, gh, { fill: "none", r: 0, stroke: C.line });
  const pts = [
    // [uncertainty 0..1, impact 0..1, label]
    [0.1, 0.12, "Tag an incoming email"],
    [0.12, 0.47, "Copy a value that matches its quote"],
    [0.47, 0.2, "Guess a missing date"],
    [0.45, 0.5, "Draft a reply to a customer"],
    [0.74, 0.56, "Choose between two sources"],
    [0.1, 0.8, "Send a signed document"],
    [0.47, 0.86, "Change a supplier's bank details"],
  ];
  for (const [u, im, label] of pts) {
    const x = x0 + u * gw, y = y0 + (1 - im) * gh;
    b += `<circle cx="${x}" cy="${y}" r="7" fill="${C.ink}"/>` + text(x + 13, y + 6, label, { size: 15 });
  }
  b += text(x0 + gw / 2, y0 + gh + 44, "How unsure the AI is  →", { anchor: "middle", size: 17, fill: C.muted });
  b += `<text x="${x0 - 46}" y="${y0 + gh / 2}" font-family="${SANS}" font-size="17" fill="${C.muted}" text-anchor="middle" transform="rotate(-90 ${x0 - 46} ${y0 + gh / 2})">What it costs if it is wrong  →</text>`;
  return svg("Who decides: impact × uncertainty", b, { subtitle: "Route each step by what a mistake costs and how sure the model is, not by confidence alone." });
};

figures["human-attention-is-the-bottleneck/attention-budget"] = () => {
  const x0 = 260, y0 = 170, bw = 860, bh = 70;
  const rows = [
    ["Review everything", [[100, "Every field, every request, same care", C.muted]]],
    ["Attention first", [[58, "Folded: matches its source", C.green], [27, "Glance: guessed or optional", C.amber], [15, "Decide", C.red]]],
  ];
  let b = "";
  rows.forEach(([label, segs], i) => {
    const y = y0 + i * 170;
    b += text(48, y + 44, label, { font: SERIF, size: 24 });
    let x = x0;
    for (const [pct, l, col] of segs) {
      const w = (pct / 100) * bw;
      b += `<rect x="${x}" y="${y}" width="${w - 4}" height="${bh}" rx="8" fill="${col}" fill-opacity="${col === C.muted ? 0.18 : 0.16}" stroke="${col}" stroke-opacity="0.55"/>`;
      b += text(x + 14, y + 30, `${pct}%`, { font: MONO, size: 17, fill: col, weight: 600 });
      b += text(x + 14, y + 54, l, { size: 14, fill: C.ink });
      x += w;
    }
  });
  b += text(48, 560, "Share of fields on a typical request, and where the reviewer's minutes go. Illustrative numbers.", { size: 16, fill: C.muted });
  b += text(48, 590, "The point: most of the screen should not ask for attention at all.", { size: 16, fill: C.muted });
  return svg("Where a reviewer's attention goes", b, { subtitle: "Same request, two screens." });
};

// ---------- every-value-needs-a-source ----------
figures["every-value-needs-a-source/pipeline"] = () => {
  let b = "";
  const src = [["Emails", 150], ["Call notes", 230], ["Records you trust", 310]];
  for (const [l, y] of src) b += rect(48, y, 190, 54, { fill: C.soft }) + text(143, y + 33, l, { anchor: "middle", size: 16 });
  const steps = [
    ["Detect", ["Is there a request?", "One thread, many asks"], C.ink],
    ["Extract", ["Each value + the exact", "words it came from"], C.ink],
    ["Verify", ["Is the quote real?", "Do sources agree?"], C.accent],
    ["Review", ["A person confirms", "what needs a decision"], C.green],
  ];
  const x0 = 300, w = 190, gap = 30, y = 190;
  steps.forEach(([t, ls, col], i) => {
    const x = x0 + i * (w + gap);
    b += rect(x, y, w, 130, { stroke: col, sw: 2 });
    b += text(x + 18, y + 38, t, { font: SERIF, size: 24, fill: col });
    b += lines(x + 18, y + 72, ls, { size: 14.5, fill: C.ink, lh: 22 });
    if (i < steps.length - 1) b += arrow(x + w + 2, y + 65, x + w + gap - 4, y + 65);
  });
  src.forEach(([, yy], i) => { b += arrow(240, yy + 27, x0 - 6, y + 30 + i * 35); });
  b += rect(300, 390, 850, 120, { fill: "#fff", dash: "6 6" });
  b += text(322, 426, "What comes out", { font: SERIF, size: 20 });
  b += lines(322, 458, ["A draft form. Every value links to its source. Guesses are marked as guesses.", "Missing values stay empty. Nothing is saved or sent until a person confirms."], { size: 16, lh: 26 });
  b += arrow(1090, 320, 1090, 386, { accent: true });
  return svg("From conversation to a checked form", b, { subtitle: "Three steps run by the model and by code. The fourth belongs to a person." });
};

figures["every-value-needs-a-source/field-states"] = () => {
  let b = "";
  b += rect(48, 120, 1104, 470, { fill: "#fff" });
  b += text(76, 162, "New supplier setup · Northwind Packaging", { font: SERIF, size: 22 });
  b += chip(830, 144, "Draft · proposed by assistant", C.muted);
  const rows = [
    ["Legal name", "Northwind Packaging Ltd", "email · Mar 3", "from source", C.green],
    ["Payment terms", "Net 45", "call · 04:12", "from source", C.green],
    ["Start date", "Nov 1", "\"early next month\"", "guessed", C.amber],
    ["Bank account", "two different accounts", "email vs. vendor portal", "conflict", C.red],
    ["Tax ID", "—", "not in any source", "missing", C.muted],
    ["Same terms as", "suggests: Baltic Crates", "\"same as last time\"", "pick one", C.accent],
  ];
  rows.forEach(([k, v, src, st, col], i) => {
    const y = 196 + i * 56;
    b += `<line x1="76" y1="${y + 40}" x2="1124" y2="${y + 40}" stroke="${C.line}"/>`;
    b += text(76, y + 26, k, { size: 16, fill: C.muted });
    b += text(290, y + 26, v, { size: 17, fill: st === "missing" ? C.muted : C.ink, style: st === "missing" ? "italic" : undefined });
    b += text(620, y + 26, src, { font: MONO, size: 13.5, fill: C.muted });
    b += chip(940, y + 8, st, col);
  });
  b += rect(76, 538, 1048, 38, { fill: C.red, stroke: C.red, r: 8 }).replace(`fill="${C.red}"`, `fill="${C.red}" fill-opacity="0.08"`);
  b += text(96, 563, "Save is blocked: 1 conflict, 1 choice to make. The assistant does not pick for you.", { size: 16, fill: C.red });
  return svg("Every value shows where it came from", b, { subtitle: "Each value shows its state, not just the value. Example data." });
};

import continuityFigures from "./figures-continuity.mjs";
Object.assign(figures, continuityFigures(C, { text, rect, arrow, svg }));

import patternFigures from "./figures-patterns.mjs";
Object.assign(figures, patternFigures(C, { text, rect, arrow, svg }));

import attentionFigures from "./figures-attention.mjs";
Object.assign(figures, attentionFigures(C, { text, rect, lines, arrow, svg }));

import humanFigures from "./figures-human.mjs";
Object.assign(figures, humanFigures(C, {text, lines, rect, arrow, svg}));

import editorialFigures from "./figures-editorial.mjs";
Object.assign(figures, editorialFigures(C, {text, rect, arrow, svg}));

import reaFigures from "./figures-rea.mjs";
Object.assign(figures, reaFigures(C, {text, rect, arrow, svg}));

import consoleFigures from "./figures-console.mjs";
Object.assign(figures, consoleFigures(C, {text, rect, arrow, svg}));

// Codex-drafted articles add their figures below (see the article's FIGURE SPECS).
import("./figures-extra.mjs").then((m) => Object.assign(figures, m.default(C, { text, lines, rect, arrow, chip, svg, SERIF, SANS, MONO, W, H }))).catch(() => {}).finally(() => {
  const only = process.argv[2];
  for (const [key, make] of Object.entries(figures)) {
    if (only && !key.startsWith(only)) continue;
    const out = join(ROOT, "public", "writing", `${key}.svg`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, make());
    console.log("wrote", out.replace(ROOT + "/", ""));
  }
});
