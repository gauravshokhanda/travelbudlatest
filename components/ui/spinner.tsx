'use client';

import { Loader2 } from 'lucide-react'; 
import React from 'react';

export default function Spinner() {
  return (
    <Loader2 className="animate-spin w-4 h-4 mr-2" />
  );
}
