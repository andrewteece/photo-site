import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
          background: 'linear-gradient(180deg, #111 0%, #000 100%)',
          color: 'white',
          fontFamily: 'ui-sans-serif, system-ui',
        }}
      >
        <div style={{ opacity: 0.7, fontSize: 24, letterSpacing: 2 }}>
          ANDREW TEECE
        </div>
        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
          Photography
        </div>
      </div>
    ),
    { ...size }
  );
}
