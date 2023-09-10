import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, vi } from 'vitest';
import { getMinSearchLength } from '@/utils/validation';
import { SearchBarComponent } from './component';

describe('Components: SearchBar', () => {
  it(`should not call the onSubmit function when the input value is less than ${getMinSearchLength()}`, async () => {
    const handleSubmit = vi.fn();
    render(<SearchBarComponent onSubmit={handleSubmit} />);

    const input = screen.getByRole('searchbox');

    const searchValue = 'a'.repeat(getMinSearchLength() - 1);

    const user = userEvent.setup();

    await user.type(input, `${searchValue}{enter}`);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it(`should call the onSubmit function when the input value is greater than ${getMinSearchLength()}`, async () => {
    const handleSubmit = vi.fn();
    render(<SearchBarComponent onSubmit={handleSubmit} />);
    const input = screen.getByRole('searchbox');

    const searchValue = 'a'.repeat(getMinSearchLength());

    const user = userEvent.setup();

    await user.type(input, `${searchValue}{enter}`);

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should clear the input value after submitting', async () => {
    const handleSubmit = vi.fn();
    render(<SearchBarComponent onSubmit={handleSubmit} />);
    const input = screen.getByRole('searchbox');

    const searchValue = 'a'.repeat(getMinSearchLength());

    const user = userEvent.setup();

    await user.type(input, `${searchValue}{enter}`);

    expect(input).toHaveValue('');
  });
});
