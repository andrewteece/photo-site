import { cn } from '@/lib/cn';

type Size = 'tight' | 'default' | 'wide' | 'full';

export function Shell({
  size = 'default',
  className,
  children,
}: {
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  // Explicit widths + hard centering
  const widths: Record<Size, string> = {
    tight: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto px-4 md:px-8', // <- guarantees horizontal centering
        widths[size],
        className
      )}
    >
      {children}
    </div>
  );
}
