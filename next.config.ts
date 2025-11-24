import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    //For images from GameDistribution, the correct domain is img.gamedistribution.com (without https://).
    domains: ["img.gamedistribution.com"],
  },
};

export default nextConfig;
