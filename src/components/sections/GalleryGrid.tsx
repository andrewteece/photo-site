/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';

// The exact files we want to show (must exist under /public/images/portfolio)
const desired = [
  '/images/portfolio/goldengate.jpg',
  '/images/portfolio/morning-colors.jpg',
  '/images/portfolio/calm-morning.jpg',
  '/images/portfolio/morning-storm.jpg',
  '/images/portfolio/dew.jpg',
  '/images/portfolio/fern.jpg',
];

export default function GalleryGrid() {
  return (
    <section className='py-14 md:py-20'>
      <div className='mx-auto max-w-6xl px-6 md:px-8'>
        <h2 className='mb-6 text-sm tracking-[0.18em] uppercase text-zinc-600 dark:text-white/70'>
          Selected Work
        </h2>

        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {desired.map((src) => (
            <li
              key={src}
              className='group overflow-hidden rounded-2xl ring-1 ring-zinc-900/10 bg-white dark:ring-white/10 dark:bg-white/[0.03]'
            >
              <Link href='/portfolio' className='block'>
                <div className='relative aspect-[4/3]'>
                  <img
                    src={src}
                    alt=''
                    decoding='async'
                    loading='lazy'
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                    className='group-hover:scale-[1.02]'
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
