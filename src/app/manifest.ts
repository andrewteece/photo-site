// app/manifest.ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Andrew Teece Photography',
    short_name: 'AT Photography',
    description: 'Fine art landscapes and portrait commissions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#E76F51',
    icons: [
      {
        src: '/brand/app-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/brand/apple-touch-icon-180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
