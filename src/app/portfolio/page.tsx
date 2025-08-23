'use client';

import Image from 'next/image';
import { useState } from 'react';
import manifest from '@/lib/image-manifest.json';
import Lightbox from '@/components/sections/Lightbox';

export default function PortfolioPage() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const photos = manifest; // full list from your build script

  return (
    <>
      <section className='container mx-auto px-6 md:px-8 py-10 md:py-14'>
        <header className='mb-8'>
          <h1 className='font-serif text-3xl md:text-4xl tracking-tight'>
            Portfolio
          </h1>
          <p className='text-muted-foreground mt-2'>
            Selected photographs. Click any image to view larger. Use ← → keys
            to navigate.
          </p>
        </header>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => {
                setIdx(i);
                setOpen(true);
              }}
              className='group block overflow-hidden rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50'
              aria-label='Open image'
            >
              <Image
                src={p.src}
                alt=''
                width={p.width}
                height={p.height}
                placeholder='blur'
                blurDataURL={p.blurDataURL}
                sizes='(min-width: 1024px) 33vw, (min-width: 640px) 48vw, 94vw'
                className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.01]'
                quality={85}
              />
            </button>
          ))}
        </div>
      </section>

      <Lightbox
        items={photos}
        index={idx}
        onChange={(next) => setIdx(next)}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
