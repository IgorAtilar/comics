import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { QuantityControl } from '.';

describe('Components: QuantityControl', () => {
  const defaultProps = {
    quantity: 1,
    onDecrement: () => {},
    onIncrement: () => {}
  };
  it('should render the quantity value', () => {
    render(<QuantityControl {...defaultProps} quantity={20} />);
    const quantity = screen.getByText('20');
    expect(quantity).toBeInTheDocument();
  });

  it('should call onIncrement when the increment button is clicked', async () => {
    const onIncrement = vi.fn();
    render(
      <QuantityControl
        {...defaultProps}
        quantity={1}
        onIncrement={onIncrement}
      />
    );
    const incrementButton = screen.getByTitle('increment quantity');
    const user = userEvent.setup();
    await user.click(incrementButton);
    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it('should call onDecrement when the decrement button is clicked', async () => {
    const onDecrement = vi.fn();
    render(
      <QuantityControl
        {...defaultProps}
        quantity={1}
        onDecrement={onDecrement}
      />
    );
    const decrementButton = screen.getByTitle('decrement quantity');
    const user = userEvent.setup();
    await user.click(decrementButton);
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });
});
