import type { Metadata } from 'next';
import { Shell } from '@/components/layout/Shell';
import ContactForm from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Andrew Teece for assignments, licensing, or print inquiries.',
};

export default function ContactPage() {
  return (
    <section className='container mx-auto px-6 md:px-8 py-12 md:py-16'>
      <Shell size='tight'>
        {/* Visible H1 (best practice for non-home pages) */}
        <h1 className='font-serif text-3xl md:text-4xl tracking-tight'>
          Contact
        </h1>

        <p className='text-muted-foreground mt-3 max-w-prose'>
          For assignments, licensing, or prints, use the form below or email me
          directly.
        </p>

        <div className='mt-8 grid gap-8 md:grid-cols-3'>
          {/* Left: details */}
          <div className='rounded-2xl border border-border p-5'>
            <h2 className='text-lg font-medium mb-2'>Details</h2>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                Email:{' '}
                <a
                  className='underline hover:no-underline'
                  href='mailto:hello@andrewteece.com'
                >
                  hello@andrewteece.com
                </a>
              </li>
              <li>Based in the Midwest • Available for select travel</li>
              <li>Usual response time: 1–2 business days</li>
            </ul>
          </div>

          {/* Right: form */}
          <div className='md:col-span-2'>
            <ContactForm />
          </div>
        </div>
      </Shell>
    </section>
  );
}
