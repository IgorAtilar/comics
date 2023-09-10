import { deepMap, action, onMount } from 'nanostores';
import type { Comic } from '@/infra/api/types';
import { isServer } from '@/utils/runtime';

const CART_LOCAL_STORAGE_KEY = 'comics@cart';

type ComicWithQuantity = Comic & { quantity: number };

type PersistedCart = {
  items: Record<string, ComicWithQuantity>;
  count: number;
};

type Cart = {
  items: Map<Comic['id'], ComicWithQuantity>;
  count: number;
};

export const $cart = deepMap<Cart>({ items: new Map(), count: 0 });

const parsePersistedCart = (cart: PersistedCart): Cart => {
  const { count, items } = cart;

  const parsedItems = Object.entries(items).reduce<
    Map<Comic['id'], ComicWithQuantity>
  >((acc, [key, value]) => {
    if (!key) return acc;

    acc.set(key, value);
    return acc;
  }, new Map());

  return {
    count,
    items: parsedItems
  };
};

const parseCart = (cart: Cart): PersistedCart => {
  const { count, items } = cart;

  const parsedItems = Array.from(items.entries()).reduce<
    Record<string, ComicWithQuantity>
  >((acc, [key, value]) => {
    if (!key) return acc;

    acc[key] = value;
    return acc;
  }, {});

  return {
    count,
    items: parsedItems
  };
};

const updatePersistedCart = (cart: Cart) => {
  const parsedCart = parseCart(cart);

  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(parsedCart));
};

export const addToCart = action($cart, 'addToCart', (store, comic: Comic) => {
  const { id } = comic;

  const { count, items } = store.get();

  const item = items.get(id);

  if (!item) {
    const newMap = new Map(items);

    newMap.set(id, { ...comic, quantity: 1 });

    store.setKey('items', newMap);
    store.setKey('count', count + 1);

    updatePersistedCart({
      count: count + 1,
      items: newMap
    });

    return;
  }

  const newMap = new Map(items);

  newMap.set(id, { ...item, quantity: item.quantity + 1 });

  store.setKey('items', newMap);

  updatePersistedCart({
    count,
    items: newMap
  });
});

export const removeFromCart = action(
  $cart,
  'removeFromCart',
  (store, id: Comic['id']) => {
    const { count, items } = store.get();

    const item = items.get(id);

    if (!item) return;

    const newMap = new Map(items);

    newMap.delete(id);

    store.setKey('items', newMap);
    store.setKey('count', count - 1);

    updatePersistedCart({
      count: count - 1,
      items: newMap
    });
  }
);

export const addQuantity = action(
  $cart,
  'addQuantity',
  (store, id: Comic['id']) => {
    const { items, count } = store.get();

    const item = items.get(id);

    if (!item) return;

    const newMap = new Map(items);

    newMap.set(id, { ...item, quantity: item.quantity + 1 });

    store.setKey('items', newMap);

    updatePersistedCart({
      count,
      items: newMap
    });
  }
);

export const removeQuantity = action(
  $cart,
  'removeQuantity',
  (store, id: Comic['id']) => {
    const { count, items } = store.get();

    const item = items.get(id);

    if (!item) return;

    const newMap = new Map(items);

    if (item.quantity === 1) {
      const newCount = count - 1;
      newMap.delete(id);

      store.setKey('items', newMap);
      store.setKey('count', newCount);

      updatePersistedCart({
        count: newCount,
        items: newMap
      });

      return;
    }

    newMap.set(id, { ...item, quantity: item.quantity - 1 });
    store.setKey('items', newMap);

    updatePersistedCart({
      count,
      items: newMap
    });
  }
);

onMount($cart, () => {
  if (isServer()) return;

  const saved = localStorage.getItem(CART_LOCAL_STORAGE_KEY);

  if (saved) {
    const { count, items } = parsePersistedCart(
      JSON.parse(saved) as PersistedCart
    );

    $cart.setKey('items', new Map(items));
    $cart.setKey('count', count);
  }
});
