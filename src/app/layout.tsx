// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Inter, Fraunces } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: {
    default: 'Your Name — Photography',
    template: '%s — Your Name Photography',
  },
  description:
    'Timeless, editorial-style photography for weddings, portraits, and brands.',
  metadataBase: new URL('https://yourdomain.com'),
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
      <body className='min-h-dvh flex flex-col bg-background text-foreground font-sans'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
