'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PrimaryButton from '@/components/PrimaryButton';
import { Input } from '@/components/ui/input';
import API from '@/lib/axios';
import { validateEmail } from '@/lib/validators';
import { useRouter } from 'next/navigation';
import { useSessionInput } from '@/hooks/useSessionInput';
import Spinner from '@/components/ui/spinner';

interface Props {
  onSubmit?: (email: string) => void;
  onCancel?: () => void;
}

export default function ForgotPassword({ onCancel }: Props) {
  const [email, setEmail] = useSessionInput('forgot_email');
  const [hasMounted, setHasMounted] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleReset = async () => {
    setTouched(true);

    const emailError = validateEmail(email);
    setError(emailError);

    if (emailError) return;

    setLoading(true);
    setMessage('');
    setSuccess(null);

    try {
      const res = await API.post('/user/forget-password', { email });

      if (res.data.success) {
        setSuccess(true);
        setMessage('OTP sent successfully. Please check your email.');
        setTimeout(() => {
          router.push(`/login/forgotPassword/verifyOtp?email=${encodeURIComponent(email)}`);
        }, 1000);
      } else {
        setSuccess(false);
        setMessage(res.data.message || 'Something went wrong.');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setSuccess(false);
      setMessage(
        err?.response?.data?.message || 'An error occurred while requesting reset.'
      );
    }
    finally {
      setLoading(false);
    }
  };

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
        <div className="mb-2">
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
            hasError={!!error && touched}
            onChange={(e) => {
              setEmail(e.target.value);
              setTouched(true);
              const err = validateEmail(e.target.value);
              setError(err);
              setSuccess(null);
              setMessage('');
            }}
            placeholder="Enter your registered email"
          />
          {touched && error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>

        {/* Message Below Input */}
        {message && (
          <p
            className={`text-sm mt-2 ${success ? 'text-green-600' : 'text-red-500'
              }`}
          >
            {message}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-6 mt-auto pt-8">
          <PrimaryButton
            outline
            className="flex-1"
            onClick={() => {
              sessionStorage.removeItem('forgot_email');
              sessionStorage.removeItem('otp_code');
              router.push('/login');
            }}
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton
            className="flex-1"
            onClick={handleReset}
            disabled={!email || !!error || loading}
          >
            <div className="flex items-center justify-center gap-2">
              {loading && <Spinner />}
              {loading ? 'Sending...' : 'Reset'}
            </div>

          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
