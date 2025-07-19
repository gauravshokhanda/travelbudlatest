'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';

interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className = 'w-4 h-4 mr-2' }: SpinnerProps) {
  return <Loader2 className={`animate-spin ${className}`} />;
}
