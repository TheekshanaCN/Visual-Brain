import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Rewrites can be added here if needed in the future to replace middleware functionality
  async rewrites() {
    return [];
  },
};

export default nextConfig;
