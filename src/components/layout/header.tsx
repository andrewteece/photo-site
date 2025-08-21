import Link from 'next/link';

export function Header() {
  return (
    <header className='border-b'>
      <div className='container h-16 flex items-center justify-between'>
        <Link href='/' className='font-medium'>
          Your Name
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
