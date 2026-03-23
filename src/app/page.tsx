import { Shell } from '@/components/layout/Shell';
import GalleryGrid from '@/components/sections/GalleryGrid';
import Hero from '@/components/sections/Hero';
import VisuallyHidden from '@/components/ui/VisuallyHidden';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* SEO/Accessibility: one page-level H1, visually hidden */}
      <VisuallyHidden as='h1'>Andrew Teece — Photography</VisuallyHidden>

      <Hero />

      {/* INTRO COPY */}
      <section className='section'>
        <Shell size='tight'>
          <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight'>
            Deliberate compositions, patient light.
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-prose'>
            Working primarily with natural light, I explore the dialogue between
            form and atmosphere. Each image is an investigation of space,
            texture, and the quiet moments that reveal themselves when we pause.
          </p>
          <div className='mt-6 flex flex-wrap gap-4'>
            <Link
              href='/portfolio'
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors'
            >
              Explore Work
            </Link>
            <Link
              href='/about'
              className='inline-flex items-center gap-2 px-5 py-2.5 border-2 border-foreground text-foreground rounded-full font-medium hover:bg-foreground hover:text-background transition-colors'
            >
              About Me
            </Link>
          </div>
        </Shell>
      </section>

      {/* Practice & approach strip */}
      <section className='py-10 md:py-12 bg-muted/40 border-y border-border/60'>
        <Shell size='tight'>
          <div className='mx-auto max-w-4xl space-y-6'>
            <p className='text-[0.65rem] md:text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground/80 text-center'>
              How this work is made
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
              <div className='flex flex-col items-start sm:items-center text-left sm:text-center rounded-2xl border border-border/70 bg-background/80 px-4 py-4 sm:px-5 sm:py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-foreground/30 hover:bg-background/90'>
                <div className='text-sm md:text-base font-semibold text-foreground'>
                  Natural light only
                </div>
                <div className='mt-1 text-xs md:text-sm text-muted-foreground max-w-[18rem]'>
                  Photographed in available ambient light
                </div>
              </div>

              <div className='flex flex-col items-start sm:items-center text-left sm:text-center rounded-2xl border border-border/70 bg-background/80 px-4 py-4 sm:px-5 sm:py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-foreground/30 hover:bg-background/90'>
                <div className='text-sm md:text-base font-semibold text-foreground'>
                  Considered exposures
                </div>
                <div className='mt-1 text-xs md:text-sm text-muted-foreground max-w-[18rem]'>
                  Made slowly, with time to look
                </div>
              </div>

              <div className='flex flex-col items-start sm:items-center text-left sm:text-center rounded-2xl border border-border/70 bg-background/80 px-4 py-4 sm:px-5 sm:py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-foreground/30 hover:bg-background/90'>
                <div className='text-sm md:text-base font-semibold text-foreground'>
                  On foot, not staged
                </div>
                <div className='mt-1 text-xs md:text-sm text-muted-foreground max-w-[18rem]'>
                  Scenes discovered by walking on location
                </div>
              </div>

              <div className='flex flex-col items-start sm:items-center text-left sm:text-center rounded-2xl border border-border/70 bg-background/80 px-4 py-4 sm:px-5 sm:py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-foreground/30 hover:bg-background/90'>
                <div className='text-sm md:text-base font-semibold text-foreground'>
                  Quiet, in-between places
                </div>
                <div className='mt-1 text-xs md:text-sm text-muted-foreground max-w-[18rem]'>
                  Drawn to edges and overlooked spaces
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      <GalleryGrid />
    </>
  );
}
