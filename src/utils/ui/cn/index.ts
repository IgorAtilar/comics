import { twMerge } from 'tailwind-merge';
import { clsx, type ClassArray } from 'clsx';

export const cn = (...args: ClassArray) => twMerge(clsx(...args));
