import { useState } from 'react';
import type { Comic } from '@/infra/api/types';
import { addToCart } from '@/infra/stores/cart';
import { AddToCartComponent } from './component';

type AddToCartProps = {
  className?: string;
  comic: Comic;
};

let interval: NodeJS.Timeout | null = null;

export const AddToCart = ({ className, comic }: AddToCartProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleShowSuccess = () => {
    setShowSuccess(true);

    if (interval) {
      clearInterval(interval);
    }

    interval = setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const handleAddToCart = () => {
    addToCart(comic);

    handleShowSuccess();
  };

  return (
    <AddToCartComponent
      className={className}
      onAddToCart={handleAddToCart}
      showSuccess={showSuccess}
    />
  );
};
