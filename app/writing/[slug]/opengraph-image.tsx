import { notFound } from "next/navigation";
import { ogCard, ogSize } from "@/lib/og";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Article by Ostap Kovalisko";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const long = post.title.length > 58;
  return ogCard({
    eyebrow: `writing · ${formatDate(post.date)} · ${post.readTime}`,
    title: post.title,
    subline: post.dek,
    footer: "Ostap Kovalisko",
    titleSize: long ? 58 : 68,
  });
}
