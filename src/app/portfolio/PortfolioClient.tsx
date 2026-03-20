'use client';

import { GalleryFilters } from '@/components/sections/GalleryFilters';
import Lightbox from '@/components/sections/Lightbox';
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

  // Extract unique categories and tags from all photos
  const { categories, allTags } = useMemo(() => {
    const cats = new Set<string>();
    const tags = new Set<string>();

    photos.forEach((p) => {
      const meta = getCaptionFor(p.src);
      if (meta.category) cats.add(meta.category);
      if (meta.tags) meta.tags.forEach((t) => tags.add(t));
    });

    return {
      categories: Array.from(cats).sort(),
      allTags: Array.from(tags).sort(),
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
                className='group block overflow-hidden rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/30'
                aria-label={`Open image: ${meta.title || meta.alt}`}
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
                  className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.01]'
                />
                {/* Optional visible caption under each image.
                    Remove this block if you prefer a cleaner grid. */}
                {meta.title && (
                  <figcaption className='text-sm text-muted-foreground px-2 py-2 text-left'>
                    {meta.title}
                    {meta.location ? ` — ${meta.location}` : ''}
                    {meta.year ? `, ${meta.year}` : ''}
                  </figcaption>
                )}
              </button>
            );
          })}
        </div>
      </section>

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
