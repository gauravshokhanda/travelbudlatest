'use client';

import React from 'react';
import { cn } from '@/lib/utils'; // or use className manually if cn doesn't exist

interface OtpInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  inputRef?: (el: HTMLInputElement | null) => void;
}

export default function OtpInput({
  value,
  onChange,
  onKeyDown,
  hasError = false,
  inputRef,
}: OtpInputProps) {
  return (
    <input
      ref={inputRef}
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`w-12 h-12 text-center text-lg rounded-lg shadow-sm outline-none transition-all ${
  hasError
    ? 'border-2 border-red-500 focus:ring-red-500'
    : 'border border-gray-300 focus:ring-2 focus:ring-primary'
}`}
    />
  );
}
