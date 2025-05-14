import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "dummyimage.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "backend.teezai.com",
      },
    ],
  },
};

export default nextConfig;
