import { getDefaultHeaders } from '@/infra/api/helpers';
import type { Comic, SearchComicsRawResponse } from '@/infra/api/types';
import { ComicModel } from '@/infra/api/models';
import { getComicSpotlightUrl, getRawComicPrice } from '../helpers';

export const getComicSpotlight = async () => {
  try {
    const data = await fetch(getComicSpotlightUrl(), {
      headers: getDefaultHeaders()
    });

    const response: SearchComicsRawResponse = await data.json();

    const {
      data: { results }
    } = response;

    const comics: Comic[] = results.reduce<Comic[]>((acc, comic) => {
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

    const validComics = comics.filter((comic) => {
      const { description } = comic;

      if (!description || description === 'null') {
        return false;
      }

      return true;
    });

    const [firstComic] = validComics;

    return firstComic;
  } catch {}
};
