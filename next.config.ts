import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["www.flowerschamp.com", "images.unsplash.com"],
  },
};

export default nextConfig;
