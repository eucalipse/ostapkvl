/**
 * Article figure. `alt` is required: it is what search engines and screen readers get.
 * Images live in /public/writing/<slug>/ and carry the ostapkvl.com watermark (see WRITING.md).
 */
export function Figure({ src, alt, caption, width = 1200, height = 675 }: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  if (!alt || alt.trim().length < 20) throw new Error(`Figure ${src}: alt text is required (describe what the image shows)`);
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
