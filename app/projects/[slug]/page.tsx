import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/posts";

const detailed = projects.filter((p) => p.slug && p.longDescription);

export function generateStaticParams() {
  return detailed.map((p) => ({ slug: p.slug! }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = detailed.find((p) => p.slug === params.slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = detailed.find((p) => p.slug === params.slug);
  if (!project) notFound();
  const posts = getAllPosts();
  const related = (project.articles ?? [])
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  return (
    <main className="mx-auto max-w-wide px-6">
      <section className="py-12 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          <Link href="/projects" className="hover:text-accent">Projects</Link>
          {" / "}
          {project.context}
        </p>
        <h1 className="mt-5 max-w-[26ch] font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-6 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
      </section>

      <section className="max-w-prose border-t border-line py-10">
        {project.longDescription!.map((para) => (
          <p key={para.slice(0, 40)} className="mt-5 first:mt-0 text-lg leading-relaxed">
            {para}
          </p>
        ))}
        {project.useCases && (
          <div className="mt-8 border-l-2 border-accent/40 pl-5">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {project.useCasesLabel ?? "AI in production"}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {project.useCases.map((u) => <li key={u}>{u}</li>)}
            </ul>
          </div>
        )}
        {project.link && (
          <p className="mt-8">
            <a href={project.link.href} className="border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent">
              {project.link.label} →
            </a>
          </p>
        )}
      </section>

      {project.images && project.images.length > 0 && (
        <section className="border-t border-line py-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Screens</h2>
          <div className="mt-6 space-y-8">
            {project.images.map((img) => (
              <figure key={img.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="h-auto w-full rounded-md border border-line" />
                <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {project.links && project.links.length > 0 && (
        <section className="border-t border-line py-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Compare and try</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {project.links.map((item) => (
              <a key={item.href} href={item.href} className="group flex flex-col bg-paper p-6 transition-colors hover:bg-accent/5">
                <h3 className="font-serif text-lg font-medium leading-snug group-hover:text-accent">{item.label} →</h3>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-line py-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">From this work</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {related.map((post) => (
              <Link key={post.slug} href={`/writing/${post.slug}`} className="group flex flex-col bg-paper p-6 transition-colors hover:bg-accent/5">
                <p className="font-mono text-xs text-muted">{post.readTime}</p>
                <h3 className="mt-2 font-serif text-lg font-medium leading-snug group-hover:text-accent">{post.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
