/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve images directly (no /_next/image). Perfect for static public assets.
    unoptimized: true,
  },
};

export default nextConfig;
