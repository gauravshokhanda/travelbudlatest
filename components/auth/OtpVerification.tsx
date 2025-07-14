'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { Button } from '@/components/ui/button';

interface Props {
  phone?: string;
  onVerify?: (otp: string) => void;
  onCancel?: () => void;
  onResend?: () => void;
}

export default function OtpVerificationBox({
  phone = '+91 xxxxxxxxxx',
  onVerify,
  onCancel,
  onResend,
}: Props) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

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

  const handleVerifyClick = () => {
    onVerify?.(otp.join(''));
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
        <h2 className="text-4xl font-bold text-black text-center mb-4">OTP Verification</h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          Enter verification code sent to <br />
          <span className="font-medium">{phone}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el: HTMLInputElement | null) => {
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
          <Button onClick={onResend} className="text-primary">
            Resend
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-8">
        <SecondaryButton className="w-full sm:w-1/2" onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton className="w-full sm:w-1/2" onClick={handleVerifyClick}>
          Verify
        </PrimaryButton>
      </div>
    </div>
  );
}
