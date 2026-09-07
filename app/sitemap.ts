import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // /cv is deliberately excluded — unlisted page.
  const pages = ["", "/about", "/projects", "/writing", "/contact"].map(
    (route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
    })
  );
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }));
  return [...pages, ...posts];
}
