import { createMarvelApiUrl, getDefaultHeaders } from '@/infra/api/helpers';
import type { SearchComicsRawResponse } from '@/infra/api/types';
import { ComicModel } from '@/infra/api/models/Comic';
import { getRawComicPrice } from '../helpers';

export const getComicById = async ({ id }: { id: string }) => {
  try {
    const data = await fetch(createMarvelApiUrl({ endpoint: `comics/${id}` }), {
      headers: getDefaultHeaders()
    });

    const response: SearchComicsRawResponse = await data.json();

    const {
      data: { results }
    } = response;

    const [comic] = results;

    const price = getRawComicPrice(comic.prices);

    const result = ComicModel.safeParse({
      ...comic,
      price
    });

    if (result.success) {
      const { data } = result;
      return data;
    }
  } catch {}
};
