'use client';

import type { Caption } from '@/lib/captions';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

type Item = {
  src: string;
  alt?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  caption?: Caption;
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
    [index, hasItems, items?.length],
  );
  const current = hasItems ? items[safeIndex] : undefined;

  const [showHelp, setShowHelp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  useEffect(() => {
    if (open && typeof window !== 'undefined') {
      setUrl(window.location.origin + '/portfolio');
    }
  }, [open]);

  // Touch gesture handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !hasItems) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onChange(mod(safeIndex + 1, items.length));
    }
    if (isRightSwipe) {
      onChange(mod(safeIndex - 1, items.length));
    }
  };

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (!hasItems) return;
      if (e.key === 'Escape') {
        if (showHelp) {
          setShowHelp(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowRight') onChange(mod(safeIndex + 1, items.length));
      if (e.key === 'ArrowLeft') onChange(mod(safeIndex - 1, items.length));
      if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        setShowHelp((prev) => !prev);
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, hasItems, items?.length, safeIndex, onChange, onClose, showHelp]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const shareOnPinterest = () => {
    if (!current) return;
    const imageUrl = encodeURIComponent(url);
    const description = encodeURIComponent(
      current.caption?.title || current.alt || 'Photography',
    );
    const media = encodeURIComponent(window.location.origin + current.src);
    window.open(
      `https://pinterest.com/pin/create/button/?url=${imageUrl}&media=${media}&description=${description}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const downloadImage = async () => {
    if (!current) return;
    try {
      const response = await fetch(current.src);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const filename = current.caption?.title
        ? `${current.caption.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`
        : current.src.split('/').pop() || 'photo.jpg';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!open || !hasItems || !current) return null;

  const caption = current.caption;
  const hasExif = caption?.camera || caption?.lens || caption?.settings;

  // Preload adjacent images for faster navigation
  const prevIndex = mod(safeIndex - 1, items.length);
  const nextIndex = mod(safeIndex + 1, items.length);
  const prevItem = items[prevIndex];
  const nextItem = items[nextIndex];

  return (
    <div
      className='fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm'
      role='dialog'
      aria-modal='true'
      aria-label='Image lightbox'
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Preload adjacent images (hidden) */}
      {prevItem && <link rel='preload' as='image' href={prevItem.src} />}
      {nextItem && <link rel='preload' as='image' href={nextItem.src} />}

      {/* Image counter */}
      {items.length > 1 && (
        <div className='absolute top-4 left-1/2 -translate-x-1/2 z-10'>
          <div className='rounded-full bg-black/60 backdrop-blur px-4 py-2 text-white text-sm font-medium'>
            {safeIndex + 1} / {items.length}
          </div>
        </div>
      )}

      {/* Top bar: Download, Help, Share, Close */}
      <div className='absolute right-4 top-4 flex items-center gap-2 z-10'>
        {/* Download button */}
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            downloadImage();
          }}
          className='rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus:outline-none transition-colors'
          aria-label='Download image'
          title='Download image'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
            />
          </svg>
        </button>

        {/* Help button */}
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            setShowHelp((prev) => !prev);
          }}
          className='rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus:outline-none transition-colors'
          aria-label='Keyboard shortcuts'
          title='Keyboard shortcuts'
        >
          ?
        </button>

        {/* Copy link */}
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            copyLink();
          }}
          className='rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus:outline-none transition-colors'
          aria-label={copied ? 'Copied!' : 'Copy link'}
          title={copied ? 'Copied!' : 'Copy link'}
        >
          {copied ? '✓' : '🔗'}
        </button>

        {/* Pinterest share */}
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            shareOnPinterest();
          }}
          className='rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus:outline-none transition-colors'
          aria-label='Share on Pinterest'
          title='Share on Pinterest'
        >
          📌
        </button>

        {/* Close button */}
        <button
          type='button'
          onClick={onClose}
          className='rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus:outline-none transition-colors'
          aria-label='Close'
        >
          ✕
        </button>
      </div>

      {/* Prev/Next */}
      {items.length > 1 && (
        <>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onChange(mod(safeIndex - 1, items.length));
            }}
            className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-2 text-2xl text-white hover:bg-white/20 focus:outline-none z-10'
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
            className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-2 text-2xl text-white hover:bg-white/20 focus:outline-none z-10'
            aria-label='Next image'
          >
            ›
          </button>
        </>
      )}

      {/* Image container with zoom */}
      <div
        className='flex h-full w-full flex-col items-center justify-center p-4 pb-20'
        onClick={(e) => e.stopPropagation()}
      >
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={4}
          doubleClick={{ mode: 'toggle' }}
          wheel={{ step: 0.1 }}
        >
          <TransformComponent
            wrapperClass='!w-full !max-w-6xl'
            contentClass='!w-full !h-full flex items-center justify-center'
          >
            <div className='relative w-full max-w-6xl'>
              <div className='bg-white rounded-2xl p-4 shadow-[var(--shadow-photo)]'>
                <div className='relative w-full aspect-[3/2]'>
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
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* Bottom metadata panel */}
      {(caption?.title || caption?.location || hasExif) && (
        <div
          className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 py-4 text-white'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='mx-auto max-w-4xl'>
            {caption?.title && (
              <h3 className='text-lg font-semibold mb-1'>{caption.title}</h3>
            )}
            {caption?.location && (
              <p className='text-sm text-white/80 mb-2'>
                📍 {caption.location}
                {caption?.year && ` • ${caption.year}`}
              </p>
            )}
            {hasExif && (
              <div className='flex flex-wrap gap-4 text-xs text-white/70'>
                {caption?.camera && <span>📷 {caption.camera}</span>}
                {caption?.lens && <span>🔍 {caption.lens}</span>}
                {caption?.settings && <span>⚙️ {caption.settings}</span>}
              </div>
            )}
            {caption?.source && (
              <div className='mt-3 pt-3 border-t border-white/10'>
                <a
                  href={caption.source.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-xs text-white/60 hover:text-white/90 transition-colors'
                >
                  <span>
                    {caption.source.platform === '500px' && '🌐'}
                    {caption.source.platform === 'flickr' && '📸'}
                    {caption.source.platform === 'instagram' && '📷'}
                    {caption.source.platform === 'web' && '🔗'}
                  </span>
                  <span>
                    Originally shared on{' '}
                    <span className='font-medium'>
                      {caption.source.platform === '500px' && '500px'}
                      {caption.source.platform === 'flickr' && 'Flickr'}
                      {caption.source.platform === 'instagram' && 'Instagram'}
                      {caption.source.platform === 'web' && 'the web'}
                    </span>
                    {caption.source.username &&
                      ` by @${caption.source.username}`}
                  </span>
                  <span className='ml-1'>→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keyboard shortcuts help overlay */}
      {showHelp && (
        <div
          className='absolute inset-0 flex items-center justify-center bg-black/80 z-20'
          onClick={() => setShowHelp(false)}
        >
          <div
            className='bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-md text-white'
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className='text-xl font-semibold mb-4'>Keyboard Shortcuts</h3>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-white/70'>Navigate</span>
                <kbd className='rounded bg-white/20 px-2 py-1'>←</kbd>
                <kbd className='rounded bg-white/20 px-2 py-1'>→</kbd>
              </div>
              <div className='flex justify-between'>
                <span className='text-white/70'>Zoom</span>
                <span className='text-white/90'>Double-click or scroll</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-white/70'>Close</span>
                <kbd className='rounded bg-white/20 px-2 py-1'>ESC</kbd>
              </div>
              <div className='flex justify-between'>
                <span className='text-white/70'>Toggle help</span>
                <kbd className='rounded bg-white/20 px-2 py-1'>?</kbd>
              </div>
            </div>
            <button
              type='button'
              onClick={() => setShowHelp(false)}
              className='mt-6 w-full rounded-lg bg-white/20 px-4 py-2 hover:bg-white/30'
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
