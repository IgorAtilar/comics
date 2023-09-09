import type { Comic } from '../../types/Comic';
import { createMarvelApiUrl } from '../../helpers/createMarvelApiUrl';
import type {
  SearchComicsRawResponse,
  SearchComicsResponse
} from '../../types/SearchComic';
import { ComicModel, ComicWithCharactersModel } from '../../models/Comic';
import { getDefaultHeaders } from '../../helpers/getDefaultHeaders';
import type {
  Character,
  ResponseComicCharactersResponse
} from '../../types/Character';
import { CharacterModel } from '../../models/Character';
import {
  getDefaultSearchLimit,
  getComicSpotlightUrl,
  getLatestReleasesUrl,
  getSearchComicsUrl
} from './helpers';

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
      const { price } = comic.prices.find(
        (price) => price.type === 'printPrice'
      ) ?? { price: 0 };

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

  const result: SearchComicsResponse = {
    total: 0,
    comics: [],
    limit
  };

  return result;
};

export const getComicCharacters = async ({ id }: { id: string }) => {
  try {
    const data = await fetch(
      createMarvelApiUrl({ endpoint: `comics/${id}/characters` }),
      {
        headers: getDefaultHeaders()
      }
    );

    const response: ResponseComicCharactersResponse = await data.json();

    const {
      data: { results }
    } = response;

    const characters = results.reduce<Character[]>((acc, character) => {
      const result = CharacterModel.safeParse(character);

      if (result.success) {
        const { data } = result;
        acc.push(data);
      }

      return acc;
    }, []);

    return { characters };
  } catch {
    return { characters: [] };
  }
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

export const getComicWithCharactersById = async ({ id }: { id: string }) => {
  try {
    const [comic, { characters }] = await Promise.all([
      getComicById({ id }),
      getComicCharacters({ id })
    ]);

    const comicWithCharacters = {
      ...comic,
      characters
    };

    const result = ComicWithCharactersModel.safeParse(comicWithCharacters);

    if (result.success) {
      const { data } = result;
      return data;
    }
  } catch {}
};
