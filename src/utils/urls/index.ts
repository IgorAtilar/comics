export const getSearchUrl = ({
  query,
  page = 1
}: {
  query: string;
  page?: number;
}) => `/search?q=${query}&page=${page}`;

export const getComicUrl = ({ id }: { id: string }) => `/comic/${id}`;

export const getCartUrl = () => '/cart';
