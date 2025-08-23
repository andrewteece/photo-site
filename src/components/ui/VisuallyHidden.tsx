export default function VisuallyHidden({
  as: Tag = 'span',
  children,
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<'span'> & { as?: any }) {
  return (
    <Tag className={`sr-only ${className}`} {...props}>
      {children}
    </Tag>
  );
}
