import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label='Breadcrumb' className='mb-6'>
      <ol className='flex items-center gap-2 text-sm text-muted-foreground'>
        <li>
          <Link href='/' className='hover:text-foreground transition-colors'>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className='flex items-center gap-2'>
            <span className='text-muted-foreground/50'>/</span>
            {index === items.length - 1 ? (
              <span className='text-foreground font-medium'>{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className='hover:text-foreground transition-colors'
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
