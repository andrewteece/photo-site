import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx';
import { Shell } from '@/components/layout/Shell';

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const cover = typeof post.cover === 'string' ? post.cover : undefined;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description || '',
      images: cover ? [{ url: cover }] : undefined,
      type: 'article',
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <article className='py-12 md:py-16'>
      <Shell size='tight'>
        <header className='mb-6 md:mb-8'>
          <time className='text-xs uppercase tracking-[0.18em] text-muted-foreground'>
            {new Date(post.date).toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <h1 className='mt-2 text-3xl md:text-4xl font-serif font-semibold tracking-tight'>
            {post.title}
          </h1>
          {post.description && (
            <p className='mt-3 text-muted-foreground'>{post.description}</p>
          )}
        </header>

        {/* Optional cover image */}
        {post.cover ? (
          <figure className='photo-frame mb-6 md:mb-8'>
            <div className='relative aspect-[4/3]'>
              <Image
                src={post.cover as string}
                alt=''
                fill
                sizes='100vw'
                className='object-cover rounded-xl'
                priority={false}
              />
            </div>
          </figure>
        ) : null}

        <div className='prose'>
          <Mdx code={post.body.code} />
        </div>
      </Shell>
    </article>
  );
}
