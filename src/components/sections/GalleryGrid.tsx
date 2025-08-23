import Image from 'next/image';

const photos = [
  {
    src: '/images/portfolio/sandwaves-bw.jpg',
    alt: 'Wind-carved ripples in sand, black and white',
    w: 1200,
    h: 1800,
  },
  {
    src: '/images/portfolio/sedona-bw.jpg',
    alt: 'Long-exposure creek with fallen leaves, black and white',
    w: 2048,
    h: 778,
  },
  {
    src: '/images/portfolio/zion-color.jpg',
    alt: 'Canyon wall with cottonwoods in autumn color, Zion',
    w: 1024,
    h: 544,
  },
];

export default function GalleryGrid() {
  return (
    <section className='container mx-auto px-6 py-14'>
      <h2 className='text-xl md:text-2xl font-semibold mb-6'>Selected Work</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {photos.map((p) => (
          <div key={p.src} className='overflow-hidden rounded-2xl shadow-lg'>
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              className='object-cover w-full h-full transition-transform duration-500 hover:scale-[1.03]'
              sizes='(min-width: 768px) 33vw, 100vw'
            />
          </div>
        ))}
      </div>
    </section>
  );
}
