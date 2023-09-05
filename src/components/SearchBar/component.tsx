import { useRef, useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { cn } from '../../utils/ui';
import { MIN_SEARCH_LENGTH, MAX_SEARCH_LENGTH } from '../../consts';

export type SearchBarProps = {
  className?: string;
  getSearchUrl?: (search: string) => string;
};

export const SearchBar = ({ getSearchUrl, className }: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    const isSearchValid =
      search.length >= MIN_SEARCH_LENGTH && search.length <= MAX_SEARCH_LENGTH;

    if (!isSearchValid) {
      e.preventDefault();

      return;
    }

    inputRef.current?.blur();

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <form
      role="search"
      action={getSearchUrl?.(search.trim())}
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
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        type="submit"
        className="p-1 rounded-full focus:outline-none focus:ring-2">
        <MagnifyingGlass className="w-5 h-5 text-action" />
      </button>
    </form>
  );
};
