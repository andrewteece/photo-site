import { Shell } from '@/components/layout/Shell';
import { Mdx } from '@/components/mdx';
import { GalleryImages } from '@/components/sections/GalleryImages';
import { getAllGalleries, getGalleryBySlug } from '@/lib/galleries';
import { site } from '@/lib/site';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const galleries = await getAllGalleries();
  return galleries.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);
  if (!gallery) return {};

  const url = `/portfolio/${slug}`;
  const image = gallery.cover || '/images/portfolio/og-default.jpg';

  return {
    title: gallery.title,
    description: gallery.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: gallery.title,
      description: gallery.description,
      siteName: site.brand,
      publishedTime: gallery.date,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: gallery.title,
      description: gallery.description,
      images: [image],
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);
  if (!gallery) return notFound();

  return (
    <article className='py-10 md:py-16'>
      <Shell size='tight'>
        {/* Header */}
        <header className='mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-5xl font-serif font-semibold tracking-tight mb-4'>
            {gallery.title}
          </h1>
          <p className='text-lg text-muted-foreground mb-4'>
            {gallery.description}
          </p>
          <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
            {gallery.date && (
              <time dateTime={gallery.date}>
                {new Date(gallery.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            {gallery.location && <span>📍 {gallery.location}</span>}
            {gallery.category && <span>· {gallery.category}</span>}
            {gallery.client && <span>· Client: {gallery.client}</span>}
          </div>
        </header>

        {/* Cover Image */}
        {gallery.cover && (
          <div className='relative w-full aspect-[21/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl mb-12'>
            <Image
              src={gallery.cover}
              alt={gallery.title}
              fill
              className='object-cover'
              priority
              sizes='(max-width: 768px) 100vw, 900px'
            />
          </div>
        )}

        {/* MDX Content (story, process, etc.) */}
        <div className='prose prose-lg dark:prose-invert max-w-none mb-16'>
          <Mdx source={gallery.body} />
        </div>

        {/* Image Gallery Grid */}
        {gallery.images && gallery.images.length > 0 && (
          <GalleryImages images={gallery.images} />
        )}
      </Shell>
    </article>
  );
}
