'use client';

import OtpVerification from '@/components/auth/OtpVerification';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function OtpVerificationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
const email = searchParams.get('email');
const phone = searchParams.get('phone');
  const authType = (params?.authType === 'register' || params?.authType === 'login')
    ? params.authType
    : 'login'; // fallback to 'login'

  return (
    <div className="h-screen w-screen bg-secondary">
      <div className="bg-white w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <OtpVerification authType={authType} />

        {/* Right Section */}
        <div className="hidden lg:flex flex-col justify-between items-center bg-white px-10 py-10">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/Ecohouse.png"
              alt="Ecohouse"
              width={140}
              height={140}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold text-black">Search perfect stays!</h2>
            <p className="text-text mt-2">Search the best stays and capture your favorite moments.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/Retirementestate.png"
              alt="List your property"
              width={140}
              height={140}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold text-black">List your property</h2>
            <p className="text-text mt-2">List your property to earn and welcome travelers across the world.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
