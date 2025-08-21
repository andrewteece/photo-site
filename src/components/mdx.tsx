'use client';
import * as React from 'react';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';

const components = {
  a: (props: React.ComponentProps<typeof Link>) => <Link {...props} />,
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ''} className='rounded-2xl' />
  ),
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className='prose prose-zinc dark:prose-invert max-w-none'>
      <Component components={components} />
    </div>
  );
}
