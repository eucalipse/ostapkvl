import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  dek: string;
  readTime: string;
  category?: "Production" | "Experiments" | "Consciousness & AI" | "Digest";
  draft?: boolean;
  /** BCP 47 language of the article body; defaults to "en". */
  lang: string;
  tags: string[];
};

/** Public queries exclude drafts; the unlisted preview routes opt in explicitly. */

export type Post = PostMeta & { content: string };

export function getAllPosts(includeDrafts = false): PostMeta[] {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        dek: data.dek as string,
        readTime: data.readTime as string,
        category: (data.category as PostMeta["category"]) ?? "Production",
        draft: data.draft === true,
        lang: typeof data.lang === "string" ? data.lang : "en",
        tags: Array.isArray(data.tags) ? data.tags.filter((tag: unknown): tag is string => typeof tag === "string") : [],
      };
    })
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string, includeDrafts = false): Post | null {
  const file = path.join(postsDir, `${slug}.mdx`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (data.draft === true && !includeDrafts) return null;
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    dek: data.dek as string,
    readTime: data.readTime as string,
    category: (data.category as PostMeta["category"]) ?? "Production",
    draft: data.draft === true,
    lang: typeof data.lang === "string" ? data.lang : "en",
    tags: Array.isArray(data.tags) ? data.tags.filter((tag: unknown): tag is string => typeof tag === "string") : [],
    content,
  };
}

export function formatDate(date: string): string {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
