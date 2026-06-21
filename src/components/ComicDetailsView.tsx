import React from 'react';
import { ArrowLeft, Share2, BookOpen, ExternalLink } from 'lucide-react';
import { Artwork, ComicDetail } from '../types';
import { SeparateLine } from './SeparateLine';

interface ComicDetailsViewProps {
  mainComic: Artwork;
  detail: ComicDetail | null;
  displayName: string;
  status?: string;
  tags: string[];
  subLinks: Artwork[];
  onBack: () => void;
  onShareComic: () => void;
  onTrackClick: (id: string, text: string, extraParams?: any) => void;
  getArtworkAltText: (id: string, title?: string) => string;
}

export function ComicDetailsView({
  mainComic,
  detail,
  displayName,
  status,
  tags,
  subLinks,
  onBack,
  onShareComic,
  onTrackClick,
  getArtworkAltText
}: ComicDetailsViewProps) {
  return (
    <div className="w-full flex flex-col items-start mt-2 page-view-animation">
      
      {/* Navigation / Back header */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-[#C2A978]/10 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 group text-sm font-semibold text-[#8C8372] hover:text-[#403C35] transition-all bg-stone-100 hover:bg-stone-200/60 px-3.5 py-2 rounded-full shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>返回首頁</span>
        </button>
        
        {/* Share specifically for this comic */}
        <button
          onClick={onShareComic}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#BCA374] hover:text-[#A68F62] bg-[#C2A978]/8 hover:bg-[#C2A978]/15 px-3.5 py-2 rounded-full border border-[#C2A978]/15 transition-all shadow-xs"
          title="分享此作品專頁"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>分享此作品</span>
        </button>
      </div>

      {/* Hero Banner for Separate Comic page */}
      <div className="w-full relative aspect-[2/1] rounded-3xl overflow-hidden shadow-md border border-[#C2A978]/25 mb-6">
        <img
          src={mainComic.imageUrl}
          alt={getArtworkAltText(mainComic.id, displayName)}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Status badge */}
        {status && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#2B2824] text-white text-[10px] sm:text-[11px] font-bold tracking-wider px-3.5 py-1.5 rounded-full shadow-md select-none">
              {status}
            </span>
          </div>
        )}
      </div>

      {/* Descriptive Headers */}
      <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-[#33302B] leading-tight text-left">
        {displayName}
      </h2>

      {/* Hashtag tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          {tags.map((tag, tIdx) => (
            <span 
              key={tIdx} 
              className="text-[10px] text-[#C2A978] bg-[#C2A978]/6 px-2.5 py-0.5 rounded font-medium border border-[#C2A978]/10 select-none"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Long Description */}
      {detail?.description && (
        <p className="text-sm text-[#615B51] mt-4 leading-relaxed tracking-wide text-left max-w-xl">
          {detail.description}
        </p>
      )}

      <SeparateLine className="my-6" />

      {/* Title for links selection */}
      <div className="flex items-center gap-2 mb-1.5">
        <BookOpen className="w-4.5 h-4.5 text-[#BCA374]" />
        <h3 className="text-base sm:text-lg font-bold text-[#33302B] tracking-wide">
          線上閱讀與延伸連結列表
        </h3>
      </div>
      
      <p className="text-xs text-[#8C8372] leading-relaxed mb-4 text-left text-neutral-500">
        走過路過不要錯過，大多數看看都不用錢啊這位人客。
      </p>

      {/* Sublinks Container */}
      <div className="w-full flex flex-col gap-4">
        {/* 1. Main reading link */}
        <a
          href={mainComic.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            onTrackClick(`main_reading_link_${mainComic.id}`, `線上連載: ${displayName}`, { url: mainComic.linkUrl });
          }}
          className="w-full flex items-center justify-between p-4 rounded-2xl border border-[#C2A978]/30 bg-white hover:border-[#C2A978] hover:shadow-[0_8px_24px_rgba(194,169,120,0.08)] hover:-translate-y-[1px] transition-all duration-300 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-[#C2A978]/10 relative">
              <img
                src={mainComic.imageUrl}
                alt="官方線上閱讀"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 text-left">
              <span className="text-[9px] font-bold tracking-wider text-[#C2A978] uppercase bg-[#C2A978]/8 px-1.5 py-0.5 rounded border border-[#C2A978]/10">
                {detail?.mainPlatform || "官方"} 連載首頁
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#403C35] truncate mt-1.5 group-hover:text-[#BCA374] transition-colors">
                《{displayName}》完整內容
              </h4>
              <p className="text-[11px] text-[#8F8778] truncate mt-0.5 max-w-[240px] sm:max-w-md">
                點此前往官方平台線上閱讀完整內容
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FAF8F5] border border-[#C2A978]/20 text-[#BCA374] shrink-0 group-hover:bg-[#C2A978] group-hover:text-white transition-all ml-2">
            <ExternalLink className="w-4 h-4 animate-pulse group-hover:animate-none" />
          </div>
        </a>

        {/* 2. Sublinks mapped */}
        {subLinks.map((subArt) => {
          let label = "幕後花絮與番外";
          let subDesc = "一些幕後五四三或是番外四格";
          
          if (subArt.id.includes('r18')) {
            label = "R18 刪減特典";
            subDesc = "CxC 平台限定：未刪減番外";
          } else if (subArt.id.includes('sound')) {
            label = "配音廣播劇";
            subDesc = "有配音真的不一樣";
          } else if (subArt.id.includes('shorts')) {
            label = "動態短影音";
            subDesc = "沒有配音但也還不錯";
          }

          const finalDesc = subArt.description || subDesc;

          return (
            <a
              key={subArt.id}
              href={subArt.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onTrackClick(`sub_link_${subArt.id}`, `${label}: ${subArt.title}`, { url: subArt.linkUrl });
              }}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-[#C2A978]/20 bg-white hover:border-[#C2A978] hover:shadow-[0_8px_24px_rgba(194,169,120,0.08)] hover:-translate-y-[1px] transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-[#C2A978]/10">
                  <img
                    src={subArt.imageUrl}
                    alt={subArt.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <span className="text-[9px] font-bold tracking-wider text-[#8C8372] uppercase bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-stone-200">
                    {label}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-[#403C35] truncate mt-1.5 group-hover:text-[#BCA374] transition-colors font-sans">
                    {subArt.title}
                  </h4>
                  <p className="text-[11px] text-[#8F8778] truncate mt-0.5 max-w-[240px] sm:max-w-md font-sans">
                    {finalDesc}
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FAF8F5] border border-[#C2A978]/20 text-[#BCA374] shrink-0 group-hover:bg-[#C2A978] group-hover:text-white transition-all ml-2">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom Quick Escape Button */}
      <button
        onClick={onBack}
        className="mt-12 w-full flex items-center justify-center gap-2 py-3 bg-[#FAF8F5] hover:bg-stone-100 text-sm font-semibold text-[#8C8372] hover:text-[#403C35] rounded-xl border border-dashed border-[#C2A978]/30 transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>返回官方作品集首頁</span>
      </button>
    </div>
  );
}
