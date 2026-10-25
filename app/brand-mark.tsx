/** Terminal O mark that follows the theme: ink tile, paper O, accent cursor. */
export function BrandMark({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect width="64" height="64" rx="14" className="fill-ink" />
      <path
        className="fill-paper"
        fillRule="evenodd"
        d="M28.5 11C19.9 11 13 19.5 13 30s6.9 19 15.5 19S44 40.5 44 30 37.1 11 28.5 11Zm0 7c4.7 0 8.5 5.4 8.5 12s-3.8 12-8.5 12S20 36.6 20 30s3.8-12 8.5-12Z"
      />
      <rect x="40" y="42" width="11" height="6" rx="2" className="fill-accent" />
    </svg>
  );
}
