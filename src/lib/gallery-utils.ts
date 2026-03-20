// src/lib/gallery-utils.ts
import { getCaptionFor } from '@/lib/captions';
import manifest from '@/lib/image-manifest.json';

type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

/**
 * Extract all unique categories from the image manifest
 */
export function getAllCategories(): string[] {
  const photos = manifest as ManifestItem[];
  const categories = new Set<string>();

  photos.forEach((p) => {
    const meta = getCaptionFor(p.src);
    if (meta.category) {
      categories.add(meta.category);
    }
  });

  return Array.from(categories).sort();
}

/**
 * Extract all unique tags from the image manifest
 */
export function getAllTags(): string[] {
  const photos = manifest as ManifestItem[];
  const tags = new Set<string>();

  photos.forEach((p) => {
    const meta = getCaptionFor(p.src);
    if (meta.tags) {
      meta.tags.forEach((t) => tags.add(t));
    }
  });

  return Array.from(tags).sort();
}

/**
 * Get photo count for a specific category
 */
export function getCategoryPhotoCount(category: string): number {
  const photos = manifest as ManifestItem[];
  return photos.filter((p) => {
    const meta = getCaptionFor(p.src);
    return meta.category?.toLowerCase() === category.toLowerCase();
  }).length;
}
