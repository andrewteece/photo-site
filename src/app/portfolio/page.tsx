import Link from 'next/link';

const galleries = [
  { slug: 'lakefront-wedding', title: 'Lakefront Wedding' },
  { slug: 'autumn-portraits', title: 'Autumn Portraits' },
  { slug: 'brand-editorial', title: 'Brand Editorial' },
];

export default function PortfolioPage() {
  return (
    <div className='container py-16 md:py-24'>
      <h1 className='text-3xl md:text-4xl font-medium'>Portfolio</h1>
      <ul className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {galleries.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/portfolio/${g.slug}`}
              className='block rounded-2xl border p-6 hover:shadow-lg transition'
            >
              <h3 className='text-lg font-medium'>{g.title}</h3>
              <p className='text-gray-600'>Open gallery</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
