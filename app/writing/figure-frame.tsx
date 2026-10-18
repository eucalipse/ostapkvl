"use client";

import { useRef, useState } from "react";

/** Figure with a lightbox: click to enlarge, then download the file, share a link to this figure, or close. */
export function FigureFrame({ src, alt, caption, width, height }: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const id = "fig-" + (src.split("/").pop() ?? "figure").replace(/\.[a-z0-9]+$/i, "");
  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    if (typeof navigator.share === "function") {
      try { await navigator.share({ title: alt, text: caption ?? alt, url }); return; } catch { return; }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  const action = "rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent";
  return (
    <figure id={id} className="scroll-mt-8">
      <button type="button" onClick={open} aria-label={`View larger: ${alt}`} className="block w-full cursor-zoom-in">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </button>
      {caption && <figcaption>{caption}</figcaption>}
      <dialog
        ref={dialog}
        aria-label={alt}
        onClick={(event) => { if (event.target === dialog.current) close(); }}
        className="m-auto max-h-[96vh] w-[min(96vw,1400px)] rounded border border-line bg-paper p-0 text-ink backdrop:bg-black/80"
      >
        <div className="flex max-h-[96vh] flex-col gap-4 p-4 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="mx-auto max-h-[78vh] w-auto max-w-full object-contain" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">{caption ?? alt}</p>
            <div className="flex flex-wrap gap-2">
              <a href={src} download className={action}>Download</a>
              <button type="button" onClick={share} className={action}>{copied ? "Link copied" : "Share"}</button>
              <button type="button" onClick={close} className={action}>Close</button>
            </div>
          </div>
        </div>
      </dialog>
    </figure>
  );
}
