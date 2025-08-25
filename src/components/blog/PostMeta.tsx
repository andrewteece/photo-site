'use client';

import { ShareMenu } from './ShareMenu';

export function PostMeta({
  dateISO,
  minutes,
  title,
}: {
  dateISO?: string;
  minutes: number;
  title: string;
}) {
  const formatted =
    dateISO &&
    new Date(dateISO).toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className='mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
      {formatted ? (
        <>
          <time dateTime={dateISO}>{formatted}</time>
          <span>•</span>
        </>
      ) : null}
      <span>{minutes} min read</span>
      <span>•</span>
      <ShareMenu title={title} />
    </div>
  );
}
