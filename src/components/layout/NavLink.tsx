'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={[
        'link-underline',
        active
          ? 'text-foreground font-medium'
          : 'text-foreground/80 hover:text-foreground',
        className,
      ].join(' ')}
    >
      {children}
    </Link>
  );
}
