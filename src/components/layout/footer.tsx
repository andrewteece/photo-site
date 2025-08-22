export function Footer() {
  return (
    <footer className='border-t'>
      <div className='container py-10 text-sm text-muted-foreground flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <p>© {new Date().getFullYear()} Andrew Teece — Photography</p>

        <nav className='flex items-center gap-4'>
          <a
            className='link-underline hover:text-foreground'
            href='https://www.instagram.com/'
            target='_blank'
            rel='noreferrer'
          >
            Instagram
          </a>
          <a
            className='link-underline hover:text-foreground'
            href='https://www.linkedin.com/in/andrewteece/'
            target='_blank'
            rel='noreferrer'
          >
            LinkedIn
          </a>
          <a className='link-underline hover:text-foreground' href='/blog'>
            Blog
          </a>
        </nav>

        <p className='opacity-80'>Built with Next.js + Tailwind</p>
      </div>
    </footer>
  );
}
