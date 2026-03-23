import matter from 'gray-matter';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostRecord = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  draft?: boolean;
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

async function readPostFromFile(file: string): Promise<PostRecord> {
  const raw = await fs.readFile(file, 'utf8');
  const { data, content } = matter(raw);

  const rel = path.relative(BLOG_DIR, file).replace(/\\/g, '/');
  const slug = rel.replace(/\.mdx$/i, '');

  const title = typeof data.title === 'string' ? data.title : slug;
  const description =
    typeof data.description === 'string' ? data.description : '';
  const date =
    typeof data.date === 'string' || data.date instanceof Date
      ? new Date(data.date).toISOString()
      : new Date(0).toISOString();

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t: unknown): t is string => typeof t === 'string')
    : [];

  const cover = typeof data.cover === 'string' ? data.cover : undefined;
  const draft = Boolean(data.draft);

  return {
    slug,
    title,
    description,
    date,
    tags,
    cover,
    draft,
    body: content,
  };
}

export async function getAllPosts(): Promise<PostRecord[]> {
  let files: string[] = [];
  try {
    files = await walkMdxFiles(BLOG_DIR);
  } catch {
    return [];
  }

  const posts = await Promise.all(files.map(readPostFromFile));

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<PostRecord | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
    await fs.access(filePath);
  } catch {
    return null;
  }

  return readPostFromFile(filePath);
}
