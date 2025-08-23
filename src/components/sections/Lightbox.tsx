'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { getCaptionFor } from '@/lib/captions';

type Item = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export default function Lightbox({
  items,
  index,
  onChange,
  onClose,
  open,
}: {
  items: Item[];
  index: number;
  onChange: (nextIndex: number) => void;
  onClose: () => void;
  open: boolean;
}) {
  const item = items[index];
  const prefersReduced = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [showCaption, setShowCaption] = useState(true);

  // Keyboard nav + ESC + Caption toggle
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
      if (e.key === 'ArrowLeft')
        onChange((index - 1 + items.length) % items.length);
      if (e.key.toLowerCase() === 'c') setShowCaption((s) => !s);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, items.length, onChange, onClose]);

  // Lock background scroll + focus Close on open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open || !item) return null;

  const meta = getCaptionFor(item.src);

  return (
    <AnimatePresence>
      <motion.div
        key={item.src}
        role='dialog'
        aria-modal='true'
        aria-label='Image viewer'
        className='fixed inset-0 z-50 bg-black/90 backdrop-blur-sm'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // Close on backdrop click
        onClick={(e) => {
          if (e.currentTarget === e.target) onClose();
        }}
      >
        {/* Close */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className='absolute top-4 right-4 text-white/90 hover:text-white text-sm border border-white/30 rounded-full px-3 py-1'
          aria-label='Close'
        >
          Close
        </button>

        {/* Prev / Next */}
        <button
          onClick={() => onChange((index - 1 + items.length) % items.length)}
          aria-label='Previous image'
          className='absolute left-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white px-3 py-2'
        >
          ‹
        </button>
        <button
          onClick={() => onChange((index + 1) % items.length)}
          aria-label='Next image'
          className='absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white px-3 py-2'
        >
          ›
        </button>

        {/* Image (stop click from bubbling to backdrop) */}
        <div className='absolute inset-0' onClick={(e) => e.stopPropagation()}>
          <motion.div
            className='relative h-full w-full'
            initial={{ scale: prefersReduced ? 1 : 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: prefersReduced ? 1 : 0.98, opacity: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.3,
              ease: 'easeInOut',
            }}
          >
            <Image
              key={item.src}
              src={item.src}
              alt={meta.alt}
              fill
              placeholder='blur'
              blurDataURL={item.blurDataURL}
              sizes='100vw'
              quality={90}
              className='object-contain'
              priority
            />
          </motion.div>
        </div>

        {/* Caption / Counter (toggle with "c") */}
        {showCaption && (
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 text-sm px-3 py-2 rounded-md bg-black/40'>
            <div className='text-center'>
              {meta.title || meta.alt}
              {meta.location ? ` — ${meta.location}` : ''}
              {meta.year ? `, ${meta.year}` : ''}
            </div>
            <div className='mt-1 text-white/70 text-xs text-center'>
              {index + 1} / {items.length} • Press “C” to toggle caption
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
