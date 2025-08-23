'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';
import Photo from '@/components/Photo';

// You can map more elements (code blocks, tables, etc.) here if you like
const components = {
  a: (props: React.ComponentProps<'a'>) => {
    const { href = '', children, ...rest } = props;
    // external vs internal links
    const isExternal = /^https?:\/\//.test(href);
    return isExternal ? (
      <a href={href} rel='noreferrer noopener' target='_blank' {...rest}>
        {children}
      </a>
    ) : (
      <Link href={href} {...(rest as any)}>
        {children}
      </Link>
    );
  },
  Photo, // ← now available in MDX as <Photo />
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
