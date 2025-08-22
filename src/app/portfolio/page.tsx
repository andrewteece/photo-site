import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';

const galleries = [
  { slug: 'lakefront-wedding', title: 'Lakefront Wedding' },
  { slug: 'autumn-portraits', title: 'Autumn Portraits' },
  { slug: 'brand-editorial', title: 'Brand Editorial' },
];

export default function PortfolioPage() {
  return (
    <section className='py-16 md:py-24'>
      <Shell size='wide'>
        <h1 className='text-3xl md:text-4xl font-serif font-semibold tracking-tight'>
          Portfolio
        </h1>
        <ul className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {galleries.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/portfolio/${g.slug}`}
                className='card hover-lift block p-6'
              >
                <h3 className='text-lg font-medium'>{g.title}</h3>
                <p className='text-muted-foreground'>Open gallery</p>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
