import type { Comic } from '@/infra/api/types/Comic';
import { createMarvelApiUrl, getDefaultHeaders } from '@/infra/api/helpers';
import type {
  SearchComicsRawResponse,
  SearchComicsResponse
} from '@/infra/api/types/SearchComic';
import { ComicModel, ComicWithCharactersModel } from '@/infra/api/models/Comic';
import type {
  Character,
  ResponseComicCharactersResponse
} from '@/infra/api/types/Character';
import { CharacterModel } from '@/infra/api/models/Character';
import {
  getDefaultSearchLimit,
  getComicSpotlightUrl,
  getLatestReleasesUrl,
  getSearchComicsUrl,
  getRawComicPrice
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
