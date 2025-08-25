// Serve an image sitemap at /sitemap-images.xml
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { allPosts, Post } from 'contentlayer/generated';

export const runtime = 'nodejs';

// Keep Post's types intact — just add optional slug/draft for convenience
type WithMaybeSlug = { slugAsParams?: string; draft?: boolean | null };

// Some Contentlayer schemas may not guarantee cover is a string at runtime.
// We'll *read* it as unknown and normalize safely.
type PostWithUnknownCover = Post & { cover?: unknown } & WithMaybeSlug;

const posts = allPosts as ReadonlyArray<PostWithUnknownCover>;
const slugOf = (p: PostWithUnknownCover) => p.slug ?? p.slugAsParams ?? '';

const IMG_EXT = /\.(jpe?g|png|webp|avif)$/i;

export async function GET() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://www.andrewteecephotography.com';
  const nowISO = new Date().toISOString();

  // 1) Portfolio images from /public/images/portfolio
  const dir = path.join(process.cwd(), 'public', 'images', 'portfolio');
  let files: string[] = [];
  try {
    const all = await fs.readdir(dir);
    files = all.filter((f) => IMG_EXT.test(f));
  } catch {
    files = [];
  }
  const portfolioImageUrls = files.map((f) => `${base}/images/portfolio/${f}`);

  // 2) Blog post covers (only if cover is a *string*)
  const postCoverEntries = posts
    .filter((p) => !p.draft)
    .map((p) => {
      const cover = typeof p.cover === 'string' ? p.cover : undefined;
      if (!cover) return null;
      const absCover = cover.startsWith('http') ? cover : `${base}${cover}`;
      return {
        url: `${base}/blog/${slugOf(p)}`,
        image: absCover,
        lastmod: p.date ? new Date(p.date).toISOString() : nowISO,
        title: p.title,
      };
    })
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  // Build XML (urlset with image namespace)
  const portfolioUrlBlock = `<url>
  <loc>${base}/portfolio</loc>
  <lastmod>${nowISO}</lastmod>
  ${portfolioImageUrls
    .map((loc) => `<image:image><image:loc>${loc}</image:loc></image:image>`)
    .join('\n  ')}
</url>`;

  const postsBlocks = postCoverEntries
    .map(
      (e) => `<url>
  <loc>${e.url}</loc>
  <lastmod>${e.lastmod}</lastmod>
  <image:image>
    <image:loc>${e.image}</image:loc>
    <image:title>${escapeXml(e.title)}</image:title>
  </image:image>
</url>`
    )
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    portfolioUrlBlock +
    '\n' +
    postsBlocks +
    '\n</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=600, stale-while-revalidate=86400',
    },
  });
}

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
