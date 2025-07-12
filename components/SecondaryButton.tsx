interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  outline?: boolean;
}

export default function PrimaryButton({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  outline = false,
}: SecondaryButtonProps) {
  const baseClasses = 'font-semibold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const filled = 'bg-Secondary border border-primary text-Primary hover:bg-opacity-90';
  const outlined = 'border border-primary text-primary bg-transparent hover:bg-secondary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${outline ? outlined : filled} ${className}`}
    >
      {children}
    </button>
  );
}
