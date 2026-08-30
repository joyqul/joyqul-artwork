import React, { useLayoutEffect, useState } from 'react';
import { SponsorsData } from './SponsorsData';
import { Share2 } from 'lucide-react';
import * as Assets from '../../assets';

interface SpecialThanksProps {
  onBackToHome: () => void;
  onNavigateToComic: (id: string) => void;
  onTrackClick: (id: string, text: string) => void;
}

export function SpecialThanks({ onBackToHome, onNavigateToComic, onTrackClick }: SpecialThanksProps) {
  const [copied, setCopied] = useState<boolean>(false);

  useLayoutEffect(() => {
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
  }, []);

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold active:scale-95 transition-all border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white hover:border-stone-700"
            id="btn-share-thanks"
          >
            <Share2 className="w-4 h-4 text-[#C2A978]" />
            <span>{copied ? "已複製連結！" : "分享此頁"}</span>
          </button>
        </div>

        {/* Campaign Brand Header */}
        <div className="w-full text-center flex flex-col items-center mb-8 p-6 rounded-3xl border relative overflow-hidden transition-colors bg-stone-900/90 border-stone-800">
          {/* Decorative background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#C2A978_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.06]" />
          
          {/* Brand logo */}
          {Assets.falseLoveSignalHBioSignalLogo ? (
            <img 
              src={Assets.falseLoveSignalHBioSignalLogo} 
              alt="高能訊號工作室 Logo" 
              className="w-40 object-contain relative z-10 filter drop-shadow-sm mb-2"
            />
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-extrabold mb-4 border border-indigo-100">
              HB
            </div>
          )}

          <div className="relative z-10 mt-1">
            <h1 className="text-xs font-extrabold tracking-widest text-[#C2A978] uppercase px-4 py-1.5 rounded-full bg-[#C2A978]/10 border border-[#C2A978]/20 inline-block">
              贊助者名單
            </h1>
          </div>
        </div>

        {/* Core Dynamic Content Container */}
        <div className="w-full flex flex-col items-center p-6 sm:p-8 rounded-3xl border transition-colors bg-stone-900/90 border-stone-800">
          <div className="w-full flex flex-col items-center page-view-animation">
            {/* Render SponsorsData list component */}
            <SponsorsData onBackToHome={onBackToHome} isDark={true} />
          </div>
        </div>

        {/* Link to False Love Signal Comic Page Banner */}
        <button
          onClick={() => {
            onTrackClick('go_to_comic_from_thanks', '從感謝名單頁前往漫畫介紹頁');
            onNavigateToComic('false_love_signal_manga');
          }}
          className="w-full mt-6 p-4 border rounded-3xl flex items-center justify-between cursor-pointer transition-all duration-300 group text-left bg-stone-900/90 hover:bg-stone-800/80 border-stone-800 hover:border-[#C2A978]/60 shadow-none"
          id="btn-go-to-comic-detail"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C2A978]/10 text-[#C2A978] flex items-center justify-center text-lg select-none">
              📖
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-black group-hover:text-[#C2A978] transition-colors leading-tight text-stone-200">
                觀看《虛假的戀愛訊號》漫畫介紹 ➜
              </h3>
              <p className="text-[10px] mt-1 leading-snug text-stone-400">
                看故事簡介、角色介紹，以及官方正版線上連載與番外篇連結！
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all duration-300 shadow-2xs whitespace-nowrap text-[#C2A978] bg-black group-hover:bg-[#C2A978] group-hover:text-black border-stone-800">
            詳細介紹
          </span>
        </button>
      </div>
    </>
  );
}
