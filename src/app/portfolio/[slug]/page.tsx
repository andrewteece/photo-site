import { notFound } from 'next/navigation';

const map: Record<string, { title: string }> = {
  'lakefront-wedding': { title: 'Lakefront Wedding' },
  'autumn-portraits': { title: 'Autumn Portraits' },
  'brand-editorial': { title: 'Brand Editorial' },
};

export async function generateStaticParams() {
  return Object.keys(map).map((slug) => ({ slug }));
}

export default function GalleryPage({ params }: { params: { slug: string } }) {
  const g = map[params.slug];
  if (!g) return notFound();
  return (
    <article className='container py-16 md:py-24'>
      <h1 className='text-3xl md:text-4xl font-medium'>{g.title}</h1>
      <p className='mt-4 text-gray-600'>
        Gallery coming soon. We'll add a lightbox next.
      </p>
    </article>
  );
}
