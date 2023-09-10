type PaginationItemProps = {
  isCurrentPage?: boolean;
  page: number;
  getNextPageUrl: (page: number) => string;
};

export const PaginationItem = ({
  isCurrentPage = false,
  getNextPageUrl,
  page
}: PaginationItemProps) => {
  if (isCurrentPage) {
    return (
      <a className="bg-action text-drama text-lg w-7 h-7 flex items-center justify-center rounded focus:outline-none focus:ring-2">
        {page}
      </a>
    );
  }

  return (
    <a
      title={`Go to page ${page}`}
      className="text-fantasy text-lg w-7 h-7 flex items-center justify-center rounded focus:outline-none focus:ring-2"
      href={getNextPageUrl(page)}>
      {page}
    </a>
  );
};
