import * as React from 'react';
import { site } from '@/lib/site';
import { si500px, siFlickr } from 'simple-icons';

type IconName = '500px' | 'flickr' | 'website' | 'dev';
type IconDef = {
  title: string;
  path: string;
  viewBox?: string;
  stroke?: boolean;
};

// Line icons (stroke) for website + dev
const globe: IconDef = {
  title: 'Website',
  path: 'M12 2.75a9.25 9.25 0 1 0 0 18.5M3 12h18M12 2.75c3.8 3.25 3.8 15.25 0 18.5',
  viewBox: '0 0 24 24',
  stroke: true,
};

const devMark: IconDef = {
  title: 'Developer Site',
  // simple </> mark
  path: 'M9 8 5 12l4 4M15 8l4 4-4 4M13 7l-2 10',
  viewBox: '0 0 24 24',
  stroke: true,
};

// Brand-icon fills
const ICONS: Record<IconName, IconDef> = {
  '500px': { title: si500px.title, path: si500px.path },
  flickr: { title: siFlickr.title, path: siFlickr.path },
  website: globe,
  dev: devMark,
};

function pickIcon(label: string, href?: string): IconName {
  const l = label.toLowerCase();
  const h = (href || '').toLowerCase();
  if (l.includes('500px')) return '500px';
  if (l.includes('flickr')) return 'flickr';
  // Highlight your dev site specifically
  if (l.includes('dev') || h.includes('andrewteece.com')) return 'dev';
  return 'website';
}

export function SocialIcon({
  label,
  href,
  size = 24,
}: {
  label: string;
  href?: string;
  size?: number;
}) {
  const key = pickIcon(label, href);
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
          strokeLinejoin='round'
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

/**
 * SocialLinks
 * - By default, emphasizes any link whose href includes "andrewteece.com"
 * - Pass `highlightPattern` to override (string or RegExp)
 */
export function SocialLinks({
  className = '',
  size = 24,
  gap = 'gap-3',
  highlightPattern,
}: {
  className?: string;
  size?: number;
  gap?: string;
  highlightPattern?: string | RegExp;
}) {
  const pad = 16; // size + 16 => ~40px hit area
  const defaultPattern = /andrewteece\.com/i;
  const isEmphasis = (href: string) =>
    highlightPattern
      ? typeof highlightPattern === 'string'
        ? href.includes(highlightPattern)
        : highlightPattern.test(href)
      : defaultPattern.test(href);

  return (
    <ul className={`flex flex-wrap ${gap} ${className}`}>
      {site.socials.map(({ label, href }) => {
        const emphasize = isEmphasis(href);
        const base = [
          'inline-flex items-center justify-center rounded-full',
          'border transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        ].join(' ');

        // Emphasized dev link: filled brand pill (uses --color-ring) + white icon
        const emphStyle = emphasize
          ? {
              backgroundColor: 'var(--color-ring)',
              color: 'white',
              borderColor: 'transparent',
            }
          : undefined;

        const normalClasses =
          'border-border text-foreground/85 hover:text-foreground hover:bg-muted';
        const emphClasses = 'text-white hover:brightness-105 shadow-sm';

        return (
          <li key={href}>
            <a
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              title={label}
              className={[base, emphasize ? emphClasses : normalClasses].join(
                ' '
              )}
              style={{ width: size + pad, height: size + pad, ...emphStyle }}
            >
              <SocialIcon label={label} href={href} size={size} />
              <span className='sr-only'>{label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
