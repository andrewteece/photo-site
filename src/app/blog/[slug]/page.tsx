import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx';
import { PostPager } from '@/components/blog/PostPager';
import { PostMeta } from '@/components/blog/PostMeta';
import { readingTimeFromText } from '@/lib/readingTime';
import { site } from '@/lib/site';

export async function generateStaticParams() {
  return allPosts.map((p) => ({
    slug: (p as any).slug ?? (p as any).slugAsParams,
  }));
}

// ✅ Page-level metadata (no themeColor here)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post =
    allPosts.find(
      (p) => (p as any).slug === slug || (p as any).slugAsParams === slug
    ) ?? null;

  if (!post) return {};

  const url = `/blog/${slug}`;
  const image = `/blog/${slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.description,
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

// ▶︎ OPTIONAL: If you want a page-specific theme color for the address bar,
// move it to viewport (this is allowed at the page level).
export function generateViewport(): Viewport {
  return {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#0b0b0c' },
    ],
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post =
    allPosts.find(
      (p) => (p as any).slug === slug || (p as any).slugAsParams === slug
    ) ?? null;

  if (!post) return notFound();

  // Reading time
  const source: string =
    (post as any).body?.raw ?? (post as any).body?.code ?? '';
  const { minutes } = readingTimeFromText(source);

  // Prev/next (newest -> oldest)
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
  const idx = posts.findIndex(
    (p) => (p as any).slug === slug || (p as any).slugAsParams === slug
  );
  const prevPost = idx > 0 ? posts[idx - 1] : undefined;
  const nextPost =
    idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : undefined;

  return (
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
        <Mdx code={(post as any).body.code} />
      </div>

      <PostPager
        prev={
          prevPost
            ? {
                title: prevPost.title,
                slug: (prevPost as any).slug ?? (prevPost as any).slugAsParams,
              }
            : undefined
        }
        next={
          nextPost
            ? {
                title: nextPost.title,
                slug: (nextPost as any).slug ?? (nextPost as any).slugAsParams,
              }
            : undefined
        }
      />
    </article>
  );
}
