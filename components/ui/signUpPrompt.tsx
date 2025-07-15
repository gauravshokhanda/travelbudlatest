'use client';

import Link from 'next/link';

export default function SignupPrompt() {
  return (
    <p className="text-center text-sm text-gray-600 mt-6">
      Don't have an account?{' '}
      <Link href="/register" className="text-primary font-medium hover:underline">
        Sign Up
      </Link>
    </p>
  );
}