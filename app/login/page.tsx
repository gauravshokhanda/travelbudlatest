'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import LoginWithMobile from '@/components/auth/LoginWithMobile';
import OtpModal from '@/components/auth/OtpModal';
import TravelBudLogo from '@/assets/images/TravelBud.png';
import EcohouseImg from '@/assets/images/Ecohouse.png';
import RetirementEstateImg from '@/assets/images/Retirementestate.png';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [tab, setTab] = useState<'email' | 'mobile'>('email');
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  return (
    <main className="bg-white">
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
          <div className="w-full max-w-md h-[550px] flex flex-col justify-start relative">

            <div className="absolute top-0 right-0">
              <Link href="/" className="text-sm text-primary hover:underline transition-all p-2">
                Skip
              </Link>
            </div>

            <div className="flex justify-center mb-8">
              <Image src={TravelBudLogo} alt="TravelBud Logo" placeholder="blur" />
            </div>

            <div className="flex mb-6 border-b">
              <Button
                onClick={() => setTab('email')}
                className={`flex-1 py-2 text-center font-medium ${
                  tab === 'email' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                }`}
              >
                Email
              </Button>
              <Button
                onClick={() => setTab('mobile')}
                className={`flex-1 py-2 text-center font-medium ${
                  tab === 'mobile' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                }`}
              >
                Mobile Number
              </Button>
            </div>

            <div className="flex-1">
              {tab === 'email' ? (
                <LoginForm />
              ) : (
                <LoginWithMobile onLoginClick={() => setOtpModalOpen(true)} />
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 flex-col justify-center gap-20 px-10 overflow-hidden">
          <div className="flex flex-col items-center text-center">
            <Image src={EcohouseImg} alt="Search Perfect Stays" placeholder="blur" className="mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Search perfect stays!</h2>
            <p className="text-gray-500 mt-2">Search the best stays and capture your favorite moments.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Image src={RetirementEstateImg} alt="List your property" placeholder="blur" className="mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">List your property</h2>
            <p className="text-gray-500 mt-2">List your property to earn and welcome travelers across the world.</p>
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
