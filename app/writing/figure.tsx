import { FigureFrame } from "./figure-frame";

/**
 * Article figure. `alt` is required: it is what search engines and screen readers get.
 * Images live in /public/writing/<slug>/ and carry the ostapkvl.com watermark (see WRITING.md).
 * Click opens a lightbox with download and share; charts are figures too, so they get the same treatment.
 */
export function Figure({ src, alt, caption, width = 1200, height = 675 }: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  if (!alt || alt.trim().length < 20) throw new Error(`Figure ${src}: alt text is required (describe what the image shows)`);
  return <FigureFrame src={src} alt={alt} caption={caption} width={width} height={height} />;
}
