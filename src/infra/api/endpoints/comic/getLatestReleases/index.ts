import { getDefaultHeaders } from '@/infra/api/helpers';
import type { SearchComicsRawResponse, Comic } from '@/infra/api/types';
import { ComicModel } from '@/infra/api/models';
import { getLatestReleasesUrl, getRawComicPrice } from '../helpers';

export const getLatestReleases = async () => {
  try {
    const data = await fetch(getLatestReleasesUrl(), {
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

    return comics;
  } catch {}
  return [];
};
