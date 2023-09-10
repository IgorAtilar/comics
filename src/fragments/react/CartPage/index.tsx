import { useStore } from '@nanostores/react';
import {
  $cart,
  addQuantity,
  removeQuantity,
  removeFromCart
} from '@/infra/stores/cart';
import { getComicUrl, getSuccesUrl } from '@/utils/urls';
import { formatPrice } from '@/utils/strings';
import { ButtonLink, CartItem } from '@/components';

export const CartPage = () => {
  const { count, items } = useStore($cart);

  const comics = Array.from(items.values());

  const countText = count === 1 ? '1 item' : `${count} items`;

  const total = comics.reduce((acc, comic) => {
    const price = comic?.price ?? 0;
    return acc + price * (comic.quantity ?? 0);
  }, 0);

  if (!count) {
    return (
      <div className="flex flex-col w-full items-center justify-center mt-64">
        <h1 className="text-2xl text-center">Your cart is empty :(</h1>
        <p className="text-action text-center ">
          Start adding some comics to your cart! 🚀
        </p>
        <ButtonLink href="/" className="md:max-w-md mt-4">
          Go to home
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-hidden">
      <h4 className="text-lg mb-3">
        {countText} | {formatPrice(total)}
      </h4>
      <ul className="flex flex-col w-full items-center justify-center gap-4 md:gap-8 md:max-w-4x mb-4">
        {comics.map((comic) => (
          <CartItem
            key={comic.id}
            cover={comic.thumbnail ?? ''}
            title={comic.title ?? ''}
            price={comic?.price ?? 0}
            onDecrement={() => {
              removeQuantity(comic.id ?? '');
            }}
            onIncrement={() => {
              addQuantity(comic.id ?? '');
            }}
            onRemove={() => {
              removeFromCart(comic.id ?? '');
            }}
            quantity={comic.quantity}
            url={getComicUrl({
              id: comic.id ?? ''
            })}
          />
        ))}
      </ul>

      <div className="flex flex-col w-full">
        <span className="text-action text-4xl font-heading text-left">
          Summary
        </span>
        <div className="flex flex-row w-full justify-between items-center mt-4 mb-4">
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex flex-row w-full justify-center items-center">
          <ButtonLink href={getSuccesUrl()} className="md:max-w-md">
            Checkout
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};
