import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
