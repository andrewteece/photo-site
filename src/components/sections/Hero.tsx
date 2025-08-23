'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import manifest from '@/lib/image-manifest.json';

// Pick a subset of hero-worthy shots
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

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5500
    );
    return () => clearInterval(id);
  }, []);

  const s = slides[index];

  return (
    <section className='relative h-[70vh] md:h-screen overflow-hidden'>
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          key={s.src}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='absolute inset-0'
        >
          <Image
            src={s.src}
            alt=''
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

      <div className='relative z-10 mx-auto max-w-5xl px-6 h-full flex items-end pb-10'>
        <h1 className='text-2xl md:text-4xl font-semibold text-white drop-shadow'>
          Andrew Teece — Photography
        </h1>
      </div>
    </section>
  );
}
