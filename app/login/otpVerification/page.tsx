'use client';

import OtpVerification from '@/components/auth/OtpVerification';
import Image from 'next/image';
import EcohouseImg from '@/assets/images/Ecohouse.png';
import RetirementEstateImg from '@/assets/images/Retirementestate.png';

export default function OtpVerificationPage() {
  return (
    <div className="h-screen w-screen bg-secondary">
      <div className="bg-white w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <OtpVerification />

        {/* Right Section */}
        <div className="hidden lg:flex flex-col justify-between items-center bg-white px-10 py-10">
          <div className="flex flex-col items-center text-center">
            <Image src={EcohouseImg} alt="Ecohouse" width={140} height={140} className="mb-4" />
            <h2 className="text-xl font-semibold text-black">Search perfect stays!</h2>
            <p className="text-text mt-2">Search the best stays and capture your favorite moments.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src={RetirementEstateImg} alt="List your property" width={140} height={140} className="mb-4" />
            <h2 className="text-xl font-semibold text-black">List your property</h2>
            <p className="text-text mt-2">List your property to earn and welcome travelers across the world.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
