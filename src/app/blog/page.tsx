import Link from 'next/link';
import Image from 'next/image';
import { allPosts } from 'contentlayer/generated';
import { Shell } from '@/components/layout/Shell';

export const metadata = { title: 'Journal' };

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return d;
  }
}

function getAllTags() {
  const set = new Set<string>();
  for (const p of allPosts) (p.tags ?? []).forEach((t) => set.add(t));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const activeTag =
    (Array.isArray(sp.tag) ? sp.tag[0] : sp.tag)?.toString().trim() || '';

  const posts = [...allPosts]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .filter((p) => (!activeTag ? true : (p.tags ?? []).includes(activeTag)));

  const tags = getAllTags();

  return (
    <section className='py-16 md:py-24'>
      <Shell size='tight'>
        <header className='mb-8'>
          <p className='text-xs uppercase tracking-[0.18em] text-muted-foreground'>
            Journal
          </p>
          <h1 className='mt-2 text-3xl md:text-4xl font-serif font-semibold tracking-tight'>
            Stories & Guides
          </h1>
          <p className='mt-3 text-muted-foreground max-w-2xl'>
            Recent shoots, behind-the-scenes, and resources for clients.
          </p>
        </header>

        {tags.length > 0 && (
          <div className='mb-8 flex flex-wrap gap-2'>
            <Link
              href='/blog'
              className={[
                'px-3 py-1 text-sm rounded-full border transition-colors',
                !activeTag
                  ? 'bg-primary text-primary-foreground border-transparent'
                  : 'hover:bg-accent border-input',
              ].join(' ')}
            >
              All
            </Link>
            {tags.map((t) => {
              const selected = t === activeTag;
              return (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className={[
                    'px-3 py-1 text-sm rounded-full border transition-colors',
                    selected
                      ? 'bg-primary text-primary-foreground border-transparent'
                      : 'hover:bg-accent border-input',
                  ].join(' ')}
                >
                  {t}
                </Link>
              );
            })}
          </div>
        )}

        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {posts.map((p) => {
            const url = (p as any).url ?? `/blog/${p.slug}`;
            return (
              <li key={p._id} className='group card overflow-hidden hover-lift'>
                <Link href={url} className='block'>
                  {p.cover ? (
                    <div className='relative aspect-[4/3]'>
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                        className='object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]'
                        priority={false}
                      />
                    </div>
                  ) : (
                    <div className='h-40 bg-muted' />
                  )}

                  <div className='card-body'>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <time dateTime={p.date}>{formatDate(p.date)}</time>
                      {p.readingTime && <span>• {p.readingTime}</span>}
                    </div>

                    <h2 className='mt-2 text-lg font-medium leading-snug group-hover:underline'>
                      {p.title}
                    </h2>

                    {p.description && (
                      <p className='mt-2 line-clamp-3 text-sm text-muted-foreground'>
                        {p.description}
                      </p>
                    )}

                    {p.tags?.length ? (
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {p.tags.map((t) => (
                          <Link
                            key={t}
                            href={`/blog?tag=${encodeURIComponent(t)}`}
                            className='px-2.5 py-0.5 text-xs rounded-full border border-input bg-card hover:bg-accent transition-colors'
                            aria-label={`Filter by ${t}`}
                          >
                            {t}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {posts.length === 0 && (
          <p className='mt-8 text-muted-foreground'>
            No posts for <span className='font-medium'>{activeTag}</span> yet.
          </p>
        )}
      </Shell>
    </section>
  );
}
