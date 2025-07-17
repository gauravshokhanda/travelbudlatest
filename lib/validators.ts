// utils/validators.ts

export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) return 'Email is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Enter a valid email address.';
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password.trim()) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/\d/.test(password)) return 'Password must include at least one number.';
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return 'Password must include a special character.';
  }
  return undefined;
};

export const validateFullName = (name: string): string | undefined => {
  if (!name.trim()) return 'Full name is required.';
  if (name.length < 2) return 'Name must be at least 2 characters.';
  return undefined;
};

export const validateMobile = (number: string): string | undefined => {
  if (!number.trim()) return 'Mobile number is required.';
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(number)) return 'Enter a valid 10-digit mobile number.';
  return undefined;
};

// ✅ Confirm email matches
export const validateConfirmEmail = (
  email: string,
  confirmEmail: string
): string | undefined => {
  if (!confirmEmail.trim()) return 'Please confirm your email.';
  if (email !== confirmEmail) return 'Emails do not match.';
  return undefined;
};

export const getPasswordValidationStatus = (password: string) => {
  return {
    minLength: password.length >= 8,
    upperCase: /[A-Z]/.test(password),
    lowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
};

// ✅ Confirm password matches
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword.trim()) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return undefined;
};

// ✅ Extended fields to include all
type Field =
  | 'email'
  | 'password'
  | 'mobile'
  | 'fullName'
  | 'confirmEmail'
  | 'confirmPassword';

interface HandleBlurProps {
  field: Field;
  email?: string;
  password?: string;
  mobile?: string;
  setTouched: React.Dispatch<React.SetStateAction<{ [key in Field]?: boolean }>>;
  setErrors: React.Dispatch<React.SetStateAction<{ [key in Field]?: string }>>;
}

export const handleInputBlur = ({
  field,
  email,
  password,
  mobile,
  setTouched,
  setErrors,
}: HandleBlurProps) => {
  setTouched((prev) => ({ ...prev, [field]: true }));

  switch (field) {
    case 'email':
      if (email !== undefined) {
        setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
      }
      break;
    case 'password':
      if (password !== undefined) {
        setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
      }
      break;
    case 'mobile':
      if (mobile !== undefined) {
        setErrors((prev) => ({ ...prev, mobile: validateMobile(mobile) }));
      }
      break;
    case 'fullName':
      setErrors((prev) => ({ ...prev, fullName: validateFullName(email || '') }));
      break;
    default:
      break;
  }
};
