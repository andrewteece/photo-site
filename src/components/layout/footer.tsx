export function Footer() {
  return (
    <footer className='border-t'>
      <div className='container py-10 text-sm text-gray-500 flex flex-col md:flex-row gap-3 md:items-center md:justify-between'>
        <p>© {new Date().getFullYear()} Your Name Photography</p>
        <p className='opacity-80'>Made with Next.js & Tailwind</p>
      </div>
    </footer>
  );
}
