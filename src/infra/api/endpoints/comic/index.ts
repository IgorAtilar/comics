import type { Comic } from '../../types/Comic';
import { createMarvelApiUrl } from '../../helpers/createMarvelApiUrl';
import type {
  SearchComicsRawResponse,
  SearchComicsResponse
} from '../../types/SearchComic';
import { ComicModel } from '../../models/Comic';
import { getDefaultHeaders } from '../../helpers/getDefaultHeaders';

const DEFAULT_SEARCH_LIMIT = 20;

const getComicSpotlightUrl = () => {
  const comicsUrl = createMarvelApiUrl({ endpoint: 'comics' });

  comicsUrl.searchParams.append('orderBy', '-focDate');
  comicsUrl.searchParams.append('limit', '5');

  return comicsUrl;
};

const getLatestReleasesUrl = (limit = 8) => {
  const comicsUrl = createMarvelApiUrl({ endpoint: 'comics' });

  comicsUrl.searchParams.append('dateDescriptor', 'lastWeek');

  if (limit) {
    comicsUrl.searchParams.append('limit', limit.toString());
  }

  return comicsUrl;
};

const getSearchComicsUrl = ({
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
      const result = ComicModel.safeParse(comic);

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
      const result = ComicModel.safeParse(comic);

      if (result.success) {
        const { data } = result;
        acc.push(data);
      }

      return acc;
    }, []);

    return comics;
  } catch {
    return [];
  }
};

export const searchComics = async ({
  limit = DEFAULT_SEARCH_LIMIT,
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
      const result = ComicModel.safeParse(comic);

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

  const result: SearchComicsResponse = {
    total: 0,
    comics: [],
    limit
  };

  return result;
};

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

    const result = ComicModel.safeParse(comic);

    if (result.success) {
      const { data } = result;
      return data;
    }
  } catch {}
};
