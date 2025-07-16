'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import OtpVerificationBox from '@/components/auth/OtpVerificationBox';
import RightImagesPanel from '@/components/RightImagesPanel';
import API from '@/lib/axios';
import { AxiosError } from 'axios';

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

 const handleVerify = async (otp: string) => {
  try {
    const response = await API.post('/user/verify-otp', {
      email,
      otp,
    });

    if (response.data.success) {
      const { email: verifiedEmail, resetPasswordToken } = response.data.data;

      // ✅ Redirect to /resetPassword with both email and token
      router.push(
        `/resetPassword?email=${encodeURIComponent(verifiedEmail)}&token=${encodeURIComponent(resetPasswordToken)}`
      );

      return { success: true, message: response.data.message };
    } else {
      return {
        success: false,
        message: response.data.message || 'OTP verification failed.',
      };
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return {
      success: false,
      message: err.response?.data?.message || 'Server error occurred.',
    };
  }
};


  return (
    <div className="h-screen w-screen bg-secondary">
      <div className="bg-white w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <OtpVerificationBox
          email={email}
          phone={phone}
          heading="Verify OTP"
          subtext="Enter verification code sent to"
          onVerify={handleVerify}
        />
        <RightImagesPanel />
      </div>
    </div>
  );
}
