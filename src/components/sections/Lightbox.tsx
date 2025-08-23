'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';

type Item = {
  src: string;
  alt?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
};

type Props = {
  /** Full list of images */
  items: Item[];
  /** Current index in `items` */
  index: number;
  /** Control visibility */
  open: boolean;
  /** Called with the next index when user navigates */
  onChange: (next: number) => void;
  /** Close handler */
  onClose: () => void;
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function Lightbox({
  items,
  index,
  open,
  onChange,
  onClose,
}: Props) {
  // Do nothing if closed or no images
  const hasItems = items && items.length > 0;
  const safeIndex = useMemo(
    () => (hasItems ? mod(index, items.length) : 0),
    [index, hasItems, items?.length]
  );
  const current = hasItems ? items[safeIndex] : undefined;

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (!hasItems) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange(mod(safeIndex + 1, items.length));
      if (e.key === 'ArrowLeft') onChange(mod(safeIndex - 1, items.length));
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, hasItems, items?.length, safeIndex, onChange, onClose]);

  if (!open || !hasItems || !current) return null;

  return (
    <div
      className='fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm'
      role='dialog'
      aria-modal='true'
      aria-label='Image lightbox'
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type='button'
        onClick={onClose}
        className='absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus:outline-none'
        aria-label='Close'
      >
        ✕
      </button>

      {/* Prev/Next */}
      {items.length > 1 && (
        <>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onChange(mod(safeIndex - 1, items.length));
            }}
            className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus:outline-none'
            aria-label='Previous image'
          >
            ‹
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onChange(mod(safeIndex + 1, items.length));
            }}
            className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus:outline-none'
            aria-label='Next image'
          >
            ›
          </button>
        </>
      )}

      {/* Image container */}
      <div
        className='flex h-full w-full items-center justify-center p-4'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='relative w-full max-w-6xl aspect-[3/2]'>
          <Image
            src={current.src}
            alt={current.alt || ''}
            fill
            sizes='100vw'
            placeholder={current.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={current.blurDataURL}
            className='object-contain'
            quality={95}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
