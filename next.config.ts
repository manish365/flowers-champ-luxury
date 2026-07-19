import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.flowerschamp.com" },
      { protocol: "https", hostname: "flowerschamp-service-prod.up.railway.app" },
    ],
  },
};

export default nextConfig;
