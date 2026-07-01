import React, { useEffect, useState } from 'react';
import { ArrowLeft, Share2, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { allImages } from '../../assets/2026_special_thanks';

interface GoodsPreviewProps {
  onBackToHome: () => void;
  onNavigateToSpecialThanks: () => void;
  onTrackClick: (id: string, text: string) => void;
}

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

export function GoodsPreview({ onBackToHome, onNavigateToSpecialThanks, onTrackClick }: GoodsPreviewProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showAllImages, setShowAllImages] = useState<boolean>(true); // default to show all for detailed goods page

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
    const shareUrl = "https://joyqul.tw/false_love_signal/2026_goods/";
    const shareTitle = "《虛假的戀愛訊號》預購商品詳細說明頁 | 玖伊枯 作品集";
    
    onTrackClick('share_goods_preview', '分享商品詳細說明頁');

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
            id="btn-back-to-home-goods"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首頁
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C2A978]/30 bg-white hover:bg-[#C2A978]/10 hover:border-[#C2A978] text-xs font-bold text-[#8F8778] hover:text-[#403C35] active:scale-95 transition-all"
            id="btn-share-goods"
          >
            <Share2 className="w-4 h-4 text-[#C2A978]" />
            <span>{copied ? "已複製連結！" : "分享此頁"}</span>
          </button>
        </div>

        {/* Brand Header */}
        <div className="w-full text-center flex flex-col items-center mb-6 bg-white p-6 rounded-3xl border border-[#C2A978]/20 shadow-[0_4px_24px_rgba(194,169,120,0.05)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C2A978_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
          <h1 className="text-xl sm:text-2xl font-serif font-black text-[#403C35] tracking-wide mb-2 leading-tight">
            《虛假的戀愛訊號》周邊詳細說明
          </h1>
          <p className="text-xs text-[#8F8778] leading-relaxed max-w-sm">
            2026 預購商品展示與詳細尺寸、材質及瑕疵退換貨說明。
          </p>
        </div>

        {/* Go to Special Thanks & Progress Page Banner */}
        <button
          onClick={() => {
            onTrackClick('go_to_thanks_from_goods', '從周邊詳細頁前往感謝名單頁');
            onNavigateToSpecialThanks();
          }}
          className="w-full mb-6 p-4 bg-[#FAF8F5] hover:bg-[#C2A978]/5 border border-[#C2A978]/25 rounded-3xl flex items-center justify-between cursor-pointer hover:border-[#C2A978] transition-all duration-300 group text-left shadow-[0_2px_12px_rgba(194,169,120,0.02)]"
          id="btn-go-to-special-thanks"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C2A978]/10 text-[#C2A978] flex items-center justify-center text-lg select-none">
              💝
            </div>
            <div>
              <h3 className="text-xs font-black text-[#403C35] group-hover:text-[#C2A978] transition-colors leading-tight">
                查看 2026 募資進度與感謝名單 ➜
              </h3>
              <p className="text-[10px] text-[#8F8778] mt-1 leading-snug">
                查看印製與寄送進度、特別感謝名單及刮刮樂活動！
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-[#C2A978] bg-white group-hover:bg-[#C2A978] group-hover:text-white px-2.5 py-1 rounded-full border border-[#C2A978]/15 group-hover:border-[#C2A978] transition-all duration-300 shadow-2xs whitespace-nowrap">
            立即前往
          </span>
        </button>

        {/* 2026 Merchandise Showcase Grid Card */}
        <div className="w-full bg-white p-6 sm:p-8 rounded-3xl border border-[#C2A978]/20 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C2A978_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
          
          <div className="w-full flex flex-col items-center text-center relative z-10">
            <p className="text-[11px] text-[#8F8778] max-w-sm mb-6 leading-relaxed">
              和賣場放的圖一樣，點擊任一圖片即可放大高畫質檢視。<br/>支援左右方向鍵切換。
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
                      onTrackClick(`view_goods_image_${meta?.id || index}`, `點擊檢視周邊圖片: ${meta?.title || index}`);
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

            {/* Toggle Expand / Collapse Button (Shown only if images length exceeds 6) */}
            {allImages.length > 6 && (
              <button
                onClick={() => {
                  setShowAllImages(!showAllImages);
                  onTrackClick('toggle_goods_gallery', showAllImages ? '收合商品插畫' : '展開完整商品插畫');
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C2A978] hover:text-[#A68F62] bg-[#C2A978]/5 hover:bg-[#C2A978]/10 border border-[#C2A978]/20 rounded-full px-5 py-2.5 transition-all active:scale-95 cursor-pointer"
              >
                <span>{showAllImages ? "收合圖片" : `展開完整內容 (共 ${allImages.length} 張)`}</span>
              </button>
            )}
          </div>
        </div>
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
