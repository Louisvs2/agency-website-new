import type { NextConfig } from "next";

// Static export for Strato Webhosting (no Node.js runtime). The site is
// served from the /agency subdirectory of culttwenty.de, so basePath prefixes
// every internal URL and asset. Images are unoptimized because there is no
// server to run next/image optimization on static hosting.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/agency",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
