import type { Metadata } from 'next';
import { Shell } from '@/components/layout/Shell';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Andrew Teece — photographer focused on editorial, documentary, and landscape work.',
};

export default function AboutPage() {
  return (
    <section className='container mx-auto px-6 md:px-8 py-12 md:py-16'>
      <Shell size='tight'>
        {/* Visible H1 (best practice for non-home pages) */}
        <h1 className='font-serif text-3xl md:text-4xl tracking-tight'>
          About
        </h1>

        <div className='prose prose-invert max-w-none mt-6'>
          <p>
            I’m Andrew Teece, a photographer focused on honest,
            documentary-style work with a quiet, editorial sensibility. My
            approach is simple: observe carefully, work with natural light
            whenever possible, and make photographs that feel like the day—not a
            photoshoot.
          </p>
          <p>
            I’m drawn to textures, shadow, and the way small moments add up to a
            larger story. Whether I’m in the city, the desert, or a quiet
            morning by the water, I aim for images that age well—clean,
            restrained, and grounded in place.
          </p>
        </div>

        <div className='mt-8 flex flex-wrap gap-3'>
          <a
            href='/portfolio'
            className='inline-flex items-center rounded-full border border-white/20 px-4 py-2 hover:bg-white/10 transition'
          >
            View Portfolio
          </a>
          <a
            href='mailto:hello@andrewteece.com'
            className='inline-flex items-center rounded-full bg-brand px-4 py-2 text-black hover:opacity-90 transition'
          >
            Get in touch
          </a>
        </div>

        {/* Optional: services / approach bullets */}
        <div className='mt-12 grid gap-6 md:grid-cols-3'>
          <div className='rounded-2xl border border-white/10 p-5'>
            <h2 className='text-lg font-medium mb-2'>Approach</h2>
            <p className='text-sm text-muted-foreground'>
              Natural light, minimal direction, patient timing. Clean color with
              respect for the scene.
            </p>
          </div>
          <div className='rounded-2xl border border-white/10 p-5'>
            <h2 className='text-lg font-medium mb-2'>Focus</h2>
            <p className='text-sm text-muted-foreground'>
              Editorial &amp; documentary, landscapes, and quiet city moments.
            </p>
          </div>
          <div className='rounded-2xl border border-white/10 p-5'>
            <h2 className='text-lg font-medium mb-2'>Availability</h2>
            <p className='text-sm text-muted-foreground'>
              Based in the Midwest; available for select assignments and print
              commissions.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}
