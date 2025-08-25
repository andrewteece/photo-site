'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { getCaptionFor } from '@/lib/captions';

type Slide = { src: string };

const heroSources: Slide[] = [
  { src: '/images/portfolio/calm-morning.jpg' },
  { src: '/images/portfolio/goldengate.jpg' },
  { src: '/images/portfolio/morning-colors.jpg' },
];

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const slides = useMemo(() => heroSources.filter(Boolean), []);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const canAnimate = slides.length > 1 && !prefersReduced;

  useEffect(() => {
    if (!canAnimate || hovered) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5500
    );
    return () => clearInterval(id);
  }, [canAnimate, hovered, slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % slides.length);
      if (e.key === 'ArrowLeft')
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const s = slides[index];
  const meta = getCaptionFor(s.src);

  const Img = (
    <Image
      src={s.src}
      alt={meta.alt || 'Featured photograph'}
      fill
      priority
      quality={80}
      sizes='100vw'
      className='object-cover block transition-transform group-hover:scale-[1.02]'
    />
  );

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section
      className={[
        'group/hero relative overflow-hidden',
        'h-[45vh] md:h-[58vh] lg:h-[64vh] xl:h-[68vh]',
        'min-h-[320px] max-h-[760px]',
      ].join(' ')}
      aria-label='Featured work'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {canAnimate ? (
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={s.src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.986 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className='absolute inset-0'
            style={{ willChange: 'opacity, transform' }}
          >
            {Img}
            <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent' />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className='absolute inset-0'>
          {Img}
          <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent' />
        </div>
      )}

      {/* Caption */}
      <div className='relative z-10 mx-auto max-w-6xl px-6 h-full flex items-end pb-8 md:pb-10'>
        <div
          className={[
            'rounded-xl border border-border',
            'bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60',
            'text-foreground shadow-sm',
            'px-4 py-2',
          ].join(' ')}
        >
          <p className='text-sm md:text-[15px] leading-none'>
            {meta.title || meta.alt}
            {meta.location ? ` — ${meta.location}` : ''}
            {meta.year ? `, ${meta.year}` : ''}
          </p>
        </div>
      </div>

      {/* Prev/Next + Dots (unchanged) */}
      {slides.length > 1 && (
        <>
          <button
            type='button'
            onClick={prev}
            aria-label='Previous image'
            className={[
              'absolute left-3 top-1/2 -translate-y-1/2 z-10',
              'inline-flex items-center justify-center rounded-full',
              'border border-border bg-background/70 text-foreground',
              'hover:bg-background/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'h-10 w-10 md:h-11 md:w-11',
              'transition-opacity opacity-100 md:opacity-0 md:group-hover/hero:opacity-100',
            ].join(' ')}
          >
            <ChevronLeft className='h-5 w-5' />
          </button>

          <button
            type='button'
            onClick={next}
            aria-label='Next image'
            className={[
              'absolute right-3 top-1/2 -translate-y-1/2 z-10',
              'inline-flex items-center justify-center rounded-full',
              'border border-border bg-background/70 text-foreground',
              'hover:bg-background/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'h-10 w-10 md:h-11 md:w-11',
              'transition-opacity opacity-100 md:opacity-0 md:group-hover/hero:opacity-100',
            ].join(' ')}
          >
            <ChevronRight className='h-5 w-5' />
          </button>

          <div className='pointer-events-auto absolute bottom-3 left-1/2 z-10 -translate-x-1/2'>
            <ul className='flex items-center gap-2'>
              {slides.map((_, i) => {
                const active = i === index;
                return (
                  <li key={i}>
                    <button
                      type='button'
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={active ? 'true' : undefined}
                      onClick={() => setIndex(i)}
                      className={[
                        'h-2.5 w-2.5 rounded-full border transition-colors',
                        active
                          ? 'border-foreground bg-foreground'
                          : 'border-border bg-muted hover:bg-foreground/60',
                      ].join(' ')}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}

function ChevronLeft({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M15 19 8 12l7-7'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
function ChevronRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='m9 5 7 7-7 7'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
