import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

import { PaginationItem } from '.';

describe('Components: PaginationItem', () => {
  const defaultProps = {
    isCurrentPage: false,
    page: 1,
    getNextPageUrl: (page: number) => `?page=${page}`
  };
  it('should render the page number', () => {
    render(<PaginationItem {...defaultProps} page={2} />);
    const page = screen.getByText('2');
    expect(page).toBeInTheDocument();
  });

  it('should render the current page link without href', () => {
    render(<PaginationItem {...defaultProps} isCurrentPage page={2} />);
    const page = screen.getByText('2');
    expect(page).toBeInTheDocument();
    expect(page).not.toHaveAttribute('href');
  });

  it('should render the next page link with href', () => {
    const href = defaultProps.getNextPageUrl(2);
    render(<PaginationItem {...defaultProps} page={2} />);
    const page = screen.getByText('2');
    expect(page).toBeInTheDocument();
    expect(page).toHaveAttribute('href', href);
  });
});
