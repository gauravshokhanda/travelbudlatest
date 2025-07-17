'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import LoginWithMobile from '@/components/auth/LoginWithMobile';
import OtpModal from '@/components/auth/OtpModal';
import { Button } from '@/components/ui/button';
import SignupPrompt from '@/components/ui/signUpPrompt';
import RightImagesPanel from '@/components/RightImagesPanel';

export default function LoginPage() {
  const [tab, setTab] = useState<'email' | 'mobile'>('email');
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [phone, setPhone] = useState(''); // ✅ Added

  const handleLoginClick = (mobile: string) => {
    setPhone(mobile);              // ✅ Store the phone
    setOtpModalOpen(true);        // ✅ Open modal
  };

  const handleResend = () => {
    console.log('🔁 Resending OTP to', phone);
    // add resend logic here (e.g., API call)
  };

  return (
    <main className="bg-white w-screen h-screen overflow-hidden">
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center px-4 md:px-8 py-6 h-full">
          <div className="w-full max-w-md flex flex-col relative h-full">
            {/* Skip Link */}
            <div className="absolute top-2 right-2 z-10">
              <Link
                href="/"
                className="text-sm text-primary hover:underline transition-all"
              >
                Skip
              </Link>
            </div>

            {/* Header */}
            <div className="flex flex-col items-center gap-4 mb-6 mt-10 lg:mt-16">
              <Image
                src="/images/TravelBud.png"
                alt="TravelBud Logo"
                width={250}
                height={100}
                priority
              />

              <div className="flex w-full border-b">
                <Button
                  onClick={() => setTab('email')}
                  className={`flex-1 py-2 font-medium rounded-none ${
                    tab === 'email'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500'
                  }`}
                >
                  Email
                </Button>
                <Button
                  onClick={() => setTab('mobile')}
                  className={`flex-1 py-2 font-medium rounded-none ${
                    tab === 'mobile'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500'
                  }`}
                >
                  Mobile Number
                </Button>
              </div>
            </div>

            {/* Form Switching */}
            <div className="relative w-full flex flex-col mt-4 transition-all duration-300">
              {tab === 'email' && <LoginForm />}
              {tab === 'mobile' && (
                <LoginWithMobile onLoginClick={handleLoginClick} /> // ✅ pass function
              )}
            </div>
          </div>

          <SignupPrompt />
        </div>

        <RightImagesPanel />
      </div>

      {/* ✅ OTP Modal (Now with phone + onResend) */}
      <OtpModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onVerify={(otp) => {
          console.log('✅ OTP entered:', otp);
          setOtpModalOpen(false);
        }}
        onResend={handleResend}
        phone={phone}
      />
    </main>
  );
}
