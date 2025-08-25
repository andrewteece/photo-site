import type { MetadataRoute } from 'next';
import { allPosts, Post } from 'contentlayer/generated';

interface PostMaybeSlug extends Post {
  slugAsParams?: string;
  draft?: boolean | null;
}

const posts: ReadonlyArray<PostMaybeSlug> =
  allPosts as ReadonlyArray<PostMaybeSlug>;

const slugOf = (p: PostMaybeSlug): string => p.slug ?? p.slugAsParams ?? '';

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://www.andrewteecephotography.com';
  const now = new Date();

  const staticRoutes = [
    '',
    '/portfolio',
    '/services',
    '/about',
    '/blog',
    '/contact',
  ];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((p) => ({
    url: `${base}${p || '/'}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = [...posts]
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${base}/blog/${slugOf(p)}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticEntries, ...postEntries];
}
