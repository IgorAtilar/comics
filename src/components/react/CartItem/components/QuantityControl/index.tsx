type QuantityControlProps = {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

export const QuantityControl = ({
  onDecrement,
  onIncrement,
  quantity
}: QuantityControlProps) => (
  <div className="flex items-center justify-between border border-action rounded-sm">
    <button
      className="flex justify-center items-center focus:outline-none focus:ring-2 w-8 h-8"
      title="decrement quantity"
      onClick={onDecrement}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        className="w-4 h-4 text-action fill-current"
        viewBox="0 0 256 256">
        <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
      </svg>
    </button>
    <span
      className="border-r border-l border-action p-1 min-w-[2rem] h-8 text-center font-bold"
      title="quantity">
      {quantity}
    </span>
    <button
      className="flex justify-center items-center focus:outline-none focus:ring-2 w-8 h-8 "
      title="increment quantity"
      onClick={onIncrement}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        className="w-4 h-4 text-action fill-current"
        viewBox="0 0 256 256">
        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
      </svg>
    </button>
  </div>
);
