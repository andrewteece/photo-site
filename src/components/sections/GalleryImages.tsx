'use client';

import Lightbox from '@/components/sections/Lightbox';
import { getCaptionFor } from '@/lib/captions';
import manifest from '@/lib/image-manifest.json';
import Image from 'next/image';
import { useState } from 'react';

type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

type Props = {
  images: string[];
};

export function GalleryImages({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const photos = manifest as ManifestItem[];

  // Map gallery image paths to manifest items
  const galleryPhotos = images
    .map((imgPath) => {
      const filename = imgPath.split('/').pop();
      return photos.find((p) => p.src.includes(filename || ''));
    })
    .filter(Boolean) as ManifestItem[];

  if (galleryPhotos.length === 0) {
    return (
      <div className='text-center text-muted-foreground py-8'>
        Gallery images will appear here once processed.
      </div>
    );
  }

  return (
    <>
      <section>
        <h2 className='text-2xl font-serif font-semibold mb-6'>Gallery</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {galleryPhotos.map((photo, i) => {
            const meta = getCaptionFor(photo.src);
            return (
              <button
                key={photo.src}
                onClick={() => {
                  setIdx(i);
                  setOpen(true);
                }}
                className='group block overflow-hidden rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/30'
                aria-label={`Open image: ${meta.title || meta.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={meta.alt}
                  width={photo.width}
                  height={photo.height}
                  placeholder='blur'
                  blurDataURL={photo.blurDataURL}
                  sizes='(min-width: 1024px) 33vw, (min-width: 768px) 48vw, 94vw'
                  quality={85}
                  className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
                />
              </button>
            );
          })}
        </div>
      </section>

      <Lightbox
        items={galleryPhotos.map((p) => ({
          ...p,
          alt: getCaptionFor(p.src).alt,
          caption: getCaptionFor(p.src),
        }))}
        index={idx}
        onChange={(next) => setIdx(next)}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
