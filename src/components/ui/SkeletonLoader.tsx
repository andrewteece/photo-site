import { cn } from '@/lib/cn';

interface SkeletonLoaderProps {
  className?: string;
  aspectRatio?: string;
}

export function SkeletonLoader({
  className,
  aspectRatio = 'aspect-[4/3]',
}: SkeletonLoaderProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted rounded-2xl',
        aspectRatio,
        className,
      )}
      aria-label='Loading...'
    />
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonLoader key={i} />
      ))}
    </div>
  );
}
