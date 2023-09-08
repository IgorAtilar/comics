import { type ComponentProps } from 'react';
import { Counter } from '../Counter';
import BasketIcon from '../../assets/icons/basket.svg';
import { cn } from '../../utils/ui';
import { getCartUrl } from '../../utils/urls';

export type BasketProps = ComponentProps<'a'> & {
  count?: number;
};

export const Basket = ({ className, count = 0, ...htmlProps }: BasketProps) => (
  <a
    href={getCartUrl()}
    className={cn(
      'relative flex items-center justify-center focus:outline-none focus:ring-2',
      className
    )}
    {...htmlProps}>
    <img src={BasketIcon.src} alt="basket" className="h-6 w-6 text-action " />
    <Counter count={count} className="absolute -top-3 -right-3" />
  </a>
);
