export const metricKeys = ["impressions", "views", "reactions", "comments", "reposts"] as const;
export type MetricKey = typeof metricKeys[number];
export type Snapshot = {
  slug: string;
  date: string;
  postUrl: string;
  metrics: Record<MetricKey, number | null>;
};
export type FollowerSnapshot = { date: string; count: number };
export type WorkspaceData = { version: 1; snapshots: Snapshot[]; followers: FollowerSnapshot[] };
export const emptyWorkspace: WorkspaceData = { version: 1, snapshots: [], followers: [] };

export function validDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export function validCount(value: unknown): value is number { return typeof value === "number" && Number.isSafeInteger(value) && value >= 0; }
export function validLinkedInUrl(value: string) {
  if (value === "") return true;
  try { const url = new URL(value); return url.protocol === "https:" && (url.hostname === "linkedin.com" || url.hostname.endsWith(".linkedin.com")); } catch { return false; }
}
export function parseWorkspace(value: unknown, slugs: string[]): WorkspaceData {
  const data = value as WorkspaceData;
  if (!data || data.version !== 1 || !Array.isArray(data.snapshots) || !Array.isArray(data.followers) || data.snapshots.length > 10000 || data.followers.length > 10000) throw new Error("Choose an article workspace JSON backup (version 1).");
  const snapshots = data.snapshots.map(row => {
    if (!row || !slugs.includes(row.slug) || !validDate(row.date) || row.date > new Date().toISOString().slice(0, 10) || typeof row.postUrl !== "string" || !validLinkedInUrl(row.postUrl) || !row.metrics || metricKeys.some(key => row.metrics[key] !== null && !validCount(row.metrics[key]))) throw new Error("A snapshot has an invalid article, date, LinkedIn URL, or count. No changes were saved.");
    return { slug: row.slug, date: row.date, postUrl: row.postUrl, metrics: Object.fromEntries(metricKeys.map(key => [key, row.metrics[key]])) as Snapshot["metrics"] };
  });
  const followers = data.followers.map(row => {
    if (!row || !validDate(row.date) || row.date > new Date().toISOString().slice(0, 10) || !validCount(row.count)) throw new Error("A follower snapshot is invalid. No changes were saved.");
    return { date: row.date, count: row.count };
  });
  if (new Set(snapshots.map(row => `${row.slug}:${row.date}`)).size !== snapshots.length || new Set(followers.map(row => row.date)).size !== followers.length) throw new Error("Backup contains duplicate snapshots for the same date.");
  for (const slug of slugs) {
    const urls = new Set(snapshots.filter(row => row.slug === slug && row.postUrl).map(row => { const url = new URL(row.postUrl); return `${url.origin}${url.pathname.replace(/\/$/, "")}`; }));
    if (urls.size > 1) throw new Error("This article has snapshots from different LinkedIn posts. Reconcile those posts before importing; one post per article is supported.");
  }
  return { version: 1, snapshots, followers };
}
/** Latest cumulative observation, never a sum of repeated lifetime snapshots. */
export function latestSnapshots(data: WorkspaceData): Snapshot[] {
  return Array.from(new Set(data.snapshots.map(row => row.slug))).map(slug => data.snapshots.filter(row => row.slug === slug).sort((a, b) => b.date.localeCompare(a.date))[0]);
}
export function engagementRate(row: Snapshot): number | null {
  const { impressions, reactions, comments, reposts } = row.metrics;
  if (!impressions || reactions === null || comments === null || reposts === null) return null;
  return (reactions + comments + reposts) / impressions * 100;
}
