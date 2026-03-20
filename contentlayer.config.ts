import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    cover: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace(/^blog\//, ''),
    },
    url: {
      type: 'string',
      resolve: (post) =>
        `/blog/${post._raw.flattenedPath.replace(/^blog\//, '')}`,
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => readingTime(doc.body.raw).text,
    },
  },
}));

export const Gallery = defineDocumentType(() => ({
  name: 'Gallery',
  filePathPattern: `galleries/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    category: { type: 'string' },
    location: { type: 'string' },
    client: { type: 'string' },
    cover: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (gallery) =>
        gallery._raw.flattenedPath.replace(/^galleries\//, ''),
    },
    url: {
      type: 'string',
      resolve: (gallery) =>
        `/portfolio/${gallery._raw.flattenedPath.replace(/^galleries\//, '')}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Gallery],
});
