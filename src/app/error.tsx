'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error (replace with Sentry/LogRocket later if desired)
  useEffect(() => {
    console.error('App error boundary:', error);
  }, [error]);

  return (
    <section className='container mx-auto px-6 md:px-8 py-16 md:py-24'>
      <Shell size='tight'>
        <div className='mx-auto max-w-xl text-center'>
          <p className='text-sm tracking-widest text-white/60'>Error</p>
          <h1 className='mt-2 font-serif text-3xl md:text-4xl tracking-tight'>
            Something went wrong
          </h1>
          <p className='mt-3 text-muted-foreground'>
            An unexpected error occurred. You can try again, or head back home.
          </p>

          <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
            <button
              onClick={() => reset()}
              className='inline-flex items-center rounded-full bg-brand px-5 py-2 text-black hover:opacity-90 transition'
            >
              Try again
            </button>
            <Link
              href='/'
              className='inline-flex items-center rounded-full border border-white/20 px-5 py-2 hover:bg-white/10 transition'
            >
              Go home
            </Link>
          </div>

          <div className='mt-10 text-xs text-white/50 space-y-1'>
            <div>
              If this keeps happening,{' '}
              <a
                className='underline hover:no-underline'
                href='mailto:hello@andrewteece.com?subject=Site%20error&body=Hi%20Andrew%2C%0A%0AI%20hit%20an%20error%20on%20this%20page%3A%20%0A%0A'
              >
                email me
              </a>
              .
            </div>
            {error?.digest && <div>Error ID: {error.digest}</div>}
          </div>
        </div>
      </Shell>
    </section>
  );
}
