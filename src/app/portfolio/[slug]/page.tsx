import { notFound } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';

const map: Record<string, { title: string }> = {
  'lakefront-wedding': { title: 'Lakefront Wedding' },
  'autumn-portraits': { title: 'Autumn Portraits' },
  'brand-editorial': { title: 'Brand Editorial' },
};

export async function generateStaticParams() {
  return Object.keys(map).map((slug) => ({ slug }));
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = map[slug];
  if (!g) return notFound();

  return (
    <article className='py-16 md:py-24'>
      <Shell size='tight'>
        <h1 className='text-3xl md:text-4xl font-serif font-semibold tracking-tight'>
          {g.title}
        </h1>
        <p className='mt-4 text-muted-foreground'>
          Gallery coming soon. We’ll add a lightbox next.
        </p>
      </Shell>
    </article>
  );
}
