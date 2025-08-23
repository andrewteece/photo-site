'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    src: '/images/portfolio/sandwaves-bw.jpg',
    alt: 'Wind-carved ripples in sand, black and white',
  },
  {
    src: '/images/portfolio/sedona-bw.jpg',
    alt: 'Long-exposure creek with fallen leaves, black and white',
  },
  {
    src: '/images/portfolio/zion-color.jpg',
    alt: 'Canyon wall with cottonwoods in autumn color, Zion',
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className='relative h-[70vh] md:h-screen overflow-hidden'>
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          key={slides[index].src}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8 }}
          className='absolute inset-0'
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority
            className='object-cover'
            sizes='100vw'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
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
