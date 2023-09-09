import { z } from 'astro/zod';

const thumbnailPreprocess = (thumbnail: unknown) => {
  if (typeof thumbnail === 'object' && thumbnail) {
    if (
      'path' in thumbnail &&
      'extension' in thumbnail &&
      typeof thumbnail.path === 'string' &&
      typeof thumbnail.extension === 'string'
    ) {
      const path = thumbnail.path.replace(/^http:/, 'https:');
      return `${path}.${thumbnail.extension}`;
    }
  }
};

export const ThumbnailModel = z
  .preprocess(thumbnailPreprocess, z.string())
  .optional();
