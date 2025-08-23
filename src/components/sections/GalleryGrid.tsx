import Image from 'next/image';
import manifest from '@/lib/image-manifest.json';

export default function GalleryGrid() {
  return (
    <section className='container mx-auto px-6 py-14'>
      <h2 className='text-xl md:text-2xl font-semibold mb-6'>Selected Work</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {manifest.map((p) => (
          <div key={p.src} className='overflow-hidden rounded-2xl shadow-lg'>
            <Image
              src={p.src}
              alt={p.src.split('/').pop() || ''} // or replace with real captions later
              width={p.width}
              height={p.height}
              placeholder='blur'
              blurDataURL={p.blurDataURL}
              sizes='(min-width: 1024px) 33vw, (min-width: 640px) 48vw, 94vw'
              className='object-cover w-full h-full transition-transform duration-500 hover:scale-[1.02]'
              quality={85}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
