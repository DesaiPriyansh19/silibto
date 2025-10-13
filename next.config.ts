import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // keep your existing setting
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/, // only apply to TS/JS files
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
