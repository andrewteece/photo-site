import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = createMDX({ extension: /\.mdx?$/ });

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    // Enable Next/Vercel optimizer + modern formats
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [320, 420, 640, 750, 828, 1080, 1200],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'andrewteecephotography.com' }],
        destination: 'https://www.andrewteecephotography.com/:path*',
        permanent: true,
      },
    ];
  },
} satisfies NextConfig;

export default withMDX(nextConfig);
