import React from 'react';
import { Heart } from 'lucide-react';

interface Sponsor {
  name: string;
  message?: string;
}

export interface SponsorsDataProps {
  onBackToHome: () => void;
  isDark?: boolean;
}

const SPONSORS_WITH_MESSAGES: Sponsor[] = [
  { name: "tracy", message: "老師我愛你！" },
  { name: "大雨", message: "大家一起rm -rf :D" },
  { name: "kk24", message: "兩件衣服跟拍立得套組都很喜歡，沒想到還有這麼多小禮物！很多很可愛很有趣的小東西XD 謝謝老師！ 這次的完結周邊真的收得很滿足(ˉ︶ˉ)⁄ 老師的作品很棒，會繼續支持的~" },
  { name: "lisa", message: "好棒好棒 也謝謝有台配 有台配後看漫畫自動代入聲音 也更享受了 衣服很舒服" },
  { name: "Iceborne", message: "感謝創作，希望不久後還有新作品能看！" },
  {name: "橙魚", message: "謝謝老師帶來這麼棒的故事和好可愛的他們❤️🤲🏻"},
];

export function SponsorsData({ onBackToHome, isDark = false }: SponsorsDataProps) {
  return (
    <div className="w-full flex flex-col items-center page-view-animation">
      {/* Unified Sponsors Section */}
      <div className="w-full mb-8">
        {/* Sponsor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {SPONSORS_WITH_MESSAGES.map((sponsor, index) => (
            <div 
              key={index}
              className={`p-4 rounded-2xl border flex gap-3 items-start text-left relative overflow-hidden group transition-all ${
                isDark
                  ? 'border-stone-800 bg-stone-900/80 hover:border-[#C2A978]/60 shadow-none'
                  : 'border-[#C2A978]/25 bg-gradient-to-br from-[#FAF8F5] to-white shadow-[0_2px_12px_rgba(194,169,120,0.06)] hover:border-[#C2A978]'
              }`}
            >
              <div className="min-w-0 flex-1">
                <h4 className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-[#403C35]'}`}>{sponsor.name}</h4>
                {sponsor.message && (
                  <p className={`text-xs mt-1 italic leading-relaxed ${isDark ? 'text-stone-400' : 'text-[#8F8778]'}`}>
                    {sponsor.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Thank You Note */}
        <div className={`p-5 rounded-2xl border text-center transition-colors ${
          isDark
            ? 'bg-stone-900/80 border-stone-800 text-stone-400'
            : 'bg-[#FAF8F5] border-[#C2A978]/15 text-[#8F8778]'
        }`}>
          <p className="text-[11px] max-w-md mx-auto leading-relaxed">
            以及所有選擇匿名贊助、在各平台默默按讚、分享、收藏、留言的每一位讀者！
          </p>
        </div>
      </div>
    </div>
  );
}

