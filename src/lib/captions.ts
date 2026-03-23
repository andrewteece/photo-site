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
    tags: ['water', 'sunrise', 'peaceful', 'selected'],
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
    tags: ['architecture', 'black and white', 'urban', 'selected'],
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
    tags: ['water', 'nature', 'creek', 'selected'],
    camera: 'Sony α7R III',
    lens: 'Sony FE 70-200mm f/2.8 GM',
    settings: 'f/5.6 • 1/250s • ISO 400',
  },
  'dew.jpg': {
    title: 'Dew',
    alt: 'Morning dew on leaves',
    category: 'Nature',
    tags: ['macro', 'water', 'morning', 'selected'],
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
    tags: ['dramatic', 'clouds', 'weather', 'selected'],
  },
  // Imported from 500px
  'nature-5px-01.jpg': {
    title: '4 Amigos',
    alt: 'Four metal musician statues silhouetted against the sea at dusk',
    category: 'Scenes',
    tags: [
      'sculpture',
      'silhouette',
      'black and white',
      'sea',
      'evening',
      'travel',
      'selected',
    ],
    source: {
      platform: '500px',
      url: 'https://500px.com/photo/82450875/4-amigos-by-andrew-teece',
    },
  },
  'landscapes-5px-02.jpg': {
    title: 'Bird Pose',
    alt: 'Seagull standing on a concrete ledge with Alcatraz Island out of focus behind',
    category: 'Scenes',
    tags: [
      'seagull',
      'san francisco',
      'alcatraz',
      'harbor',
      'city',
      'travel',
      'selected',
    ],
    source: {
      platform: '500px',
      url: 'https://500px.com/photo/6539135/bird-pose-by-andrew-teece',
    },
  },
  'landscapes-5px-03.jpg': {
    title: 'Northwoods Fern',
    alt: 'Single fern frond stretching across a bed of leaves in soft light',
    category: 'Nature',
    tags: [
      'fern',
      'forest',
      'understory',
      'texture',
      'quiet',
      'nature',
      'selected',
    ],
    source: {
      platform: '500px',
      url: 'https://500px.com/photo/82472571/northwoods-fern-by-andrew-teece',
    },
  },
  'landscapes-5px-04.jpg': {
    title: 'Looking Down',
    alt: 'Abstract view down a repeating white architectural corridor with triangular openings',
    category: 'Architecture',
    tags: [
      'architecture',
      'abstract',
      'lines',
      'geometry',
      'museum',
      'black and white',
      'selected',
    ],
    source: {
      platform: '500px',
      url: 'https://500px.com/photo/3681899/looking-down-by-andrew-teece',
    },
  },
  'landscapes-5px-05.jpg': {
    title: 'Breaking Through',
    alt: 'Sun breaking through a dense cloud bank, sending rays across the sky',
    category: 'Landscapes',
    tags: [
      'sun',
      'clouds',
      'sunbeams',
      'dramatic sky',
      'black and white',
      'selected',
    ],
    source: {
      platform: '500px',
      url: 'https://500px.com/photo/82454375/breaking-through-by-andrew-teece',
    },
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
