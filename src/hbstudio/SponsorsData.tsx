import React from 'react';
import { Award, Heart, Sparkles, Star } from 'lucide-react';

interface Sponsor {
  name: string;
  message?: string;
  avatarEmoji?: string;
}

export interface SponsorsDataProps {
  onBackToHome: () => void;
}

const GOLD_SPONSORS: Sponsor[] = [
  { name: "學長的貓奴日記", message: "「薪澤學長，你的非理性衝動，是我追漫的動力！」祝實體化大成功！", avatarEmoji: "🐱" },
  { name: "高能訊號觀測站長", message: "震銳一定要牢牢抓緊學長喔！全套周邊買爆！", avatarEmoji: "📡" },
  { name: "微積分重修三次的阿明", message: "自從看了老師跟鄰居的日常，我的微積分竟然及格了！應援大師！", avatarEmoji: "📐" },
  { name: "匿名大黑龍", message: "在台北交友軟體滑到黑龍的秘密讀者，默默支持龍龍與飄飄！", avatarEmoji: "🐉" },
  { name: "每天都要嗑BL的薪澤推", message: "謝謝玖伊枯老師畫出這麼棒的作品，永遠支持高能訊號工作室！", avatarEmoji: "💖" }
];

const SILVER_SPONSORS: Sponsor[] = [
  { name: "詹震銳首席護衛隊", message: "腹黑忠犬學弟萬歲！" },
  { name: "高能理工腦大一新生", message: "用理性解構戀愛，用熱情支持募資！" },
  { name: "飄飄日常四格狂熱粉", message: "希望四格連載到一百年後！" },
  { name: "高配音廣播劇重播100遍", message: "配音太香了，每天都在重複播放！" },
  { name: "超商預購手速冠軍", message: "開放預購第一分鐘就下單啦！" },
  { name: "假訊號終結者", message: "蕭學長你已經動搖了，認輸吧！" }
];

const BRONZE_SPONSORS: string[] = [
  "小薪澤", "阿銳的好基友", "微積分補習班班長", "龍談戀愛推廣委員會", "超商大夜班店員", 
  "高能電波發射器", "草莓歐蕾半糖去冰", "BL賽高", "傲嬌學長最香了", "高能訊號小助手", 
  "飄飄的畫筆", "黑龍的好夥伴", "耽美萬歲", "台灣原創應援", "虛假戀愛觀測員",
  "漫漫長夜有你真好", "連載催更小組", "薪澤學長親衛隊", "補教名師小跟班", "尋龍使者"
];

const GENERAL_BACKERS: string[] = [
  "讀者A", "匿名支持者", "愛看漫畫的小美", "Webtoon鐵粉", "CXC小精靈", "高能讀者99號", 
  "重度漫畫中毒", "原創耽美愛好者", "微積分保過符", "龍之眼", "台北觀測員", "畫家的小粉紅", 
  "小手拉大手", "學長今天心動了嗎", "心跳一百下", "熱血讀者", "每日一推", "漫畫搜刮家", 
  "實體書敲碗者", "限定周邊必收", "天天看四格", "快樂小讀者", "高能訊號迷", "支持玖伊枯", 
  "連載必追", "台灣BL讚", "支持原創", "忠犬阿銳粉絲"
];

export function SponsorsData({ onBackToHome }: SponsorsDataProps) {
  return (
    <div className="w-full flex flex-col items-center page-view-animation">
      {/* Golden Section */}
      <div className="w-full mb-8">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Award className="w-5 h-5 text-amber-500 animate-pulse" />
          <h3 className="text-sm font-extrabold tracking-widest text-amber-600 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            超凡共鳴級・黃金贊助者
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {GOLD_SPONSORS.map((sponsor, index) => (
            <div 
              key={index}
              className="p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-50/60 to-white shadow-[0_4px_16px_rgba(245,158,11,0.08)] flex gap-3.5 items-start relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-2xl shadow-inner shrink-0 border border-amber-500/20">
                {sponsor.avatarEmoji || "✨"}
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-[#403C35]">{sponsor.name}</h4>
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </div>
                {sponsor.message && (
                  <p className="text-xs text-[#8F8778] mt-1.5 italic leading-relaxed font-medium">
                    {sponsor.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Silver Section */}
      <div className="w-full mb-8">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Heart className="w-5 h-5 text-slate-400" />
          <h3 className="text-sm font-extrabold tracking-widest text-slate-600 uppercase bg-slate-500/10 px-3 py-1 rounded-full border border-slate-500/20">
            心跳連結級・白銀贊助者
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SILVER_SPONSORS.map((sponsor, index) => (
            <div 
              key={index}
              className="p-3.5 rounded-xl border border-slate-300 bg-white shadow-xs flex items-center gap-2.5 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold shrink-0">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[#403C35] truncate">{sponsor.name}</h4>
                {sponsor.message && (
                  <p className="text-[10px] text-[#8F8778] truncate mt-0.5">{sponsor.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bronze Section */}
      <div className="w-full mb-8">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Sparkles className="w-4.5 h-4.5 text-[#C2A978]" />
          <h3 className="text-xs font-extrabold tracking-widest text-[#BCA374] uppercase bg-[#C2A978]/10 px-3 py-1 rounded-full border border-[#C2A978]/20">
            假訊號捕捉級・特別感謝名單
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 justify-center bg-[#FAF8F5]/50 p-4 rounded-2xl border border-[#C2A978]/15">
          {BRONZE_SPONSORS.map((name, index) => (
            <span 
              key={index}
              className="text-xs bg-white text-[#5C564C] px-3 py-1 rounded-lg border border-[#C2A978]/20 shadow-2xs font-medium hover:border-[#C2A978] transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* General Backers Section */}
      <div className="w-full mb-10 text-center">
        <h3 className="text-xs font-bold tracking-widest text-[#A69C8E] uppercase mb-4">
          友情應援級・支持者名冊
        </h3>
        <p className="text-[11px] text-[#8F8778] mb-4 max-w-sm mx-auto leading-relaxed">
          以及所有在各平台默默按讚、分享、收藏、留言，以及前往全家好賣+預購實體周邊的每一位讀者，您的每次關注都是最棒的假訊號共鳴！
        </p>
        <div className="text-[11px] text-[#8F8778]/80 leading-relaxed font-mono flex flex-wrap gap-x-2.5 gap-y-1.5 justify-center max-w-md mx-auto py-3 px-4 border border-[#C2A978]/10 rounded-xl bg-white/40">
          {GENERAL_BACKERS.map((name, index) => (
            <span key={index} className="whitespace-nowrap hover:text-[#BCA374] transition-colors">
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-center mt-4">
        <button
          onClick={onBackToHome}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#C2A978] hover:bg-[#A68F62] text-white text-xs font-extrabold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300"
        >
          返回作品集首頁
        </button>
      </div>
    </div>
  );
}
