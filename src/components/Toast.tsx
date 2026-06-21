import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A26] text-[#F9F7F2] font-medium text-xs px-5 py-3 rounded-full shadow-xl flex items-center gap-2 animate-fade-in transition-all">
      <Check className="w-4 h-4 text-[#C2A978]" />
      <span>{message}</span>
    </div>
  );
}
