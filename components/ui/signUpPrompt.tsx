'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';

export default function SignupPrompt() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignupClick = () => {
    setLoading(true);
    router.push('/register');
  };

  return (
    <p className="text-center text-sm text-gray-600 mt-6 flex justify-center items-center gap-2">
      Don&rsquo;t have an account?
      <button
        onClick={handleSignupClick}
        disabled={loading}
        className="text-primary ml-1 font-medium hover:underline disabled:opacity-60 flex items-center gap-1"
      >
        {loading && <Spinner />}
        {loading ? '' : 'Sign Up'}
      </button>
    </p>
  );
}
