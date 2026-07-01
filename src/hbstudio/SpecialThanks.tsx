import React, { useEffect, useState } from 'react';
import { FamiStoreBanner } from '../components/FamiStoreBanner';
import { SponsorsData } from './SponsorsData';
import { ArrowLeft, Calendar, Hourglass, Package, CheckCircle, ExternalLink, Heart, Share2, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import * as Assets from '../../assets';
import { allImages } from '../../assets/2026_special_thanks';

interface SpecialThanksProps {
  onBackToHome: () => void;
  onTrackClick: (id: string, text: string) => void;
}

type CampaignPhase = 'FUNDRAISING' | 'PRODUCTION' | 'REDIRECT_FORM' | 'THANK_WALL';

const IMAGE_METADATA = [
  { id: 'img01', title: "周邊商品宣傳主頁", category: "" },
  { id: 'img03', title: "Root款", category: "工程師梗T" },
  { id: 'img04', title: "工人智慧款", category: "工程師梗T" },
  { id: 'img05', title: "Dream Job款", category: "工程師梗T" },
  { id: 'img09', title: "衣服尺寸表", category: "工程師梗T" },
  { id: 'img12', title: "拍立得盒子款式", category: "拍立得" },
  { id: 'img13', title: "拍立得", category: "拍立得" },
  { id: 'img14', title: "鐵盒款注意事項", category: "拍立得" },
  { id: 'img15', title: "商品對應小卡", category: "特典" },
  { id: 'img16', title: "感謝刮刮樂", category: "特典" },
  { id: 'img18', title: "兌換說明", category: "特典" },
  { id: 'img20', title: "衣服瑕疵退換貨", category: "FAQ" },
  { id: 'img21', title: "拍立得瑕疵退換貨", category: "FAQ" },
];

export function SpecialThanks({ onBackToHome, onTrackClick }: SpecialThanksProps) {
  const [currentPhase, setCurrentPhase] = useState<CampaignPhase>('FUNDRAISING');
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [currentTimeText, setCurrentTimeText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showAllImages, setShowAllImages] = useState<boolean>(false);
  const [isPreOrderStarted, setIsPreOrderStarted] = useState<boolean>(false);
  const [productionProgress, setProductionProgress] = useState<number>(0);

  useEffect(() => {
    const updateCampaignPhase = () => {
      const now = new Date();
      
      // Taipei Time date parsing (UTC+8)
      const datePreOrderStart = new Date("2026-07-02T21:00:00+08:00");
      const dateFundraisingEnd = new Date("2026-07-10T23:59:59+08:00");
      const dateProductionEnd = new Date("2026-08-08T00:00:00+08:00");
      const dateRedirectStart = new Date("2026-08-08T00:00:00+08:00");
      const dateRedirectEnd = new Date("2026-08-31T23:59:59+08:00");

      setCurrentTimeText(now.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }));
      setIsPreOrderStarted(now >= datePreOrderStart);

      // Calculate production progress dynamically
      const totalProductionMs = dateProductionEnd.getTime() - dateFundraisingEnd.getTime();
      const elapsedProductionMs = now.getTime() - dateFundraisingEnd.getTime();
      
      let progress = 0;
      if (now >= dateProductionEnd) {
        progress = 100;
      } else if (now >= dateFundraisingEnd) {
        progress = Math.min(100, Math.max(0, Math.round((elapsedProductionMs / totalProductionMs) * 100)));
      } else {
        progress = 0;
      }
      setProductionProgress(progress);

      // Phase 1: Before July 10, 2026
      if (now < dateFundraisingEnd) {
        setCurrentPhase('FUNDRAISING');
      }
      // Phase 2: July 10 to August 8, 2026
      else if (now >= dateFundraisingEnd && now < dateProductionEnd) {
        setCurrentPhase('PRODUCTION');
      }
      // Phase 3: August 8 to August 31, 2026
      else if (now >= dateRedirectStart && now <= dateRedirectEnd) {
        setCurrentPhase('REDIRECT_FORM');
        setIsRedirecting(true);
        // Execute the redirect
        setTimeout(() => {
          window.location.replace("https://forms.gle/K2ZYn2amjA9APRAP7");
        }, 3000);
      }
      // Phase 4: After August 31, 2026 (or generally after August 8 when not in redirect)
      else {
        setCurrentPhase('THANK_WALL');
      }
    };

    updateCampaignPhase();
    // Check every second to keep the clock ticking dynamically
    const interval = setInterval(updateCampaignPhase, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedImageIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null && prev < allImages.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allImages.length - 1));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  const handleShare = async () => {
    const shareUrl = "https://joyqul.tw/false_love_signal/2026_special_thanks/";
    const shareTitle = "《虛假的戀愛訊號》周邊預購感謝名單與進度 | 玖伊枯 作品集";
    
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
      <div className="w-full flex justify-between items-center mb-6">
        {/* Go Back button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C2A978]/30 bg-white hover:bg-[#C2A978]/10 hover:border-[#C2A978] text-xs font-bold text-[#8F8778] hover:text-[#403C35] active:scale-95 transition-all"
          id="btn-back-to-home"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首頁
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C2A978]/30 bg-white hover:bg-[#C2A978]/10 hover:border-[#C2A978] text-xs font-bold text-[#8F8778] hover:text-[#403C35] active:scale-95 transition-all"
          id="btn-share-thanks"
        >
          <Share2 className="w-4 h-4 text-[#C2A978]" />
          <span>{copied ? "已複製連結！" : "分享此頁"}</span>
        </button>
      </div>

      {/* Campaign Brand Header */}
      <div className="w-full text-center flex flex-col items-center mb-8 bg-white p-6 rounded-3xl border border-[#C2A978]/20 shadow-[0_4px_24px_rgba(194,169,120,0.05)] relative overflow-hidden">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#C2A978_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.06]" />
        
        {/* Brand logo if available */}
        {Assets.falseLoveSignalHBioSignalLogo ? (
          <img 
            src={Assets.falseLoveSignalHBioSignalLogo} 
            alt="高能訊號工作室 Logo" 
            className="w-40 object-contain mb-4 relative z-10 filter drop-shadow-sm"
          />
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-extrabold mb-4 border border-indigo-100">
            HB
          </div>
        )}

        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#403C35] relative z-10">
          《虛假的戀愛訊號》周邊預購
        </h1>
        <p className="text-xs text-[#8F8778] mt-1.5 relative z-10 max-w-sm">
          {isPreOrderStarted 
            ? "高能訊號工作室 (Hyper Bio-Signal Studio) 周邊企劃專屬頁" 
            : "預購商品詳細說明（預購將於 7/2 晚上九點開始）"}
        </p>

        {/* Campaign Timeline Progress Visualizer */}
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
                width: 
                  !isPreOrderStarted ? '0%' :
                  currentPhase === 'FUNDRAISING' ? '0%' :
                  currentPhase === 'PRODUCTION' ? '25%' :
                  currentPhase === 'REDIRECT_FORM' ? '50%' : '75%'
              }}
            />

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all ${
                currentPhase === 'FUNDRAISING' && isPreOrderStarted
                  ? 'bg-[#C2A978] border-[#C2A978] text-white ring-4 ring-[#C2A978]/10 shadow-sm' 
                  : 'bg-white border-[#C2A978]/30 text-[#C2A978]'
              }`}>
                {currentPhase !== 'FUNDRAISING' ? <CheckCircle className="w-4 h-4 text-[#C2A978]" /> : "1"}
              </div>
              <span className={`text-[10px] font-bold mt-1.5 ${currentPhase === 'FUNDRAISING' && isPreOrderStarted ? 'text-[#403C35]' : 'text-[#8F8778]'}`}>
              預購中
              </span>
              <span className="text-[8px] text-[#A69C8E] font-mono mt-0.5">7/2 21:00 PM ~ 7/10</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all ${
                currentPhase === 'PRODUCTION' 
                  ? 'bg-[#C2A978] border-[#C2A978] text-white ring-4 ring-[#C2A978]/10 shadow-sm' 
                  : currentPhase === 'FUNDRAISING'
                    ? 'bg-white border-slate-200 text-slate-400'
                    : 'bg-white border-[#C2A978]/30 text-[#C2A978]'
              }`}>
                {currentPhase !== 'FUNDRAISING' && currentPhase !== 'PRODUCTION' ? <CheckCircle className="w-4 h-4 text-[#C2A978]" /> : "2"}
              </div>
              <span className={`text-[10px] font-bold mt-1.5 ${currentPhase === 'PRODUCTION' ? 'text-[#403C35]' : 'text-[#8F8778]'}`}>
                製作中
              </span>
              <span className="text-[8px] text-[#A69C8E] font-mono mt-0.5">7/10~8/8</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all ${
                currentPhase === 'REDIRECT_FORM' 
                  ? 'bg-[#C2A978] border-[#C2A978] text-white ring-4 ring-[#C2A978]/10 shadow-sm' 
                  : currentPhase === 'THANK_WALL'
                    ? 'bg-white border-[#C2A978]/30 text-[#C2A978]'
                    : 'bg-white border-slate-200 text-slate-400'
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
      </div>

      {/* Core Dynamic Content Container */}
      {isPreOrderStarted && (
        <div className="w-full flex flex-col items-center bg-white p-6 sm:p-8 rounded-3xl border border-[#C2A978]/20 shadow-sm">
          
          {/* PHASE 1: FUNDRAISING (Before July 10, 2026) */}
          {currentPhase === 'FUNDRAISING' && (
            <div className="w-full flex flex-col items-center text-center page-view-animation">
              <h2 className="text-lg font-black text-[#403C35] mb-2">
                即日起至 7/10 預購中
              </h2>
              <p className="text-xs text-[#8F8778] max-w-sm mb-6 leading-relaxed">
                《虛假的戀愛訊號》實體化周邊預購中！現在就點選下方官方賣場，收藏專專屬於您的心動訊號！
              </p>

              {/* Displaying FamiStoreBanner */}
              <FamiStoreBanner onTrackClick={onTrackClick} />

              <div className="mt-8 text-[11px] text-[#A69C8E] border-t border-slate-100 pt-4 w-full">
                預購完成後，請保留您的訂單資訊，以便後續進度追蹤！
              </div>
            </div>
          )}

          {/* PHASE 2: PRODUCTION (July 10 to August 8, 2026) */}
          {currentPhase === 'PRODUCTION' && (
            <div className="w-full flex flex-col items-center text-center page-view-animation">
              <h2 className="text-lg font-black text-[#403C35] mb-2">
                商品製作中
              </h2>
              <p className="text-xs text-[#8F8778] max-w-sm mb-6 leading-relaxed">
                感謝各位讀者熱烈支持！預購已於 7/10 順利截止，高能訊號工作室已將所有周邊規格提供予工廠，目前進入高規格的「商品製作中」階段。
              </p>

              <div className="w-full max-w-md bg-[#FAF8F5] p-4 rounded-2xl border border-indigo-100 flex flex-col gap-2 text-left">
                <div className="flex justify-between text-xs font-bold text-[#403C35]">
                  <span>印製進度</span>
                  <span className="text-indigo-600">{productionProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${productionProgress}%` }} />
                </div>
                <p className="text-[11px] text-[#8F8778] mt-1">
                  ※ 預計將於 8 月初完成印製並進入包裝流程。後續將於 8/8 開放物流寄送問卷填寫，敬請留意本頁面資訊。
                </p>
              </div>
            </div>
          )}

          {/* PHASE 3: REDIRECT FORM (August 8 to August 31, 2026) */}
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

          {/* PHASE 4: THANK_WALL (After August 8, active when redirect is not active) */}
          {currentPhase === 'THANK_WALL' && (
            <div className="w-full flex flex-col items-center page-view-animation">
              <div className="w-14 h-14 rounded-2xl bg-[#C2A978]/10 text-[#BCA374] flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-[#BCA374]" />
              </div>
              
              <span className="px-3 py-1 rounded-full text-xs font-bold text-[#BCA374] bg-[#C2A978]/10 border border-[#C2A978]/20 mb-2.5">
                感謝贊助 Special Thanks Wall
              </span>
              <h2 className="text-lg font-black text-[#403C35] mb-2 text-center">
                感謝贊助名單
              </h2>
              <p className="text-xs text-[#8F8778] max-w-sm mb-8 text-center leading-relaxed">
                本企劃得以完美實現，皆得益於下列各位高能觀測者、讀者與贊助同仁。你們的每一份能量，都化作了真實的訊號，深表謝忱！
              </p>

              {/* Render SponsorsData list component */}
              <SponsorsData onBackToHome={onBackToHome} />
            </div>
          )}

        </div>
      )}

      {/* 2026 Special Thanks Commemorative Illustration & Merchandise Preview Showcase */}
      {(currentPhase === 'PRODUCTION' || currentPhase === 'REDIRECT_FORM') && (
        <div className="w-full mt-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#C2A978]/20 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C2A978_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
          
          <div className="w-full flex flex-col items-center text-center relative z-10">
            <h2 className="text-base font-black text-[#403C35] mb-1.5">
              預購商品詳細說明頁
            </h2>
            <p className="text-[11px] text-[#8F8778] max-w-sm mb-6 leading-relaxed">
              和賣場放的圖一樣，點擊任一圖片即可放大高畫質檢視。
            </p>

            {/* Grid Layout */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {(showAllImages ? allImages : allImages.slice(0, 6)).map((imgSrc, index) => {
                const meta = IMAGE_METADATA[index];
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      onTrackClick(`view_thanks_image_${meta?.id || index}`, `點擊檢視周邊圖片: ${meta?.title || index}`);
                    }}
                    className="flex flex-col bg-[#FAF8F5]/40 rounded-2xl border border-[#C2A978]/15 hover:border-[#C2A978] overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-300 relative"
                  >
                    {/* Image container */}
                    <div className="w-full aspect-square bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
                      <img
                        src={imgSrc}
                        alt={meta?.title || `周邊展示 ${index + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <span className="text-[10px] text-white font-bold bg-[#C2A978] px-2.5 py-1 rounded-full shadow-sm">
                          放大檢視
                        </span>
                      </div>
                      {/* Category tag */}
                      {meta?.category && (
                        <span className="absolute top-2 left-2 text-[8px] font-bold text-[#8F8778] bg-white/95 px-1.5 py-0.5 rounded border border-[#C2A978]/10 shadow-xs z-10">
                          {meta.category}
                        </span>
                      )}
                    </div>
                    {/* Label */}
                    <div className="p-2.5 text-left border-t border-[#C2A978]/10 bg-white">
                      <h4 className="text-[10px] font-bold text-[#403C35] leading-tight group-hover:text-[#C2A978] transition-colors truncate">
                        {meta?.title || `周邊限定特製 #${index + 1}`}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Toggle Expand / Collapse Button */}
            <button
              onClick={() => {
                setShowAllImages(!showAllImages);
                onTrackClick('toggle_thanks_gallery', showAllImages ? '收合插畫展示' : '展開完整插畫展示');
              }}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C2A978] hover:text-[#A68F62] bg-[#C2A978]/5 hover:bg-[#C2A978]/10 border border-[#C2A978]/20 rounded-full px-5 py-2.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>{showAllImages ? "收合圖片" : `展開完整內容 (共 ${allImages.length} 張)`}</span>
            </button>
          </div>
        </div>
      )}

      </div>

      {/* Lightbox Modal (Fixed overlay) */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close button top right */}
          <button 
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex(null);
            }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Core image area */}
          <div className="relative max-w-5xl w-full flex items-center justify-center px-4 sm:px-12" onClick={(e) => e.stopPropagation()}>
            {/* Prev Button */}
            <button
              className="absolute left-0 sm:left-4 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all active:scale-95 cursor-pointer z-40 hover:bg-white/30"
              onClick={() => setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allImages.length - 1))}
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Active Image */}
            <div className="flex flex-col items-center max-w-full">
              <img
                src={allImages[selectedImageIndex]}
                alt={IMAGE_METADATA[selectedImageIndex]?.title || `周邊展示 ${selectedImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] md:max-h-[85vh] max-w-full rounded-2xl object-contain border border-white/10 shadow-2xl transition-all duration-300"
              />
              
              {/* Image Description Metadata */}
              <div className="mt-4 text-center px-4 bg-black/45 py-2.5 rounded-2xl backdrop-blur-xs border border-white/5 max-w-md">
                <span className="text-[10px] tracking-widest font-bold text-[#C2A978] bg-[#C2A978]/10 border border-[#C2A978]/20 px-2.5 py-0.5 rounded-full">
                  {IMAGE_METADATA[selectedImageIndex]?.category || "限定回饋特典"}
                </span>
                <h3 className="text-white text-sm sm:text-base font-extrabold mt-2">
                  {IMAGE_METADATA[selectedImageIndex]?.title || `周邊限定特製 #${selectedImageIndex + 1}`}
                </h3>
                <p className="text-slate-400 text-[10px] sm:text-xs mt-1 font-mono">
                  圖片 {selectedImageIndex + 1} / {allImages.length}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button
              className="absolute right-0 sm:right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all active:scale-95 cursor-pointer z-40 hover:bg-white/30"
              onClick={() => setSelectedImageIndex((prev) => (prev !== null && prev < allImages.length - 1 ? prev + 1 : 0))}
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
