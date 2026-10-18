import type { ReactNode } from "react";

/** Replaces {token} placeholders in copy with React nodes (links, emphasis). */
export function richText(text: string, nodes: Record<string, ReactNode>): ReactNode[] {
  return text.split(/(\{[a-zA-Z]+\})/g).map((part, i) => {
    const m = part.match(/^\{([a-zA-Z]+)\}$/);
    if (!m) return part;
    const node = nodes[m[1]];
    return node === undefined ? part : <span key={i} className="contents">{node}</span>;
  });
}
