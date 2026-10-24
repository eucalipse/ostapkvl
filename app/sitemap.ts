import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/data/site";
import { siteLocales, localizedPath } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  // /cv is deliberately excluded — unlisted page.
  const routes = ["/", "/about", "/projects", "/writing", "/contact"];
  const pages = siteLocales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${site.url}${localizedPath(locale, route)}`,
      lastModified: new Date(),
    }))
  );
  pages.push({ url: `${site.url}/eucalipse`, lastModified: new Date() });
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }));
  return [...pages, ...posts];
}
