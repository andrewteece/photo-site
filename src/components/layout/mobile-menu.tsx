'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  const close = () => setOpen(false);

  // Close when the route changes (covers back/forward, programmatic nav, etc.)
  useEffect(() => {
    if (open) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Restore focus to burger when closing
  useEffect(() => {
    if (!open && buttonRef.current) buttonRef.current.focus();
  }, [open]);

  // Click outside to close (but ignore when clicking inside the panel)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // Prevent background scroll while open
  useEffect(() => {
    if (!open) return;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, [open]);

  // Minimal focus trap inside the panel
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const selector =
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(selector)
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || focusables.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    first?.focus();
    panel.addEventListener('keydown', onKeyDown);
    return () => panel.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      {/* Burger */}
      <button
        ref={buttonRef}
        type='button'
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls='mobile-menu'
        onClick={() => setOpen((v) => !v)}
        className='appearance-none select-none relative grid h-10 w-10 aspect-square place-items-center p-0
                   rounded-lg border border-input hover:bg-accent transition-colors duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]
                   motion-reduce:transition-none'
      >
        <span aria-hidden className='relative block h-5 w-6'>
          <span
            className={`absolute left-1/2 top-0 block h-[2px] w-6 -translate-x-1/2 rounded bg-foreground
              transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'translate-y-2.5 rotate-45' : ''
              }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground
              transition-opacity duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
          />
          <span
            className={`absolute left-1/2 bottom-0 block h-[2px] w-6 -translate-x-1/2 rounded bg-foreground
              transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? '-translate-y-2.5 -rotate-45' : ''
              }`}
          />
        </span>
      </button>

      {/* Backdrop */}
      <div
        className={[
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
          'transition-opacity duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        ].join(' ')}
        aria-hidden='true'
      />

      {/* Slide-in panel */}
      <div
        id='mobile-menu'
        role='dialog'
        aria-modal='true'
        tabIndex={-1}
        ref={panelRef}
        className={[
          'fixed inset-y-0 right-0 z-50 w-[85%] max-w-80 border-l bg-card text-card-foreground shadow-[var(--shadow-photo)]',
          'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className='h-16 px-4 flex items-center justify-between border-b'>
          <span className='text-sm uppercase tracking-wide text-muted-foreground'>
            Menu
          </span>
          <button
            className='grid h-10 w-10 place-items-center rounded-lg hover:bg-accent'
            aria-label='Close menu'
            onClick={close}
          >
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'
              fill='none'
              aria-hidden='true'
            >
              <path
                d='M6 6l12 12M18 6l-12 12'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>

        <nav className='px-4 py-4'>
          <ul className='space-y-1'>
            {[
              ['Portfolio', '/portfolio'],
              ['Services', '/services'],
              ['About', '/about'],
              ['Blog', '/blog'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  // Capture the click to close before navigation kicks off
                  onClickCapture={close}
                  className='flex items-center justify-between rounded-xl px-3 py-2 hover:bg-accent transition-colors'
                >
                  <span>{label}</span>
                  <svg
                    className='h-4 w-4'
                    viewBox='0 0 24 24'
                    fill='none'
                    aria-hidden='true'
                  >
                    <path
                      d='M9 6l6 6-6 6'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </li>
            ))}
            <li className='pt-2'>
              <Link
                href='/contact'
                onClickCapture={close}
                className='btn btn-primary w-full'
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className='mt-auto px-4 py-4 border-t'>
          <p className='text-xs text-muted-foreground'>
            © {new Date().getFullYear()} Andrew Teece — Photography
          </p>
        </div>
      </div>
    </>
  );
}
