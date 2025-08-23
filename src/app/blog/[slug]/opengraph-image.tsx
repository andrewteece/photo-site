import { ImageResponse } from 'next/og';
import { allPosts } from 'contentlayer/generated';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug);
  const title = post?.title ?? 'Journal';
  const subtitle = post?.description ?? 'andrewteece.com';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          background: 'linear-gradient(180deg, #0b0b0b 0%, #000 100%)',
          color: 'white',
          fontFamily: 'ui-sans-serif, system-ui',
        }}
      >
        <div style={{ opacity: 0.7, fontSize: 22, letterSpacing: 2 }}>
          ANDREW TEECE — JOURNAL
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ opacity: 0.7, fontSize: 28 }}>{subtitle}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
