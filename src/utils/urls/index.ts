export const getSearchUrl = ({
  query,
  page
}: {
  query: string;
  page?: number;
}) => `/search?q=${query}${page ? `&page=${page}` : ''}`;

export const getComicUrl = ({ id }: { id: string }) => `/comic?id=${id}`;

export const getCartUrl = () => '/cart';
