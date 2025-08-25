/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable Next/Vercel optimizer + modern formats
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [320, 420, 640, 750, 828, 1080, 1200],
    // IMPORTANT: remove `unoptimized: true`
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
};

export default nextConfig;
