import { formatPrice } from '../../utils/strings';
import Minus from '../../assets/icons/minus.svg';
import Plus from '../../assets/icons/plus.svg';
import Trash from '../../assets/icons/trash.svg';

export type CartItemProps = {
  title: string;
  price: number;
  quantity: number;
  cover: string;
  url: string;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const CartItem = ({
  cover,
  onDecrement,
  onIncrement,
  onRemove,
  price,
  quantity,
  title,
  url
}: CartItemProps) => {
  const total = price * quantity;

  return (
    <li className="flex flex-col w-full items-center">
      <div className="flex w-full justify-between items-center mb-2 gap-x-4">
        <div>
          <a
            href={url}
            className="mb-2 focus:outline-none focus:ring-2"
            target="_blank"
            rel="noreferrer">
            <h3 className="font-heading text-action md:text-2xl">{title}</h3>
          </a>
          <span className="md:text-lg">{formatPrice(price)}</span>
        </div>
        <button
          className="focus:outline-none focus:ring-2"
          title="Remove from cart"
          onClick={onRemove}>
          <img src={Trash.src} className="w-6 h-6" />
        </button>
      </div>
      <a
        href={url}
        className="mb-2 focus:outline-none focus:ring-2"
        target="_blank"
        rel="noreferrer">
        <img
          className="w-64 aspect-auto object-cover"
          src={cover}
          alt={`Cover of ${title}`}
        />
      </a>
      <div className="flex w-full gap-2 justify-between items-center">
        <div className="flex items-center justify-between border border-action rounded-sm">
          <button
            className="flex justify-center items-center focus:outline-none focus:ring-2 w-8 h-8"
            title="decrement quantity"
            onClick={onDecrement}>
            <img src={Minus.src} className="w-4 h-4" />
          </button>
          <span
            className="border-r border-l border-action p-1 min-w-[2rem] h-8 text-center font-bold"
            title="quantity">
            {quantity}
          </span>
          <button
            className="flex justify-center items-center focus:outline-none focus:ring-2 w-8 h-8"
            title="increment quantity"
            onClick={onIncrement}>
            <img src={Plus.src} className="w-4 h-4" />
          </button>
        </div>
        <div>
          Total: <span>{formatPrice(total)}</span>
        </div>
      </div>
    </li>
  );
};
