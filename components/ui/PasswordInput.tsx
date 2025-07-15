'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

export default function PasswordInput({
  label,
  required,
  className = '',
  error,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mb-6 w-full px-1">
      {label && (
        <label className="block text-sm font-medium text-black mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          className={cn(
            'w-full h-12 px-4 pr-12 rounded-xl border text-base outline-none transition-colors focus:ring-2 focus:ring-primary',
            error ? 'border-red-500' : 'border-accent',
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-black"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
