'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FormInput from '@/components/FormInput';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import PrimaryButton from '@/components/PrimaryButton';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="text-center mb-8">
        <Image
          src="/images/TravelBud.png"
          alt="TravelBud Logo"
          width={140}
          height={40}
          priority
        />
        <h2 className="text-2xl font-bold text-black mb-4">Create Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
        <FormInput
          label="Full Name"
          placeholder="Enter full name"
          name="no-autofill-name"
          autoComplete="off"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
        />

        <FormInput
          label="Mobile Number"
          placeholder="Enter mobile number"
          prefix="+91"
          name="no-autofill-mobile"
          autoComplete="off"
          value={formData.mobileNumber}
          onChange={(e) => handleChange('mobileNumber', e.target.value)}
          error={errors.mobileNumber}
        />

        <FormInput
          label="Email"
          type="email"
          placeholder="Enter email"
          name="no-autofill-email"
          autoComplete="off"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />

        <FormInput
          label="Confirm Email"
          type="email"
          placeholder="Enter confirm email"
          name="no-autofill-confirm-email"
          autoComplete="off"
          value={formData.confirmEmail}
          onChange={(e) => handleChange('confirmEmail', e.target.value)}
          error={errors.confirmEmail}
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Enter password"
          name="no-autofill-password"
          autoComplete="new-password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="Enter confirm password"
          name="no-autofill-confirm-password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
        />

        <PrimaryButton type="submit" className="w-full">
          Sign Up
        </PrimaryButton>

        <p className="text-center text-sm text-text mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
