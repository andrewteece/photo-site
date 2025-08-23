// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Inter, Fraunces } from 'next/font/google';
import { ThemeScript } from '@/components/theme/ThemeScript';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  metadataBase: new URL('https://andrewteecephotography.com.com'), // ← your domain
  title: {
    default: 'Andrew Teece — Photography',
    template: '%s — Andrew Teece Photography',
  },
  description: 'Landscape and Creative photography.',
  icons: {
    icon: '/brand/logo-mark-light.png',
    apple: '/brand/apple-touch-icon-180.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://andrewteece.com',
    title: 'Andrew Teece — Photography',
    description: 'Editorial & documentary-style photography.',
    images: [
      {
        url: '/brand/app-icon-512.png',
        width: 512,
        height: 512,
        alt: 'Andrew Teece logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrew Teece — Photography',
    description: 'Editorial & documentary-style photography.',
    images: ['/brand/app-icon-512.png'],
  },
  alternates: { canonical: 'https://andrewteece.com' },
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
        <link id='site-favicon' rel='icon' href='/brand/logo-mark-light.png' />

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
            url: 'https://andrewteece.com',
            brand: { '@type': 'Brand', name: 'Andrew Teece Photography' },
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
            name: 'Andrew Teece — Photography',
            url: 'https://andrewteece.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://andrewteece.com/search?q={query}',
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
