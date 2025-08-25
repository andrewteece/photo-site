import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { allPosts, Post } from 'contentlayer/generated';
import { Shell } from '@/components/layout/Shell';

interface PostWithMaybeSlugAsParams extends Post {
  slugAsParams?: string;
}
const postsAll: ReadonlyArray<PostWithMaybeSlugAsParams> =
  allPosts as ReadonlyArray<PostWithMaybeSlugAsParams>;

const slugOf = (p: PostWithMaybeSlugAsParams): string =>
  p.slug ?? p.slugAsParams ?? '';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on light, process, and recent work.',
};

export default function BlogIndex() {
  const posts = [...postsAll].sort((a, b) => {
    const ad = new Date(a.date || 0).getTime();
    const bd = new Date(b.date || 0).getTime();
    return bd - ad;
  });

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://www.andrewteecephotography.com';

  return (
    <section className='py-14 md:py-20'>
      {/* JSON-LD: ItemList for the blog index */}
      <Script id='ld-itemlist' type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Andrew Teece — Blog',
          numberOfItems: posts.length,
          itemListElement: posts.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${base}/blog/${slugOf(p)}`,
          })),
        })}
      </Script>

      <Shell size='tight'>
        <h1 className='font-serif text-3xl md:text-4xl tracking-tight text-foreground'>
          Blog
        </h1>

        {posts.length === 0 ? (
          <div className='mt-8 rounded-xl border border-border bg-card p-6'>
            <p className='text-foreground/80'>
              No posts yet. I’ll share notes on light, process, and recent work
              here soon.
            </p>
            <div className='mt-4 flex gap-3'>
              <Link href='/portfolio' className='btn btn-primary'>
                View portfolio
              </Link>
              <Link href='/contact' className='btn btn-outline'>
                Contact
              </Link>
            </div>
          </div>
        ) : (
          <ul className='mt-8 grid gap-6 sm:grid-cols-2'>
            {posts.map((p) => {
              const url = `/blog/${slugOf(p)}`;
              return (
                <li key={p._id} className='card hover-lift overflow-hidden'>
                  <Link href={url} className='block'>
                    {p.cover ? (
                      <div className='relative aspect-[4/3]'>
                        <Image
                          src={p.cover as string}
                          alt={p.title}
                          fill
                          sizes='(min-width:1280px) 50vw, (min-width:1024px) 50vw, 100vw'
                          className='object-cover'
                          quality={80}
                        />
                      </div>
                    ) : (
                      <div className='h-40 bg-muted' />
                    )}

                    <div className='card-body'>
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        {p.date && (
                          <time dateTime={p.date}>
                            {new Date(p.date).toLocaleDateString(undefined, {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        )}
                      </div>

                      <h2 className='mt-2 text-lg font-medium leading-snug hover:underline text-foreground'>
                        {p.title}
                      </h2>

                      {p.description && (
                        <p className='mt-2 line-clamp-3 text-sm text-foreground/80'>
                          {p.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Shell>
    </section>
  );
}
