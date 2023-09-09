import { useRef } from 'react';
import { cn } from '../../../utils/ui';
import { MIN_SEARCH_LENGTH, MAX_SEARCH_LENGTH } from '../../../consts';

export type SearchBarProps = {
  className?: string;
  onSubmit?: (search: string) => void;
};

export const SearchBar = ({
  onSubmit = () => {},
  className
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = inputRef.current?.value.trim() ?? '';

    const isSearchValid =
      search.length >= MIN_SEARCH_LENGTH && search.length <= MAX_SEARCH_LENGTH;

    if (!isSearchValid) return;

    onSubmit?.(search);

    inputRef.current?.blur();

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSearch}
      className={cn(
        'flex items-center gap-x-1 justify-between w-full bg-comedy rounded-[2rem] px-3 py-2 focus-within:ring-2',
        className
      )}>
      <input
        type="text"
        role="searchbox"
        ref={inputRef}
        className="w-full text-base text-fantasy placeholder-action bg-transparent border-none focus:ring-0 focus:border-transparent outline-none caret-action"
        placeholder="Search for a comic"
        minLength={MIN_SEARCH_LENGTH}
        maxLength={MAX_SEARCH_LENGTH}
        required
      />
      <button
        type="submit"
        className="p-1 rounded-full focus:outline-none focus:ring-2"
        title="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className="w-5 h-5 text-action fill-current"
          viewBox="0 0 256 256">
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      </button>
    </form>
  );
};
