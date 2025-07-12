'use client';

import Image from 'next/image';
import TravelBudLogo from '/public/images/TravelBud.png';
import PasswordInput from '@/components/ui/PasswordInput';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';

export default function ResetPasswordForm() {
  return (
    <div className="w-full h-full flex flex-col px-10 py-12 max-w-xl">
      <Image
        src={TravelBudLogo}
        alt="TravelBud Logo"
        width={240}
        height={80}
        className="mb-8 mx-auto"
      />
      <h2 className="text-4xl font-bold text-black text-center mb-6">Reset Password</h2>

      <ul className="text-sm text-gray-600 list-disc pl-5 mb-10 space-y-1">
        <li>Password must be at least 8 characters long.</li>
        <li>Password must contain at least one upper case.</li>
        <li>One lower case letter.</li>
        <li>Password must contain at least one number or special character.</li>
      </ul>

      <PasswordInput label="New Password" required placeholder="Enter your new password" />
      <PasswordInput label="Confirmed New Password" required placeholder="Enter your confirmed new password" />

      <div className="flex gap-6 pt-8">
        <SecondaryButton className="flex-1">Cancel</SecondaryButton>
        <PrimaryButton className="flex-1">Submit</PrimaryButton>
      </div>
    </div>
  );
}
