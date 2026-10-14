// Figures for the Codex-drafted articles. Same helpers and watermark as build.mjs.
export default function extra(C, h) {
  const { text, lines, rect, arrow, svg, SERIF, MONO } = h;
  const f = {};

  // ---------- green-dashboards-dead-integrations ----------
  f["green-dashboards-dead-integrations/healthy-but-empty"] = () => {
    const x0 = 120, x1 = 1110, weeks = 16, step = (x1 - x0) / weeks;
    const wx = (i) => x0 + step * (i + 0.5);
    let b = "";
    // upper panel: health
    const uy0 = 140, uy1 = 230;
    b += text(48, uy0 - 14, "Health check", { size: 15, fill: C.muted });
    b += `<line x1="${x0}" y1="${uy1}" x2="${x1}" y2="${uy1}" stroke="${C.line}"/>`;
    b += text(x0 - 10, uy0 + 20, "OK", { font: MONO, size: 13, fill: C.muted, anchor: "end" });
    let path = "";
    for (let i = 0; i < weeks; i++) { path += `${i ? "L" : "M"}${wx(i)},${uy0 + 16} `; b += `<circle cx="${wx(i)}" cy="${uy0 + 16}" r="4" fill="${C.green}"/>`; }
    b += `<path d="${path}" stroke="${C.green}" stroke-width="2.5" fill="none"/>`;
    b += text(x1, uy0 + 46, "\"ok\" every single week", { size: 14, fill: C.green, anchor: "end" });
    // lower panel: useful work
    const ly0 = 330, ly1 = 560, vals = [96, 89, 92, 43, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    b += text(48, ly0 - 14, "Useful work done per week", { size: 15, fill: C.muted });
    for (const t of [0, 50, 100]) {
      const y = ly1 - (t / 100) * (ly1 - ly0);
      b += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${C.line}"/>` + text(x0 - 10, y + 5, String(t), { font: MONO, size: 13, fill: C.muted, anchor: "end" });
    }
    vals.forEach((v, i) => {
      const hgt = (v / 100) * (ly1 - ly0);
      if (v > 0) b += `<rect x="${wx(i) - step * 0.32}" y="${ly1 - hgt}" width="${step * 0.64}" height="${hgt}" rx="3" fill="${C.accent}" fill-opacity="0.85"/>`;
      else b += `<line x1="${wx(i) - 10}" y1="${ly1 - 2}" x2="${wx(i) + 10}" y2="${ly1 - 2}" stroke="${C.accent}" stroke-width="3"/>`;
    });
    // failure markers
    const marks = [[1, "chat bot account deactivated"], [3, "webhook event renamed"], [5, "model API key invalid"]];
    marks.forEach(([wk, label], j) => {
      const x = x0 + step * wk;
      b += `<line x1="${x}" y1="${uy0 - 4}" x2="${x}" y2="${ly1}" stroke="${C.muted}" stroke-dasharray="5 5"/>`;
      b += text(x + 6, 258 + j * 22, label, { size: 14, fill: C.ink });
    });
    ["Month 1", "Month 2", "Month 3", "Month 4"].forEach((m, i) => { b += text(x0 + step * (i * 4 + 2), ly1 + 30, m, { size: 14, fill: C.muted, anchor: "middle" }); });
    b += text(48, 640, "Illustrative numbers. The markers show the kind of failures, not their real order.", { size: 14, fill: C.muted });
    return svg("Healthy endpoint, missing work", b, { subtitle: "The status said ok while the work quietly went to zero." });
  };

  f["green-dashboards-dead-integrations/canary-loop"] = () => {
    let b = "";
    const bw = 300, bh = 96;
    const box = (x, y, t, s, col = C.ink) => rect(x, y, bw, bh, { stroke: col, sw: 2 }) + text(x + 20, y + 40, t, { font: SERIF, size: 22, fill: col }) + text(x + 20, y + 70, s, { size: 15, fill: C.muted });
    const top = 140, bot = 330, xs = [60, 450, 840];
    b += box(xs[0], top, "Scheduler", "Every hour, on a timer");
    b += box(xs[1], top, "Synthetic message", "Mentions the assistant + unique ID");
    b += box(xs[2], top, "Integration", "Same path as a real request");
    b += box(xs[2], bot, "Assistant", "Does a harmless test task");
    b += box(xs[1], bot, "Reply", "Appears where people look");
    b += box(xs[0], bot, "Checker", "Finds the reply with that ID", C.accent);
    b += arrow(xs[0] + bw + 4, top + bh / 2, xs[1] - 6, top + bh / 2, { accent: true });
    b += arrow(xs[1] + bw + 4, top + bh / 2, xs[2] - 6, top + bh / 2, { accent: true });
    b += arrow(xs[2] + bw / 2, top + bh + 4, xs[2] + bw / 2, bot - 6, { accent: true });
    b += arrow(xs[2] - 4, bot + bh / 2, xs[1] + bw + 6, bot + bh / 2, { accent: true });
    b += arrow(xs[1] - 4, bot + bh / 2, xs[0] + bw + 6, bot + bh / 2, { accent: true });
    b += arrow(xs[0] + bw / 2 - 60, bot - 4, xs[0] + bw / 2 - 60, top + bh + 6, { dash: "5 5" });
    b += text(xs[0] + bw / 2 - 50, top + bh + 52, "next run", { size: 14, fill: C.muted });
    b += rect(xs[0], 500, bw, 80, { stroke: C.red, sw: 2, fill: "#fff" }) + text(xs[0] + 20, 534, "No reply in time? Alert", { size: 18, fill: C.red, weight: 600 }) + text(xs[0] + 20, 560, "through a different channel", { size: 15, fill: C.muted });
    b += arrow(xs[0] + bw / 2 + 60, bot + bh + 4, xs[0] + bw / 2 + 60, 494, { color: C.red });
    b += text(xs[2], bot + bh + 34, "Ignores its own replies, so it never loops", { size: 15, fill: C.muted });
    b += text(xs[1], bot + bh + 34, "Check the destination, not a \"sent\" log", { size: 15, fill: C.muted });
    return svg("Prove that a reply actually arrives", b, { subtitle: "An end-to-end canary sends a real-looking request through the whole path." });
  };

  // ---------- evals-that-grow-themselves ----------
  f["evals-that-grow-themselves/model-cost-quality"] = () => {
    const x0 = 140, x1 = 1080, y0 = 130, y1 = 520;
    const X = (c) => x0 + (c / 0.05) * (x1 - x0), Y = (q) => y1 - ((q - 80) / 20) * (y1 - y0);
    let b = "";
    for (let t = 0; t <= 0.05001; t += 0.01) b += `<line x1="${X(t)}" y1="${y0}" x2="${X(t)}" y2="${y1}" stroke="${C.line}"/>` + text(X(t), y1 + 26, `$${t.toFixed(2)}`, { font: MONO, size: 13, fill: C.muted, anchor: "middle" });
    for (let q = 80; q <= 100; q += 5) b += `<line x1="${x0}" y1="${Y(q)}" x2="${x1}" y2="${Y(q)}" stroke="${C.line}"/>` + text(x0 - 12, Y(q) + 5, `${q}%`, { font: MONO, size: 13, fill: C.muted, anchor: "end" });
    b += text((x0 + x1) / 2, y1 + 58, "Cost per request", { size: 16, fill: C.muted, anchor: "middle" });
    b += `<text x="${x0 - 70}" y="${(y0 + y1) / 2}" font-size="16" fill="${C.muted}" font-family="Helvetica, Arial, sans-serif" text-anchor="middle" transform="rotate(-90 ${x0 - 70} ${(y0 + y1) / 2})">Fields right</text>`;
    b += `<line x1="${x0}" y1="${Y(93)}" x2="${x1}" y2="${Y(93)}" stroke="${C.muted}" stroke-dasharray="6 6"/>` + text(x1, Y(93) - 8, "good enough for this step: 93%", { size: 14, fill: C.muted, anchor: "end" });
    const pts = { A: [0.005, 84], B: [0.012, 94], C: [0.02, 91], D: [0.03, 97], E: [0.045, 96] };
    b += `<path d="M${X(0.005)},${Y(84)} L${X(0.012)},${Y(94)} L${X(0.03)},${Y(97)}" stroke="${C.accent}" stroke-width="2" fill="none"/>`;
    for (const [k, [c, q]] of Object.entries(pts)) {
      const front = ["A", "B", "D"].includes(k);
      b += `<circle cx="${X(c)}" cy="${Y(q)}" r="${k === "B" ? 11 : 8}" fill="${front ? C.accent : C.muted}" ${k === "B" ? `stroke="${C.ink}" stroke-width="2"` : ""}/>`;
      b += text(X(c) + 16, Y(q) + 5, `Model ${k}`, { size: 15 });
    }
    b += text(X(0.012) + 16, Y(94) + 28, "cheapest good-enough model wins", { size: 14, fill: C.accent });
    b += text(48, 640, "Illustrative numbers. Invented values and source-quote checks are a separate gate.", { size: 14, fill: C.muted });
    return svg("Cost and quality for one step", b, { subtitle: "Pick per step, not one model for everything." });
  };

  f["evals-that-grow-themselves/review-eval-loop"] = () => {
    let b = "";
    const bw = 300, bh = 90;
    const box = (x, y, ls, col = C.ink) => rect(x, y, bw, bh, { stroke: col, sw: 2 }) + lines(x + 20, y + (ls.length > 1 ? 38 : 52), ls, { size: 17, lh: 24, fill: col });
    b += box(60, 130, ["A person confirms", "a request in review"]);
    b += box(450, 130, ["Confirmed values saved", "as a labeled example"]);
    b += box(840, 130, ["The test set grows", "by itself"]);
    b += box(840, 340, ["Every prompt or model", "change re-runs the eval"]);
    const cx = 600, cy = 385;
    b += `<polygon points="${cx},${cy - 58} ${cx + 85},${cy} ${cx},${cy + 58} ${cx - 85},${cy}" fill="#fff" stroke="${C.accent}" stroke-width="2"/>` + text(cx, cy + 6, "CI gate", { font: SERIF, size: 20, fill: C.accent, anchor: "middle" });
    b += box(60, 340, ["Ship"], C.green);
    b += rect(500, 500, 200, 60, { stroke: C.red, sw: 2 }) + text(600, 536, "Fix the change", { size: 16, fill: C.red, anchor: "middle" });
    b += arrow(364, 175, 444, 175, { accent: true });
    b += arrow(754, 175, 834, 175, { accent: true });
    b += arrow(990, 224, 990, 334, { accent: true });
    b += arrow(836, 385, 690, 385, { accent: true });
    b += arrow(512, 385, 366, 385, { color: C.green }) + text(440, 375, "pass", { size: 15, fill: C.green, anchor: "middle" });
    b += arrow(600, 446, 600, 494, { color: C.red }) + text(612, 476, "fail", { size: 15, fill: C.red });
    b += arrow(706, 530, 990, 436, { dash: "5 5" });
    b += arrow(210, 334, 210, 226, { dash: "5 5" }) + text(222, 290, "new requests", { size: 14, fill: C.muted });
    b += text(450, 252, "keep the original source with the answer", { size: 14, fill: C.muted });
    return svg("Confirmed work becomes the next test", b, { subtitle: "Review produces the labels. The gate makes them count before anything ships." });
  };

  return f;
}
