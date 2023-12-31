import { formatPrice } from '@/utils/strings';
import { QuantityControl } from './components/QuantityControl';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            className="w-6 h-6 text-fantasy fill-current"
            viewBox="0 0 256 256">
            <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
          </svg>
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
        <QuantityControl
          quantity={quantity}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
        />
        <div>
          Total: <span>{formatPrice(total)}</span>
        </div>
      </div>
    </li>
  );
};
