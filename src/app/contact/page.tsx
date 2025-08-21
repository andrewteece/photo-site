export const metadata = { title: 'Contact' };

async function submit(formData: FormData) {
  'use server';
  const payload = Object.fromEntries(formData.entries());
  console.log('Lead', payload); // TODO: connect Resend or Formspree
}

export default function ContactPage() {
  return (
    <div className='container py-16 md:py-24'>
      <h1 className='text-3xl md:text-4xl font-medium'>Contact</h1>
      <form
        action={submit}
        className='mt-8 mx-auto max-w-xl space-y-4 p-6 rounded-2xl border'
      >
        <input name='name' placeholder='Name' className='input' required />
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='input'
          required
        />
        <input name='phone' placeholder='Phone' className='input' />
        <input name='date' placeholder='Event Date' className='input' />
        <textarea
          name='message'
          placeholder='Tell me about your shoot'
          className='textarea'
          rows={5}
          required
        />
        <button className='btn btn-primary w-full'>Send inquiry</button>
      </form>
    </div>
  );
}
