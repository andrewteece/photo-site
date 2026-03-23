import { getAllPosts } from '@/lib/posts';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://www.andrewteecephotography.com';
  const now = new Date();

  const staticRoutes = ['', '/portfolio', '/about', '/blog', '/contact'];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((p) => ({
    url: `${base}${p || '/'}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));

  const posts = await getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticEntries, ...postEntries];
}
