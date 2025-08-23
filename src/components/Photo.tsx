import Image from 'next/image';
import manifest from '@/lib/image-manifest.json';

type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

type Props = {
  /** Web path like /images/portfolio/calm-morning.jpg or /images/blog/cover.jpg */
  src: string;
  alt?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export default function Photo({
  src,
  alt = '',
  caption,
  priority = false,
  className = '',
  sizes = '(min-width: 1024px) 800px, 100vw',
}: Props) {
  const item = (manifest as ManifestItem[]).find((m) => m.src === src);

  // If the image is in the manifest (portfolio), use Next/Image + blur
  if (item) {
    return (
      <figure className={`photo-frame ${className}`}>
        <Image
          src={item.src}
          alt={alt}
          width={item.width}
          height={item.height}
          placeholder={item.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={item.blurDataURL}
          sizes={sizes}
          quality={90}
          className='rounded-xl object-cover w-full h-auto'
          priority={priority}
        />
        {caption && (
          <figcaption className='mt-2 text-sm text-muted-foreground'>
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Fallback for images not in the manifest (e.g., /images/blog/*)
  return (
    <figure className={`photo-frame ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className='rounded-xl w-full h-auto' />
      {caption && (
        <figcaption className='mt-2 text-sm text-muted-foreground'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
