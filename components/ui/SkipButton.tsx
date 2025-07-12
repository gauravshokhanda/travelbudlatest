'use client';

import Link from 'next/link';

export default function SkipButton() {
  return (
    <div className="absolute top-6 right-6">
      <Link
        href="/"
        className="text-sm text-[#1b88d7] hover:underline transition-all"
      >
        Skip
      </Link>
    </div>
  );
}
