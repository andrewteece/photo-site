'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import manifestJson from '@/lib/image-manifest.json';
import { getCaptionFor } from '@/lib/captions';

/** Manifest entry shape (when present) */
type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};
const manifest = (manifestJson as ManifestItem[]) ?? [];

/** Desired hero images */
const heroSources = [
  '/images/portfolio/calm-morning.jpg',
  '/images/portfolio/goldengate.jpg',
  '/images/portfolio/morning-colors.jpg',
];

export default function Hero() {
  const prefersReduced = useReducedMotion();

  // Build slides from manifest OR raw files (no blur)
  const slides = useMemo(() => {
    const list = heroSources
      .map(
        (src) =>
          manifest.find((m) => m.src === src) || ({ src } as ManifestItem)
      )
      .filter((x): x is ManifestItem => Boolean(x?.src));
    // Dedup
    const seen = new Set<string>();
    return list.filter((s) =>
      seen.has(s.src) ? false : (seen.add(s.src), true)
    );
  }, []);

  const [index, setIndex] = useState(0);
  const canAnimate = slides.length > 1 && !prefersReduced;

  useEffect(() => {
    if (!canAnimate) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5500
    );
    return () => clearInterval(id);
  }, [canAnimate, slides.length]);

  if (slides.length === 0) return null;

  const s = slides[index];
  const meta = getCaptionFor(s.src);

  const Img = (
    <Image
      src={s.src}
      alt={meta.alt}
      fill
      priority
      sizes='100vw'
      // Use blur only when provided by manifest; otherwise no placeholder
      placeholder={s.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={s.blurDataURL}
      quality={90}
      className='object-cover'
      unoptimized /* ← bypass optimizer to avoid client-side swap issues */
    />
  );

  return (
    <section className='relative h-[70vh] md:h-screen overflow-hidden'>
      {canAnimate ? (
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={s.src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className='absolute inset-0'
            style={{ willChange: 'opacity, transform' }}
          >
            {Img}
            <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent' />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className='absolute inset-0'>
          {Img}
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent' />
        </div>
      )}

      {/* caption */}
      <div className='relative z-10 mx-auto max-w-5xl px-6 h-full flex items-end pb-10'>
        <div className='bg-black/35 backdrop-blur rounded-xl px-4 py-2 text-white'>
          <p className='text-sm md:text-base'>
            {meta.title || meta.alt}
            {meta.location ? ` — ${meta.location}` : ''}
            {meta.year ? `, ${meta.year}` : ''}
          </p>
        </div>
      </div>
    </section>
  );
}
