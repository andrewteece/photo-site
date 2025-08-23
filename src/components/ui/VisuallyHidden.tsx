import type { ElementType, ComponentPropsWithoutRef } from 'react';

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export default function VisuallyHidden<T extends ElementType = 'span'>({
  as,
  className = '',
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? 'span') as ElementType;
  return (
    <Tag className={`sr-only ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
