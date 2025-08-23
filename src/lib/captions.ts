// src/lib/captions.ts
export type Caption = {
  /** Short label shown in lightbox; optional for grid */
  title?: string;
  /** Required: used for <Image alt> */
  alt: string;
  /** Optional extras if you want them displayed in the lightbox */
  location?: string;
  year?: number;
};

// Map by the FINAL web filename (after your slugify step), e.g. "calm-morning.jpg"
const CAPTIONS: Record<string, Caption> = {
  'calm-morning.jpg': {
    title: 'Calm Morning',
    alt: 'Calm morning over the water with soft light',
    location: 'Upper Midwest',
    year: 2017,
  },
  'goldengate.jpg': {
    title: 'Golden Gate, B&W',
    alt: 'Golden Gate Bridge under dramatic clouds in black and white',
    location: 'San Francisco, CA',
    year: 2016,
  },
  'morning-colors.jpg': {
    title: 'Morning Colors',
    alt: 'Cottonwoods against a red canyon wall in autumn',
    location: 'Zion National Park, UT',
    year: 2015,
  },
  'dew.jpg': {
    title: 'Dew',
    alt: 'Morning dew on leaves',
  },
  'fern.jpg': {
    title: 'Fern',
    alt: 'Close-up of fern fronds',
  },
  'morning-storm.jpg': {
    title: 'Morning Storm',
    alt: 'Storm clouds at sunrise',
  },
};

/** Derive a decent default from filename when a caption doesn’t exist */
function fallbackFromFilename(src: string): Caption {
  const file = src.split('/').pop() || src;
  const base = file.replace(/\.[a-z0-9]+$/i, '');
  const human = base.replace(/[-_]+/g, ' ');
  // Capitalize first letter
  const title = human.charAt(0).toUpperCase() + human.slice(1);
  return { alt: human, title };
}

/** Get caption by web path or filename */
export function getCaptionFor(srcOrFile: string): Caption {
  const file = (srcOrFile.split('/').pop() || srcOrFile).toLowerCase();
  return CAPTIONS[file] ?? fallbackFromFilename(file);
}

/** Export the raw map if you want to edit it elsewhere */
export const captions = CAPTIONS;
