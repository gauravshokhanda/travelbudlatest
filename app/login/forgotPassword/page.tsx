"use client";
import ForgotPassword from "@/components/auth/ForgotPassword";
import RightImagesPanel from "@/components/RightImagesPanel";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Form */}
      <div className="flex justify-center items-start px-6 pt-10">
        <div className="h-[90vh] w-full flex justify-center">
          <ForgotPassword
            onSubmit={(email) => alert(`Reset email: ${email}`)}
            onCancel={() => alert("Cancelled")}
          />
        </div>
      </div>

      {/* Right Info Graphics */}
      <div className="hidden lg:flex">
        <RightImagesPanel />
      </div>
    </div>
  );
}
