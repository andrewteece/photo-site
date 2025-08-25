import * as React from 'react';
import { site } from '@/lib/site';
import { si500px, siFlickr } from 'simple-icons';

type IconName = '500px' | 'flickr' | 'website';
type IconDef = {
  title: string;
  path: string;
  viewBox?: string;
  stroke?: boolean;
};

const globe: IconDef = {
  title: 'Website',
  path: 'M12 2.75a9.25 9.25 0 1 0 0 18.5M3 12h18M12 2.75c3.8 3.25 3.8 15.25 0 18.5',
  viewBox: '0 0 24 24',
  stroke: true,
};

const ICONS: Record<IconName, IconDef> = {
  '500px': { title: si500px.title, path: si500px.path },
  flickr: { title: siFlickr.title, path: siFlickr.path },
  website: globe,
};

function pickIcon(label: string): IconName {
  const l = label.toLowerCase();
  if (l.includes('500px')) return '500px';
  if (l.includes('flickr')) return 'flickr';
  return 'website';
}

export function SocialIcon({
  label,
  size = 24,
}: {
  label: string;
  size?: number;
}) {
  const key = pickIcon(label);
  const icon = ICONS[key] ?? globe;
  const vb = icon.viewBox ?? '0 0 24 24';

  if (icon.stroke) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={vb}
        role='img'
        aria-hidden='true'
      >
        <path
          d={icon.path}
          stroke='currentColor'
          strokeWidth='1.8'
          fill='none'
          strokeLinecap='round'
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox={vb} role='img' aria-hidden='true'>
      <path d={icon.path} fill='currentColor' />
    </svg>
  );
}

export function SocialLinks({
  className = '',
  size = 24,
  gap = 'gap-3',
}: {
  className?: string;
  size?: number;
  gap?: string;
}) {
  const pad = 16;
  return (
    <ul className={`flex flex-wrap ${gap} ${className}`}>
      {site.socials.map(({ label, href }) => (
        <li key={href}>
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={label}
            title={label}
            className={[
              'inline-flex items-center justify-center rounded-full',
              'border border-border text-foreground/85 hover:text-foreground hover:bg-muted',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'transition-colors',
            ].join(' ')}
            style={{ width: size + pad, height: size + pad }}
          >
            <SocialIcon label={label} size={size} />
            <span className='sr-only'>{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
