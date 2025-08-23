'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import manifestJson from '@/lib/image-manifest.json';

/** What we *want* to show in the grid (adjust order as you like) */
const desired = [
  '/images/portfolio/goldengate.jpg',
  '/images/portfolio/morning-colors.jpg',
  '/images/portfolio/calm-morning.jpg',
  '/images/portfolio/morning-storm.jpg',
  '/images/portfolio/dew.jpg',
  '/images/portfolio/fern.jpg',
];

type ManifestItem = {
  src: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
};
const manifest = (manifestJson as ManifestItem[]) ?? [];

export default function GalleryGrid() {
  // Build a stable list from manifest if available, else fall back to raw files
  const items = useMemo(() => {
    const map = new Map(manifest.map((m) => [m.src, m]));
    return desired
      .map((src) => map.get(src) ?? ({ src } as ManifestItem))
      .filter((it) => !!it.src);
  }, []);

  return (
    <section className='py-14 md:py-20'>
      <div className='container mx-auto px-6 md:px-8'>
        <h2 className='mb-6 text-sm tracking-[0.18em] uppercase text-white/70'>
          Selected Work
        </h2>

        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {items.map((it) => (
            <li key={it.src} className='group card overflow-hidden hover-lift'>
              <Link href='/portfolio' className='block'>
                <div className='relative aspect-[4/3]'>
                  <Image
                    src={it.src}
                    alt=''
                    fill
                    sizes='(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw'
                    placeholder={it.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={it.blurDataURL}
                    className='object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]'
                    quality={90}
                    unoptimized /* ← guarantees display even if optimizer path fails */
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
