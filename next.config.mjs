/** @type {import('next').NextConfig} */
const nextConfig = {
  // Unlisted static decks under /p/<name>/ (served from public/, kept out of robots and the sitemap).
  async rewrites() {
    return [{ source: "/p/:deck", destination: "/p/:deck/index.html" }];
  },
};

export default nextConfig;
