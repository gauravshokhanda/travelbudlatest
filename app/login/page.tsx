"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import LoginWithMobile from "@/components/auth/LoginWithMobile";
import OtpModal from "@/components/auth/OtpModal";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [tab, setTab] = useState<"email" | "mobile">("email");
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  return (
    <main className="bg-white w-screen h-screen overflow-hidden">
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center px-4 md:px-8 py-6 h-full">
          <div className="w-full max-w-md flex flex-col relative h-full">
            {/* Skip Link */}
            <div className="absolute top-2 right-2 z-10">
              <Link
                href="/"
                className="text-sm text-primary hover:underline transition-all"
              >
                Skip
              </Link>
            </div>

            {/* Static Header Area */}
            <div className="flex flex-col items-center gap-4 mb-6">
              {/* Logo */}
              <Image
                src="/images/TravelBud.png"
                alt="TravelBud Logo"
                width={250}
                height={100}
                priority
              />

              {/* Tabs */}
              <div className="flex w-full border-b">
                <Button
                  onClick={() => setTab("email")}
                  className={`flex-1 py-2 font-medium rounded-none ${
                    tab === "email"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500"
                  }`}
                >
                  Email
                </Button>
                <Button
                  onClick={() => setTab("mobile")}
                  className={`flex-1 py-2 font-medium rounded-none ${
                    tab === "mobile"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500"
                  }`}
                >
                  Mobile Number
                </Button>
              </div>
            </div>

            {/* Fixed Content Area */}
            <div className="flex-grow overflow-y-auto">
              {tab === "email" ? (
                <LoginForm />
              ) : (
                <LoginWithMobile onLoginClick={() => setOtpModalOpen(true)} />
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex flex-col justify-between items-center px-6 py-10 text-center h-full">
          <div className="flex flex-col items-center">
            <Image
              src="/images/Ecohouse.png"
              alt="Ecohouse"
              width={140}
              height={140}
              className="mb-4"
            />
            <h3 className="text-lg mt-2 text-black">
              Search perfect stays!
            </h3>
            <p className="text-accent mt-1 max-w-xs text-sm">
              Search the best stays and capture your favorite moments.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/Retirementestate.png"
              alt="List your property"
              width={140}
              height={140}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold mt-2 text-black">
              List your property
            </h3>
            <p className="text-accent mt-1 max-w-xs text-sm">
              List your property to earn and welcome travelers across the world.
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onVerify={(otp) => {
          console.log("OTP entered:", otp);
          setOtpModalOpen(false);
        }}
      />
    </main>
  );
}
