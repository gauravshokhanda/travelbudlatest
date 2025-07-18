'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import API from '@/lib/axios';

const COUNTDOWN_MINUTES = 5;

export default function ResendTimerButton({
  onResendConfirm,
  email,
}: {
  onResendConfirm: () => void;
  email: string;
}) {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const saved = sessionStorage.getItem('otp_expiry');
    const expiry = saved ? parseInt(saved) : Date.now() + COUNTDOWN_MINUTES * 60 * 1000;
    return Math.max(0, Math.floor((expiry - Date.now()) / 1000));
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) sessionStorage.removeItem('otp_expiry');
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft > 0) {
      sessionStorage.setItem('otp_expiry', (Date.now() + secondsLeft * 1000).toString());
    }
  }, [secondsLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await API.post('/user/resend-otp', { email });

      if (res.data?.success) {
        setSuccessMsg('✅ OTP resent successfully!');
        setIsDialogOpen(false);
        onResendConfirm();

        const newExpiry = Date.now() + COUNTDOWN_MINUTES * 60 * 1000;
        sessionStorage.setItem('otp_expiry', newExpiry.toString());
        setSecondsLeft(COUNTDOWN_MINUTES * 60);
      } else {
        alert(res.data?.message || 'Failed to resend OTP.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {secondsLeft > 0 ? (
        <p className="text-sm text-gray-600 font-medium whitespace-nowrap">
          Resend Otp in <span className="font-bold">{formatTime(secondsLeft)}</span>
        </p>
      ) : (
        <>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="text-primary font-semibold text-sm underline"
          >
            Resend Code
          </button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Resend OTP?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to resend the OTP to your email/phone?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button >Cancel</Button>
                </DialogClose>
                <Button onClick={handleResend} disabled={loading}>
                  {loading ? 'Sending...' : 'Yes, Resend'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}

      {successMsg && (
        <p className="text-sm text-green-600 mt-2">{successMsg}</p>
      )}
    </>
  );
}
