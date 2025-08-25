import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { allPosts, Post } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx';
import { PostPager } from '@/components/blog/PostPager';
import { PostMeta } from '@/components/blog/PostMeta';
import { readingTimeFromText } from '@/lib/readingTime';
import { site } from '@/lib/site';

interface PostMaybeSlug extends Post {
  slugAsParams?: string;
  draft?: boolean;
}
const slugOf = (p: Post): string =>
  (p as PostMaybeSlug).slug ?? (p as PostMaybeSlug).slugAsParams ?? '';

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: slugOf(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => slugOf(p) === slug);
  if (!post) return {};

  const url = `/blog/${slug}`;
  const image = `/blog/${slug}/opengraph-image`;
  const isDraft = Boolean((post as PostMaybeSlug).draft);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    robots: isDraft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      siteName: site.brand,
      publishedTime: post.date,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = allPosts.find((p) => slugOf(p) === slug);
  if (!post) return notFound();

  // Reading time from MDX body (raw preferred, fallback to code)
  const source = post.body?.raw ?? post.body?.code ?? '';
  const { minutes } = readingTimeFromText(source);

  // Sort for prev/next (newest -> oldest)
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
  const idx = posts.findIndex((p) => slugOf(p) === slug);
  const prevPost = idx > 0 ? posts[idx - 1] : undefined;
  const nextPost =
    idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : undefined;

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://www.andrewteecephotography.com';
  const canonical = `${base}/blog/${slug}`;
  const ogImage = `${base}/blog/${slug}/opengraph-image.png`;

  return (
    <>
      {/* Article JSON-LD */}
      <Script id='ld-article' type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          mainEntityOfPage: canonical,
          headline: post.title,
          description: post.description,
          image: [ogImage],
          datePublished: post.date,
          dateModified: post.date,
          author: [{ '@type': 'Person', name: 'Andrew Teece' }],
          publisher: {
            '@type': 'Organization',
            name: 'Andrew Teece Photography',
          },
        })}
      </Script>

      <article className='container mx-auto max-w-3xl px-6 md:px-8 py-12 md:py-16'>
        <header>
          <h1 className='font-serif text-3xl md:text-4xl tracking-tight text-foreground'>
            {post.title}
          </h1>
          {post.description && (
            <p className='mt-2 text-muted-foreground'>{post.description}</p>
          )}
          <PostMeta dateISO={post.date} minutes={minutes} title={post.title} />
        </header>

        <div className='prose prose-lg mt-8 max-w-none'>
          <Mdx code={post.body.code} />
        </div>

        <PostPager
          prev={
            prevPost
              ? { title: prevPost.title, slug: slugOf(prevPost) }
              : undefined
          }
          next={
            nextPost
              ? { title: nextPost.title, slug: slugOf(nextPost) }
              : undefined
          }
        />
      </article>
    </>
  );
}
