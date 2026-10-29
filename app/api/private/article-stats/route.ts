import { NextRequest, NextResponse } from "next/server";
import { hasPrivateAccess } from "@/lib/private-access";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };
  if (!await hasPrivateAccess(request.headers.get("authorization"), process.env.PRIVATE_ARTICLES_PASSWORD)) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  const period = request.nextUrl.searchParams.get("period") || "30d";
  if (!["7d", "30d", "91d"].includes(period)) return NextResponse.json({ error: "Unsupported date range" }, { status: 400, headers });
  const key = process.env.PLAUSIBLE_STATS_API_KEY;
  if (!key) return NextResponse.json({ status: "not_connected", pages: [], message: "Plausible tracking is installed. Connect its Stats API to read website views here." }, { headers });
  try {
    const response = await fetch("https://plausible.io/api/v2/query", {
      method: "POST", cache: "no-store", signal: AbortSignal.timeout(12000),
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ site_id: "ostapkvl.com", date_range: period, metrics: ["pageviews", "visitors"], dimensions: ["event:page"], filters: [["matches", "event:page", ["^/writing/"]]], pagination: { limit: 10000, offset: 0 } }),
    });
    if (!response.ok) throw new Error("provider");
    const data = await response.json();
    if (!Array.isArray(data.results)) throw new Error("response");
    const pages = data.results.map((row: { dimensions: unknown[]; metrics: unknown[] }) => {
      if (typeof row.dimensions?.[0] !== "string" || row.metrics?.length < 2 || row.metrics.some(n => typeof n !== "number" || !Number.isFinite(n) || n < 0)) throw new Error("response");
      return { path: row.dimensions[0], views: row.metrics[0], visitors: row.metrics[1] };
    });
    return NextResponse.json({ status: "connected", period, observedAt: new Date().toISOString(), pages }, { headers });
  } catch {
    return NextResponse.json({ status: "error", pages: [], message: "Plausible could not be read. Check the API key and plan, then retry. No missing values have been counted as zero." }, { status: 502, headers });
  }
}
