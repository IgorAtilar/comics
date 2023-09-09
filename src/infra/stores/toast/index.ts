import { map, action } from 'nanostores';

export type Toast = {
  message?: string;
  type?: 'success' | 'error';
  show: boolean;
};

export const $toast = map<Toast>();

export const showToast = action(
  $toast,
  'showToast',
  (store, toast: Omit<Toast, 'show'>) => {
    store.set({
      ...toast,
      show: true
    });
  }
);

export const hideToast = action($toast, 'hideToast', (store) => {
  store.set({
    message: undefined,
    type: undefined,
    show: false
  });
});
