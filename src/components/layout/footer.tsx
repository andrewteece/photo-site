export function Footer() {
  return (
    <footer className='border-t'>
      {/* Explicit centering to match <Shell> and Header */}
      <div
        className='w-full mx-auto px-4 md:px-8 max-w-6xl py-10
                      text-sm text-muted-foreground
                      flex flex-col gap-4 md:flex-row md:items-center md:justify-between'
      >
        <p>© {new Date().getFullYear()} Andrew Teece — Photography</p>

        <nav aria-label='Footer' className='flex items-center gap-4'>
          <a
            className='link-underline hover:text-foreground'
            href='https://www.instagram.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Instagram
          </a>
          <a
            className='link-underline hover:text-foreground'
            href='https://www.linkedin.com/in/andrewteece/'
            target='_blank'
            rel='noopener noreferrer'
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
