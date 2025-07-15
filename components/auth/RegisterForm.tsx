'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FormInput from '@/components/FormInput';
import PasswordInput from '@/components/ui/PasswordInput';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import PrimaryButton from '@/components/PrimaryButton';
import API from '@/lib/axios';

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
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Optional: Basic frontend validation
    if (
      formData.email !== formData.confirmEmail ||
      formData.password !== formData.confirmPassword
    ) {
      setMessage('Email or password confirmation does not match');
      return;
    }

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone_number: formData.mobileNumber,
      };

      const response = await API.post('/user/register', payload);

      console.log('✅ Registration Success:', response.data);
      setMessage('Registration successful!');
    } catch (error: any) {
      console.error('❌ Registration Failed:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-md h-full flex flex-col">
      {/* Fixed logo + heading */}
      <div className="flex flex-col items-center mb-4 shrink-0">
        <Image
          src="/images/TravelBud.png"
          alt="TravelBud Logo"
          width={250}
          height={100}
          priority
        />
        <h2 className="text-3xl font-bold text-black mt-6 mb-2">Create Account</h2>
      </div>

      {/* Scrollable form section only */}
      <div className="overflow-y-auto scrollbar-hide flex-grow pr-1">
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <FormInput
            label="Full Name"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            error={errors.fullName}
          />

          <FormInput
            label="Mobile Number"
            placeholder="Enter mobile number"
            prefix="+91"
            value={formData.mobileNumber}
            onChange={(e) => handleChange('mobileNumber', e.target.value)}
            error={errors.mobileNumber}
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />

          <FormInput
            label="Confirm Email"
            type="email"
            placeholder="Enter confirm email"
            value={formData.confirmEmail}
            onChange={(e) => handleChange('confirmEmail', e.target.value)}
            error={errors.confirmEmail}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Enter confirm password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
          />

          <PrimaryButton type="submit" className="w-full">
            Sign Up
          </PrimaryButton>

          {message && (
            <p className="text-sm text-center text-accent mt-2">{message}</p>
          )}

          <p className="text-center text-sm text-text mt-4 mb-2">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
