import Link from 'next/link';

export default function HomePage() {
  return (
    <section>
      <div className='container py-24 md:py-36 text-center'>
        <p className='text-sm uppercase tracking-widest text-gray-500'>
          Editorial & Documentary
        </p>
        <h1 className='mt-4 text-4xl md:text-6xl font-medium'>
          Photography that feels like memory
        </h1>
        <p className='mt-6 max-w-2xl mx-auto text-gray-600'>
          Weddings, portraits, and brand stories crafted with light, patience,
          and care.
        </p>
        <div className='mt-8 flex items-center justify-center gap-4'>
          <Link className='btn btn-primary' href='/contact'>
            Book a session
          </Link>
          <Link className='btn' href='/portfolio'>
            View portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
