import React from 'react';

interface SeparateLineProps {
  className?: string;
}

export function SeparateLine({ className = "" }: SeparateLineProps) {
  return (
    <div className={`flex items-center justify-center gap-1.5 w-full my-8 select-none ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
    </div>
  );
}
