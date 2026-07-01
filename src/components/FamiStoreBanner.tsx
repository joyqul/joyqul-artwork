import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';

interface FamiStoreBannerProps {
  onTrackClick: (id: string, text: string) => void;
}

export function FamiStoreBanner({ onTrackClick }: FamiStoreBannerProps) {
  return (
    <a
      href="https://famistore.famiport.com.tw/users/4406576"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onTrackClick('famistore_banner', '全家好賣+ 官方賣場')}
      className="mt-6 w-full max-w-sm flex items-center justify-between p-3.5 rounded-2xl border-2 border-dashed border-[#C2A978]/40 bg-white hover:bg-[#C1A877]/5 hover:border-[#C2A978] hover:shadow-[0_4px_20px_rgba(194,169,120,0.1)] active:scale-[0.99] transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#C2A978]/10 flex items-center justify-center text-[#BCA374] shrink-0 group-hover:bg-[#C2A978]/20 transition-colors">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="text-[9px] font-extrabold tracking-wider text-[#C2A978] uppercase bg-[#C2A978]/10 px-1.5 py-0.5 rounded border border-[#C2A978]/15">
            預購日期：7/2 ~ 7/14
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-[#403C35] mt-1 tracking-wide">
            《虛假的戀愛訊號》周邊商品
          </h3>
        </div>
      </div>
      <div className="text-xs font-bold text-[#BCA374] flex items-center gap-1 group-hover:text-[#A68F62] transition-colors pr-1">
        <span>前往預購</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </a>
  );
}
