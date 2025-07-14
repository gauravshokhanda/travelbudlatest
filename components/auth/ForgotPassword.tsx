'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PrimaryButton from '@/components/PrimaryButton';
import { Input } from '@/components/ui/input';

interface Props {
  onSubmit?: (email: string) => void;
  onCancel?: () => void;
}

export default function ForgotPassword({ onSubmit, onCancel }: Props) {
  const [email, setEmail] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-6 py-10">
      <div className="w-full max-w-lg flex-1 flex flex-col">
        {/* Logo */}
        <Image
          src="/images/TravelBud.png"
          alt="TravelBud Logo"
          width={220}
          height={80}
          className="mx-auto mb-8"
        />

        {/* Title */}
        <h2 className="text-4xl font-bold text-black font-poppins text-center mb-6">
          Forgot password
        </h2>
        <p className="text-center font-poppins text-text text-base mb-6">
          Provide your account&apos;s email for which you want to reset your password
        </p>

        {/* Email Input */}
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block text-sm text-black font-medium mb-2"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            hasError={!email.includes('@') && email.length > 0}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-auto">
          <PrimaryButton outline className="flex-1" onClick={onCancel}>
            Cancel
          </PrimaryButton>
          <PrimaryButton className="flex-1" onClick={() => {}}>
            Reset
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
