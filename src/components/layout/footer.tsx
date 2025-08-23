import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='mt-20 border-t border-white/10'>
      <div className='container mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='text-sm text-white/70'>
          © {year} Andrew Teece. All rights reserved.
        </div>

        <nav className='flex items-center gap-5 text-sm'>
          <Link href='/portfolio' className='hover:underline'>
            Portfolio
          </Link>
          <Link href='/blog' className='hover:underline'>
            Journal
          </Link>
          <Link href='/about' className='hover:underline'>
            About
          </Link>
          <Link href='/contact' className='hover:underline'>
            Contact
          </Link>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noreferrer'
            className='hover:underline'
          >
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
