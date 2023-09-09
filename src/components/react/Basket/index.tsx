import { useStore } from '@nanostores/react';
import { $cart } from '../../../infra/stores/cart';
import { Basket, type BasketProps } from './component';

export const EnhancedBasket = ({ ...props }: Omit<BasketProps, 'count'>) => {
  const { count } = useStore($cart);

  return <Basket count={count} {...props} />;
};
