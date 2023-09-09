import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $toast, hideToast } from '../../infra/stores/toast';
import { cn } from '../../utils/ui';

export const AUTO_CLOSE_TOAST_DELAY = 3000;

let closeInterval: NodeJS.Timeout;

export const Toaster = () => {
  const toast = useStore($toast);

  useEffect(() => {
    if (toast) {
      closeInterval = setTimeout(() => {
        hideToast();
      }, AUTO_CLOSE_TOAST_DELAY);
    }

    return () => {
      clearTimeout(closeInterval);
    };
  }, [toast]);

  return (
    <div
      role="alert"
      aria-hidden={!toast.show}
      className={cn(
        'fixed z-50 text-white flex w-full justify-start items-center max-w-5xl p-3 gap-x-2 rounded-b-md text-lg transition-all duration-700',
        {
          'bg-green-500': toast.type === 'success',
          'bg-red-500': toast.type === 'error',
          'max-h-14': toast.show,
          'max-h-0': !toast.show,
          'opacity-100': toast.show,
          'opacity-0': !toast.show
        }
      )}>
      {toast.type === 'error' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className={cn('w-6 h-6 fill-current transition-all duration-700', {
            'opacity-100': toast.show,
            'opacity-0': !toast.show
          })}
          viewBox="0 0 256 256">
          <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className={cn('w-6 h-6 fill-current transition-all duration-700', {
            'opacity-100': toast.show,
            'opacity-0': !toast.show
          })}
          viewBox="0 0 256 256">
          <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z"></path>
        </svg>
      )}
      <span
        className={cn('transition-all duration-700', {
          'opacity-100': toast.show,
          'opacity-0': !toast.show
        })}>
        {toast.message}
      </span>
    </div>
  );
};
