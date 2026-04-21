import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  allowedDevOrigins: ["192.168.1.5", "192.168.1.8", "localhost", "192.168.1.2"],
};

export default nextConfig;
