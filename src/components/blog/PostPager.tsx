import Link from 'next/link';

type Item = { title: string; slug: string };

export function PostPager({ prev, next }: { prev?: Item; next?: Item }) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label='Article navigation'
      className='mt-12 border-t border-border pt-6'
    >
      <ul className='grid gap-4 sm:grid-cols-2'>
        <li>
          {prev && (
            <Link
              href={`/blog/${prev.slug}`}
              rel='prev'
              className='group block rounded-xl border border-transparent p-4 transition-colors hover:border-border'
            >
              <div className='flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground'>
                <ArrowLeft className='h-4 w-4' />
                Previous
              </div>
              <div className='mt-1 font-medium text-foreground group-hover:underline'>
                {prev.title}
              </div>
            </Link>
          )}
        </li>

        <li className='sm:text-right'>
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              rel='next'
              className='group block rounded-xl border border-transparent p-4 transition-colors hover:border-border'
            >
              <div className='flex items-center justify-end gap-2 text-xs uppercase tracking-widest text-muted-foreground'>
                Next
                <ArrowRight className='h-4 w-4' />
              </div>
              <div className='mt-1 font-medium text-foreground group-hover:underline'>
                {next.title}
              </div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

function ArrowLeft({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M14 6l-6 6 6 6'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M10 6l6 6-6 6'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
