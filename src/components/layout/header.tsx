'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';
import { SocialLinks } from '@/components/ui/SocialIcons';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

function NavItem({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        'relative group transition-colors',
        'text-base font-medium',
        active ? 'text-foreground' : 'text-foreground/85 hover:text-foreground',
      ].join(' ')}
    >
      <span className='relative z-10'>{children}</span>
      <span
        className={[
          'pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded',
          'bg-foreground/70 transition-[width] duration-200 ease-out',
          active ? 'w-full' : 'w-0 group-hover:w-full',
        ].join(' ')}
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();

  const menuRef = useRef<HTMLDetailsElement | null>(null);
  const closeMenu = () => {
    if (menuRef.current && menuRef.current.open) menuRef.current.open = false;
  };

  // Close on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8'>
        <Link
          href='/'
          className='font-serif text-xl tracking-tight hover:opacity-90 text-foreground'
        >
          {site.brand}
        </Link>

        {/* Desktop */}
        <nav aria-label='Primary' className='hidden items-center gap-8 md:flex'>
          {site.nav.map(({ label, href }) => {
            const active =
              href === '/'
                ? pathname === '/'
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <NavItem key={href} href={href} active={active}>
                {label}
              </NavItem>
            );
          })}
          <div className='ml-2 flex items-center gap-3.5'>
            <SocialLinks size={24} gap='gap-3' />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile */}
        <nav aria-label='Primary' className='md:hidden'>
          <details
            ref={menuRef}
            className='group relative [&>summary::-webkit-details-marker]:hidden'
          >
            <summary className='list-none'>
              <span
                className={[
                  'inline-flex items-center gap-2 rounded-xl border border-input',
                  'bg-background/80 px-3 py-2 shadow-sm',
                  'text-base text-foreground/90',
                  'transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]',
                  'hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                ].join(' ')}
              >
                <span
                  aria-hidden
                  className='relative grid h-5 w-6 place-items-center'
                >
                  <span
                    className={[
                      'absolute left-1/2 top-0 block h-[2px] w-6 -translate-x-1/2 rounded bg-foreground',
                      'transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]',
                      'group-open:translate-y-2.5 group-open:rotate-45',
                    ].join(' ')}
                  />
                  <span
                    className={[
                      'absolute left-1/2 top-1/2 block h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground',
                      'transition-opacity duration-400 ease-out',
                      'group-open:opacity-0',
                    ].join(' ')}
                  />
                  <span
                    className={[
                      'absolute left-1/2 bottom-0 block h-[2px] w-6 -translate-x-1/2 rounded bg-foreground',
                      'transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]',
                      'group-open:-translate-y-2.5 group-open:-rotate-45',
                    ].join(' ')}
                  />
                </span>
                <span className='select-none'>Menu</span>
              </span>
            </summary>

            {/* Backdrop */}
            <div
              onClick={closeMenu}
              className={[
                'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm',
                'opacity-0 pointer-events-none',
                'transition-opacity duration-500 ease-[cubic-bezier(.22,1,.36,1)]',
                'group-open:opacity-100 group-open:pointer-events-auto',
              ].join(' ')}
              aria-hidden='true'
            />

            {/* Panel */}
            <div
              className={[
                'absolute right-0 z-50 mt-3 w-72 origin-top-right rounded-2xl border border-border',
                'bg-background/95 p-3 shadow-xl outline-none',
                'opacity-0 translate-y-2 scale-95 pointer-events-none',
                'transition-all duration-600 ease-[cubic-bezier(.22,1,.36,1)] will-change-[transform,opacity]',
                'group-open:opacity-100 group-open:translate-y-0 group-open:scale-100 group-open:pointer-events-auto',
              ].join(' ')}
              onClickCapture={closeMenu}
            >
              <ul className='space-y-1'>
                {site.nav.map(({ label, href }) => {
                  const active =
                    href === '/'
                      ? pathname === '/'
                      : pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={[
                          'block rounded-lg px-3 py-2 text-base transition-colors',
                          active
                            ? 'text-foreground bg-muted/40'
                            : 'text-foreground/85 hover:bg-muted/40 hover:text-foreground',
                        ].join(' ')}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className='mt-3 border-t border-border pt-3 flex items-center justify-between'>
                <SocialLinks size={24} />
                <ThemeToggle />
              </div>

              <div className='mt-2 flex justify-end'>
                <button
                  type='button'
                  className='rounded-lg px-3 py-1 text-sm text-foreground/85 hover:text-foreground hover:bg-muted'
                  onClick={closeMenu}
                >
                  Close
                </button>
              </div>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
