import { Button } from '..';
import type { Comic } from '../../infra/api/types/Comic';
import { addToCart } from '../../infra/stores/cart';

type AddToCartButtonProps = {
  className?: string;
  comic: Comic;
};

export const AddToCartButton = ({ className, comic }: AddToCartButtonProps) => {
  return (
    <Button
      className={className}
      onClick={() => {
        addToCart(comic);
      }}>
      Add to cart
    </Button>
  );
};
