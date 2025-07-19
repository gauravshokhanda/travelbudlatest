"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import API from "@/lib/axios";
import {
  validateEmail,
  validatePassword,
  handleInputBlur,
} from "@/lib/validators";
import FormInput from "@/components/FormInput";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import PrimaryButton from "@/components/PrimaryButton";
import PasswordInput from "@/components/ui/PasswordInput";
import { RootState } from "@/store";
import Spinner from "@/components/ui/spinner";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const [message, setMessage] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const reduxToken = useSelector((state: RootState) => state.auth.token);

  console.log("✅ Redux user value:", reduxUser);
  console.log("Redux after dispatch – token:", reduxToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setTouched({ email: true, password: true });
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    setLoading(true); // ✅ show button spinner

    try {
      const res = await API.post("/user/login", { email, password });

      if (!res.data.success) {
        setMessage(`❌ ${res.data.message || "Login failed."}`);
        return;
      }

      const user = res.data.data;
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser({ user, token: user.token }));

      setMessage(`✅ Welcome, ${user.name}`);
      router.push("/profile");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const errorMessage =
        axiosError?.response?.data?.message || "Something went wrong.";
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false); // ✅ hide button spinner
    }
  };



  return (
    <div className="w-full max-w-md">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Spinner className="w-10 h-10 text-white" />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() =>
            handleInputBlur({
              field: "email",
              email,
              password,
              setTouched,
              setErrors,
            })
          }
          error={touched.email ? errors.email : undefined}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() =>
            handleInputBlur({
              field: "password",
              email,
              password,
              setTouched,
              setErrors,
            })
          }
          error={touched.password ? errors.password : undefined}
        />

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              setRedirecting(true);
              setTimeout(() => {
                router.push("/login/forgotPassword");
              }, 500);
            }}
            className="text-sm text-primary"
          >
            Forgot password?
          </button>

        </div>

        <PrimaryButton type="submit" className="w-full">
          <div className="flex items-center justify-center gap-2">
            {loading && <Spinner />}
            {loading ? "" : "Log in"}
          </div>
        </PrimaryButton>

        {message && (
          <div className="text-sm text-center text-accent font-medium">
            {message}
          </div>
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
      </form>
    </div>
  );
}
