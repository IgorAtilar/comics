import { useStore } from '@nanostores/react';
import { toJpeg, toBlob } from 'html-to-image';
import { $cart } from '../../../infra/stores/cart';
import { Button, ButtonLink } from '..';
import { getBaseURL, getSearchUrl } from '../../../utils/urls';
import { useEffect, useRef, useState } from 'react';

const getCartLevelByTotal = (total: number) => {
  if (total < 100) {
    return 'Batman level';
  }

  if (total < 200) {
    return 'Wolverine level';
  }

  if (total < 300) {
    return 'Hulk level';
  }

  return 'Superman level';
};

const getCartLevelEmojiByTotal = (total: number) => {
  if (total < 100) {
    return '🦇';
  }

  if (total < 200) {
    return '🐺';
  }

  if (total < 300) {
    return '👊';
  }

  return '🦸';
};

export const SuccessPage = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const [hasShareApi, setHasShareApi] = useState(false);
  const { items, count } = useStore($cart);

  const comics = Array.from(items.values());

  const total = comics.reduce((acc, comic) => {
    const price = comic?.price ?? 0;
    return acc + price * (comic.quantity ?? 0);
  }, 0);

  useEffect(() => {
    setHasShareApi(!!navigator.share);
  }, []);

  const handleShare = async () => {
    if (!navigator.share) {
      return;
    }

    if (!cartRef.current) {
      return;
    }

    const url = getBaseURL();

    toBlob(cartRef.current)
      .then((blob) => {
        if (!blob) return;

        const file = new File([blob], 'cart.jpeg', {
          type: 'image/jpeg'
        });

        navigator
          .share({
            title: 'Comics!',
            text: 'Check out my comics cart!',
            url,
            files: [file]
          })
          .then()
          .catch();
      })
      .catch();
  };

  const handleDownload = () => {
    if (!cartRef.current) return;

    void toJpeg(cartRef.current).then((dataUrl) => {
      const link = document.createElement('a');
      const currentTime = new Date().getTime();
      link.download = `cart-${currentTime}.jpeg`;

      link.href = dataUrl;
      link.target = '_blank';

      link.click();
    });
  };

  const handleButtonClick = () => {
    if (hasShareApi) {
      handleShare();
      return;
    }
    handleDownload();
  };

  const shareTitle = `We can&apos;t send you anything, but you can share your cart with your
          friends :)`;

  const downloadTitle = `We can't send you anything, but you can download your cart image :)`;

  const buttonTitle = hasShareApi ? 'Share' : 'Download';

  if (!count) {
    return (
      <div className="flex flex-col gap-2 items-center h-screen">
        <h1 className="font-heading text-action text-5xl mb-2 text-center mt-32">
          Your cart is empty :(
        </h1>
        <p className="text-action text-lg">
          Add some products to your cart and come back here
        </p>
        <ButtonLink
          href={getSearchUrl({
            query: 'spider'
          })}
          className="md:max-w-md mt-4">
          Try to search for &quot;spider&quot;
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="font-heading text-action text-5xl mb-2 text-center">
        Success! 🎉
      </h1>
      <div>
        <p className="text-action text-lg text-center mb-4">
          {hasShareApi ? shareTitle : downloadTitle}
        </p>
      </div>
      <div ref={cartRef} className="bg-adventure rounded">
        <h3 className="font-heading text-action text-2xl text-center">
          My Cart
        </h3>
        <p className="text-action text-lg text-center mb-2">
          {getCartLevelByTotal(total)} {getCartLevelEmojiByTotal(total)}
        </p>
        <ul className="flex w-full items-center p-4 justify-center gap-4 md:gap-8 md:max-w-4x flex-wrap">
          {comics.map((comic) => (
            <li key={comic.id}>
              <img
                src={comic.thumbnail}
                alt={comic.title}
                className="w-24 h-24 rounded-full object-cover hover:opacity-75 cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center mt-4">
        <Button onClick={handleButtonClick}>{buttonTitle}</Button>
      </div>
    </div>
  );
};
