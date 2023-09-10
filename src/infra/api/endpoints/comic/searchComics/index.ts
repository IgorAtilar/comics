import { getDefaultHeaders } from '@/infra/api/helpers';
import type {
  Comic,
  SearchComicsRawResponse,
  SearchComicsResponse
} from '@/infra/api/types';
import { ComicModel } from '@/infra/api/models';
import {
  getDefaultSearchLimit,
  getRawComicPrice,
  getSearchComicsUrl
} from '../helpers';

export const searchComics = async ({
  limit = getDefaultSearchLimit(),
  page,
  query
}: {
  query: string;
  limit?: number;
  page?: number;
}) => {
  try {
    const offset = page ? (page - 1) * limit : undefined;
    const data = await fetch(getSearchComicsUrl({ limit, offset, query }), {
      headers: getDefaultHeaders()
    });

    const response: SearchComicsRawResponse = await data.json();

    const {
      data: { total, results }
    } = response;

    const comics = results.reduce<Comic[]>((acc, comic) => {
      const price = getRawComicPrice(comic.prices);

      const result = ComicModel.safeParse({
        ...comic,
        price
      });

      if (result.success) {
        const { data } = result;
        acc.push(data);
      }

      return acc;
    }, []);

    const result: SearchComicsResponse = {
      total,
      comics,
      limit
    };

    return result;
  } catch {}

  return {
    total: 0,
    comics: [],
    limit
  };
};
