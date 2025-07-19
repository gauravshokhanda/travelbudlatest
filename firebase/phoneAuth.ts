// src/firebase/phoneAuth.ts
import { auth, firebase } from './firebase.config';

let confirmationResult: firebase.auth.ConfirmationResult | null = null;

declare global {
  interface Window {
    recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
  }
}

export const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {},
      }
    );
  }
};

export const sendOTP = async (phone: string) => {
  setupRecaptcha();

  try {
    confirmationResult = await auth.signInWithPhoneNumber(phone, window.recaptchaVerifier!);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const verifyOTP = async (otp: string) => {
  if (!confirmationResult) return { success: false, error: 'OTP not sent' };

  try {
    const result = await confirmationResult.confirm(otp);
    const idToken = await result.user?.getIdToken();
    console.log('📲 Firebase ID Token:', idToken);
    return { success: true, idToken, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
