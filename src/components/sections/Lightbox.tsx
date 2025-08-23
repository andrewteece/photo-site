'use client';

import { useEffect } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
  blurDataURL?: string;
};

export default function Lightbox({
  src,
  alt = '',
  blurDataURL,
  onClose,
}: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      onClick={onClose}
    >
      <div
        className='relative w-full max-w-6xl aspect-[3/2]'
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes='100vw'
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          className='object-contain'
          quality={95}
          unoptimized /* ← important for lightbox */
        />
      </div>
    </div>
  );
}
