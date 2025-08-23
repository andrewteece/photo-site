import VisuallyHidden from '@/components/ui/VisuallyHidden';
import { Shell } from '@/components/layout/Shell';
import Hero from '@/components/sections/Hero';
import GalleryGrid from '@/components/sections/GalleryGrid';

export default function HomePage() {
  return (
    <>
      {/* SEO/Accessibility: one page-level H1, visually hidden */}
      <VisuallyHidden as='h1'>Andrew Teece — Photography</VisuallyHidden>

      <Hero />

      {/* INTRO COPY */}
      <section className='section'>
        <Shell size='tight'>
          <h2 className='font-serif text-2xl md:text-3xl tracking-tight'>
            Honest images, considered process.
          </h2>
          <p className='mt-4 text-muted-foreground max-w-prose'>
            I work with natural light when possible and keep direction gentle.
            The goal is simple—make photographs that feel like the day, not a
            photoshoot.
          </p>
        </Shell>
      </section>

      <GalleryGrid />
    </>
  );
}
