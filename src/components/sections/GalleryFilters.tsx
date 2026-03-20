'use client';

import { cn } from '@/lib/cn';

export type FilterState = {
  category: string | null;
  tags: string[];
};

type GalleryFiltersProps = {
  categories: string[];
  tags: string[];
  activeCategory: string | null;
  activeTags: string[];
  onCategoryChange: (category: string | null) => void;
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
  resultCount: number;
  totalCount: number;
};

export function GalleryFilters({
  categories,
  tags,
  activeCategory,
  activeTags,
  onCategoryChange,
  onTagToggle,
  onClearAll,
  resultCount,
  totalCount,
}: GalleryFiltersProps) {
  const hasActiveFilters = activeCategory !== null || activeTags.length > 0;

  return (
    <div className='mb-8 space-y-4'>
      {/* Category Filter */}
      <div>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
            Category
          </h3>
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className='text-xs text-muted-foreground hover:text-foreground transition-colors underline'
            >
              Clear all
            </button>
          )}
        </div>
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={() => onCategoryChange(null)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeCategory === null
                ? 'bg-foreground text-background'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === cat
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      {tags.length > 0 && (
        <div>
          <h3 className='text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3'>
            Tags
          </h3>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => {
              const isActive = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                    isActive
                      ? 'border-foreground bg-foreground/10 text-foreground'
                      : 'border-muted bg-transparent text-muted-foreground hover:border-muted-foreground/50',
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Result Count */}
      <div className='text-sm text-muted-foreground'>
        Showing {resultCount} of {totalCount}{' '}
        {totalCount === 1 ? 'photo' : 'photos'}
      </div>
    </div>
  );
}
