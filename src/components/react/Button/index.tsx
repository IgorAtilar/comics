import { type ComponentProps } from 'react';
import { cn } from '@/utils/ui';

const BUTTON_STYLE =
  'p-3 bg-fantasy text-drama text-sm rounded-3xl w-full text-center leading-4 focus:outline-none focus:ring-2';

export const Button = ({
  className,
  ...htmlProps
}: ComponentProps<'button'>) => (
  <button className={cn(BUTTON_STYLE, className)} {...htmlProps} />
);

export const ButtonLink = ({
  className,
  ...htmlProps
}: ComponentProps<'a'>) => (
  <a className={cn(BUTTON_STYLE, className)} {...htmlProps} />
);
