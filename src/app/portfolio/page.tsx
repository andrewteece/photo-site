import { getCaptionFor } from '@/lib/captions';
import manifest from '@/lib/image-manifest.json';
import type { Metadata } from 'next';
import { PortfolioClient } from './PortfolioClient';

type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

const photos = manifest as ManifestItem[];

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Visual works exploring light, form, and contemplation through the medium of photography.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio — Andrew Teece Photography',
    description:
      'Visual works exploring light, form, and contemplation through the medium of photography.',
    url: '/portfolio',
    images: [
      {
        url: photos[0]?.src || '/images/portfolio/calm-morning.jpg',
        width: photos[0]?.width || 1200,
        height: photos[0]?.height || 630,
        alt: 'Photography portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — Andrew Teece Photography',
    description:
      'Visual works exploring light, form, and contemplation through the medium of photography.',
    images: [photos[0]?.src || '/images/portfolio/calm-morning.jpg'],
  },
};

export default function PortfolioPage() {
  // Build JSON-LD structured data for ImageGallery
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://www.andrewteecephotography.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Andrew Teece Photography Portfolio',
    description:
      'Visual works by Andrew Teece exploring light, form, and contemplation through photography',
    url: `${baseUrl}/portfolio`,
    image: photos.slice(0, 5).map((p) => {
      const caption = getCaptionFor(p.src);
      return {
        '@type': 'ImageObject',
        contentUrl: `${baseUrl}${p.src}`,
        name: caption.title || caption.alt,
        description: caption.alt,
        width: p.width,
        height: p.height,
        ...(caption.location && { contentLocation: caption.location }),
        ...(caption.camera && { exifData: caption.camera }),
        ...(caption.category && { genre: caption.category }),
        ...(caption.tags &&
          caption.tags.length > 0 && { keywords: caption.tags.join(', ') }),
      };
    }),
    numberOfItems: photos.length,
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioClient photos={photos} />
    </>
  );
}
