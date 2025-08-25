import Link from 'next/link';
import { site } from '@/lib/site';
import { SocialLinks } from '@/components/ui/SocialIcons';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer role='contentinfo' className='mt-20 border-t border-border'>
      <div className='mx-auto max-w-6xl px-6 md:px-8'>
        {/* Top grid */}
        <div className='grid gap-10 py-12 md:grid-cols-3'>
          {/* Brand / note / email */}
          <div>
            <div className='font-serif text-xl text-foreground'>
              {site.brand}
            </div>

            {site.footerNote && (
              <p className='mt-2 text-base text-muted-foreground'>
                {site.footerNote}
              </p>
            )}

            {site.email && (
              <p className='mt-3 text-base'>
                <Link
                  href={`mailto:${site.email}`}
                  className='text-foreground hover:underline underline-offset-4'
                >
                  {site.email}
                </Link>
              </p>
            )}
          </div>

          {/* Nav */}
          <nav aria-label='Footer navigation'>
            <div className='text-xs uppercase tracking-widest text-muted-foreground'>
              Navigation
            </div>
            <ul className='mt-3 space-y-2'>
              {site.nav.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className='text-base text-foreground/85 hover:text-foreground hover:underline underline-offset-4'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <div className='text-xs uppercase tracking-widest text-muted-foreground'>
              Elsewhere
            </div>
            <div className='mt-3'>
              <SocialLinks size={24} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t border-border py-5 text-sm text-muted-foreground sm:flex sm:items-center sm:justify-between'>
          <span>
            © {year} {site.brand}
          </span>
          {site.domain && (
            <span className='block sm:mt-0 mt-2 truncate'>{site.domain}</span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
