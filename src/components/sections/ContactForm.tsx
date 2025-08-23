'use client';

import { useMemo, useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // simple controlled fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // should stay empty

  const canSubmit = useMemo(() => {
    return name.trim() && email.trim() && message.trim();
  }, [name, email, message]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    // basic checks
    if (honeypot) {
      setErr('Something went wrong. Please email me directly.');
      return;
    }
    if (!canSubmit) {
      setErr('Please fill in your name, email, and a brief message.');
      return;
    }

    // build a mailto link to open user's email app
    setBusy(true);
    try {
      const to = 'hello@andrewteece.com';
      const subj = subject.trim() || `New inquiry from ${name.trim()}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        message,
        '',
        '—',
        'Sent from andrewteece.com/contact',
      ].join('\n');

      const href = `mailto:${to}?subject=${encodeURIComponent(
        subj
      )}&body=${encodeURIComponent(body)}`;

      // open email client
      window.location.href = href;
      setSent(true);
    } catch (e) {
      setErr('Could not open your email client. Please email me directly.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-2xl border border-white/10 p-5'
      noValidate
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label htmlFor='name' className='block text-sm mb-1'>
            Your name *
          </label>
          <input
            id='name'
            name='name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full rounded-lg bg-black/20 border border-white/15 px-3 py-2 outline-none focus:border-white/40'
            autoComplete='name'
          />
        </div>

        <div>
          <label htmlFor='email' className='block text-sm mb-1'>
            Email *
          </label>
          <input
            id='email'
            type='email'
            name='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full rounded-lg bg-black/20 border border-white/15 px-3 py-2 outline-none focus:border-white/40'
            autoComplete='email'
          />
        </div>

        <div className='md:col-span-2'>
          <label htmlFor='subject' className='block text-sm mb-1'>
            Subject
          </label>
          <input
            id='subject'
            name='subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className='w-full rounded-lg bg-black/20 border border-white/15 px-3 py-2 outline-none focus:border-white/40'
            placeholder='Assignment, licensing, or prints'
          />
        </div>

        <div className='md:col-span-2'>
          <label htmlFor='message' className='block text-sm mb-1'>
            Message *
          </label>
          <textarea
            id='message'
            name='message'
            rows={6}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='w-full rounded-lg bg-black/20 border border-white/15 px-3 py-2 outline-none focus:border-white/40'
            placeholder='A few details about your project, dates, and location.'
          />
        </div>

        {/* Honeypot anti-spam field (hidden from users) */}
        <div aria-hidden='true' className='hidden'>
          <label htmlFor='company'>Company</label>
          <input
            id='company'
            name='company'
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete='off'
          />
        </div>
      </div>

      {/* actions */}
      <div className='mt-5 flex items-center gap-3'>
        <button
          type='submit'
          disabled={!canSubmit || busy}
          className='inline-flex items-center rounded-full bg-brand px-5 py-2 text-black disabled:opacity-50'
        >
          {busy ? 'Opening…' : 'Send'}
        </button>
        <a
          href='mailto:hello@andrewteece.com'
          className='text-sm underline hover:no-underline'
        >
          or email me directly
        </a>
      </div>

      {/* feedback */}
      {err && <p className='mt-3 text-sm text-red-400'>{err}</p>}
      {sent && (
        <p className='mt-3 text-sm text-emerald-400'>
          If your email app didn’t open, please use{' '}
          <a className='underline' href='mailto:hello@andrewteece.com'>
            hello@andrewteece.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
