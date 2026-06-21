import React from 'react';

interface StatusFiltersProps {
  currentFilter: string;
  onFilterChange: (status: string) => void;
  onTrackClick: (id: string, text: string) => void;
}

export function StatusFilters({ currentFilter, onFilterChange, onTrackClick }: StatusFiltersProps) {
  const options = ['全部', '連載中', '已完結'];

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 p-1 bg-[#EEEDE9] rounded-full max-w-[280px] w-full self-center">
      {options.map((status) => {
        const isActive = currentFilter === status;
        return (
          <button
            key={status}
            onClick={() => {
              onFilterChange(status);
              onTrackClick(`filter_${status}`, `篩選狀態: ${status}`);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full tracking-wider transition-all duration-300 ${
              isActive 
                ? 'bg-white text-[#403C35] shadow-xs border border-[#C2A978]/15 font-bold' 
                : 'text-[#8C8372] hover:text-[#403C35]'
            }`}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}
