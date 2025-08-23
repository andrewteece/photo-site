// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
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
