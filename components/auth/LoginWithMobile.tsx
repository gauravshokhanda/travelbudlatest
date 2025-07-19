'use client';

import { useState } from 'react';
import { validateMobile } from '@/lib/validators';
import PrimaryButton from '@/components/PrimaryButton';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import MobileInput from '@/components/ui/mobileInput';
import { sendOTP } from '@/firebase/phoneAuth';


interface Props {
  onLoginClick: (phone: string) => void;
}

export default function LoginWithMobile({ onLoginClick }: Props) {
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState<{ mobile?: string }>({});
  const [touched, setTouched] = useState<{ mobile?: boolean }>({});
  const [loading, setLoading] = useState(false);
  const handleLoginClick = async () => {
  const error = validateMobile(mobile);
  setTouched({ mobile: true });
  setErrors({ mobile: error });

  if (!error) {
    setLoading(true); // show spinner
    const fullPhone = `+91${mobile}`;
    const { success, error: otpError } = await sendOTP(fullPhone);
    setLoading(false); // hide spinner after response

    if (success) {
      onLoginClick(fullPhone); // open modal
    } else {
      alert(otpError);
    }
  }
};

  return (
    <div>
      <MobileInput
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, mobile: true }));
          setErrors((prev) => ({ ...prev, mobile: validateMobile(mobile) }));
        }}
        error={touched.mobile ? errors.mobile : undefined}
      />

     <PrimaryButton onClick={handleLoginClick} className="w-full mt-2" disabled={loading}>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      
    </div>
  ) : (
    'Login'
  )}
</PrimaryButton>


      <div className="relative mt-5 mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>

      <GoogleLoginButton />
    </div>
  );
}
