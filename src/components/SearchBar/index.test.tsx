import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, vi } from 'vitest';
import { MIN_SEARCH_LENGTH } from '../../consts';
import { SearchBar } from './component';

describe('Components: SearchBar', () => {
  it(`should not call the onSubmit function when the input value is less than ${MIN_SEARCH_LENGTH}`, async () => {
    const handleSubmit = vi.fn();
    render(<SearchBar onSubmit={handleSubmit} />);

    const input = screen.getByRole('searchbox');

    const searchValue = 'a'.repeat(MIN_SEARCH_LENGTH - 1);

    const user = userEvent.setup();

    await user.type(input, `${searchValue}{enter}`);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it(`should call the onSubmit function when the input value is greater than ${MIN_SEARCH_LENGTH}`, async () => {
    const handleSubmit = vi.fn();
    render(<SearchBar onSubmit={handleSubmit} />);
    const input = screen.getByRole('searchbox');

    const searchValue = 'a'.repeat(MIN_SEARCH_LENGTH);

    const user = userEvent.setup();

    await user.type(input, `${searchValue}{enter}`);

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should clear the input value after submitting', async () => {
    const handleSubmit = vi.fn();
    render(<SearchBar onSubmit={handleSubmit} />);
    const input = screen.getByRole('searchbox');

    const searchValue = 'a'.repeat(MIN_SEARCH_LENGTH);

    const user = userEvent.setup();

    await user.type(input, `${searchValue}{enter}`);

    expect(input).toHaveValue('');
  });
});
