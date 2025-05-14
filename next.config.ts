import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'dummyimage.com',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: '10.0.0.191',
      },
      {
        hostname: '147.93.144.14',
      },
      {
        hostname: 'backend.teezai.com',
      },
    ],
  },
};

export default nextConfig;
