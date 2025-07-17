'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { Button } from '@/components/ui/button';
import API from '@/lib/axios';
import { AxiosError } from 'axios';

interface Props {
  onCancel?: () => void;
  onResend?: () => void;
  authType?: 'login' | 'register';
}

export default function OtpVerificationBox({
  onCancel,
  onResend,
  authType = 'login',
}: Props) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyClick = async () => {
    const otpCode = otp.join('');

    if (otpCode.length < 6 || !email) {
      setMessage('Please enter a valid 6-digit OTP and email.');
      return;
    }

    try {
      setLoading(true);
      const payload = { otp: otpCode, email };
      const response = await API.post('/user/verify-email', payload);

      if (response.data.success) {
        setMessage('✅ ' + response.data.message);
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setMessage('❌ ' + (response.data.message || 'OTP verification failed.'));
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setMessage('❌ ' + (err.response?.data?.message || 'Server error occurred.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-10 bg-white rounded-2xl w-full mx-auto max-w-lg">
      <div>
        {/* Logo */}
        <Image
          src="/images/TravelBud.png"
          alt="TravelBud Logo"
          width={250}
          height={80}
          className="mx-auto mb-8"
        />

        {/* Heading */}
        <h2 className="text-3xl font-bold text-black text-center mb-4">OTP Verification</h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          {authType === 'register'
            ? 'Enter verification code sent to'
            : 'Enter the OTP sent to'}
          <br />
          <span className="font-medium">{email}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
  inputRefs.current[index] = el;
}}

              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>

        {/* Resend Button */}
        <div className="flex justify-end mb-6">
          <Button
            onClick={onResend}
            className="text-primary"
            disabled={loading}
            type="button"
          >
            Resend
          </Button>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-accent mt-2 whitespace-pre-wrap">
            {message}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-8">
        <SecondaryButton
          className="w-full sm:w-1/2"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          className="w-full sm:w-1/2"
          onClick={handleVerifyClick}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </PrimaryButton>
      </div>
    </div>
  );
}
