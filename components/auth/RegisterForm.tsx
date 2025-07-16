"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";

import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryButton from "@/components/PrimaryButton";
import API from "@/lib/axios";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      console.log("✅ Registration Success:", response.data);
      setMessage("✅ Registration successful!");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-md h-full flex flex-col">
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
      </div>

      <div className="overflow-y-auto scrollbar-hide flex-grow pr-1">
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
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
            onChange={(e) => handleChange("mobileNumber", e.target.value)}
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
                  validateConfirmEmail(formData.email, formData.confirmEmail) ||
                  "",
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
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
          />

          <PrimaryButton type="submit" className="w-full">
            Sign Up
          </PrimaryButton>

          {message && (
            <p className="text-sm text-center text-accent mt-2">{message}</p>
          )}

          <p className="text-center text-sm text-text mt-4 mb-2">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
