import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

import { Counter } from '.';

describe('Components: Counter', () => {
  it('should not render if count is not provided or is equal to 0', () => {
    const { rerender } = render(<Counter />);
    expect(screen.queryByTestId('counter')).toBeNull();

    rerender(<Counter count={0} />);
    expect(screen.queryByTestId('counter')).toBeNull();
  });

  it('should render the count value if it is less than 9', () => {
    render(<Counter count={1} />);
    const counter = screen.getByText('1');
    expect(counter).toBeInTheDocument();
  });

  it('should render 9+ if the count value is greater than 9', () => {
    render(<Counter count={10} />);
    const counter = screen.getByText('9+');
    expect(counter).toBeInTheDocument();
  });
});
