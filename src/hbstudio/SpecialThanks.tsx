import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SponsorsData } from './SponsorsData';
import { ArrowLeft, CheckCircle, ExternalLink, Heart, Share2 } from 'lucide-react';
import * as Assets from '../../assets';

interface SpecialThanksProps {
  onBackToHome: () => void;
  onNavigateToComic: (id: string) => void;
  onTrackClick: (id: string, text: string) => void;
}

type CampaignPhase = 'REDIRECT_FORM' | 'THANK_WALL';

const getCampaignPhase = (): CampaignPhase => {
  const now = new Date();
  const dateRedirectStart = new Date("2026-08-08T00:00:00+08:00");
  const dateRedirectEnd = new Date("2026-08-31T23:59:59+08:00");
  if (now >= dateRedirectStart && now <= dateRedirectEnd) {
    return 'REDIRECT_FORM';
  }
  return 'THANK_WALL';
};

export function SpecialThanks({ onBackToHome, onNavigateToComic, onTrackClick }: SpecialThanksProps) {
  const [currentPhase, setCurrentPhase] = useState<CampaignPhase>(getCampaignPhase);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [currentTimeText, setCurrentTimeText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const updateCampaignPhase = () => {
      const now = new Date();
      
      // Taipei Time date parsing (UTC+8)
      const dateRedirectStart = new Date("2026-08-08T00:00:00+08:00");
      const dateRedirectEnd = new Date("2026-08-31T23:59:59+08:00");

      setCurrentTimeText(now.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }));

      // Phase 1: August 8 to August 31, 2026 (Redirect Form)
      if (now >= dateRedirectStart && now <= dateRedirectEnd) {
        if (currentPhase !== 'REDIRECT_FORM') {
          setCurrentPhase('REDIRECT_FORM');
        }
        setIsRedirecting(true);
        // Execute the redirect
        setTimeout(() => {
          window.location.replace("https://forms.gle/K2ZYn2amjA9APRAP7");
        }, 3000);
      }
      // Phase 2: Thank Wall
      else {
        if (currentPhase !== 'THANK_WALL') {
          setCurrentPhase('THANK_WALL');
        }
      }
    };

    updateCampaignPhase();
    // Check every second to keep the clock ticking dynamically
    const interval = setInterval(updateCampaignPhase, 1000);
    return () => clearInterval(interval);
  }, [currentPhase]);

  useLayoutEffect(() => {
    if (currentPhase === 'THANK_WALL') {
      const mainBg = document.getElementById('app-main-container');
      if (mainBg) {
        mainBg.classList.add('bg-stone-950', 'text-stone-200');
        mainBg.classList.remove('bg-[#FAF8F5]', 'text-[#403C35]');
      }
      document.body.style.backgroundColor = '#0c0a09';
      return () => {
        if (mainBg) {
          mainBg.classList.remove('bg-stone-950', 'text-stone-200');
          mainBg.classList.add('bg-[#FAF8F5]', 'text-[#403C35]');
        }
        document.body.style.backgroundColor = '';
      };
    }
  }, [currentPhase]);

  const handleShare = async () => {
    const shareUrl = "https://joyqul.tw/false_love_signal/2026_special_thanks/";
    const shareTitle = "《虛假的戀愛訊號》周邊預購進度 | 玖伊枯 作品集";
    
    onTrackClick('share_special_thanks', '分享特別感謝頁面');

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: "",
          url: shareUrl
        });
      } catch (err) {
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center page-view-animation">
        {/* Top Bar with Navigation & Share Actions */}
      <div className="w-full flex justify-end items-center mb-6">
        {/* Share Button */}
        <button
          onClick={handleShare}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold active:scale-95 transition-all ${
            currentPhase === 'THANK_WALL'
              ? 'border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white hover:border-stone-700'
              : 'border-[#C2A978]/30 bg-white text-[#8F8778] hover:bg-[#C2A978]/10 hover:border-[#C2A978] hover:text-[#403C35]'
          }`}
          id="btn-share-thanks"
        >
          <Share2 className="w-4 h-4 text-[#C2A978]" />
          <span>{copied ? "已複製連結！" : "分享此頁"}</span>
        </button>
      </div>

      {/* Campaign Brand Header */}
      <div className={`w-full text-center flex flex-col items-center mb-8 p-6 rounded-3xl border relative overflow-hidden transition-colors ${
        currentPhase === 'THANK_WALL' 
          ? 'bg-stone-900/90 border-stone-800' 
          : 'bg-white border-[#C2A978]/20 shadow-[0_4px_24px_rgba(194,169,120,0.05)]'
      }`}>
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#C2A978_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.06]" />
        
        {/* Brand logo if available */}
        {Assets.falseLoveSignalHBioSignalLogo ? (
          <img 
            src={Assets.falseLoveSignalHBioSignalLogo} 
            alt="高能訊號工作室 Logo" 
            className={`w-40 object-contain relative z-10 filter drop-shadow-sm ${
              currentPhase === 'THANK_WALL' ? 'mb-2' : 'mb-4'
            }`}
          />
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-extrabold mb-4 border border-indigo-100">
            HB
          </div>
        )}

        {currentPhase === 'THANK_WALL' ? (
          <div className="relative z-10 mt-1">
            <h1 className="text-xs font-extrabold tracking-widest text-[#C2A978] uppercase px-4 py-1.5 rounded-full bg-[#C2A978]/10 border border-[#C2A978]/20 inline-block">
              贊助者名單
            </h1>
          </div>
        ) : (
          <>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#403C35] relative z-10">
              《虛假的戀愛訊號》周邊預購
            </h1>
            <p className="text-xs text-[#8F8778] mt-1.5 relative z-10 max-w-sm">
              周邊企劃專屬頁
            </p>
          </>
        )}

        {/* Campaign Timeline Progress Visualizer */}
        {currentPhase !== 'THANK_WALL' && (
          <div className="w-full mt-6 bg-[#FAF8F5] p-4 rounded-2xl border border-[#C2A978]/10 relative z-10">
            <div className="text-[10px] text-right text-[#A69C8E] font-mono mb-2.5">
              目前台北時間：{currentTimeText || "更新中..."}
            </div>
            <div className="grid grid-cols-4 gap-1 relative">
              {/* Progress line */}
              <div className="absolute top-[14px] left-[12.5%] right-[12.5%] h-0.5 bg-[#C2A978]/20 -z-10" />
              <div 
                className="absolute top-[14px] left-[12.5%] h-0.5 bg-[#C2A978] transition-all duration-1000 -z-10" 
                style={{
                  width: currentPhase === 'REDIRECT_FORM' ? '50%' : '75%'
                }}
              />

              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-7.5 h-7.5 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all bg-white border-[#C2A978]/30 text-[#C2A978]">
                  <CheckCircle className="w-4 h-4 text-[#C2A978]" />
                </div>
                <span className="text-[10px] font-bold mt-1.5 text-[#8F8778]">
                  預購中
                </span>
                <span className="text-[8px] text-[#A69C8E] font-mono mt-0.5">7/2 21:00 PM ~ 7/10</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-7.5 h-7.5 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all bg-white border-[#C2A978]/30 text-[#C2A978]">
                  <CheckCircle className="w-4 h-4 text-[#C2A978]" />
                </div>
                <span className="text-[10px] font-bold mt-1.5 text-[#8F8778]">
                  製作中
                </span>
                <span className="text-[8px] text-[#A69C8E] font-mono mt-0.5">7/10~8/8</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all ${
                  currentPhase === 'REDIRECT_FORM' 
                    ? 'bg-[#C2A978] border-[#C2A978] text-white ring-4 ring-[#C2A978]/10 shadow-sm' 
                    : 'bg-white border-[#C2A978]/30 text-[#C2A978]'
                }`}>
                  {currentPhase === 'THANK_WALL' ? <CheckCircle className="w-4 h-4 text-[#C2A978]" /> : "3"}
                </div>
                <span className={`text-[10px] font-bold mt-1.5 ${currentPhase === 'REDIRECT_FORM' ? 'text-[#403C35]' : 'text-[#8F8778]'}`}>
                  表單填寫
                </span>
                <span className="text-[8px] text-[#A69C8E] font-mono mt-0.5">8/8~8/31</span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all ${
                  currentPhase === 'THANK_WALL' 
                    ? 'bg-[#C2A978] border-[#C2A978] text-white ring-4 ring-[#C2A978]/10 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-400'
                }`}>
                  4
                </div>
                <span className={`text-[10px] font-bold mt-1.5 ${currentPhase === 'THANK_WALL' ? 'text-[#403C35]' : 'text-[#8F8778]'}`}>
                  感謝名單
                </span>
                <span className="text-[8px] text-[#A69C8E] font-mono mt-0.5">8/8起</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Core Dynamic Content Container */}
      <div className={`w-full flex flex-col items-center p-6 sm:p-8 rounded-3xl border transition-colors ${
        currentPhase === 'THANK_WALL'
          ? 'bg-stone-900/90 border-stone-800'
          : 'bg-white border-[#C2A978]/20 shadow-sm'
      }`}>
        
        {/* REDIRECT FORM (August 8 to August 21, 2026) */}
        {currentPhase === 'REDIRECT_FORM' && (
          <div className="w-full flex flex-col items-center text-center page-view-animation">

            <h2 className="text-lg font-black text-[#403C35] mb-2">
              正在為您導向至感謝刮刮樂表單
            </h2>
            <p className="text-xs text-[#8F8778] max-w-sm mb-6 leading-relaxed">
              目前正處於「感謝刮刮樂表單填寫期」(8/8 ~ 8/31)。系統正在將您安全導向至官方 Google 表單，以便填寫您的寄送與贊助者回饋資料。
            </p>

            <div className="flex items-center gap-2 text-xs text-[#BCA374] font-extrabold animate-bounce mb-4">
              <span>若網頁沒有自動跳轉，請點擊下方按鈕：</span>
            </div>

            <a
              href="https://forms.gle/K2ZYn2amjA9APRAP7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#C2A978] hover:bg-[#A68F62] text-white text-xs font-extrabold tracking-widest inline-flex items-center gap-1.5 transition-all"
            >
              <span>手動開啟表單</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* THANK_WALL */}
        {currentPhase === 'THANK_WALL' && (
          <div className="w-full flex flex-col items-center page-view-animation">
            {/* Render SponsorsData list component */}
            <SponsorsData onBackToHome={onBackToHome} isDark={true} />
          </div>
        )}

      </div>

      {/* Link to False Love Signal Comic Page Banner */}
      <button
        onClick={() => {
          onTrackClick('go_to_comic_from_thanks', '從感謝名單頁前往漫畫介紹頁');
          onNavigateToComic('false_love_signal_manga');
        }}
        className={`w-full mt-6 p-4 border rounded-3xl flex items-center justify-between cursor-pointer transition-all duration-300 group text-left ${
          currentPhase === 'THANK_WALL'
            ? 'bg-stone-900/90 hover:bg-stone-800/80 border-stone-800 hover:border-[#C2A978]/60 shadow-none'
            : 'bg-white hover:bg-[#C2A978]/5 border-[#C2A978]/20 hover:border-[#C2A978] shadow-[0_4px_16px_rgba(194,169,120,0.03)]'
        }`}
        id="btn-go-to-comic-detail"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C2A978]/10 text-[#C2A978] flex items-center justify-center text-lg select-none">
            📖
          </div>
          <div className="flex-1">
            <h3 className={`text-xs font-black group-hover:text-[#C2A978] transition-colors leading-tight ${
              currentPhase === 'THANK_WALL' ? 'text-stone-200' : 'text-[#403C35]'
            }`}>
              觀看《虛假的戀愛訊號》漫畫介紹 ➜
            </h3>
            <p className={`text-[10px] mt-1 leading-snug ${
              currentPhase === 'THANK_WALL' ? 'text-stone-400' : 'text-[#8F8778]'
            }`}>
              看故事簡介、角色介紹，以及官方正版線上連載與番外篇連結！
            </p>
          </div>
        </div>
        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all duration-300 shadow-2xs whitespace-nowrap ${
          currentPhase === 'THANK_WALL'
            ? 'text-[#C2A978] bg-black group-hover:bg-[#C2A978] group-hover:text-black border-stone-800'
            : 'text-[#C2A978] bg-[#FAF8F5] group-hover:bg-[#C2A978] group-hover:text-white border-[#C2A978]/15 group-hover:border-[#C2A978]'
        }`}>
          詳細介紹
        </span>
      </button>
      </div>
    </>
  );
}
