'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import manifest from '@/lib/image-manifest.json';
import { getCaptionFor } from '@/lib/captions';

const heroSources = [
  '/images/portfolio/calm-morning.jpg',
  '/images/portfolio/goldengate.jpg',
  '/images/portfolio/morning-colors.jpg',
];

const slides = heroSources
  .map((src) => manifest.find((m) => m.src === src))
  .filter(Boolean) as typeof manifest;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  // Hooks must run before any early return
  useEffect(() => {
    if (prefersReduced || slides.length === 0) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5500
    );
    return () => clearInterval(id);
  }, [prefersReduced]);

  if (slides.length === 0) return null;

  const s = slides[index];
  const meta = getCaptionFor(s.src);

  return (
    <section className='relative h-[70vh] md:h-screen overflow-hidden'>
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          key={s.src}
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
          transition={{ duration: prefersReduced ? 0 : 0.8, ease: 'easeInOut' }}
          className='absolute inset-0'
        >
          <Image
            src={s.src}
            alt={meta.alt}
            fill
            priority
            placeholder='blur'
            blurDataURL={s.blurDataURL}
            sizes='100vw'
            quality={90}
            className='object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent' />
        </motion.div>
      </AnimatePresence>

      {/* caption only */}
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
