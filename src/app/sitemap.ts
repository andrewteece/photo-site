import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://andrewteece.com'; // set to your domain
  const routes: MetadataRoute.Sitemap = [
    '',
    '/portfolio',
    '/blog',
    '/contact',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }));
  return routes;
}
