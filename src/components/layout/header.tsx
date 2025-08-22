'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { NavLink } from '@/components/layout/NavLink';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? 'true' : 'false'}
      className={[
        'sticky top-0 z-50 w-full border-b',
        'bg-background/80 backdrop-blur',
        'transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        scrolled ? 'shadow-[0_6px_24px_rgba(0,0,0,0.08)]' : 'shadow-none',
      ].join(' ')}
    >
      {/* Explicit centering to match <Shell /> */}
      <div
        className={[
          'w-full mx-auto px-4 md:px-8',
          'max-w-6xl',
          'flex items-center justify-between',
          'h-16 data-[scrolled=true]:h-14',
          'transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        ].join(' ')}
        data-scrolled={scrolled ? 'true' : 'false'}
      >
        {/* Brand */}
        <Link
          href='/'
          className='flex items-center gap-2 group'
          aria-label='Andrew Teece Photography – Home'
        >
          <Image
            src='/logo.png'
            alt='Andrew Teece Photography'
            width={160}
            height={36}
            priority
            className={[
              'h-9 w-auto object-contain transition-[height,opacity]',
              'group-hover:opacity-90',
              'data-[scrolled=true]:h-8',
              'duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            ].join(' ')}
            data-scrolled={scrolled ? 'true' : 'false'}
          />
          <span className='sr-only'>Andrew Teece Photography</span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden md:flex items-center gap-6 text-sm'>
          <NavLink href='/portfolio' className='link-underline'>
            Portfolio
          </NavLink>
          <NavLink href='/services' className='link-underline'>
            Services
          </NavLink>
          <NavLink href='/about' className='link-underline'>
            About
          </NavLink>
          <NavLink href='/blog' className='link-underline'>
            Blog
          </NavLink>
          <NavLink href='/contact' className='btn btn-primary'>
            Contact
          </NavLink>
          <ThemeToggle withSystem />
        </nav>

        {/* Mobile actions */}
        <div className='md:hidden flex items-center gap-2'>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
