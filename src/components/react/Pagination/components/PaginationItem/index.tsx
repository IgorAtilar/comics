type PaginationItemProps = {
  isCurrent?: boolean;
  number: number;
  getUrl: (page: number) => string;
};

export const PaginationItem = ({
  isCurrent = false,
  getUrl,
  number
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <a className="bg-action text-drama text-lg w-7 h-7 flex items-center justify-center rounded focus:outline-none focus:ring-2">
        {number}
      </a>
    );
  }

  return (
    <a
      title={`Go to page ${number}`}
      className="text-fantasy text-lg w-7 h-7 flex items-center justify-center rounded focus:outline-none focus:ring-2"
      href={getUrl(number)}>
      {number}
    </a>
  );
};
