'use client';

import Link from 'next/link';
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
          <details className='group relative'>
            <summary className='cursor-pointer text-base font-medium text-foreground/90'>
              Menu
            </summary>
            <div className='absolute right-0 mt-3 w-72 rounded-xl border border-border bg-background/95 p-3 shadow-xl'>
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
                          'block rounded-lg px-3 py-2 text-base',
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
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
