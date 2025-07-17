'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PasswordInput from '@/components/ui/PasswordInput';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import API from '@/lib/axios';
import { useSessionInput } from '@/hooks/useSessionInput';
import {
  getPasswordValidationStatus,
  validatePassword,
  validateConfirmPassword,
} from '@/lib/validators';
import PasswordRuleItem from '@/components/ui/PasswordRuleItem';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get('email') || '';
  const resetPasswordToken = searchParams.get('token') || '';

  const [password, setPassword] = useSessionInput('reset_password');
  const [confirmPassword, setConfirmPassword] = useSessionInput('reset_confirm_password');
  const [touched, setTouched] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);

  const passwordValidation = getPasswordValidationStatus(password);
  const passwordError = touched ? validatePassword(password) : '';
  const confirmPasswordError = touched
    ? validateConfirmPassword(password, confirmPassword)
    : '';

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const isFormValid = isPasswordValid && !confirmPasswordError;

  const handleSubmit = async () => {
    if (!isFormValid) {
      setMessage('Please fix the errors above.');
      setSuccess(false);
      return;
    }

    setLoading(true);
    setMessage('');
    setSuccess(null);

    try {
      const res = await API.post('/user/reset-password', {
        email,
        resetPasswordToken,
        password,
      });

      if (res.data.success) {
        setSuccess(true);
        setMessage(res.data.message || 'Password reset successfully.');
        sessionStorage.removeItem('forgot_email');
        sessionStorage.removeItem('reset_password');
        sessionStorage.removeItem('reset_confirm_password');
        sessionStorage.removeItem('otp_code');
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } else {
        setSuccess(false);
        setMessage(res.data.message || 'Something went wrong.');
      }
    } catch (error: unknown) {
  const err = error as Error;
  setMessage(err.message || 'Something went wrong.');
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between px-4 pb-6 pt-12">
      {/* Top Content */}
      <div className="w-full max-w-md mx-auto">
        <Image
          src="/images/TravelBud.png"
          alt="TravelBud Logo"
          width={210}
          height={60}
          className="mb-4 mx-auto"
        />

        <h2 className="text-4xl font-bold text-black text-center mb-4">
          Reset Password
        </h2>

        {/* Password Rules */}
        <ul className="text-sm text-gray-700 mb-6 space-y-2">
          <PasswordRuleItem passed={passwordValidation.minLength}>
            Password must be at least 8 characters long.
          </PasswordRuleItem>
          <PasswordRuleItem passed={passwordValidation.upperCase}>
            Password must contain at least one upper case.
          </PasswordRuleItem>
          <PasswordRuleItem passed={passwordValidation.lowerCase}>
            One lower case letter.
          </PasswordRuleItem>
          <PasswordRuleItem passed={passwordValidation.hasNumber && passwordValidation.hasSpecialChar} >
            Password must contain at least one number & one special character.
          </PasswordRuleItem>
        </ul>

        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setTouched(true);
          }}
          error={passwordError}
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setTouched(true);
          }}
          error={confirmPasswordError}
        />

        {message && (
          <p
            className={`mt-4 text-sm ${success ? 'text-green-600' : 'text-red-500'
              }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Bottom Sticky Buttons */}
      <div className="w-full max-w-md mx-auto mt-6 flex flex-col gap-4">
        <PrimaryButton
          className="w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </PrimaryButton>
        <SecondaryButton
          className="w-full"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </SecondaryButton>
      </div>
    </div>
  );
}
