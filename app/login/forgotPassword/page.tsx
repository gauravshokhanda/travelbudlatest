'use client';

import Image from 'next/image';
import ForgotPasswordBox from '@/components/auth/ForgotPassword';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Form */}
      <div className="flex justify-center items-start px-6 pt-10">
        <div className="h-[90vh] w-full flex justify-center">
          <ForgotPasswordBox
            onSubmit={(email) => alert(`Reset email: ${email}`)}
            onCancel={() => alert('Cancelled')}
          />
        </div>
      </div>

      {/* Right Info Graphics */}
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
  );
}
