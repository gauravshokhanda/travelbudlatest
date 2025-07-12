import { LucideIcon } from 'lucide-react';

interface StepBoxProps {
  title: string;
  description: string;
  icon: LucideIcon;
  step: number;
}

export default function StepBox({ title, description, icon: Icon, step }: StepBoxProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold">
        {step}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}