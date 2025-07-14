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

export const validateMobile = (number: string): string | undefined => {
  if (!number.trim()) return "Mobile number is required.";
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(number))
    return "Please enter a valid 10-digit mobile number.";
  return undefined;
};

type Field = 'email' | 'password' | 'mobile';

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
  setErrors
}: HandleBlurProps) => {
  setTouched((prev) => ({ ...prev, [field]: true }));

  if (field === 'email' && email !== undefined) {
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  } else if (field === 'password' && password !== undefined) {
    setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  } else if (field === 'mobile' && mobile !== undefined) {
    setErrors((prev) => ({ ...prev, mobile: validateMobile(mobile) }));
  }
};
