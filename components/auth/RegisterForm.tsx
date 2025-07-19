"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryButton from "@/components/PrimaryButton";
import OtpModal from "@/components/auth/OtpModal";
import API from "@/lib/axios";
import Spinner from "@/components/ui/spinner";

import {
  validateEmail,
  validatePassword,
  validateMobile,
  validateFullName,
  validateConfirmEmail,
  validateConfirmPassword,
  handleInputBlur,
} from "@/lib/validators";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpModalError, setOtpModalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalErrors: Record<string, string> = {
      fullName: validateFullName(formData.fullName) || "",
      mobile: validateMobile(formData.mobileNumber) || "",
      email: validateEmail(formData.email) || "",
      confirmEmail:
        validateConfirmEmail(formData.email, formData.confirmEmail) || "",
      password: validatePassword(formData.password) || "",
      confirmPassword:
        validateConfirmPassword(formData.password, formData.confirmPassword) ||
        "",
    };

    setErrors(finalErrors);
    setTouched({
      fullName: true,
      mobile: true,
      email: true,
      confirmEmail: true,
      password: true,
      confirmPassword: true,
    });

    const hasError = Object.values(finalErrors).some((err) => err !== "");
    if (hasError) {
      setMessage("Please fix the highlighted errors.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone_number: formData.mobileNumber,
      };

      const response = await API.post("/user/register", payload);

      if (!response.data.success) {
        setMessage(`❌ ${response.data.message || "Registration failed."}`);
        setLoading(false);
        return;
      }

      setMessage("✅ Registration successful!");
      setOtpModalError(null);
      setOtpModalOpen(true);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await API.post("/user/resend-otp", { email: formData.email });
      router.push(
        `/register/otpVerification?email=${formData.email}&phone=${formData.mobileNumber}`
      );
    } catch {
      alert("Failed to resend OTP. Please try again.");
      setResending(false);
    }
  };

  const handleOtpClose = () => {
    setOtpModalOpen(false);
    router.push(
      `/register/otpVerification?email=${formData.email}&phone=${formData.mobileNumber}`
    );
  };

  return (

    <div className="w-full max-w-md h-full flex flex-col">
      {redirecting && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Spinner className="w-10 h-10 text-white" />
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col items-center mb-4 shrink-0">
        <Image
          src="/images/TravelBud.png"
          alt="TravelBud Logo"
          width={250}
          height={100}
          priority
        />
        <h2 className="text-3xl font-bold text-black mt-6 mb-2">
          Create Account
        </h2>
        {message && (
  <p
    className={`text-sm text-center mt-2 ${
      message.startsWith("✅") ? "text-green-600" : "text-red-600"
    }`}
  >
    {message}
  </p>
)}
      </div>

      {/* Form (scrollable) */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="overflow-y-auto scrollbar-hide pr-1 flex-grow">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            autoComplete="off"
          >
            <FormInput
              label="Full Name"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, fullName: true }));
                setErrors((prev) => ({
                  ...prev,
                  fullName: validateFullName(formData.fullName) || "",
                }));
              }}
              error={touched.fullName ? errors.fullName : undefined}
            />

            <FormInput
              label="Mobile Number"
              placeholder="Enter mobile number"
              prefix="+91"
              value={formData.mobileNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10); // only digits, max 10
                handleChange("mobileNumber", value);
              }}
              onBlur={() =>
                handleInputBlur({
                  field: "mobile",
                  mobile: formData.mobileNumber,
                  setTouched,
                  setErrors,
                })
              }
              error={touched.mobile ? errors.mobile : undefined}
            />


            <FormInput
              label="Email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() =>
                handleInputBlur({
                  field: "email",
                  email: formData.email,
                  setTouched,
                  setErrors,
                })
              }
              error={touched.email ? errors.email : undefined}
            />

            <FormInput
              label="Confirm Email"
              type="email"
              placeholder="Enter confirm email"
              value={formData.confirmEmail}
              onChange={(e) => handleChange("confirmEmail", e.target.value)}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, confirmEmail: true }));
                setErrors((prev) => ({
                  ...prev,
                  confirmEmail:
                    validateConfirmEmail(
                      formData.email,
                      formData.confirmEmail
                    ) || "",
                }));
              }}
              error={touched.confirmEmail ? errors.confirmEmail : undefined}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() =>
                handleInputBlur({
                  field: "password",
                  password: formData.password,
                  setTouched,
                  setErrors,
                })
              }
              error={touched.password ? errors.password : undefined}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Enter confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, confirmPassword: true }));
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword:
                    validateConfirmPassword(
                      formData.password,
                      formData.confirmPassword
                    ) || "",
                }));
              }}
              error={
                touched.confirmPassword ? errors.confirmPassword : undefined
              }
            />

            <PrimaryButton
              type="submit"
              className="w-full mb-2"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Spinner />

                </div>
              ) : (
                "Sign Up"
              )}
            </PrimaryButton>

            {/* {message && (
              <p className="text-sm text-center text-accent mt-2">{message}</p>
            )} */}
          </form>
        </div>

        {/* Bottom footer */}
        <div className="mt-4 mb-2">
          <p className="text-sm text-text flex justify-center items-center gap-1">
            Already have an account?
            <button
              onClick={() => {
                setRedirecting(true);
                router.push("/login");
              }}
              disabled={redirecting}
              className="text-primary font-medium flex items-center gap-1"
            >
              {redirecting && <Spinner />}
              Login
            </button>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal
        isOpen={otpModalOpen}
        onClose={handleOtpClose}
        onVerify={async (otp) => {
          try {
            const res = await API.post("/user/verify-email", {
              email: formData.email,
              otp: parseInt(otp, 10),
            });

            if (res.data.success) {
              setOtpModalError(null);
              setOtpModalOpen(false);
              router.push("/profile");
            } else {
              setOtpModalError(res.data.message || "Verification failed.");
            }
          } catch (err: unknown) {
            const error = err as Error;
            setOtpModalError(
              error.message || "Failed to verify OTP. Try again."
            );
          }
        }}
        onResend={handleResend}
        email={formData.email}
        error={otpModalError}
        resending={resending}
      />
    </div>
  );
}
