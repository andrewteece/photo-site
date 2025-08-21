import createMDX from '@next/mdx';
import { withContentlayer } from 'next-contentlayer';
import type { NextConfig } from 'next';

const withMDX = createMDX({ extension: /\.mdx?$/ });

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
} satisfies NextConfig;

export default withContentlayer(withMDX(nextConfig));
