'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { Button } from '@/components/ui/button';
import OtpInput from '@/components/ui/otpInput';
import Spinner from '@/components/ui/spinner';
import ResendTimerButton from '@/components/ResendTimerButton';

interface OtpVerificationBoxProps {
  email: string;
  phone?: string;
  onVerify: (otp: string) => Promise<{ success: boolean; message: string }>;
  heading?: string;
  subtext?: string;
  illustration?: {
    topImage: string;
    topHeading: string;
    topText: string;
    bottomImage: string;
    bottomHeading: string;
    bottomText: string;
  };
}

export default function OtpVerificationBox({
  email,
  phone,
  onVerify,
  heading = 'OTP Verification',
  subtext = 'Enter verification code sent to',
  illustration,
}: OtpVerificationBoxProps) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedOtp = sessionStorage.getItem('otp_code');
    if (savedOtp?.length === 6) {
      setOtp(savedOtp.split(''));
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      sessionStorage.setItem('otp_code', updatedOtp.join(''));
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyClick = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setMessage('❌ Please enter the 6-digit OTP.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await onVerify(otpCode);
      if (!result.success) {
        setMessage('❌ ' + result.message);
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      setMessage('❌ ' + (err?.message || 'Something went wrong.'));
    } finally {
      setLoading(false);
    }
  };

  const hasError = message?.toLowerCase().includes('invalid') || message?.toLowerCase().includes("doesn't");

  return (
    <div className="h-screen w-screen bg-secondary">
      <div className="bg-white w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left OTP Box */}
        <div className="min-h-screen flex flex-col justify-between p-10 bg-white rounded-2xl w-full max-w-lg mx-auto">
          <div>
            <Image
              src="/images/TravelBud.png"
              alt="TravelBud Logo"
              width={250}
              height={80}
              className="mx-auto mb-8"
            />

            <h2 className="text-4xl font-bold text-black text-center mb-2">{heading}</h2>
            <p className="text-center text-sm text-gray-600 mb-8">
              {subtext}
              <br />
              <span className="font-medium">{phone || email}</span>
            </p>

            <label className="text-sm text-primary font-medium">Verification Code</label>

            {/* OTP inputs row */}
            <div className="flex justify-start gap-2 mt-2">
              {otp.map((digit, index) => (
                <OtpInput
                  key={index}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  hasError={hasError}
                />
              ))}
            </div>

            {/* Error Message */}
            {message && (
              <p className="text-sm text-red-500 mt-2 whitespace-pre-wrap">
                {message}
              </p>
            )}

            {/* Resend Timer */}
            <div className="mt-4">
             <ResendTimerButton
  email={email} // ✅ This was missing
  onResendConfirm={() => {
    console.log('Resending OTP...');
  }}
/>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <SecondaryButton
              className="w-full sm:w-1/2"
              onClick={() => window.history.back()}
              disabled={loading}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              className="w-full sm:w-1/2"
              onClick={handleVerifyClick}
              disabled={loading || otp.some((digit) => digit === '')}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner />
                </div>
              ) : (
                'Verify'
              )}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
