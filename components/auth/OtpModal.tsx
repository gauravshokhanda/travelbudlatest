'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
  phone: string;
  email: string;
  error?: string | null;
}

export default function OtpModal({
  isOpen,
  onClose,
  onVerify,
  onResend,
  email,
  phone,
  error,
}: OtpModalProps) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (isOpen) setTimeLeft(120);
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isOpen]);

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

  const handleVerify = () => {
    onVerify(otp.join(''));
  };

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-accent hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-1 text-black">OTP Verification</h2>
        <p className="text-sm text-text text-center mb-4">
          Enter verification code sent to <span className="font-medium text-text">{email}</span>
        </p>

        <div className="flex justify-center gap-2 mb-2">
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
              className="w-10 h-10 text-center border border-gray-300 rounded-md text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
            <button onClick={onResend} className="hover:underline">
              Resend OTP
            </button>
          )}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Verify
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full text-sm text-primary text-center hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
