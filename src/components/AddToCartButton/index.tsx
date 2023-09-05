import { Button } from '..';
import toast, { Toaster } from 'react-hot-toast';
import type { Comic } from '../../infra/api/types/Comic';
import { addToCart } from '../../infra/stores/cart';

type AddToCartButtonProps = {
  className?: string;
  comic: Comic;
};

const notify = () => toast.success('Added to cart!');

export const AddToCartButton = ({ className, comic }: AddToCartButtonProps) => {
  return (
    <>
      <Button
        className={className}
        onClick={() => {
          addToCart(comic);
          notify();
        }}>
        Add to cart
      </Button>
      <Toaster />
    </>
  );
};
