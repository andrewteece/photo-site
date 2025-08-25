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
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={[
        'text-base font-medium transition-colors',
        active ? 'text-foreground' : 'text-foreground/85 hover:text-foreground',
        className,
      ].join(' ')}
    >
      {children}
    </Link>
  );
}
