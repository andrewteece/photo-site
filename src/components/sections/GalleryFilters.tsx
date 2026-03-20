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
  categoryCounts?: Record<string, number>;
  tagCounts?: Record<string, number>;
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
  categoryCounts = {},
  tagCounts = {},
}: GalleryFiltersProps) {
  const hasActiveFilters = activeCategory !== null || activeTags.length > 0;

  return (
    <div className='mb-8 space-y-4 sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 py-4 -mx-6 px-6 md:-mx-8 md:px-8 border-b border-border'>
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
              'px-4 py-2 rounded-full text-sm font-medium transition-all inline-flex items-center gap-2',
              activeCategory === null
                ? 'bg-foreground text-background'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
            )}
          >
            All
            <span className='text-xs opacity-70'>({totalCount})</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all inline-flex items-center gap-2',
                activeCategory === cat
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80',
              )}
            >
              {cat}
              {categoryCounts[cat] && (
                <span className='text-xs opacity-70'>
                  ({categoryCounts[cat]})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter - Horizontal scroll on mobile */}
      {tags.length > 0 && (
        <div>
          <h3 className='text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3'>
            Tags
          </h3>
          <div className='overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0'>
            <div className='flex gap-2 md:flex-wrap min-w-max md:min-w-0'>
              {tags.map((tag) => {
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => onTagToggle(tag)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium transition-all border inline-flex items-center gap-1.5 whitespace-nowrap',
                      isActive
                        ? 'border-foreground bg-foreground/10 text-foreground'
                        : 'border-muted bg-transparent text-muted-foreground hover:border-muted-foreground/50',
                    )}
                  >
                    {tag}
                    {tagCounts[tag] && (
                      <span className='text-[10px] opacity-60'>
                        {tagCounts[tag]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Result Count */}
      <div className='text-sm text-muted-foreground'>
        Showing{' '}
        <span className='font-medium text-foreground'>{resultCount}</span> of{' '}
        <span className='font-medium text-foreground'>{totalCount}</span>{' '}
        {totalCount === 1 ? 'photo' : 'photos'}
      </div>
    </div>
  );
}
