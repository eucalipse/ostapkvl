"use client";

import { useEffect, useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import { emptyWorkspace, engagementRate, latestSnapshots, metricKeys, parseWorkspace, type MetricKey, type WorkspaceData } from "@/lib/article-metrics";
import styles from "./workspace.module.css";
import { articleLaunches } from "@/data/article-launches";

type Website = { status: "loading" | "connected" | "not_connected" | "error"; message?: string; observedAt?: string; pages: { path: string; views: number; visitors: number }[] };
const storageKey = "ostapkvl-private-articles-v1";
const labels: Record<MetricKey, string> = { impressions: "Impressions", views: "LinkedIn article views", reactions: "Reactions", comments: "Comments", reposts: "Reposts" };
const display = (n: number | null | undefined) => n == null ? "—" : n.toLocaleString();
const today = () => new Date().toISOString().slice(0, 10);

export function ArticleDashboard({ articles }: { articles: PostMeta[] }) {
  const published = articles.filter(article => !article.draft);
  const drafts = articles.filter(article => article.draft).sort((a, b) => (articleLaunches[a.slug]?.order ?? 99) - (articleLaunches[b.slug]?.order ?? 99));
  const [data, setData] = useState<WorkspaceData>(emptyWorkspace);
  const [ready, setReady] = useState(false);
  const [website, setWebsite] = useState<Website>({ status: "loading", pages: [] });
  const [period, setPeriod] = useState("30d");
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [tab, setTab] = useState("performance");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [snapshotDate, setSnapshotDate] = useState(today());
  const [postUrl, setPostUrl] = useState("");
  const [counts, setCounts] = useState<Record<MetricKey, string>>({ impressions: "", views: "", reactions: "", comments: "", reposts: "" });
  const latest = useMemo(() => latestSnapshots(data), [data]);
  const followers = [...data.followers].sort((a, b) => b.date.localeCompare(a.date));
  const followerChange = followers.length > 1 ? followers[0].count - followers[1].count : null;

  useEffect(() => {
    try { const saved = localStorage.getItem(storageKey); if (saved) setData(parseWorkspace(JSON.parse(saved), articles.map(a => a.slug))); }
    catch { setMessage("Saved data could not be read. Import a valid backup or save a new snapshot."); }
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      try { setData(event.newValue ? parseWorkspace(JSON.parse(event.newValue), articles.map(a => a.slug)) : emptyWorkspace); }
      catch { setMessage("Another tab saved unreadable data. Export your current view before reloading."); }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [articles]);
  useEffect(() => {
    const controller = new AbortController();
    setWebsite({ status: "loading", pages: [] });
    fetch(`/api/private/article-stats?period=${period}`, { cache: "no-store", signal: controller.signal }).then(async response => {
      const result = await response.json();
      if (!["connected", "not_connected", "error"].includes(result.status)) throw new Error("response");
      setWebsite(result);
    }).catch(error => { if (error.name !== "AbortError") setWebsite({ status: "error", pages: [], message: "Could not load website stats. Try refreshing or sign in again." }); });
    return () => controller.abort();
  }, [period, refresh]);

  function save(next: WorkspaceData) {
    const checked = parseWorkspace(next, articles.map(a => a.slug));
    const stored = localStorage.getItem(storageKey);
    const current = stored ? parseWorkspace(JSON.parse(stored), articles.map(a => a.slug)) : emptyWorkspace;
    if (JSON.stringify(current) !== JSON.stringify(data)) {
      setData(current);
      throw new Error("The saved data changed in another tab. Your view has refreshed; review it and save again.");
    }
    localStorage.setItem(storageKey, JSON.stringify(checked));
    setData(checked);
  }
  function exportBackup() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `ostapkvl-article-stats-${today()}.json`; anchor.click(); URL.revokeObjectURL(url);
  }
  async function importBackup(file: File | undefined) {
    if (!file) return;
    try {
      if (file.size > 2_000_000) throw new Error("Choose a backup smaller than 2 MB.");
      const imported = parseWorkspace(JSON.parse(await file.text()), articles.map(a => a.slug));
      // Existing observations win; an import never silently replaces a saved count.
      const snapshots = new Map(imported.snapshots.map(row => [`${row.slug}:${row.date}`, row]));
      data.snapshots.forEach(row => snapshots.set(`${row.slug}:${row.date}`, row));
      const followerRows = new Map(imported.followers.map(row => [row.date, row]));
      data.followers.forEach(row => followerRows.set(row.date, row));
      save({ version: 1, snapshots: Array.from(snapshots.values()), followers: Array.from(followerRows.values()) });
      setMessage("Backup merged. Existing observations were preserved.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Import failed. No changes saved."); }
  }
  function openEditor(slug: string) {
    const row = latest.find(item => item.slug === slug);
    setEditing(slug); setSnapshotDate(today()); setPostUrl(row?.postUrl || "");
    setCounts(Object.fromEntries(metricKeys.map(key => [key, ""])) as Record<MetricKey, string>);
    setMessage("");
  }
  const sum = (key: MetricKey) => {
    const values = latest.map(row => row.metrics[key]).filter((n): n is number => n !== null);
    return values.length ? values.reduce((a, b) => a + b, 0) : null;
  };
  const coverage = (key: MetricKey) => `${latest.filter(row => row.metrics[key] !== null).length} / ${published.length} articles recorded`;
  const pageStats = (slug: string) => website.pages.filter(p => p.path.replace(/\/$/, "") === `/writing/${slug}`);
  const pageViews = (slug: string) => website.status === "connected" ? pageStats(slug).reduce((total, page) => total + page.views, 0) : null;
  const rows = published.filter(article => `${article.title} ${article.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "date") return b.date.localeCompare(a.date);
    const score = (slug: string) => sort === "website" ? pageViews(slug) ?? -1 : latest.find(row => row.slug === slug)?.metrics[sort as MetricKey] ?? -1;
    return score(b.slug) - score(a.slug);
  });
  return <main className={styles.workspace}>
    <div className={styles.eyebrow}>OWNER WORKSPACE <span>Private · authenticated</span></div>
    <div className={styles.heading}><div><h1>Your writing, in view.</h1><p>See what people read. Make room for what comes next.</p></div><a className={styles.link} href="https://www.linkedin.com/in/ostap-kovalisko/" target="_blank" rel="noreferrer">Open LinkedIn ↗</a></div>
    <div className={styles.tabs} role="tablist" aria-label="Workspace sections">{[["performance", "Article performance"], ["queue", `Publishing queue · ${drafts.length}`], ["data", "Data & sources"]].map(([id, label]) => <button key={id} role="tab" aria-selected={tab === id} aria-controls={`panel-${id}`} id={`tab-${id}`} onClick={() => setTab(id)}>{label}</button>)}</div>
    {message && <p className={styles.notice} role="status">{message}</p>}
    {tab === "performance" && <section id="panel-performance" role="tabpanel" aria-labelledby="tab-performance">
      <div className={styles.cards}>
        <Metric title="LinkedIn followers" value={display(followers[0]?.count)} detail={followers[0] ? `Observed ${followers[0].date}${followerChange !== null ? ` · ${followerChange >= 0 ? "+" : ""}${followerChange} since ${followers[1].date}` : ""}` : "No follower snapshot yet"} />
        <Metric title="Website article views" value={display(website.status === "connected" ? published.reduce((n, a) => n + (pageViews(a.slug) ?? 0), 0) : null)} detail={`Plausible · last ${period.replace("d", " days")}`} />
        <Metric title="LinkedIn impressions" value={display(sum("impressions"))} detail={coverage("impressions")} />
        <Metric title="LinkedIn comments" value={display(sum("comments"))} detail={coverage("comments")} />
      </div>
      <div className={styles.sourceNote}><span className={styles.dot} data-connected={website.status === "connected"} /><span>{website.status === "connected" ? `Plausible refreshed ${new Date(website.observedAt!).toLocaleString()}` : website.status === "loading" ? "Loading website stats…" : website.message} LinkedIn figures are your latest recorded lifetime totals, not the website date range.</span><button onClick={() => setRefresh(n => n + 1)} disabled={website.status === "loading"}>Refresh</button></div>
      <div className={styles.toolbar}><label className={styles.search}>Search articles<input value={search} onChange={event => setSearch(event.target.value)} placeholder="Title or topic…" /></label><label>Website range<select value={period} onChange={event => setPeriod(event.target.value)}><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option><option value="91d">Last 91 days</option></select></label><label>Sort by<select value={sort} onChange={event => setSort(event.target.value)}><option value="date">Newest article</option><option value="title">Title</option><option value="website">Website views</option><option value="impressions">LinkedIn impressions</option><option value="comments">Comments</option></select></label></div>
      <div className={styles.tableWrap}><table><caption>Published articles · {rows.length} · — means not recorded</caption><thead><tr><th>Article</th><th>Site views</th><th>LI views</th><th>Impressions</th><th>Reactions</th><th>Comments</th><th>Reposts</th><th>Engagement*</th><th>Snapshot</th></tr></thead><tbody>{rows.map(article => {
        const row = latest.find(item => item.slug === article.slug);
        const rate = row ? engagementRate(row) : null;
        return <tr key={article.slug}><th scope="row"><a href={`/writing/${article.slug}`} target="_blank" rel="noreferrer">{article.title}</a><small>{article.date} · {article.category}</small></th><td>{display(pageViews(article.slug))}</td><td>{display(row?.metrics.views)}</td><td>{display(row?.metrics.impressions)}</td><td>{display(row?.metrics.reactions)}</td><td>{display(row?.metrics.comments)}</td><td>{display(row?.metrics.reposts)}</td><td>{rate === null ? "—" : `${rate.toFixed(2)}%`}</td><td><button onClick={() => openEditor(article.slug)} disabled={!ready}>{row ? "Update" : "Add stats"}</button><small>{row?.date || "Not recorded"}</small>{row?.postUrl && <a href={row.postUrl} target="_blank" rel="noreferrer">Post ↗</a>}</td></tr>;
      })}</tbody></table>{rows.length === 0 && <p className={styles.empty}>No articles match this search.</p>}</div>
      <p className={styles.footnote}>* Interaction rate = (reactions + comments + reposts) ÷ impressions. It excludes clicks and saves, so it may differ from LinkedIn’s engagement metric. Unknown inputs stay blank. Followers belong to your profile, not individual articles. Each row tracks one LinkedIn post per article.</p>
    </section>}
    {tab === "queue" && <section id="panel-queue" role="tabpanel" aria-labelledby="tab-queue"><div className={styles.sectionHeading}><h2>Next from your desk</h2><p>Drafts for review. Opening a preview does not publish it.</p></div><div className={styles.drafts}>{drafts.map((article, index) => <article key={article.slug}><span className={styles.eyebrow}>{String(index + 1).padStart(2, "0")} / DRAFT</span><h3>{article.title}</h3><p>{article.dek}</p><div><span>{article.readTime} · {article.category}</span><a href={`/drafts/${article.slug}`}>Read draft →</a></div>{articleLaunches[article.slug] && <details className={styles.caption}><summary>LinkedIn caption · use after publishing</summary><p style={{ whiteSpace: "pre-wrap" }}>{articleLaunches[article.slug].caption}</p><button onClick={() => { navigator.clipboard.writeText(articleLaunches[article.slug].caption).then(() => setMessage("Caption copied. The article must be published before sharing its public link.")).catch(() => setMessage("Clipboard unavailable. Select and copy the caption text.")); }}>Copy caption</button></details>}</article>)}</div><p className={styles.footnote}>Draft previews use the site’s existing unlisted routes. Anyone with a draft URL can read it; this stats workspace requires authentication.</p></section>}
    {tab === "data" && <section id="panel-data" role="tabpanel" aria-labelledby="tab-data" className={styles.sources}><div><h2>Keep the numbers honest.</h2><p>Website views come from Plausible. LinkedIn observations are entered from your own analytics, with an observation date. Impressions and article views measure different things.</p><p>Snapshots are saved in this browser only. Export a backup before switching devices or clearing browser data. There is no automatic LinkedIn sync.</p><div className={styles.actions}><button onClick={exportBackup} disabled={!ready}>Export backup</button><label className={styles.importButton}>Import backup<input disabled={!ready} type="file" accept=".json,application/json" onChange={event => { void importBackup(event.target.files?.[0]); event.target.value = ""; }} /></label></div><p className={styles.footnote}>Imports accept this workspace’s JSON backups, not LinkedIn’s XLSX export. Existing observations take priority on a duplicate article/date.</p><h3>Sources</h3><ul><li><a href="https://plausible.io/ostapkvl.com" target="_blank" rel="noreferrer">Plausible dashboard ↗</a> · {website.status === "connected" ? "Connected" : "Not currently connected"}</li><li><a href="https://www.linkedin.com/help/linkedin/answer/a6538517" target="_blank" rel="noreferrer">LinkedIn metric definitions ↗</a></li></ul></div><form className={styles.form} onSubmit={event => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        try { const date = String(form.get("date")); const count = Number(form.get("followers")); save({ ...data, followers: [...data.followers.filter(row => row.date !== date), { date, count }] }); setMessage("Follower snapshot saved in this browser."); } catch (error) { setMessage(error instanceof Error ? error.message : "Could not save in this browser."); }
      }}><h3>Record followers</h3><label>Observation date<input name="date" type="date" required defaultValue={today()} max={today()} /></label><label>Profile followers<input name="followers" type="number" min="0" step="1" required placeholder="Exact count from LinkedIn" /></label><button type="submit" disabled={!ready}>Save follower snapshot</button><p className={styles.footnote}>Saving the same date replaces that date’s count.</p>{followers.slice(0, 8).map(row => <p key={row.date}>{row.date} <strong>{display(row.count)}</strong></p>)}</form></section>}
    {editing && <div className={styles.overlay}><section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="snapshot-heading" onKeyDown={event => { if (event.key === "Escape") setEditing(null); if (event.key === "Tab") { const nodes = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, input, a[href]')).filter(node => !node.hasAttribute("disabled")); const first = nodes[0], last = nodes[nodes.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }}><button className={styles.close} aria-label="Close stats editor" onClick={() => setEditing(null)}>×</button><p className={styles.eyebrow}>LINKEDIN SNAPSHOT</p><h2 id="snapshot-heading">{articles.find(article => article.slug === editing)?.title}</h2><p>Enter lifetime totals as observed on this date. Leave unavailable metrics blank. Saving the same article and date replaces that observation.</p><form className={styles.form} onSubmit={event => { event.preventDefault(); try {
      const metrics = Object.fromEntries(metricKeys.map(key => [key, counts[key].trim() === "" ? null : Number(counts[key])])) as Record<MetricKey, number | null>;
      if (metricKeys.every(key => metrics[key] === null)) throw new Error("Enter at least one observed metric.");
      save({ ...data, snapshots: [...data.snapshots.filter(row => !(row.slug === editing && row.date === snapshotDate)), { slug: editing, date: snapshotDate, postUrl, metrics }] }); setEditing(null); setMessage("LinkedIn snapshot saved in this browser.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not save in this browser."); } }}><label>Observation date<input autoFocus type="date" required max={today()} value={snapshotDate} onChange={event => setSnapshotDate(event.target.value)} /></label><label>LinkedIn post URL (optional)<input type="url" value={postUrl} onChange={event => setPostUrl(event.target.value)} placeholder="https://www.linkedin.com/…" /></label><div className={styles.fieldGrid}>{metricKeys.map(key => <label key={key}>{labels[key]}<input type="number" min="0" step="1" value={counts[key]} onChange={event => setCounts({ ...counts, [key]: event.target.value })} placeholder="Not available" /></label>)}</div>{message && <p role="alert">{message}</p>}<button type="submit">Save snapshot</button></form></section></div>}
    <footer className={styles.workspaceFooter}><span>Private article workspace · Ostap Kovalisko</span><span>ostapkvl.com</span></footer>
  </main>;
}
function Metric({ title, value, detail }: { title: string; value: string; detail: string }) { return <article className={styles.metric}><h2>{title}</h2><strong>{value}</strong><p>{detail}</p></article>; }
