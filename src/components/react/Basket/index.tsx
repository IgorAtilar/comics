import { useStore } from '@nanostores/react';
import { $cart } from '@/infra/stores/cart';
import { BasketComponent, type BasketProps } from './component';

export const Basket = ({ ...props }: Omit<BasketProps, 'count'>) => {
  const { count } = useStore($cart);

  return <BasketComponent count={count} {...props} />;
};
