import { Button } from '../Button';
import { cn } from '@/utils/ui';

type AddToCartButtonProps = {
  className?: string;
  onAddToCart?: () => void;
  showSuccess?: boolean;
};

export const AddToCartComponent = ({
  className,
  onAddToCart,
  showSuccess = false
}: AddToCartButtonProps) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Button onClick={onAddToCart}>Add to cart</Button>
      <div
        role="alert"
        aria-hidden={!showSuccess}
        className={cn(
          'flex gap-2 bg-green-500 text-drama p-2 rounded transition-all duration-700',
          {
            'max-h-14': showSuccess,
            'max-h-0': !showSuccess,
            'opacity-100': showSuccess,
            'opacity-0': !showSuccess
          }
        )}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className={cn('w-6 h-6 fill-current transition-all duration-700', {
            'opacity-100': showSuccess,
            'opacity-0': !showSuccess
          })}
          viewBox="0 0 256 256">
          <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z"></path>
        </svg>
        Added to cart!
      </div>
    </div>
  );
};
