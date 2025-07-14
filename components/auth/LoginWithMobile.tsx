"use client";

import { useState } from "react";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import GoogleLoginButton from "@/components/GoogleLoginButton";

interface Props {
  onLoginClick: () => void;
}

export default function LoginWithMobile({ onLoginClick }: Props) {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [touched, setTouched] = useState(false);

  const validateMobile = (number: string): string | undefined => {
    if (!number.trim()) return "Mobile number is required.";
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(number))
      return "Please enter a valid 10-digit mobile number.";
    return undefined;
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateMobile(mobile));
  };

  const handleLoginClick = () => {
    const validationError = validateMobile(mobile);
    setTouched(true);
    setError(validationError);

    if (!validationError) {
      onLoginClick();
    }
  };

  return (
    <div>
      <div className="mb-6 w-full">
        <label className="block text-sm font-medium text-black mb-2">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="relative flex rounded-xl border text-base transition-colors focus-within:ring-2 focus-within:ring-primary overflow-hidden">
          <span className="flex items-center px-4 bg-gray-100 border-r border-accent text-sm text-gray-600">
            +91
          </span>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onBlur={handleBlur}
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            className={`w-full px-4 py-3 outline-none focus:ring-0 focus:outline-none ${
              error ? "border-red-500" : ""
            }`}
          />
        </div>
        {touched && error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>

      <PrimaryButton onClick={handleLoginClick} className="w-full">
        Login
      </PrimaryButton>

      <div className="relative mt-5 mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>

      <GoogleLoginButton />
      {/* 
      <p className="text-center text-sm text-gray-600 mt-5">
        Don&rsquo;t have an account?{' '}
        <Link href="/register" className="text-[#1b88d7] font-medium">
          Sign up
        </Link>
      </p> */}
    </div>
  );
}
