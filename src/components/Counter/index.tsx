import { cn } from '../../utils/ui';

export const Counter = ({
  count = 0,
  className
}: {
  count?: number;
  className?: string;
}) => {
  const value = count > 9 ? '9+' : count;

  if (!count) return;

  return (
    <div
      className={cn(
        'bg-action text-white rounded-full w-6 h-6 text-xs flex justify-center items-center',
        className
      )}>
      {value}
    </div>
  );
};
