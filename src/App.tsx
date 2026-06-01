/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Share2, 
  Check, 
  Instagram, 
  Facebook, 
  Youtube, 
  Mail, 
  Globe, 
  MessageCircle,
} from 'lucide-react';
import { INITIAL_PORTFOLIO_DATA } from './data';

function SeparateLine({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 w-full my-8 select-none ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/40" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/55" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/55" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/40" />
    </div>
  );
}

export default function App() {
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Read-only frontend state mapped from data file
  const data = INITIAL_PORTFOLIO_DATA;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Quick Share url trigger
  const triggerShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast("網頁連結已複製到剪貼簿！");
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper mapping platform key to lucide icons
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return Instagram;
      case 'facebook':
        return Facebook;
      case 'youtube':
        return Youtube;
      case 'email':
        return Mail;
      case 'threads':
        return MessageCircle;
      default:
        return Globe;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#403C35] font-sans pb-24 relative selection:bg-[#C2A978]/30 selection:text-[#403C35]">
      
      {/* Dynamic Toast Popup */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A26] text-[#F9F7F2] font-medium text-xs px-5 py-3 rounded-full shadow-xl flex items-center gap-2 animate-fade-in transition-all">
          <Check className="w-4 h-4 text-[#C2A978]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main minimalist Portaly canvas container */}
      <div className="max-w-xl mx-auto px-5 pt-8">
        
        {/* Top bar with Share, Grid and Bookmark buttons as shown in design reference */}
        <div className="flex items-center justify-between mb-8 opacity-95">
          <div className="flex items-center gap-2">
            {/* Share action button */}
            <button
              onClick={triggerShare}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-black/5 active:scale-95 transition-all text-[#BCA374]"
              title="分享連結"
            >
              <Share2 className="w-5.5 h-5.5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* Profile Bio Row */}
        <div className="text-center flex flex-col items-center">
          
          {/* Circular double lined avatar block */}
          <div className="p-1 border border-[#C2A978]/60 rounded-full">
            <div className="p-1 border-2 border-[#C2A978] rounded-full overflow-hidden w-28 h-28 sm:w-32 sm:h-32 bg-white flex items-center justify-center shadow-inner">
              <img
                src={data.profile.avatarUrl}
                alt={data.profile.name}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Name & Subheadings */}
          <h1 className="text-2xl font-bold tracking-wide text-[#33302B] mt-5 font-sans">
            {data.profile.name}
          </h1>

          <div className="mt-2.5 flex flex-col gap-1.5 font-sans">
            {data.profile.subheading.split('|').map((line, idx) => (
              <p 
                key={idx} 
                className={`text-sm font-medium ${idx === 0 ? 'text-[#615B51]' : 'text-[#7A746B]'}`}
              >
                {line.trim()}
              </p>
            ))}
          </div>

          {/* Golden Social portal icons centered row */}
          <div className="flex flex-wrap items-center justify-center gap-4.5 mt-6 px-4">
            {data.socials.map((soc) => {
              const Icon = getSocialIcon(soc.platform);
              return (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-transparent border border-[#C2A978]/40 hover:border-[#C2A978] text-[#BCA374] hover:bg-[#C2A978]/10 hover:shadow-xs hover:scale-105 duration-200 transition-all"
                  title={soc.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Gorgeous Artwork previews list feed */}
          <div className="w-full grid grid-cols-2 gap-4">
            
            {data.artworks.map((art, idx) => {
              const isWide = art.canvasType === 'wide';

              if (isWide) {
                return (
                  <React.Fragment key={art.id}>
                  <SeparateLine className="col-span-2" />
                    <a
                      href={art.linkUrl || "#"}
                      target={art.linkUrl ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="col-span-2 block relative w-full aspect-[16/9.5] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(45,30,10,0.06)] border border-[#C2A978]/25 group cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] duration-300"
                    >
                      {/* Background Artwork */}
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />

                      {/* Status overlay badge */}
                      {art.status && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#2B2824]/95 backdrop-blur-xs text-secondary-50 text-[11px] font-bold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm text-white select-none">
                            {art.status}
                          </span>
                        </div>
                      )}

                      {/* Rich Bottom gradient block */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-left flex flex-col justify-end text-white">
                        
                        {/* Serif Stylized Title */}
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold tracking-wide text-[#FAF8F5] drop-shadow-md leading-tight mb-2">
                          {art.title}
                        </h2>
                        
                        {/* Interactive description and hashtag line */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-end gap-2.5 mt-0.5 w-full">
                          {art.tags && art.tags.length > 0 && (
                            <span className="text-[10px] text-white font-medium tracking-wide whitespace-nowrap drop-shadow-xs truncate shrink-0 sm:pb-0.5 ml-auto">
                              {art.tags.map(tag => `#${tag}`).join(' ')}
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  </React.Fragment>
                );
              }

              // RENDER normal items side by side in a gorgeous grid layout
              return (
                <a
                  key={art.id}
                  href={art.linkUrl || "#"}
                  target={art.linkUrl ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="col-span-1 block relative aspect-square sm:aspect-[1.1] rounded-3xl overflow-hidden shadow-[0_6px_18px_rgba(45,30,10,0.04)] border border-[#C2A978]/25 flex flex-col justify-between bg-[#FCFAF7] group cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] duration-300"
                >
                  {/* Upper Image Box */}
                  <div className="relative flex-1 overflow-hidden bg-stone-100">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Status overlay badge */}
                    {art.status && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#2B2824]/95 backdrop-blur-xs text-[10px] sm:text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white select-none">
                          {art.status}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Gold Block Footer block */}
                  <div className="bg-[#C2A978] py-2.5 px-3 text-center transition-colors group-hover:bg-[#BCA374]">
                    <span className="block text-xs font-semibold text-[#FCFAF7] truncate tracking-wide">
                      {art.title}
                    </span>
                  </div>
                </a>
              );
            })}

          </div>

          {/* Simple footer of the page */}
          <footer className="mt-16 text-center text-[10px] text-[#A69C8E] font-mono tracking-wider">
            <p>© 2026 {data.profile.name} All rights reserved.</p>
          </footer>

        </div>
      </div>
    </div>
  );
}
