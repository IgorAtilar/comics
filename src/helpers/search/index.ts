export const getSearchUrl = ({
  query,
  page
}: {
  query: string;
  page?: number;
}) => `/search?q=${query}${page ? `&page=${page}` : ''}`;
