/* eslint-disable react/no-unknown-property */
import Link from 'next/link';
import { site } from '@/lib/site';

/** Minimal, brand-agnostic icons (clean + license-free) */
function SocialIcon({ name }: { name: string }) {
  const n = name.toLowerCase();

  // — Flickr: two dots —
  if (n.includes('flickr')) {
    return (
      <svg viewBox='0 0 24 24' width='20' height='20' aria-hidden='true'>
        <circle cx='8.5' cy='12' r='3.25' fill='currentColor' />
        <circle cx='15.5' cy='12' r='3.25' fill='currentColor' />
      </svg>
    );
  }

  // — 500px: camera aperture glyph —
  if (n.includes('500px')) {
    return (
      <svg viewBox='0 0 24 24' width='20' height='20' aria-hidden='true'>
        <circle
          cx='12'
          cy='12'
          r='8.5'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.6'
        />
        <path
          d='M12 3.5v8.5L6.6 6.6M17.4 6.6 12 12m5.4 5.4L12 12m-5.4 5.4L12 12'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.6'
          strokeLinecap='round'
        />
      </svg>
    );
  }

  // — LinkedIn: simple linked chain (clean + universal)
  if (n.includes('linkedin')) {
    return (
      <svg viewBox='0 0 24 24' width='20' height='20' aria-hidden='true'>
        <path
          d='M10.5 13.5a3.5 3.5 0 0 1 0-5l1.5-1.5a3.5 3.5 0 1 1 5 5l-.7.7'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.7'
          strokeLinecap='round'
        />
        <path
          d='M13.5 10.5a3.5 3.5 0 0 1 0 5L12 17.5a3.5 3.5 0 1 1-5-5l.7-.7'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.7'
          strokeLinecap='round'
        />
      </svg>
    );
  }

  // — Website / default: globe —
  return (
    <svg viewBox='0 0 24 24' width='20' height='20' aria-hidden='true'>
      <circle
        cx='12'
        cy='12'
        r='8.5'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
      />
      <path
        d='M3.5 12h17M12 3.5c3.5 3 3.5 14 0 17  -3.5-3 -3.5-14 0-17'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='mt-20 border-t border-white/10'>
      <div className='container mx-auto grid gap-8 px-6 py-10 md:grid-cols-3 md:px-8'>
        {/* Brand + note + email */}
        <div>
          <div className='font-serif text-lg'>{site.brand}</div>
          {site.footerNote && (
            <p className='mt-2 text-sm text-white/70'>{site.footerNote}</p>
          )}
          {site.email && (
            <p className='mt-2 text-sm'>
              <Link href={`mailto:${site.email}`} className='hover:underline'>
                {site.email}
              </Link>
            </p>
          )}
        </div>

        {/* Navigation */}
        <nav aria-label='Footer navigation'>
          <div className='text-xs uppercase tracking-widest text-white/60'>
            Navigation
          </div>
          <ul className='mt-3 space-y-2'>
            {site.nav.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className='text-sm text-white/80 hover:text-white'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials with crisp icons */}
        <div>
          <div className='text-xs uppercase tracking-widest text-white/60'>
            Elsewhere
          </div>
          <ul className='mt-3 flex flex-wrap gap-3'>
            {site.socials.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  title={label}
                  className='inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-white/80 hover:text-white hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
                >
                  <SocialIcon name={label} />
                  <span className='sr-only'>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-white/10'>
        <div className='container mx-auto flex items-center justify-between px-6 py-4 text-xs text-white/60 md:px-8'>
          <span>
            © {year} {site.brand}
          </span>
          {site.domain && <span>{site.domain}</span>}
        </div>
      </div>
    </footer>
  );
}
