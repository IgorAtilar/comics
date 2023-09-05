import { cn } from '../../utils/ui';
import { formatPrice } from '../../utils/strings';

export type CardProps = {
  image: string;
  title: string;
  price: number;
  url: string;
  className?: string;
};

export const Card = ({ className, image, title, price }: CardProps) => {
  return (
    <a className={cn('flex w-64 md:w-44 cursor-pointer', className)}>
      <div className="flex flex-col gap-y-1">
        <img
          src={image}
          alt={title}
          className="w-64 h-80 md:w-44 md:h-64 object-cover"
        />
        <div>
          <h3 className="text-action font-heading text-sm">{title}</h3>
          <p className="text-fantasy text-sm">{formatPrice(price)}</p>
        </div>
      </div>
    </a>
  );
};
