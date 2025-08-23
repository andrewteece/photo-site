import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';

export default function NotFound() {
  return (
    <section className='container mx-auto px-6 md:px-8 py-16 md:py-24'>
      <Shell size='tight'>
        <div className='mx-auto max-w-xl text-center'>
          <p className='text-sm tracking-widest text-white/60'>404</p>
          <h1 className='mt-2 font-serif text-3xl md:text-4xl tracking-tight'>
            Page not found
          </h1>
          <p className='mt-3 text-muted-foreground'>
            The page you’re looking for doesn’t exist or may have been moved.
          </p>

          <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
            <Link
              href='/'
              className='inline-flex items-center rounded-full bg-brand px-5 py-2 text-black hover:opacity-90 transition'
            >
              Go home
            </Link>
            <Link
              href='/portfolio'
              className='inline-flex items-center rounded-full border border-white/20 px-5 py-2 hover:bg-white/10 transition'
            >
              View portfolio
            </Link>
          </div>

          <div className='mt-10 text-xs text-white/50'>
            If you believe this is an error,{' '}
            <a
              className='underline hover:no-underline'
              href='mailto:hello@andrewteece.com'
            >
              email me
            </a>
            .
          </div>
        </div>
      </Shell>
    </section>
  );
}
