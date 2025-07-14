'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice'; // Update path if needed
import API from '@/lib/axios';
import { validateEmail, validatePassword, handleInputBlur } from '@/lib/validators';
import FormInput from '@/components/FormInput';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import PrimaryButton from '@/components/PrimaryButton';
import PasswordInput from '@/components/ui/PasswordInput';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


export default function LoginForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [message, setMessage] = useState<string | null>(null);
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const reduxToken = useSelector((state: RootState) => state.auth.token);
console.log('✅ Redux user value:', reduxUser);
console.log('Redux after dispatch – token:', reduxToken);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setTouched({ email: true, password: true });
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    try {
      const res = await API.post('/user/login', { email, password });
      const user = res.data.data;

      // ✅ Save to localStorage
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Dispatching user:', user)
      // ✅ Save to Redux
      dispatch(setUser({ user, token: user.token }));

      setMessage(`Welcome, ${user.name}`);
      console.log('Login Success:', user);
    } catch (err: any) {
      console.error('Login Error:', err);
      const errorMessage = err?.response?.data?.message || 'Something went wrong.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() =>
            handleInputBlur({ field: 'email', email, password, setTouched, setErrors })
          }
          error={touched.email ? errors.email : undefined}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() =>
            handleInputBlur({ field: 'password', email, password, setTouched, setErrors })
          }
          error={touched.password ? errors.password : undefined}
        />

        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-sm text-primary">
            Forgot password?
          </Link>
        </div>

        <PrimaryButton type="submit" className="w-full">
          Log in
        </PrimaryButton>

        {message && (
          <div className="text-sm text-center text-accent font-medium">{message}</div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-accent" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-accent">Or</span>
          </div>
        </div>

        <GoogleLoginButton />

        <p className="text-center text-sm text-gray-600">
          Don&rsquo;t have an account?{' '}
          <Link href="/register" className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
