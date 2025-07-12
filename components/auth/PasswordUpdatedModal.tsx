'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MailIcon } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';

interface Props {
  open: boolean;
  onClose: () => void;
  onResend: () => void;
}

export default function PasswordUpdatedModal({ open, onClose, onResend }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm text-center bg-secondary px-6 py-10">
        <div className="flex justify-center mb-6">
          <MailIcon size={48} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Password Updated</h2>
        <p className="text-sm text-gray-500 mb-8">
          Your Password has been Updated.
        </p>

        <PrimaryButton className="w-full" onClick={onResend}>
          Login
        </PrimaryButton>
      </DialogContent>
    </Dialog>
  );
}
