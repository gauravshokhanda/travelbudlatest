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

type Field = 'email' | 'password';

interface HandleBlurProps {
  field: Field;
  email: string;
  password: string;
  setTouched: React.Dispatch<React.SetStateAction<{ email?: boolean; password?: boolean }>>;
  setErrors: React.Dispatch<React.SetStateAction<{ email?: string; password?: string }>>;
}

export const handleInputBlur = ({ field, email, password, setTouched, setErrors }: HandleBlurProps) => {
  setTouched((prev) => ({ ...prev, [field]: true }));

  if (field === 'email') {
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  } else if (field === 'password') {
    setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  }
};
