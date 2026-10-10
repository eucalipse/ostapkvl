/** @type {import('next').NextConfig} */
const nextConfig = {
  // Unlisted static pages served from public/ (kept out of robots and the sitemap).
  // Turkish learning notes live in public/türkçe/. Non-ASCII public paths are not served directly by Next,
  // so everything is reached through the ASCII alias /turkce/… (and /türkçe as a vanity entry point).
  async rewrites() {
    return [
      { source: "/turkce", destination: "/türkçe/index.html" },
      { source: "/turkce/:path*", destination: "/türkçe/:path*" },
      { source: "/t%C3%BCrk%C3%A7e", destination: "/türkçe/index.html" },
      { source: "/t%C3%BCrk%C3%A7e/:path*", destination: "/türkçe/:path*" },
    ];
  },
};

export default nextConfig;
