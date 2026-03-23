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

        <p className='mt-2 text-sm text-muted-foreground'>
          Midwest-based photographer available for assignments, collaborations,
          and licensing.
        </p>

        <p className='mt-5 text-foreground/80'>
          I&apos;m Andrew Teece, a visual artist working in the medium of
          photography. My practice explores the intersection of light, geometry,
          and contemplation— seeking moments of stillness within the natural and
          built environment.
        </p>

        <p className='mt-4 text-foreground/80'>
          I&apos;m based in the Midwest and most at home on the edges of cities,
          shorelines, and quiet stretches of road—places where weather,
          structure, and time leave slow marks. The work on this site is a small
          selection from ongoing personal projects and walks.
        </p>

        <p className='mt-4 text-foreground/80'>
          For assignments, collaborations, or licensing existing images, reach
          out at{' '}
          <a
            className='underline hover:opacity-80'
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>

        <div className='mt-8 grid gap-6 md:grid-cols-2'>
          <div>
            <h2 className='text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
              What draws me in
            </h2>
            <ul className='mt-3 space-y-1 text-sm text-foreground/80'>
              <li>
                Soft, directional light and weather that reshapes the familiar
              </li>
              <li>Geometry in bridges, shorelines, and quiet infrastructure</li>
              <li>Slow, patient walks that reveal small changes over time</li>
            </ul>
          </div>

          <div className='rounded-2xl border border-border bg-muted/30 p-5 h-full flex flex-col'>
            <div>
              <h2 className='text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                Ways to work together
              </h2>
              <ul className='mt-3 space-y-1 text-sm text-foreground/80'>
                <li>Assignments and long-form collaborative projects</li>
                <li>Licensing existing photographs for editorial or web use</li>
                <li>Fine art prints for homes, studios, and offices</li>
              </ul>
            </div>

            <a
              href='/contact'
              className='mt-4 inline-flex items-center text-sm font-medium underline decoration-2 underline-offset-4 hover:no-underline'
            >
              Get in touch →
            </a>
          </div>
        </div>

        <div className='mt-12 grid gap-8 md:grid-cols-2'>
          <div>
            <h2 className='text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
              Influences
            </h2>
            <ul className='mt-3 space-y-1 text-sm text-foreground/80'>
              <li>
                <a
                  href='https://guytal.com/'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Guy Tal
                </a>
              </li>
              <li>
                <a
                  href='https://www.barnbaum.com/'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Bruce Barnbaum
                </a>
              </li>
              <li>
                <a
                  href='https://www.michaelkenna.com/'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Michael Kenna
                </a>
              </li>
              <li>
                <a
                  href='https://www.holdenluntz.com/artists/eliot-porter/'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Eliot Porter
                </a>
              </li>
              <li>
                <a
                  href='https://en.wikipedia.org/wiki/Galen_Rowell'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Galen Rowell
                </a>
              </li>
              <li>
                <a
                  href='https://www.chuckkimmerle.com/'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Chuck Kimmerle
                </a>
              </li>
              <li>
                <a
                  href='https://www.anseladams.com/'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Ansel Adams
                </a>
              </li>
              <li>
                <a
                  href='https://www.edward-weston.com/edwardweston'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Edward Weston
                </a>
              </li>
              <li>
                <a
                  href='https://en.wikipedia.org/wiki/Dorothea_Lange'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Dorothea Lange
                </a>
              </li>
              <li>
                <a
                  href='https://craigrobertsphotography.co.uk/index.html'
                  className='underline hover:no-underline'
                  target='_blank'
                  rel='noreferrer'
                >
                  Craig Roberts
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className='text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
              Find me
            </h2>
            <div className='mt-3'>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
