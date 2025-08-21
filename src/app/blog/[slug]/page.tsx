import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx';

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ await params
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <article className='container py-12'>
      <header className='mb-8'>
        <p className='text-xs uppercase tracking-widest text-gray-500'>
          {new Date(post.date).toLocaleDateString()}
        </p>
        <h1 className='mt-2 text-3xl md:text-4xl font-medium'>{post.title}</h1>
        {post.description && (
          <p className='mt-3 text-gray-600'>{post.description}</p>
        )}
      </header>
      <Mdx code={post.body.code} />
    </article>
  );
}
