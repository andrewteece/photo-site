import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Inter, Fraunces } from 'next/font/google';
import { ThemeScript } from '@/components/theme/ThemeScript';
import Script from 'next/script';
import { site } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-serif' });

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.andrewteecephotography.com';

// Move themeColor to viewport (Next 15)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0c' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.brand}`,
    template: `%s — ${site.brand}`,
  },
  description: 'Fine art landscapes and portrait commissions.',
  icons: {
    icon: [
      {
        url: '/brand/favicon-16-light.png',
        sizes: '16x16',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/brand/favicon-16-dark.png',
        sizes: '16x16',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/brand/favicon-32-light.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/brand/favicon-32-dark.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: [
      {
        url: '/brand/apple-touch-icon-180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: site.brand,
    title: site.brand,
    description: 'Fine art landscapes and portrait commissions.',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.brand,
    description: 'Fine art landscapes and portrait commissions.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml', // RSS autodiscovery
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />

        {/* JSON-LD: Person */}
        <Script
          id='ld-person'
          type='application/ld+json'
          strategy='afterInteractive'
        >
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Andrew Teece',
            jobTitle: 'Photographer',
            url: baseUrl,
            brand: { '@type': 'Brand', name: site.brand },
          })}
        </Script>

        {/* JSON-LD: WebSite */}
        <Script
          id='ld-website'
          type='application/ld+json'
          strategy='afterInteractive'
        >
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.brand,
            url: baseUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${baseUrl}/search?q={query}`,
              'query-input': 'required name=query',
            },
          })}
        </Script>
      </head>

      <body className='min-h-dvh flex flex-col font-sans'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
