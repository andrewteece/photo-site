import Link from 'next/link';
import Image from 'next/image';
import { Shell } from '@/components/layout/Shell';

const featured = [
  {
    src: '/photos/01.jpg',
    title: 'Golden hour portrait',
    caption: 'Golden hour',
  },
  {
    src: '/photos/02.jpg',
    title: 'Editorial studio black & white',
    caption: 'Studio B/W',
  },
  { src: '/photos/03.jpg', title: 'Lake reflections', caption: 'Reflections' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className='section'>
        <Shell size='tight' className='text-center'>
          <p className='kicker'>Editorial & Documentary</p>

          <h1 className='mt-4 font-serif tracking-tight text-4xl md:text-6xl lg:text-7xl'>
            Photography that feels like memory
          </h1>

          <p className='mt-4 md:mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto'>
            Weddings, portraits, and brand stories crafted with light, patience,
            and care.
          </p>

          <div className='mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3'>
            <Link href='/contact' className='btn btn-primary'>
              Book a session
            </Link>
            <Link href='/portfolio' className='btn btn-outline'>
              View portfolio
            </Link>
          </div>
        </Shell>
      </section>

      {/* FEATURED — image rail */}
      <section className='border-y'>
        <Shell size='wide' className='py-10 md:py-14'>
          <div className='edge-fade rail'>
            <ul className='rail-items'>
              {featured.map((f) => (
                <li key={f.title} className='rail-card'>
                  <Link
                    href='/portfolio'
                    className='block group card overflow-hidden hover-lift'
                  >
                    <div className='relative aspect-[4/3]'>
                      <Image
                        src={f.src}
                        alt={f.title}
                        fill
                        sizes='(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 78vw'
                        className='object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]'
                        priority={false}
                      />
                    </div>
                    <div className='card-body'>
                      <h3 className='text-sm md:text-base font-medium'>
                        {f.title}
                      </h3>
                      <p className='text-xs text-muted-foreground'>
                        {f.caption}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </section>

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
    </>
  );
}
