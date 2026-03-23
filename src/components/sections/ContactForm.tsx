'use client';

import { useMemo, useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // should stay empty
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [messageTouched, setMessageTouched] = useState(false);

  const canSubmit = useMemo(() => {
    const nameTrim = name.trim();
    const emailTrim = email.trim();
    const messageTrim = message.trim();
    const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailTrim);
    return (
      nameTrim !== '' && emailTrim !== '' && emailValid && messageTrim !== ''
    );
  }, [name, email, message]);

  const nameError =
    nameTouched && name.trim() === '' ? 'Please enter your name.' : '';
  const emailError = emailTouched
    ? email.trim() === ''
      ? 'Please enter your email.'
      : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())
        ? 'Please enter a valid email address.'
        : ''
    : '';
  const messageError =
    messageTouched && message.trim() === ''
      ? 'Please enter a brief message.'
      : '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // ensure 'e' is used and default submit is blocked
    setErr(null);

    if (honeypot) {
      setErr('Something went wrong. Please email me directly.');
      return;
    }
    if (!canSubmit) {
      setNameTouched(true);
      setEmailTouched(true);
      setMessageTouched(true);
      setErr('Please fix the highlighted fields.');
      return;
    }

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
        subj,
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = href;
      setSent(true);
    } catch {
      setErr('Could not open your email client. Please email me directly.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='card card-body'
      noValidate
      aria-busy={busy}
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
            onBlur={() => setNameTouched(true)}
            className='input'
            autoComplete='name'
            aria-invalid={!!nameError}
            aria-describedby={nameError ? 'contact-name-error' : undefined}
          />
          {nameError && (
            <p id='contact-name-error' className='mt-1 text-xs text-red-500'>
              {nameError}
            </p>
          )}
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
            onBlur={() => setEmailTouched(true)}
            className='input'
            autoComplete='email'
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'contact-email-error' : undefined}
          />
          {emailError && (
            <p id='contact-email-error' className='mt-1 text-xs text-red-500'>
              {emailError}
            </p>
          )}
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
            className='input'
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
            onBlur={() => setMessageTouched(true)}
            className='textarea'
            placeholder='A few details about your project, dates, and location.'
            aria-invalid={!!messageError}
            aria-describedby={
              messageError ? 'contact-message-error' : undefined
            }
          />
          {messageError && (
            <p id='contact-message-error' className='mt-1 text-xs text-red-500'>
              {messageError}
            </p>
          )}
        </div>

        {/* Honeypot anti-spam field (hidden) */}
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

      <div className='mt-5 flex items-center gap-3'>
        <button
          type='submit'
          disabled={!canSubmit || busy}
          className='btn btn-primary rounded-full px-5'
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

      {err && (
        <p
          className='mt-3 text-sm text-red-500'
          role='alert'
          aria-live='assertive'
        >
          {err}
        </p>
      )}
      {sent && (
        <p
          className='mt-3 text-sm text-emerald-500'
          role='status'
          aria-live='polite'
        >
          If your email app didn’t open, please use{' '}
          <a className='underline' href='mailto:hello@andrewteece.com'>
            hello@andrewteece.com
          </a>
          .
        </p>
      )}
      <p className='mt-3 text-xs text-muted-foreground'>
        No newsletters or marketing—just project-related replies.
      </p>
    </form>
  );
}
