import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.mux.com"
      },
      {
        protocol: "https",
        hostname: "customer-*.cloudflarestream.com"
      },
      {
        protocol: "https",
        hostname: "videodelivery.net"
      }
    ]
  }
};

export default nextConfig;
