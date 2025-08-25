// src/app/feed.xml/route.ts
import { allPosts, Post } from 'contentlayer/generated';

export const runtime = 'edge';

interface PostMaybeSlug extends Post {
  slugAsParams?: string;
}
const slugOf = (p: Post): string =>
  (p as PostMaybeSlug).slug ?? (p as PostMaybeSlug).slugAsParams ?? '';

function escapeXml(s = '') {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://www.andrewteecephotography.com';

  const items = [...allPosts]
    .filter((p) => !(p as any).draft) // skip drafts if you set p.draft in Contentlayer
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Andrew Teece — Journal</title>
  <link>${siteUrl}</link>
  <description>Notes on light, process, and recent work.</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${items
    .map((p) => {
      const url = `${siteUrl}/blog/${slugOf(p)}`;
      const desc = escapeXml(p.description || '');
      const pub = p.date
        ? new Date(p.date).toUTCString()
        : new Date().toUTCString();
      return `<item>
  <title>${escapeXml(p.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${pub}</pubDate>
  <description>${desc}</description>
</item>`;
    })
    .join('\n')}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      // cache at the edge for 10m, allow stale for a day
      'Cache-Control': 's-maxage=600, stale-while-revalidate=86400',
    },
  });
}
