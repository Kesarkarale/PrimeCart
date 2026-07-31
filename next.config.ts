import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wdpimissauboqdxmkzqa.supabase.co",
      },
    ],
  },
};

export default nextConfig;
