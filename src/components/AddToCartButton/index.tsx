import { Button } from '..';
import type { Comic } from '../../infra/api/types/Comic';

type AddToCartButtonProps = {
  className?: string;
  comic: Comic;
};

export const AddToCartButton = ({ className, comic }: AddToCartButtonProps) => {
  return (
    <Button className={className} onClick={() => {}}>
      Add to cart
    </Button>
  );
};
