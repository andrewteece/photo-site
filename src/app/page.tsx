import { Shell } from '@/components/layout/Shell';
import GalleryGrid from '@/components/sections/GalleryGrid';
import Hero from '@/components/sections/Hero';
import VisuallyHidden from '@/components/ui/VisuallyHidden';

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
            Deliberate compositions, patient light.
          </h2>
          <p className='mt-4 text-muted-foreground max-w-prose'>
            Working primarily with natural light, I explore the dialogue between
            form and atmosphere. Each image is an investigation of space,
            texture, and the quiet moments that reveal themselves when we pause.
          </p>
        </Shell>
      </section>

      <GalleryGrid />
    </>
  );
}
