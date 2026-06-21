import React from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';

interface RecommendationBannerProps {
  onStartQuiz: () => void;
  onTrackClick: (id: string, text: string) => void;
}

export function RecommendationBanner({ onStartQuiz, onTrackClick }: RecommendationBannerProps) {
  return (
    <button
      onClick={() => {
        onStartQuiz();
        onTrackClick('homepage_quiz_banner_start', '首頁推薦測驗入口');
      }}
      className="mt-6 w-full max-w-sm flex items-center justify-between p-4 rounded-2xl border border-[#C2A978]/30 bg-radial from-white to-[#FAF8F5] relative overflow-hidden shadow-[0_4px_16px_rgba(194,169,120,0.06)] hover:border-[#C2A978] hover:shadow-[0_4px_24px_rgba(194,169,120,0.12)] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
    >
      {/* Decorative animated sparkles in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#C2A978]/3 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      
      {/* Absolute floating micro-animated sparkles */}
      <span className="absolute top-2 right-4 text-xs animate-bounce" style={{ animationDuration: '3s' }}>✨</span>
      <span className="absolute bottom-2 left-3 text-xs animate-pulse" style={{ animationDuration: '4s' }}>✨</span>

      <div className="flex items-center gap-3.5 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C2A978]/15 to-[#DFCBB4]/25 flex items-center justify-center text-[#BCA374] shrink-0 group-hover:scale-105 duration-300 transition-transform">
          <HelpCircle className="w-5.5 h-5.5 animate-pulse" />
        </div>
        <div className="text-left">
          <span className="text-[9px] font-extrabold tracking-wider text-[#C2A978] uppercase bg-[#C2A978]/12 px-2 py-0.5 rounded border border-[#C2A978]/15">
            推薦指南
          </span>
          <h3 className="text-xs sm:text-sm font-black text-[#403C35] mt-1 tracking-wide flex items-center gap-1">
            不知道從哪一作開始看起？
          </h3>
        </div>
      </div>

      <div className="text-xs font-bold text-[#BCA374] flex items-center gap-1.5 group-hover:text-[#A68F62] transition-colors pr-1 relative z-10 shrink-0">
        <span className="underline underline-offset-4 decoration-[#C2A978]/50 group-hover:decoration-[#C2A978] transition-all">
          尋求命定推薦
        </span>
        <Sparkles className="w-4 h-4 text-[#C2A978] group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
      </div>
    </button>
  );
}
