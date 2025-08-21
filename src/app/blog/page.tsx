import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';

export const metadata = { title: 'Journal' };

export default function BlogIndex() {
  const posts = allPosts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <div className='container py-16 md:py-24'>
      <h1 className='text-3xl md:text-4xl font-medium'>Journal</h1>
      <div className='mt-8 grid gap-6 md:grid-cols-2'>
        {posts.map((p) => (
          <Link
            key={p._id}
            href={p.url}
            className='block rounded-2xl border p-6 hover:shadow-lg transition'
          >
            <h2 className='text-xl font-medium'>{p.title}</h2>
            <p className='mt-2 text-gray-600'>{p.description}</p>
            <p className='mt-4 text-xs text-gray-500'>
              {new Date(p.date).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
