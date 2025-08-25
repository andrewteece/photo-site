import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { allPosts } from 'contentlayer/generated';
import { Shell } from '@/components/layout/Shell';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on light, process, and recent work.',
};

export default function BlogIndex() {
  const posts = [...allPosts].sort((a, b) => {
    const ad = new Date(a.date || 0).getTime();
    const bd = new Date(b.date || 0).getTime();
    return bd - ad;
  });

  return (
    <section className='py-14 md:py-20'>
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
              const url = `/blog/${(p as any).slug ?? (p as any).slugAsParams}`;
              return (
                <li key={p._id} className='card hover-lift overflow-hidden'>
                  <Link href={url} className='block'>
                    {p.cover ? (
                      <div className='relative aspect-[4/3]'>
                        <Image
                          src={p.cover as string}
                          alt={p.title}
                          fill
                          sizes='(min-width:1024px) 50vw, 100vw'
                          className='object-cover'
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
