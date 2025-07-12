'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MailIcon } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';

interface Props {
  open: boolean;
  onClose: () => void;
  onResend: () => void;
}

export default function ResendOtpModal({ open, onClose, onResend }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm text-center bg-secondary px-6 py-10">
        <div className="flex justify-center mb-6">
          <MailIcon size={48} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Resend Verification code</h2>
        <p className="text-sm text-gray-500 mb-8">
          Didn’t receive the code? We can send it again.
        </p>

        <PrimaryButton className="w-full" onClick={onResend}>
          Resend
        </PrimaryButton>

        <SecondaryButton onClick={onClose}>
          Cancel
        </SecondaryButton>
      </DialogContent>
    </Dialog>
  );
}
