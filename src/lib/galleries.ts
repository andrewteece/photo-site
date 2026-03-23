import matter from 'gray-matter';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const GALLERIES_DIR = path.join(process.cwd(), 'content', 'galleries');

export type GalleryRecord = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  location?: string;
  client?: string;
  cover?: string;
  images: string[];
  featured?: boolean;
  body: string;
};

async function walkMdxFiles(rootDir: string): Promise<string[]> {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMdxFiles(fullPath)));
    } else if (entry.isFile() && fullPath.toLowerCase().endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function readGalleryFromFile(file: string): Promise<GalleryRecord> {
  const raw = await fs.readFile(file, 'utf8');
  const { data, content } = matter(raw);

  const rel = path.relative(GALLERIES_DIR, file).replace(/\\/g, '/');
  const slug = rel.replace(/\.mdx$/i, '');

  const title = typeof data.title === 'string' ? data.title : slug;
  const description =
    typeof data.description === 'string' ? data.description : '';
  const date =
    typeof data.date === 'string' || data.date instanceof Date
      ? new Date(data.date).toISOString()
      : new Date(0).toISOString();

  const category =
    typeof data.category === 'string' ? data.category : undefined;
  const location =
    typeof data.location === 'string' ? data.location : undefined;
  const client = typeof data.client === 'string' ? data.client : undefined;
  const cover = typeof data.cover === 'string' ? data.cover : undefined;

  const images = Array.isArray(data.images)
    ? data.images.filter((v: unknown): v is string => typeof v === 'string')
    : [];

  const featured = Boolean(data.featured);

  return {
    slug,
    title,
    description,
    date,
    category,
    location,
    client,
    cover,
    images,
    featured,
    body: content,
  };
}

export async function getAllGalleries(): Promise<GalleryRecord[]> {
  let files: string[] = [];
  try {
    files = await walkMdxFiles(GALLERIES_DIR);
  } catch {
    return [];
  }

  const galleries = await Promise.all(files.map(readGalleryFromFile));

  return galleries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getGalleryBySlug(
  slug: string,
): Promise<GalleryRecord | null> {
  const filePath = path.join(GALLERIES_DIR, `${slug}.mdx`);
  try {
    await fs.access(filePath);
  } catch {
    return null;
  }

  return readGalleryFromFile(filePath);
}
