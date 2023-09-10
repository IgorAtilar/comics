import type { Comic, RawComic } from './Comic';

export type SearchComicsRawResponse = {
  code: number;
  status: string;
  data: {
    total: number;
    results: RawComic[];
  };
};

export type SearchComicsResponse = {
  total: number;
  comics: Comic[];
  limit: number;
};
