import Image from 'next/image';
import manifest from '@/lib/image-manifest.json';
import { getCaptionFor } from '@/lib/captions';

type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export default function GalleryGrid() {
  const photos = manifest as ManifestItem[];

  return (
    <section className='container mx-auto px-6 py-14'>
      <h2 className='text-xl md:text-2xl font-semibold mb-6'>Selected Work</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {photos.map((p) => {
          const meta = getCaptionFor(p.src);
          return (
            <figure
              key={p.src}
              className='overflow-hidden rounded-2xl shadow-lg'
            >
              <Image
                src={p.src}
                alt={meta.alt}
                width={p.width}
                height={p.height}
                placeholder='blur'
                blurDataURL={p.blurDataURL}
                sizes='(min-width: 1024px) 33vw, (min-width: 640px) 48vw, 94vw'
                quality={85}
                className='object-cover w-full h-full transition-transform duration-500 hover:scale-[1.01]'
              />
              {/* Optional visible caption; remove if you want a cleaner grid */}
              {meta.title && (
                <figcaption className='text-sm text-muted-foreground px-2 py-2'>
                  {meta.title}
                  {meta.location ? ` — ${meta.location}` : ''}
                  {meta.year ? `, ${meta.year}` : ''}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
