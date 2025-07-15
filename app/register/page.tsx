'use client';

import RightImagesPanel from '@/components/RightImagesPanel';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="bg-white w-screen h-screen overflow-hidden">
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side with scroll */}
        <div className="flex flex-col mt-5 items-center justify-start px-4 md:px-8 py-6 h-full overflow-y-auto hide-scrollbar">
          <RegisterForm />
        </div>

        {/* Right Side (fixed visuals) */}
        <RightImagesPanel />
      </div>
    </main>
  );
}
