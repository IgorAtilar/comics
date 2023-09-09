import { createMarvelApiUrl } from '../../../helpers/createMarvelApiUrl';
import type { RawComic } from '../../../types/Comic';

export const getDefaultSearchLimit = () => 20;

export const getComicSpotlightUrl = () => {
  const comicsUrl = createMarvelApiUrl({ endpoint: 'comics' });

  comicsUrl.searchParams.append('orderBy', '-focDate');
  comicsUrl.searchParams.append('limit', '5');

  return comicsUrl;
};

export const getLatestReleasesUrl = (limit = 8) => {
  const comicsUrl = createMarvelApiUrl({ endpoint: 'comics' });

  comicsUrl.searchParams.append('dateDescriptor', 'lastWeek');

  if (limit) {
    comicsUrl.searchParams.append('limit', limit.toString());
  }

  return comicsUrl;
};

export const getSearchComicsUrl = ({
  limit,
  offset,
  query
}: {
  query: string;
  limit?: number;
  offset?: number;
}) => {
  const comicsUrl = createMarvelApiUrl({ endpoint: 'comics' });
  comicsUrl.searchParams.append('titleStartsWith', query);
  if (limit) {
    comicsUrl.searchParams.append('limit', limit.toString());
  }
  if (offset) {
    comicsUrl.searchParams.append('offset', offset.toString());
  }

  return comicsUrl;
};

export const getRawComicPrice = (prices: RawComic['prices']) => {
  const price = prices.find((price) => price.type === 'printPrice')?.price;

  return price ?? 0;
};
