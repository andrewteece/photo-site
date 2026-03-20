export type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  // Optional caption metadata (populated during build)
  caption?: {
    title?: string;
    alt: string;
    location?: string;
    year?: number;
    category?: string;
    tags?: string[];
    camera?: string;
    lens?: string;
    settings?: string;
    source?: '500px' | 'Flickr';
  };
};
