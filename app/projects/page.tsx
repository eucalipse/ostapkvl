import type { Metadata } from "next";
import { projects, archive } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Flagship work: a production AI operations platform, the Ostavio personal AI daemon, and the Eucalipse agency — plus an archive of 50+ shipped projects.",
};

function Thumb({ variant }: { variant: "gates" | "daemon" | "grid" }) {
  const stroke = "#C05621";
  return (
    <svg
      viewBox="0 0 120 72"
      aria-hidden="true"
      className="h-16 w-28 shrink-0"
      fill="none"
    >
      {variant === "gates" && (
        <>
          <rect x="6" y="26" width="24" height="20" stroke={stroke} />
          <rect x="48" y="26" width="24" height="20" stroke={stroke} />
          <rect x="90" y="26" width="24" height="20" stroke={stroke} strokeDasharray="3 3" />
          <path d="M30 36h18M72 36h18" stroke={stroke} />
          <path d="M56 30l4 6 6-9" stroke={stroke} />
        </>
      )}
      {variant === "daemon" && (
        <>
          <circle cx="60" cy="36" r="14" stroke={stroke} />
          <circle cx="60" cy="36" r="3" fill={stroke} />
          <path d="M60 6v10M60 56v10M30 36H16M104 36H90M39 15l7 7M81 57l-7-7M81 15l-7 7M39 57l7-7" stroke={stroke} />
        </>
      )}
      {variant === "grid" && (
        <>
          {[0, 1, 2, 3, 4].map((i) =>
            [0, 1, 2].map((j) => (
              <rect
                key={`${i}-${j}`}
                x={10 + i * 21}
                y={10 + j * 19}
                width="13"
                height="11"
                stroke={stroke}
                opacity={(i + j) % 3 === 0 ? 1 : 0.35}
              />
            ))
          )}
        </>
      )}
    </svg>
  );
}

export default function Projects() {
  return (
    <main className="mx-auto max-w-wide px-6 py-16">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        Projects
      </h1>
      <p className="mt-4 max-w-prose text-lg text-muted">
        Three flagship systems, then the archive. Depth over volume.
      </p>

      <div className="mt-12 space-y-px border border-line bg-line">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col gap-6 bg-paper p-8 sm:flex-row sm:items-start"
          >
            <Thumb variant={project.art} />
            <div>
              <h2 className="font-serif text-2xl font-medium">
                {project.title}
              </h2>
              <p className="mt-3 max-w-prose">{project.description}</p>
              <p className="mt-4 font-mono text-xs text-muted">
                {project.stack.join(" · ")}
                {project.link && (
                  <>
                    {" · "}
                    <a
                      href={project.link.href}
                      className="text-accent hover:underline"
                    >
                      {project.link.label} →
                    </a>
                  </>
                )}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Work archive */}
      <section className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Work archive
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-y border-line text-left">
            <thead>
              <tr className="border-b border-line font-mono text-xs uppercase tracking-wider text-muted">
                <th className="py-3 pr-6 font-medium">Year</th>
                <th className="py-3 pr-6 font-medium">Project</th>
                <th className="py-3 font-medium">Domain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {archive.map((row) => (
                <tr key={row.years + row.description}>
                  <td className="whitespace-nowrap py-4 pr-6 align-top font-mono text-xs text-muted">
                    {row.years}
                  </td>
                  <td className="py-4 pr-6 align-top text-sm">
                    {row.description}
                    <span className="mt-1.5 block font-mono text-xs text-muted/80">
                      {row.stack.join(" · ")}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-4 align-top font-mono text-xs text-muted">
                    {row.domain}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 font-mono text-xs text-muted">
          …and 35+ more through Eucalipse since 2019.
        </p>
      </section>
    </main>
  );
}
