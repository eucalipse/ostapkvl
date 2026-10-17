import fs from "fs";
const W = 1584, H = 396;
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// Bowyer-Watson Delaunay
function delaunay(pts) {
  const big = [[-1e4, -1e4], [1e4 + W, -1e4], [W / 2, 1e4 + H]];
  const P = pts.concat(big); const n = pts.length;
  let tris = [[n, n + 1, n + 2]];
  const circ = (t) => {
    const [a, b, c] = t.map((i) => P[i]);
    const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
    const ux = ((a[0] ** 2 + a[1] ** 2) * (b[1] - c[1]) + (b[0] ** 2 + b[1] ** 2) * (c[1] - a[1]) + (c[0] ** 2 + c[1] ** 2) * (a[1] - b[1])) / d;
    const uy = ((a[0] ** 2 + a[1] ** 2) * (c[0] - b[0]) + (b[0] ** 2 + b[1] ** 2) * (a[0] - c[0]) + (c[0] ** 2 + c[1] ** 2) * (b[0] - a[0])) / d;
    return [ux, uy, (a[0] - ux) ** 2 + (a[1] - uy) ** 2];
  };
  let cc = tris.map(circ);
  for (let i = 0; i < n; i++) {
    const [x, y] = P[i]; const bad = [];
    tris.forEach((t, k) => { const [ux, uy, r2] = cc[k]; if ((x - ux) ** 2 + (y - uy) ** 2 < r2) bad.push(k); });
    const edges = new Map();
    for (const k of bad) { const t = tris[k]; for (const [a, b] of [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]]) { const key = a < b ? a + "," + b : b + "," + a; edges.set(key, edges.has(key) ? null : [a, b]); } }
    const keep = tris.map((t, k) => k).filter((k) => !bad.includes(k));
    tris = keep.map((k) => tris[k]); cc = keep.map((k) => cc[k]);
    for (const e of edges.values()) if (e) { const t = [e[0], e[1], i]; tris.push(t); cc.push(circ(t)); }
  }
  return tris.filter((t) => t.every((i) => i < n));
}

// Eye geometry
function eyePoints(cx, cy, ew, eh, ir, steps = 22) {
  const lid = [], iris = [], pupil = [];
  for (let i = 0; i <= steps; i++) { const t = -1 + (2 * i) / steps; const x = cx + t * ew; const d = eh * (1 - t * t); lid.push([x, cy - d]); if (i > 0 && i < steps) lid.push([x, cy + d]); }
  for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2; iris.push([cx + ir * Math.cos(a), cy + ir * Math.sin(a)]); }
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + 0.2; pupil.push([cx + ir * 0.42 * Math.cos(a), cy + ir * 0.42 * Math.sin(a)]); }
  return { lid, iris, pupil, all: [...lid, ...iris, ...pupil, [cx, cy]] };
}
const eyePath = (cx, cy, ew, eh) => `M${cx - ew},${cy} Q${cx},${cy - 2 * eh} ${cx + ew},${cy} Q${cx},${cy + 2 * eh} ${cx - ew},${cy} Z`;
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = (c) => `rgb(${c.join(",")})`;
const FONT_S = "Georgia, serif", FONT_M = "JetBrains Mono, Menlo, monospace";

function textBlock(x, y, { ink, muted, anchor = "start", url = true }) {
  return `<text x="${x}" y="${y}" font-family="${FONT_S}" font-size="44" fill="${ink}" text-anchor="${anchor}" letter-spacing="0.5">Business AI agents at work</text>
<text x="${x}" y="${y + 38}" font-family="${FONT_M}" font-size="15" fill="${muted}" text-anchor="${anchor}" letter-spacing="3">ARCHITECTURE · AGENTS · HUMAN REVIEW</text>
${url ? "" : "<!--"}<text x="${x}" y="${y + 66}" font-family="${FONT_M}" font-size="15" fill="${muted}" text-anchor="${anchor}" letter-spacing="2" opacity="0.8">ostapkvl.com</text>${url ? "" : "-->"}`;
}
const FONTS = "";
const wrap = (bg, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${FONTS}<rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>`;

// Sample points: density rises toward (ex,ey)
function sample(r, n, ex, ey, avoid) {
  const pts = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) pts.push([i * W / 3, j * H]);
  while (pts.length < n) {
    const x = r() * W, y = r() * H; const d = Math.hypot(x - ex, (y - ey) * 2.2) / W;
    if (avoid && avoid(x, y)) continue;
    if (r() < Math.max(0.06, 1 - d * 2.4)) pts.push([x, y]);
  }
  return pts;
}

function vLight({ ex, ey, tx, ty, anchor, seed, fade }) {
  const r = rng(seed), ew = 150, eh = 58, ir = 40, eye = eyePoints(ex, ey, ew, eh, ir, 20);
  const pts = sample(r, 300, ex, ey, (x, y) => { const t = (x - ex) / ew; return Math.abs(t) < 1 && Math.abs(y - ey) < (eh + 2) * (1 - t * t) + 6; }).concat(eye.all);
  const tris = delaunay(pts); const seen = new Set(); let b = "";
  for (const t of tris) for (const [a, c] of [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]]) {
    const k = a < c ? a + "," + c : c + "," + a; if (seen.has(k)) continue; seen.add(k);
    const mx = (pts[a][0] + pts[c][0]) / 2, my = (pts[a][1] + pts[c][1]) / 2; const d = Math.min(1, Math.hypot(mx - ex, (my - ey) * 1.6) / 1000);
    b += `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[c][0]}" y2="${pts[c][1]}" stroke="#1A1815" stroke-opacity="${(0.5 * (1 - d) ** 2 + 0.04).toFixed(3)}" stroke-width="0.7"/>`;
  }
  for (const p of pts) { const d = Math.hypot(p[0] - ex, p[1] - ey); b += `<circle cx="${p[0]}" cy="${p[1]}" r="${d < 160 ? 2 : 1.3}" fill="${d < 50 ? "#C05621" : "#1A1815"}" opacity="${Math.max(0.15, 1 - d / 900)}"/>`; }
  b += `<path d="${eyePath(ex, ey, ew, eh)}" fill="none" stroke="#C05621" stroke-width="2"/><circle cx="${ex}" cy="${ey}" r="${ir}" fill="#C05621" fill-opacity="0.12" stroke="#C05621" stroke-width="1.6"/><circle cx="${ex}" cy="${ey}" r="12" fill="#1A1815"/>`;
  b += `<radialGradient id="tf" cx="0.5" cy="0.5" r="0.5"><stop offset="0.4" stop-color="#FAF8F4" stop-opacity="0.96"/><stop offset="1" stop-color="#FAF8F4" stop-opacity="0"/></radialGradient><ellipse cx="${fade[0]}" cy="${fade[1]}" rx="${fade[2]}" ry="${fade[3]}" fill="url(#tf)"/>`;
  b += `<text x="${tx}" y="${ty}" font-family="${FONT_S}" font-size="58" fill="#1A1815" text-anchor="${anchor}" font-weight="500">Building AI agents</text>
<text x="${tx}" y="${ty + 62}" font-family="${FONT_S}" font-size="58" fill="#1A1815" text-anchor="${anchor}" font-weight="500">that get work <tspan fill="#C05621">done.</tspan></text>`;
  return wrap("#FAF8F4", b);
}

const light = vLight({ex:1230,ey:205,tx:70,ty:125,anchor:"start",seed:3,fade:[330,150,420,140]}).replace('</svg>', '<text x="1555" y="374" text-anchor="end" font-family="monospace" font-size="17" fill="#6E675F">ostapkvl.com</text></svg>');
const dark=light.replaceAll('#FAF8F4','#16181B').replaceAll('#1A1815','#EFEBE4').replaceAll('#C05621','#F29E6C').replaceAll('#6E675F','#B2ACA3');
for(const [theme,body] of Object.entries({light,dark})) fs.writeFileSync(new URL(`../public/images/agent-network-${theme}.svg`,import.meta.url),body);
