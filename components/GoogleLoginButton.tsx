import { FcGoogle } from 'react-icons/fc';
import Button from '@/components/SecondaryButton';
interface GoogleLoginButtonProps {
  onClick?: () => void;
  text?: string;
}
export default function GoogleLoginButton({ onClick, text = "Continue with Google" }: GoogleLoginButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full flex items-center justify-center space-x-3"
    >
      <FcGoogle className="w-5 h-5" />
      <span className="text-gray-700 font-medium">{text}</span>
    </Button>
  );
}
