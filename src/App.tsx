/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Check, 
  Instagram, 
  Facebook, 
  Youtube, 
  Mail, 
  Globe, 
  MessageCircle,
  ArrowLeft,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { INITIAL_PORTFOLIO_DATA, COMIC_DETAILS } from './data';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

interface ImportMeta {
  readonly env: Record<string, string | undefined>;
}

function SeparateLine({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 w-full my-8 select-none ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A978]/70" />
    </div>
  );
}

export default function App() {
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('全部');

  // Read-only frontend state mapped from data file
  const data = INITIAL_PORTFOLIO_DATA;

  // Single-page hybrid router supporting both clean path slugs and fallback hashes
  const [selectedComicId, setSelectedComicId] = useState<string | null>(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (hash.startsWith('#/comic/')) {
      return hash.replace('#/comic/', '');
    }
    const pathMatch = path.match(/\/comic\/([^/]+)/);
    if (pathMatch) {
      return pathMatch[1];
    }
    return null;
  });

  // Seamlessly transition starting hash fragments to beautiful clean subdirectories in address bar
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/comic/')) {
      const id = hash.replace('#/comic/', '');
      window.history.replaceState(null, '', `/comic/${id}/`);
    } else if (selectedComicId) {
      // Keep URL perfectly aligned with static directory slug paths
      window.history.replaceState(null, '', `/comic/${selectedComicId}/`);
    } else {
      window.history.replaceState(null, '', '/');
    }
  }, [selectedComicId]);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      let matchedId: string | null = null;
      
      const pathMatch = path.match(/\/comic\/([^/]+)/);
      if (pathMatch) {
        matchedId = pathMatch[1];
      } else if (hash.startsWith('#/comic/')) {
        matchedId = hash.replace('#/comic/', '');
      }
      setSelectedComicId(matchedId);
    };
    
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToComic = (id: string | null) => {
    if (id) {
      window.history.pushState(null, '', `/comic/${id}/`);
    } else {
      window.history.pushState(null, '', '/');
    }
    setSelectedComicId(id);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Secure dynamic click logger to Google Analytics
  const trackClick = (elementId: string, elementText: string, extraParams = {}) => {
    if (window.gtag) {
      window.gtag('event', 'click_button_or_link', {
        element_id: elementId,
        element_text: elementText,
        ...extraParams,
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    }
  };

  // Helper to generate a clean, web-crawler friendly URL that works with static landing directories
  const getCleanShareUrl = (comicId: string | null) => {
    let basePath = window.location.pathname;
    const comicIndex = basePath.indexOf('/comic/');
    if (comicIndex !== -1) {
      basePath = basePath.substring(0, comicIndex);
    }
    
    const baseDir = basePath.endsWith('/') ? basePath : `${basePath}/`;
    
    if (!comicId) {
      return `${window.location.protocol}//${window.location.host}${basePath || '/'}`;
    }
    return `${window.location.protocol}//${window.location.host}${baseDir}comic/${comicId}/`;
  };

  // Quick Share url trigger
  const triggerShare = () => {
    const shareUrl = getCleanShareUrl(selectedComicId);
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast("網頁連結已複製到剪貼簿！");
    trackClick('share_portal_button', '分享連結');
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

  // Helper to generate highly descriptive alt-tags for SEO and image indexes
  const getArtworkAltText = (id: string, title?: string) => {
    const formattedTitle = title && title.trim().length > 0 ? `${title} - ` : "";
    switch (id) {
      case 'false_love_signal_manga':
        return `${formattedTitle}虛假的戀愛訊號 - LINE Webtoon 耽美漫畫 | 玖伊枯 Joyqul 友情與愛情的假訊號 (joyqul.tw)`;
      case 'false_love_signal_r18':
        return `虛假的戀愛訊號 R18 刪減番外篇 | 玖伊枯 (Joyqul) 中文耽美漫畫創作`;
      case 'false_love_signal_manga_sound':
        return `虛假的戀愛訊號 有配音廣播劇短片 / 友情與愛情的假訊號 影片 | 玖伊枯 (Joyqul) 出品`;
      case 'false_love_signal_ext':
        return `虛假的戀愛訊號 幕後製作花絮與番外篇 | 玖伊枯 (Joyqul) 原創BL`;
      case 'false_love_signal_shorts':
        return `虛假的戀愛訊號 動態 YouTube Shorts 漫畫短影音集 | 玖伊枯 (Joyqul)`;
      case 'calculus_manga':
        return `${formattedTitle}過氣男優的我竟然成為了微積分補教名師 - LINE Webtoon人氣耽美完結漫畫 | 玖伊枯 (Joyqul) 原創BL作品`;
      case 'calculus_r18':
        return `過氣男優的我竟然成為了微積分補教名師 R18 刪減特典番外篇 | 玖伊枯 (Joyqul)`;
      case 'calculus_ext':
        return `過氣男優的我竟然成為了微積分補教名師 番外篇 經典同居30題 | 玖伊枯 (Joyqul)`;
      case 'how_to_date_a_dragon_manga':
        return `${formattedTitle}要怎麼跟龍談戀愛 - CxC最新超人氣原創耽美連載漫畫 | 玖伊枯 (Joyqul)`;
      case 'joyqul_daily_manga':
        return `${formattedTitle}玖伊枯日常四格漫畫 | 玖伊枯 (Joyqul) 爆笑日常生活與創作花絮 (joyqul.tw)`;
      default:
        return title ? `${title} - 玖伊枯 Joyqul BL耽美作品` : "玖伊枯 Joyqul 耽美原創插畫漫畫創作";
    }
  };

  // Find currently selected comic details and resources
  const mainComic = selectedComicId ? data.artworks.find(art => art.id === selectedComicId) : null;
  const detail = selectedComicId ? COMIC_DETAILS[selectedComicId] : null;
  const displayName = detail ? detail.title : (mainComic ? mainComic.title : "");
  const status = detail?.status || mainComic?.status;
  const tags = detail?.tags || mainComic?.tags || [];

  // Filter associated normal artworks by ID prefix
  const subLinks = selectedComicId ? data.artworks.filter(
    (art) => art.canvasType === 'normal' && art.id.startsWith(selectedComicId.split('_manga')[0])
  ) : [];

  // Google Analytics secure dynamic loading & configuration without automatic default pageview
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!gaId) return;

    const scriptId = 'google-analytics-gtag';
    const initScriptId = 'google-analytics-gtag-init';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      const scriptInit = document.createElement('script');
      scriptInit.id = initScriptId;
      scriptInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${gaId}', { 
          'anonymize_ip': true, 
          'cookie_flags': 'SameSite=None;Secure',
          'send_page_view': false 
        });
      `;
      document.head.appendChild(scriptInit);
    }
  }, []);

  // Update browser tab title dynamically based on routing state & dispatch manual page_view events to GA
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    const pagePath = selectedComicId ? `/comic/${selectedComicId}/` : '/';
    const pageTitle = selectedComicId && displayName 
      ? `《${displayName}》線上連載與延伸連結 | 玖伊枯 作品集` 
      : "玖伊枯 | 作品集";
    
    const pageDesc = selectedComicId && displayName
      ? `《${displayName}》線上連載以及其他連結。${detail?.description || mainComic?.description || ''}`
      : "台灣BL漫畫家玖伊枯的個人官方網站與作品集門戶。收錄熱門連載代表作：《虛假的戀愛訊號》、《過氣男優的我竟然成為了微積分補教名師》、《要怎麼跟龍談戀愛》閱讀渠道與最新延伸作畫日常。";

    // Obtain image URL from the current comic data fallback to default avatar
    const rawImage = mainComic?.imageUrl || '/assets/joyqul_avatar.webp';
    
    // Normalize path to strip './' or double leading slashes which confuse social crawlers and search index bots
    let cleanAssetPath = rawImage;
    if (cleanAssetPath.startsWith('./')) {
      cleanAssetPath = cleanAssetPath.substring(2);
    }
    if (cleanAssetPath.startsWith('/')) {
      cleanAssetPath = cleanAssetPath.substring(1);
    }
    
    const pageImage = rawImage.startsWith('http') 
      ? rawImage 
      : `https://joyqul.tw/${cleanAssetPath}`;

    const pageUrl = selectedComicId 
      ? `https://joyqul.tw/comic/${selectedComicId}/`
      : 'https://joyqul.tw/';

    // Update document title first
    if (selectedComicId && displayName) {
      document.title = `《${displayName}》線上連載與延伸連結 | 玖伊枯 作品集 (joyqul.tw)`;
    } else {
      document.title = "玖伊枯 | 作品集 (joyqul.tw)";
    }

    // Helper function to dynamically update or create meta elements in head (highly effective for JS-capable parsers)
    const updateMeta = (nameOrProperty: string, content: string, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('og:title', pageTitle);
    updateMeta('og:description', pageDesc);
    updateMeta('og:image', pageImage);
    updateMeta('og:url', pageUrl);
    updateMeta('twitter:title', pageTitle, true);
    updateMeta('twitter:description', pageDesc, true);
    updateMeta('twitter:image', pageImage, true);
    updateMeta('description', pageDesc, true);

    // Securely dispatch manual page view to Google Analytics if initialized
    if (gaId && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
        send_to: gaId,
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    }
  }, [selectedComicId, displayName, detail, mainComic]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#403C35] font-sans pb-24 relative selection:bg-[#C2A978]/30 selection:text-[#403C35]">
      
      {/* Search Engine Optimization (SEO) Semantic Content - Invisible but fully indexed by search engines */}
      <div className="sr-only">
        <h2>Joyqul 玖伊枯 | 官方原創 BL 漫畫作品集門戶 (joyqul.tw)</h2>
        <p>歡迎來到台灣人氣原創 BL 耽美漫畫家與四格日常插畫創作者 Joyqul (玖伊枯) 官方門戶網站。本站專為搜尋作品集的讀者提供最直接、高速的官方連載渠道連結。</p>
        
        <h3>代表作列表與介紹：</h3>
        <ul>
          <li><strong>虛假的戀愛訊號 (False Love Signals)</strong>：於知名平台 LINE Webtoon 熱烈連載的高人氣青春耽美漫畫。講述看似忠犬腹黑學弟攻與理工腦學長受之間的青春心動愛情。</li>
          <li><strong>過氣男優的我竟然成為了微積分補教名師</strong>：在 LINE Webtoon 獲得超高點閱的耽美完結佳作。描繪了容易害羞又忠犬的可愛學弟攻與誘受學長在微積分補教界擦出的浪漫火花。</li>
          <li><strong>要怎麼跟龍談戀愛</strong>：在 CXC 熱烈連載的原創奇幻BL漫畫，講述天然撩學弟攻與容易害羞學長受之間心跳難耐的戀愛喜劇故事。</li>
          <li><strong>玖伊枯日常四格</strong>：Joyqul 的爆笑個人日常生活與作畫花絮四格漫畫。</li>
        </ul>
        
        <p>此網址 (joyqul.tw) 提供所有最新官方線上閱讀連結及延伸作品，包含 CXC R18 刪減特典、有配音的推廣影片、背景製作花絮、日常 Webtoon Shorts 影片等。是您追蹤 玖伊枯 (Joyqul) 系列巨作的第一首選入口。</p>
      </div>

      {/* Dynamic Toast Popup */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A26] text-[#F9F7F2] font-medium text-xs px-5 py-3 rounded-full shadow-xl flex items-center gap-2 animate-fade-in transition-all">
          <Check className="w-4 h-4 text-[#C2A978]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main minimalist Portaly canvas container */}
      <div className="max-w-xl mx-auto px-5 pt-8">
        
        {selectedComicId === null ? (
          /* INDEX STATE (Main Profile + Comic List) */
          <div className="text-center flex flex-col items-center">
            
            {/* Top bar with Share */}
            <div className="w-full flex items-center justify-end mb-8 opacity-95">
              <button
                onClick={triggerShare}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-black/5 active:scale-95 transition-all text-[#BCA374]"
                title="分享連結"
              >
                <Share2 className="w-5.5 h-5.5 stroke-[1.8]" />
              </button>
            </div>

            {/* Circular double lined avatar block */}
            <div className="p-1 border border-[#C2A978]/60 rounded-full">
              <div className="p-1 border-2 border-[#C2A978] rounded-full overflow-hidden w-28 h-28 sm:w-32 sm:h-32 bg-white flex items-center justify-center shadow-inner">
                <img
                  src={data.profile.avatarUrl}
                  alt="Joyqul 玖伊枯 - 官方作品集與頭像門戶網站 (joyqul.tw)"
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
                    onClick={() => trackClick(`social_${soc.platform}`, soc.label, { url: soc.url })}
                    className="w-11 h-11 rounded-full flex items-center justify-center bg-transparent border border-[#C2A978]/40 hover:border-[#C2A978] text-[#BCA374] hover:bg-[#C2A978]/10 hover:shadow-xs hover:scale-105 duration-200 transition-all"
                    title={soc.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center justify-center gap-1.5 mt-8 p-1 bg-[#EEEDE9] rounded-full max-w-[280px] w-full self-center">
              {['全部', '連載中', '已完結'].map((status) => {
                const isActive = statusFilter === status;
                return (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      trackClick(`filter_${status}`, `篩選狀態: ${status}`);
                    }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-full tracking-wider transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-[#403C35] shadow-xs border border-[#C2A978]/15 font-bold' 
                        : 'text-[#8C8372] hover:text-[#403C35]'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>

            {/* Elegant Comic Series List */}
            <div className="w-full flex flex-col mt-2">
              {data.artworks
                .filter((art) => art.canvasType === 'wide')
                .filter((art) => {
                  if (statusFilter === '全部') return true;
                  const comicDetail = COMIC_DETAILS[art.id];
                  const comicStatus = comicDetail?.status || art.status;
                  return comicStatus === statusFilter;
                })
                .map((art) => {
                  const comicDetail = COMIC_DETAILS[art.id];
                  const comicTitle = comicDetail ? comicDetail.title : art.title;
                  const comicStatus = comicDetail?.status || art.status;
                  const comicTags = comicDetail?.tags || art.tags || [];

                  return (
                    <div key={art.id} className="w-full flex flex-col">
                      <SeparateLine className="my-6" />
                      
                      {/* Interactive Showcase Card */}
                      <button
                        onClick={() => {
                          navigateToComic(art.id);
                          trackClick(`comic_card_image_${art.id}`, `動態卡片: ${comicTitle}`);
                        }}
                        className="block text-left relative w-full aspect-[2/1] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(45,30,10,0.06)] border border-[#C2A978]/25 group cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] duration-300"
                      >
                        {/* Background Artwork */}
                        <img
                          src={art.imageUrl}
                          alt={getArtworkAltText(art.id, comicTitle)}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />

                        {/* Status overlay badge */}
                        {comicStatus && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="bg-[#2B2824]/90 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm select-none">
                              {comicStatus}
                            </span>
                          </div>
                        )}

                        {/* Hover Overlay Prompt */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-white/95 backdrop-blur-xs text-[#403C35] text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-[#C2A978]/20 flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                            <BookOpen className="w-4 h-4 text-[#BCA374]" />
                            查看更多
                          </span>
                        </div>
                      </button>

                      {/* Text Title Block Underneath Card */}
                      <div className="mt-4 flex flex-col items-start px-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            onClick={() => {
                              navigateToComic(art.id);
                              trackClick(`comic_card_title_${art.id}`, `卡片標題: ${comicTitle}`);
                            }}
                            className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-[#33302B] hover:text-[#BCA374] transition-colors text-left font-semibold"
                          >
                            {comicTitle}
                          </button>
                        </div>

                        {/* Rich Description */}
                        {comicDetail?.description && (
                          <p className="text-xs sm:text-sm text-[#615B51] mt-2 leading-relaxed tracking-wide text-left max-w-lg">
                            {comicDetail.description}
                          </p>
                        )}

                        {/* Hashtag tags */}
                        {comicTags && comicTags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-3">
                            {comicTags.map((tag, tIdx) => (
                              <span 
                                key={tIdx} 
                                className="text-[10px] text-[#C2A978] bg-[#C2A978]/8 px-2.5 py-1 rounded-md font-medium tracking-wide border border-[#C2A978]/10 select-none"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Always visible '查看更多' link (especially optimized for mobile/touch screens) */}
                        <button
                          onClick={() => {
                            navigateToComic(art.id);
                            trackClick(`comic_card_link_${art.id}`, `查看更多: ${comicTitle}`);
                          }}
                          className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#BCA374] hover:text-[#A68F62] transition-colors cursor-pointer group/link self-start"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span className="underline underline-offset-4 decoration-[#C2A978]/60 hover:decoration-[#C2A978] tracking-wider transition-colors">
                            查看更多
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

          </div>
        ) : (
          /* SEPARATE WORKS PORTAL VIEW */
          mainComic && (
            <div className="w-full flex flex-col items-start mt-2 page-view-animation">
              
              {/* Navigation / Back header */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-[#C2A978]/10 mb-6">
                <button
                  onClick={() => {
                    navigateToComic(null);
                    trackClick('back_to_home_top', '返回首頁');
                  }}
                  className="flex items-center gap-1.5 group text-sm font-semibold text-[#8C8372] hover:text-[#403C35] transition-all bg-stone-100 hover:bg-stone-200/60 px-3.5 py-2 rounded-full shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span>返回首頁</span>
                </button>
                
                {/* Share specifically for this comic */}
                <button
                  onClick={() => {
                    const shareUrl = getCleanShareUrl(selectedComicId);
                    navigator.clipboard.writeText(shareUrl);
                    showToast(`已複製《${displayName || '作品'}》特別連結，可分享至社群平台！`);
                    trackClick(`share_comic_${selectedComicId}`, `分享作品: ${displayName}`);
                  }}
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
                    trackClick(`main_reading_link_${mainComic.id}`, `線上連載: ${displayName}`, { url: mainComic.linkUrl });
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
                        trackClick(`sub_link_${subArt.id}`, `${label}: ${subArt.title}`, { url: subArt.linkUrl });
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
                onClick={() => {
                  navigateToComic(null);
                  trackClick('back_to_home_bottom', '返回官方作品集首頁');
                }}
                className="mt-12 w-full flex items-center justify-center gap-2 py-3 bg-[#FAF8F5] hover:bg-stone-100 text-sm font-semibold text-[#8C8372] hover:text-[#403C35] rounded-xl border border-dashed border-[#C2A978]/30 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回官方作品集首頁</span>
              </button>
            </div>
          )
        )}

        {/* Simple footer of the page */}
        <footer className="mt-16 text-center text-[10px] text-[#A69C8E] font-mono tracking-wider">
          <p>© 2026 {data.profile.name} All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}
