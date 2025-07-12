'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', hasError = false, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(
          'w-full h-12 px-4 py-2 rounded-xl border text-base outline-none transition-colors',
          hasError
            ? 'border-red-500 focus:border-primary focus:ring-2 focus:ring-primary'
            : 'border-accent focus:border-primary focus:ring-2 focus:ring-primary',
          className
        )}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
