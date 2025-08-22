import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx';
import { Shell } from '@/components/layout/Shell';

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
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

        {/* Cover image (optional) */}
        {post.cover ? (
          <figure className='photo-frame mb-6 md:mb-8'>
            <img src={post.cover as string} alt='' />
          </figure>
        ) : null}

        <div className='prose'>
          <Mdx code={post.body.code} />
        </div>
      </Shell>
    </article>
  );
}
