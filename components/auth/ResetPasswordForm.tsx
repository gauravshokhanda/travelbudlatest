'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PasswordInput from '@/components/ui/PasswordInput';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import API from '@/lib/axios';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get('email') || '';
  const resetPasswordToken = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setSuccess(false);
      return;
    }

    setLoading(true);
    setMessage('');
    setSuccess(null);

    try {
      const res = await API.post('/user/reset-password', {
        email,
        resetPasswordToken,
        password,
      });

      if (res.data.success) {
        setSuccess(true);
        setMessage(res.data.message || 'Password reset successfully.');

        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } else {
        setSuccess(false);
        setMessage(res.data.message || 'Something went wrong.');
      }
    } catch (err: any) {
      setSuccess(false);
      setMessage(err?.response?.data?.message || 'Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col px-10 py-12 max-w-xl">
      <Image
        src='/images/TravelBud.png'
        alt="TravelBud Logo"
        width={240}
        height={80}
        className="mb-8 mx-auto"
      />
      <h2 className="text-4xl font-bold text-black text-center mb-6">Reset Password</h2>

      <ul className="text-sm text-gray-600 list-disc pl-5 mb-10 space-y-1">
        <li>Password must be at least 8 characters long.</li>
        <li>Password must contain at least one upper case.</li>
        <li>One lower case letter.</li>
        <li>Password must contain at least one number or special character.</li>
      </ul>

      <PasswordInput
        label="New Password"
        required
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <PasswordInput
        label="Confirm New Password"
        required
        placeholder="Re-enter new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {message && (
        <p className={`mt-4 text-sm ${success ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <div className="flex gap-6 pt-8">
        <SecondaryButton className="flex-1" onClick={() => router.back()} disabled={loading}>
          Cancel
        </SecondaryButton>
        <PrimaryButton className="flex-1" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </PrimaryButton>
      </div>
    </div>
  );
}

