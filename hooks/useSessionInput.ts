'use client';

import { useEffect, useState } from 'react';

export function useSessionInput(key: string, initialValue = '') {
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key) || initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
