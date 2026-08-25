export type MediaKind = 'image' | 'video';

export type MediaItem = {
  id: string;
  kind: MediaKind;
  name: string;
  size: number;
  uploadedAt: string;
  url: string;
  extension: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  author: string;
  status: 'Draft' | 'Published';
  cover: string;
  body: string;
  createdAt: string;
  readTime: string;
};

export const acceptedFiles = {
  image: ['.jpg', '.png', '.webp', '.svg'],
  video: ['.mp4', '.mov', '.webm']
};

export const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${sizes[index]}`;
};

export const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export const storageAdapterExample = `
// RESTful storage integration pattern for Supabase, Firebase, or Cloudinary.
POST /api/media/sign-upload  -> returns signed upload URL and public asset URL
POST /api/media              -> persists metadata { name, size, type, url }
GET  /api/media              -> paginated media list
DELETE /api/media/:id        -> deletes metadata and storage object
POST /api/posts              -> creates draft/published article
PATCH /api/posts/:slug       -> updates article and embedded assets
`;
