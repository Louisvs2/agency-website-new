import type { NextConfig } from "next";

// Static export for Strato Webhosting (no Node.js runtime). The site is
// served at the root of the subdomain agency.culttwenty.de, so no basePath is
// needed. Images are unoptimized because there is no server to run next/image
// optimization on static hosting.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
