'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import Spinner from '@/components/ui/spinner';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
  email: string;
  error?: string | null;
  resending?: boolean;
  phone?: string;
}

export default function OtpModal({
  isOpen,
  onClose,
  onVerify,
  onResend,
  email,
  phone,
  error,
  resending = false,
}: OtpModalProps) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const isOtpComplete = otp.every((digit) => digit !== '');

  // Reset OTP and timer
  useEffect(() => {
    if (isOpen) {
      setOtp(Array(6).fill(''));
      setTimeLeft(120);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isOpen]);

  // Format timer display
  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(paste)) {
      const digits = paste.split('');
      setOtp(digits);
      setTimeout(() => inputRefs.current[5]?.focus(), 50);
    }
  };

  const handleVerify = () => {
    onVerify(otp.join('')); // ✅ Directly call parent's API handler
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-accent hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-1 text-black">OTP Verification</h2>
        <p className="text-sm text-text text-center mb-4">
          Enter verification code sent to{' '}
          <span className="font-medium">{phone || email}</span>
        </p>

        <div className="flex justify-center gap-2 mb-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-10 text-center border border-gray-300 rounded-md text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {error && (
          <div className="text-sm text-center text-red-600 mb-2 font-medium">{error}</div>
        )}

        <div className="flex justify-end mb-4 text-sm text-primary font-medium">
          {timeLeft > 0 ? (
            <span>Resend OTP in {formatTime(timeLeft)}</span>
          ) : (
            <button
              onClick={onResend}
              className="hover:underline flex items-center gap-1"
              disabled={resending}
            >
              {resending && <Spinner />}
              Resend OTP
            </button>
          )}
        </div>

        <PrimaryButton
          onClick={handleVerify}
          disabled={!isOtpComplete}
          className="w-full"
        >
          Verify
        </PrimaryButton>

        <SecondaryButton onClick={onClose} className="mt-2 w-full">
          Cancel
        </SecondaryButton>
      </div>
    </div>
  );
}
