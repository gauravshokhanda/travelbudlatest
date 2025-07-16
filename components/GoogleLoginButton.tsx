"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/slices/authSlice";
import API from "@/lib/axios";

import { FcGoogle } from "react-icons/fc";
import Button from "@/components/SecondaryButton";

interface GoogleLoginButtonProps {
  text?: string;
}

export default function GoogleLoginButton({ text = "Continue with Google" }: GoogleLoginButtonProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 1. Fetch user info from Google
        const googleUser = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const { email, name, sub } = googleUser.data;

        // 2. Send to your backend
        const res = await API.post("/user/google-login", {
          email,
          name,
          google_id: sub,
        });

        if (!res.data.success) {
          alert(res.data.message || "Google login failed.");
          return;
        }

        const user = res.data.data;

        // 3. Store user/token
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser({ user, token: user.token }));

        // 4. Redirect
        router.push("/profile");`                                           `
      } catch (err) {
        console.error("Google login error:", err);
        alert("Google login failed. Try again.");
      }
    },
    onError: () => {
      alert("Google login cancelled or failed.");
    },
  });

  return (
    <Button
      onClick={() => login()}
      className="w-full flex items-center justify-center space-x-3"
    >
      <FcGoogle className="w-5 h-5" />
      <span className="text-gray-700 font-medium">{text}</span>
    </Button>
  );
}
