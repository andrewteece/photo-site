'use client';

import { GalleryFilters } from '@/components/sections/GalleryFilters';
import Lightbox from '@/components/sections/Lightbox';
import { BackToTop } from '@/components/ui/BackToTop';
import { getCaptionFor } from '@/lib/captions';
import Image from 'next/image';
import { useMemo, useState } from 'react';

type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export function PortfolioClient({ photos }: { photos: ManifestItem[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Extract unique categories and tags from all photos with counts
  const { categories, allTags, categoryCounts, tagCounts } = useMemo(() => {
    const cats = new Set<string>();
    const tags = new Set<string>();
    const catCounts: Record<string, number> = {};
    const tagCountsMap: Record<string, number> = {};

    photos.forEach((p) => {
      const meta = getCaptionFor(p.src);
      if (meta.category) {
        cats.add(meta.category);
        catCounts[meta.category] = (catCounts[meta.category] || 0) + 1;
      }
      if (meta.tags) {
        meta.tags.forEach((t) => {
          tags.add(t);
          tagCountsMap[t] = (tagCountsMap[t] || 0) + 1;
        });
      }
    });

    return {
      categories: Array.from(cats).sort(),
      allTags: Array.from(tags).sort(),
      categoryCounts: catCounts,
      tagCounts: tagCountsMap,
    };
  }, [photos]);

  // Filter photos based on active filters
  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const meta = getCaptionFor(p.src);

      // Category filter
      if (activeCategory && meta.category !== activeCategory) {
        return false;
      }

      // Tags filter (must have ALL active tags)
      if (activeTags.length > 0) {
        if (!meta.tags || !activeTags.every((t) => meta.tags?.includes(t))) {
          return false;
        }
      }

      return true;
    });
  }, [photos, activeCategory, activeTags]);

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleClearAll = () => {
    setActiveCategory(null);
    setActiveTags([]);
  };

  return (
    <>
      <section className='container mx-auto px-6 md:px-8 py-10 md:py-14'>
        {/* Visible H1 for SEO/a11y */}
        <header className='mb-8'>
          <h1 className='font-serif text-3xl md:text-4xl tracking-tight'>
            Portfolio
          </h1>
          <p className='text-muted-foreground mt-2'>
            Selected photographs. Click any image to view larger. Use ← → keys
            to navigate.
          </p>
        </header>

        {/* Gallery Filters */}
        <GalleryFilters
          categories={categories}
          tags={allTags}
          activeCategory={activeCategory}
          activeTags={activeTags}
          onCategoryChange={setActiveCategory}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearAll}
          resultCount={filteredPhotos.length}
          totalCount={photos.length}
          categoryCounts={categoryCounts}
          tagCounts={tagCounts}
        />

        {/* Grid title (demoted to H2). Make it sr-only if you don't want a second visible heading */}
        <h2 className='sr-only'>Gallery</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredPhotos.map((p) => {
            const meta = getCaptionFor(p.src);
            // Find the original index for lightbox navigation
            const originalIdx = photos.findIndex(
              (photo) => photo.src === p.src,
            );

            return (
              <button
                key={p.src}
                onClick={() => {
                  setIdx(originalIdx);
                  setOpen(true);
                }}
                className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/30'
                aria-label={`Open image: ${meta.title || meta.alt}`}
              >
                <div
                  className='relative'
                  style={{ aspectRatio: `${p.width}/${p.height}` }}
                >
                  <Image
                    src={p.src}
                    alt={meta.alt}
                    width={p.width}
                    height={p.height}
                    placeholder='blur'
                    blurDataURL={p.blurDataURL}
                    sizes='(min-width: 1024px) 33vw, (min-width: 640px) 48vw, 94vw'
                    quality={85}
                    className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.05]'
                  />
                  {/* Hover overlay with view icon */}
                  <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <div className='text-white text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-12 h-12 mx-auto mb-2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6'
                        />
                      </svg>
                      <span className='text-sm font-medium'>
                        View Full Size
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <BackToTop />

      <Lightbox
        items={photos.map((p) => ({
          ...p,
          alt: getCaptionFor(p.src).alt,
          caption: getCaptionFor(p.src),
        }))}
        index={idx}
        onChange={(next) => setIdx(next)}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
