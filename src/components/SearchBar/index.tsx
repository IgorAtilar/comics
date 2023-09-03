import { MagnifyingGlass } from '@phosphor-icons/react';

export const SearchBar = () => {
  return (
    <form>
      <input type="text" />
      <button type="button">
        <MagnifyingGlass />
      </button>
    </form>
  );
};
