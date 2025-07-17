'use client';

import { CheckCircle, XCircle } from 'lucide-react';

export default function PasswordRuleItem({
  children,
  passed,
}: {
  children: React.ReactNode;
  passed: boolean;
}) {
  return (
    <li className="flex items-start gap-2">
      {passed ? (
        <CheckCircle className="text-green-500 mt-0.5" size={18} />
      ) : (
        <XCircle className="text-red-500 mt-0.5" size={18} />
      )}
      <span className={passed ? 'text-black' : 'text-gray-500'}>{children}</span>
    </li>
  );
}
