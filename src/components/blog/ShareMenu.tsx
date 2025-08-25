'use client';

import { useEffect, useState } from 'react';

export function ShareMenu({ title }: { title: string }) {
  const [url, setUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // capture current URL on client
    setUrl(window.location.href);
  }, []);

  const shareNative = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
    } catch {}
    // fallback: copy
    copy();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className='flex items-center gap-2 text-muted-foreground'>
      <button
        type='button'
        onClick={shareNative}
        className='rounded-lg border border-transparent p-2 hover:border-border hover:text-foreground'
        aria-label='Share'
        title='Share'
      >
        <ShareIcon className='h-4 w-4' />
      </button>

      <button
        type='button'
        onClick={copy}
        className='rounded-lg border border-transparent p-2 hover:border-border hover:text-foreground'
        aria-label='Copy link'
        title={copied ? 'Copied!' : 'Copy link'}
      >
        <LinkIcon className='h-4 w-4' />
      </button>

      <a
        href={xHref}
        target='_blank'
        rel='noopener noreferrer'
        className='rounded-lg border border-transparent p-2 hover:border-border hover:text-foreground'
        aria-label='Share on X'
        title='Share on X'
      >
        <XIcon className='h-4 w-4' />
      </a>

      <a
        href={liHref}
        target='_blank'
        rel='noopener noreferrer'
        className='rounded-lg border border-transparent p-2 hover:border-border hover:text-foreground'
        aria-label='Share on LinkedIn'
        title='Share on LinkedIn'
      >
        <LinkedInIcon className='h-4 w-4' />
      </a>
    </div>
  );
}

/* tiny inline icons */
function ShareIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <path
        d='M12 3v12M12 3l-4 4M12 3l4 4'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
function LinkIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M10 14a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 14'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M14 10a5 5 0 0 1 0 7L12.5 18.5a5 5 0 0 1-7-7L7 10'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}
function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      aria-hidden='true'
      fill='currentColor'
    >
      <path d='M13.7 10.5 20.6 3h-1.6l-6 6.9L8.2 3H3l7.3 10.5L3 21h1.6l6.3-7.2 5.1 7.2H21l-7.3-10.5Z' />
    </svg>
  );
}
function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      aria-hidden='true'
      fill='currentColor'
    >
      <path d='M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0 8h5v16H0V8Zm7.5 0H12v2.2h.06c.63-1.2 2.16-2.47 4.44-2.47C21.2 7.73 24 10 24 14.3V24h-5v-8.3c0-1.98-.04-4.53-2.76-4.53-2.76 0-3.18 2.16-3.18 4.38V24H7.5V8Z' />
    </svg>
  );
}
