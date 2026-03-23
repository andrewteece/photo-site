import Image from 'next/image';
import Link from 'next/link';

import { getAllGalleries } from '@/lib/galleries';
import manifest from '@/lib/image-manifest.json';

type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export default async function GalleryGrid() {
  const galleries = await getAllGalleries();

  const featuredGalleries = galleries.filter((g) => g.featured);

  // Collect image srcs from featured galleries (including unique covers), preserving frontmatter order
  const featuredSrcs = Array.from(
    new Set(
      featuredGalleries.flatMap((g) => {
        const images = g.images ?? [];
        if (g.cover && !images.includes(g.cover)) {
          return [g.cover, ...images];
        }
        return images;
      }),
    ),
  );

  const photos = manifest as ManifestItem[];

  const featured = featuredSrcs
    .map((src) => photos.find((p) => p.src === src))
    .filter((p): p is ManifestItem => Boolean(p))
    .slice(0, 6);

  return (
    <section className='py-14 md:py-20'>
      <div className='mx-auto max-w-6xl px-6 md:px-8'>
        <h2 className='mb-6 text-sm tracking-[0.18em] uppercase text-zinc-600 dark:text-white/70'>
          Selected Work
        </h2>

        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {featured.map((photo) => (
            <li
              key={photo.src}
              className='group overflow-hidden rounded-2xl ring-1 ring-zinc-900/10 bg-white dark:ring-white/10 dark:bg-white/[0.03] transition-all hover:ring-2 hover:ring-foreground/20 hover:shadow-lg'
            >
              <Link href='/portfolio' className='block relative'>
                <div className='relative aspect-[4/3]'>
                  <Image
                    src={photo.src}
                    alt=''
                    fill
                    placeholder='blur'
                    blurDataURL={photo.blurDataURL}
                    className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]'
                    sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                  />
                  {/* Hover overlay with view icon */}
                  <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <div className='text-white text-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-12 h-12 mx-auto mb-2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                      <span className='text-sm font-medium'>View</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA to view full portfolio */}
        <div className='mt-12 text-center'>
          <Link
            href='/portfolio'
            className='inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors shadow-md hover:shadow-lg'
          >
            View Full Portfolio
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
