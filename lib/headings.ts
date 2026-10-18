import type { ReactNode } from "react";

export type Heading = { id: string; text: string };

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'"“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Level-2 headings from MDX source, in order, skipping fenced code blocks. Ids match the ones the article renders. */
export function extractHeadings(markdown: string): Heading[] {
  const out: Heading[] = [];
  const seen = new Map<string, number>();
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (/^```/.test(line)) { inCode = !inCode; continue; }
    if (inCode) continue;
    const m = line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = m[1].replace(/[*_`]/g, "").trim();
    const base = slugifyHeading(text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.push({ id: n ? `${base}-${n}` : base, text });
  }
  return out;
}

export function childrenToText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in children) return childrenToText((children as { props: { children?: ReactNode } }).props.children);
  return "";
}

/** One instance per article render so duplicate headings get the same -1, -2 suffixes as extractHeadings. */
export function makeHeadingIds() {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = slugifyHeading(text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };
}
