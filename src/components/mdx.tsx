import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import Photo from '@/components/Photo';

type AProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string };

const A = ({ href = '', children, className, ...rest }: AProps) => {
  const isExternal = /^https?:\/\//.test(href);
  return isExternal ? (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

const components = {
  a: A,
  Photo,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
