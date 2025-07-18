'use client';

import { FiCheckCircle } from 'react-icons/fi';
import PrimaryButton from '@/components/PrimaryButton';

interface Props {
  open: boolean;
  onLoginClick: () => void;
}

export default function PasswordSuccessModal({ open, onLoginClick }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center">
        <div className="flex flex-col items-center">
          <FiCheckCircle className="text-primary mb-4" size={48} />

          <h2 className="text-xl font-semibold text-black mb-1">
            Password Updated
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Your password has been updated
          </p>

          <PrimaryButton onClick={onLoginClick} className="w-full">
            Login
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
