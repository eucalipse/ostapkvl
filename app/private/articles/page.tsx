import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import { hasPrivateAccess } from "@/lib/private-access";
import { ArticleDashboard } from "./workspace";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Private article workspace", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default async function PrivateArticles() {
  if (!await hasPrivateAccess(headers().get("authorization"), process.env.PRIVATE_ARTICLES_PASSWORD)) notFound();
  return <ArticleDashboard articles={getAllPosts(true)} />;
}
