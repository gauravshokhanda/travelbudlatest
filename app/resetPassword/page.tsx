'use client';

import Image from 'next/image';
import EcohouseImg from '/public/images/Ecohouse.png';
import RetirementEstateImg from '/public/images/Retirementestate.png';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import RightImagesPanel from '@/components/RightImagesPanel';

export default function ResetPassword() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Form */}
      <div className="flex items-start justify-center px-2">
        <ResetPasswordForm />
      </div>

      {/* Right Info Graphics */}
    <RightImagesPanel/>
    </div>
  );
}
