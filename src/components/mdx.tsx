import Photo from '@/components/Photo';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

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

export async function Mdx({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: false },
    components,
  });

  return content;
}
