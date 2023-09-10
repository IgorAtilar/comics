import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { AddToCartComponent } from './component';

describe('Components: AddToCart', () => {
  it('should call onAddToCart when button is clicked', async () => {
    const onAddToCart = vi.fn();
    render(<AddToCartComponent onAddToCart={onAddToCart} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('should show success message when showSuccess is true', () => {
    render(<AddToCartComponent showSuccess />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-hidden', 'false');
  });

  it('should not show success message when showSuccess is false', () => {
    render(<AddToCartComponent />);
    const alert = screen.queryByRole('alert');
    expect(alert).not.toBeInTheDocument();
  });
});
