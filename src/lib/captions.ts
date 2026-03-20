// src/lib/captions.ts
export type Caption = {
  /** Short label shown in lightbox; optional for grid */
  title?: string;
  /** Required: used for <Image alt> */
  alt: string;
  /** Optional extras if you want them displayed in the lightbox */
  location?: string;
  year?: number;
  /** Category for filtering (e.g., 'Landscapes', 'Portraits', 'Wedding') */
  category?: string;
  /** Tags for secondary filtering */
  tags?: string[];
  /** EXIF data for display in lightbox */
  camera?: string;
  lens?: string;
  settings?: string;
  /** Source attribution for imported images */
  source?: {
    platform: '500px' | 'flickr' | 'instagram' | 'web';
    url: string;
    username?: string;
  };
};

// Map by the FINAL web filename (after your slugify step), e.g. "calm-morning.jpg"
const CAPTIONS: Record<string, Caption> = {
  'calm-morning.jpg': {
    title: 'Calm Morning',
    alt: 'Calm morning over the water with soft light',
    location: 'Upper Midwest',
    year: 2017,
    category: 'Landscapes',
    tags: ['water', 'sunrise', 'peaceful'],
    camera: 'Canon EOS 5D Mark III',
    lens: 'Canon EF 24-70mm f/2.8L II',
    settings: 'f/8 • 1/125s • ISO 100',
  },
  'goldengate.jpg': {
    title: 'Golden Gate, B&W',
    alt: 'Golden Gate Bridge under dramatic clouds in black and white',
    location: 'San Francisco, CA',
    year: 2016,
    category: 'Landscapes',
    tags: ['architecture', 'black and white', 'urban'],
    camera: 'Nikon D850',
    lens: 'Nikon 14-24mm f/2.8',
    settings: 'f/11 • 1/60s • ISO 200',
  },
  'morning-colors.jpg': {
    title: 'Flowing Creek',
    alt: 'Flowing creek with smooth water over rocks',
    location: 'Sedona, AZ',
    year: 2018,
    category: 'Landscapes',
    tags: ['water', 'nature', 'creek'],
    camera: 'Sony α7R III',
    lens: 'Sony FE 70-200mm f/2.8 GM',
    settings: 'f/5.6 • 1/250s • ISO 400',
  },
  'dew.jpg': {
    title: 'Dew',
    alt: 'Morning dew on leaves',
    category: 'Nature',
    tags: ['macro', 'water', 'morning'],
    camera: 'Canon EOS R5',
    lens: 'Canon RF 100mm f/2.8L Macro',
    settings: 'f/4 • 1/200s • ISO 320',
  },
  'fern.jpg': {
    title: 'Fern',
    alt: 'Close-up of fern fronds',
    category: 'Nature',
    tags: ['macro', 'plants', 'green'],
  },
  'morning-storm.jpg': {
    title: 'Morning Storm',
    alt: 'Storm clouds at sunrise',
    category: 'Landscapes',
    tags: ['dramatic', 'clouds', 'weather'],
  },
  // Imported from Flickr
  'landscapes-flkr-01.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'landscapes-flkr-02.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'landscapes-flkr-03.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'portrait-flkr-04.jpg': {
    alt: 'Portrait photograph from Flickr collection',
    category: 'Portrait',
  },
  'landscapes-flkr-05.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'landscapes-flkr-06.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'portrait-flkr-07.jpg': {
    alt: 'Portrait photograph from Flickr collection',
    category: 'Portrait',
  },
  'portrait-flkr-08.jpg': {
    alt: 'Portrait photograph from Flickr collection',
    category: 'Portrait',
  },
  'portrait-flkr-09.jpg': {
    alt: 'Portrait photograph from Flickr collection',
    category: 'Portrait',
  },
  'landscapes-flkr-10.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'landscapes-flkr-11.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'nature-flkr-12.jpg': {
    alt: 'Nature photograph from Flickr collection',
    category: 'Nature',
  },
  'landscapes-flkr-13.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'landscapes-flkr-14.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'portrait-flkr-15.jpg': {
    alt: 'Portrait photograph from Flickr collection',
    category: 'Portrait',
  },
  'landscapes-flkr-16.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'landscapes-flkr-17.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'landscapes-flkr-18.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'landscapes-flkr-19.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
  },
  'landscapes-flkr-20.jpg': {
    alt: 'Landscape photograph from Flickr collection',
    category: 'Landscapes',
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
