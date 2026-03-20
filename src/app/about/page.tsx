import { SocialLinks } from '@/components/ui/SocialIcons';
import { site } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Andrew Teece — visual artist working in the medium of photography, exploring the intersection of light, geometry, and contemplation.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About — Andrew Teece Photography',
    description:
      'Learn about Andrew Teece, a visual artist specializing in fine art photography.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <section className='py-14 md:py-20'>
      <div className='container mx-auto max-w-3xl px-6 md:px-8'>
        <h1 className='font-serif text-3xl md:text-4xl tracking-tight text-foreground'>
          About
        </h1>

        <p className='mt-5 text-foreground/80'>
          I&apos;m Andrew Teece, a visual artist working in the medium of
          photography. My practice explores the intersection of light, geometry,
          and contemplation— seeking moments of stillness within the natural and
          built environment.
        </p>

        <p className='mt-4 text-foreground/80'>
          For collaborations, prints, or bookings, reach out at{' '}
          <a
            className='underline hover:opacity-80'
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>

        <div className='mt-8'>
          <div className='text-xs uppercase tracking-widest text-muted-foreground'>
            Find me
          </div>
          <div className='mt-3'>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
