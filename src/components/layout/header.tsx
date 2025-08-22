// app/components/header.tsx (or src/components/header.tsx)
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className='border-b bg-background/80 backdrop-blur'>
      <div className='container h-16 flex items-center justify-between'>
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
            className='h-9 w-auto object-contain transition-opacity group-hover:opacity-90'
          />
          <span className='sr-only'>Andrew Teece Photography</span>
        </Link>

        <nav className='hidden md:flex items-center gap-6 text-sm'>
          <Link href='/portfolio'>Portfolio</Link>
          <Link href='/services'>Services</Link>
          <Link href='/about'>About</Link>
          <Link href='/blog'>Blog</Link>
          <Link href='/contact' className='btn btn-primary'>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
