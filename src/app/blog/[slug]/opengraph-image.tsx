import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
          background:
            'linear-gradient(135deg, #0b0b0c 0%, #1a1b1d 62%, #E76F51 140%)',
          color: 'white',
          fontFamily: 'ui-sans-serif, system-ui',
        }}
      >
        <div style={{ opacity: 0.9, fontSize: 22, letterSpacing: 2 }}>
          ANDREW TEECE — PHOTOGRAPHY
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              textShadow: '0 2px 12px rgba(0,0,0,.35)',
              maxWidth: 980,
            }}
          >
            Quiet light. Clean geometry.
          </div>
          <div style={{ opacity: 0.9, fontSize: 28 }}>andrewteece.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
