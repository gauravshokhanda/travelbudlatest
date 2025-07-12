'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import LoginWithMobile from '@/components/auth/LoginWithMobile';
import OtpModal from '@/components/auth/OtpModal';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [tab, setTab] = useState<'email' | 'mobile'>('email');
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  return (
    <main className="bg-white">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Side (Form) */}
        <div className="flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-md flex flex-col relative min-h-[550px]">
            {/* Skip Link */}
            <div className="absolute top-0 right-0">
              <Link href="/" className="text-sm text-primary hover:underline transition-all p-2">
                Skip
              </Link>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/images/TravelBud.png"
                alt="TravelBud Logo"
                width={160}
                height={50}
                priority
              />
            </div>

            {/* Tabs */}
            <div className="flex mb-6 border-b">
              <Button
                onClick={() => setTab('email')}
                className={`flex-1 py-2 text-center font-medium rounded-none ${
                  tab === 'email' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                }`}
              >
                Email
              </Button>
              <Button
                onClick={() => setTab('mobile')}
                className={`flex-1 py-2 text-center font-medium rounded-none ${
                  tab === 'mobile' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                }`}
              >
                Mobile Number
              </Button>
            </div>

            {/* Form Area */}
            <div className="flex-1">
              {tab === 'email' ? (
                <LoginForm />
              ) : (
                <LoginWithMobile onLoginClick={() => setOtpModalOpen(true)} />
              )}
            </div>
          </div>
        </div>

        {/* Right Side (Graphic Info) */}
        <div className="hidden lg:flex flex-col justify-between items-center px-10 py-14 text-center">
          <div className="flex flex-col items-center">
            <Image
              src="/images/Ecohouse.png"
              alt="Ecohouse"
              width={160}
              height={160}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mt-4 text-heading">Search perfect stays!</h3>
            <p className="text-text mt-1 max-w-sm">
              Search the best stays and capture your favorite moments.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/Retirementestate.png"
              alt="List your property"
              width={160}
              height={160}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mt-4 text-heading">List your property</h3>
            <p className="text-text mt-1 max-w-sm">
              List your property to earn and welcome travelers across the world.
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onVerify={(otp) => {
          console.log('OTP entered:', otp);
          setOtpModalOpen(false);
        }}
      />
    </main>
  );
}
