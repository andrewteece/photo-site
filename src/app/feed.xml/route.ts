import { allPosts, Post } from 'contentlayer/generated';
import { site } from '@/lib/site';

export const runtime = 'edge';

interface PostMaybeSlug extends Post {
  slugAsParams?: string;
  draft?: boolean | null;
  tags?: string[]; // optional, only used if your schema exposes it
}

const posts: ReadonlyArray<PostMaybeSlug> =
  allPosts as ReadonlyArray<PostMaybeSlug>;

const slugOf = (p: PostMaybeSlug): string => p.slug ?? p.slugAsParams ?? '';

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Wrap HTML safely for <content:encoded>
const cdata = (html = '') =>
  `<![CDATA[${html.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://www.andrewteecephotography.com';

  const items = [...posts]
    .filter((p) => !p.draft)
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );

  const year = new Date().getFullYear();
  const email = site.email ? `${site.email} (${site.brand})` : undefined;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${esc(site.brand)} — Journal</title>
  <link>${siteUrl}</link>
  <description>Notes on light, process, and recent work.</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
  <image>
    <url>${siteUrl}/brand/app-icon-512.png</url>
    <title>${esc(site.brand)} — Journal</title>
    <link>${siteUrl}</link>
  </image>
  <generator>Next.js + Contentlayer</generator>
  <ttl>180</ttl>
  <copyright>© ${year} ${esc(site.brand)}</copyright>
  ${email ? `<managingEditor>${esc(email)}</managingEditor>` : ''}

  ${items
    .map((p) => {
      const url = `${siteUrl}/blog/${slugOf(p)}`;
      const pub = p.date
        ? new Date(p.date).toUTCString()
        : new Date().toUTCString();
      const categories = (p.tags ?? [])
        .map((t) => `<category>${esc(t)}</category>`)
        .join('');
      // Use description for content:encoded (safe + typed). If you later expose HTML, we can upgrade this.
      const html = p.description ? `<p>${esc(p.description)}</p>` : '';

      return `<item>
  <title>${esc(p.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${pub}</pubDate>
  <description>${esc(p.description || '')}</description>
  ${categories}
  ${email ? `<author>${esc(email)}</author>` : ''}
  <content:encoded>${cdata(html)}</content:encoded>
</item>`;
    })
    .join('\n')}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=600, stale-while-revalidate=86400',
    },
  });
}
