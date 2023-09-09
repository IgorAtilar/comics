import { Button } from '..';
import type { Comic } from '../../../infra/api/types/Comic';
import { addToCart } from '../../../infra/stores/cart';
import { showToast } from '../../../infra/stores/toast';

type AddToCartButtonProps = {
  className?: string;
  comic: Comic;
};

export const AddToCartButton = ({ className, comic }: AddToCartButtonProps) => {
  const handleAddToCart = () => {
    addToCart(comic);
    showToast({
      type: 'success',
      message: `${comic.title} added to cart!`
    });
  };

  return (
    <Button className={className} onClick={handleAddToCart}>
      Add to cart
    </Button>
  );
};
