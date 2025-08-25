import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { SocialLinks } from '@/components/ui/SocialIcons';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Andrew Teece — photographer specializing in fine art landscapes and portrait commissions.',
};

export default function AboutPage() {
  return (
    <section className='py-14 md:py-20'>
      <div className='container mx-auto max-w-3xl px-6 md:px-8'>
        <h1 className='font-serif text-3xl md:text-4xl tracking-tight text-foreground'>
          About
        </h1>

        <p className='mt-5 text-foreground/80'>
          I’m Andrew Teece, a photographer focused on fine art landscapes and
          thoughtful portrait commissions. My work leans into quiet light, clean
          geometry, and a sense of stillness.
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
