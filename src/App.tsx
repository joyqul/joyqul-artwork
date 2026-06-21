/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_PORTFOLIO_DATA, COMIC_DETAILS } from './data';

// Import our newly extracted modular, small components
import { Toast } from './components/Toast';
import { SEOSemantic } from './components/SEOSemantic';
import { ProfileHeader } from './components/ProfileHeader';
import { FamiStoreBanner } from './components/FamiStoreBanner';
import { StatusFilters } from './components/StatusFilters';
import { ComicList } from './components/ComicList';
import { ComicDetailsView } from './components/ComicDetailsView';
import { RecommendationQuiz } from './components/RecommendationQuiz';
import { RecommendationBanner } from './components/RecommendationBanner';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default function App() {
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('全部');

  // Read-only frontend state mapped from data file
  const data = INITIAL_PORTFOLIO_DATA;

  // Active banner duration check (July 1st to July 14th, 2026 inclusive, in Taipei Time / UTC+8)
  const isFamiStoreActive = (): boolean => {
    const now = new Date();
    const start = new Date("2026-07-01T00:00:00+08:00");
    const end = new Date("2026-07-14T23:59:59+08:00");
    return now >= start && now <= end;
  };

  // Single-page hybrid router supporting both clean path slugs and fallback hashes
  const [isQuizActive, setIsQuizActive] = useState<boolean>(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    return hash === '#/quiz' || hash.startsWith('#/quiz/') || path.includes('/quiz');
  });

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
      setSelectedComicId(id);
      setIsQuizActive(false);
    } else if (hash === '#/quiz' || hash.startsWith('#/quiz/')) {
      window.history.replaceState(null, '', `/quiz/`);
      setIsQuizActive(true);
      setSelectedComicId(null);
    } else if (isQuizActive) {
      window.history.replaceState(null, '', '/quiz/');
    } else if (selectedComicId) {
      // Keep URL perfectly aligned with static directory slug paths
      window.history.replaceState(null, '', `/comic/${selectedComicId}/`);
    } else {
      window.history.replaceState(null, '', '/');
    }
  }, [selectedComicId, isQuizActive]);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      if (path.includes('/quiz') || hash === '#/quiz' || hash.startsWith('#/quiz/')) {
        setIsQuizActive(true);
        setSelectedComicId(null);
        return;
      }
      
      setIsQuizActive(false);
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

  const navigateToQuiz = (active: boolean) => {
    if (active) {
      window.history.pushState(null, '', `/quiz/`);
      setIsQuizActive(true);
      setSelectedComicId(null);
    } else {
      window.history.pushState(null, '', '/');
      setIsQuizActive(false);
      setSelectedComicId(null);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const navigateToComic = (id: string | null) => {
    setIsQuizActive(false);
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
    
    let pagePath = '/';
    let pageTitle = "玖伊枯 | 作品集";
    let pageDesc = "台灣BL漫畫家玖伊枯的個人官方網站與作品集門戶。收錄熱門連載代表作：《虛假的戀愛訊號》、《過氣男優的我竟然成為了微積分補教名師》、《要怎麼跟龍談戀愛》閱讀渠道與最新延伸作畫日常。";
    let documentTitle = "玖伊枯 | 作品集 (joyqul.tw)";

    if (isQuizActive) {
      pagePath = '/quiz/';
      pageTitle = "命定推薦測驗 | 玖伊枯 作品集";
      pageDesc = "回答幾個簡單的趣味選擇題，玖伊枯帶你瞬間找出符合你喜好、最好看最對味的原創耽美/日常推薦作品！";
      documentTitle = "命定推薦測驗 | 玖伊枯 作品集 (joyqul.tw)";
    } else if (selectedComicId && displayName) {
      pagePath = `/comic/${selectedComicId}/`;
      pageTitle = `《${displayName}》線上連載與延伸連結 | 玖伊枯 作品集`;
      pageDesc = `《${displayName}》線上連載以及其他連結。${detail?.description || mainComic?.description || ''}`;
      documentTitle = `《${displayName}》線上連載與延伸連結 | 玖伊枯 作品集 (joyqul.tw)`;
    }

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

    const pageUrl = isQuizActive
      ? 'https://joyqul.tw/quiz/'
      : selectedComicId 
        ? `https://joyqul.tw/comic/${selectedComicId}/`
        : 'https://joyqul.tw/';

    // Update document title first
    document.title = documentTitle;

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
  }, [selectedComicId, displayName, detail, mainComic, isQuizActive]);

  const onSocialClick = (platform: string, label: string, url: string) => {
    trackClick(`social_${platform}`, label, { url });
  };

  const handleShareComic = () => {
    const shareUrl = getCleanShareUrl(selectedComicId);
    navigator.clipboard.writeText(shareUrl);
    showToast(`已複製《${displayName || '作品'}》特別連結，可分享至社群平台！`);
    trackClick(`share_comic_${selectedComicId}`, `分享作品: ${displayName}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#403C35] font-sans pb-24 relative selection:bg-[#C2A978]/30 selection:text-[#403C35]">
      
      {/* Search Engine Optimization (SEO) Semantic Content - Invisible but fully indexed by search engines */}
      <SEOSemantic authorName={data.profile.name} />

      {/* Dynamic Toast Popup */}
      <Toast message={toastMessage} />

      {/* Main minimalist Portaly canvas container */}
      <div className="max-w-xl mx-auto px-5 pt-8">
        
        {isQuizActive ? (
          /* RECOMMENDATION QUIZ VIEW */
          <RecommendationQuiz 
            artworks={data.artworks}
            comicDetails={COMIC_DETAILS}
            onBack={() => navigateToQuiz(false)}
            onSelectComic={navigateToComic}
            onTrackClick={trackClick}
            getArtworkAltText={getArtworkAltText}
          />
        ) : selectedComicId === null ? (
          /* INDEX STATE (Main Profile + Comic List) */
          <div className="text-center flex flex-col items-center">
            
            <ProfileHeader 
              profile={data.profile}
              socials={data.socials}
              onShareClick={triggerShare}
              onSocialClick={onSocialClick}
            />

            {isFamiStoreActive() && <FamiStoreBanner onTrackClick={trackClick} />}

            <RecommendationBanner 
              onStartQuiz={() => navigateToQuiz(true)}
              onTrackClick={trackClick}
            />

            <StatusFilters 
              currentFilter={statusFilter}
              onFilterChange={setStatusFilter}
              onTrackClick={trackClick}
            />

            <ComicList 
              artworks={data.artworks}
              comicDetails={COMIC_DETAILS}
              statusFilter={statusFilter}
              onSelectComic={navigateToComic}
              onTrackClick={trackClick}
              getArtworkAltText={getArtworkAltText}
            />

          </div>
        ) : (
          /* SEPARATE WORKS PORTAL VIEW */
          mainComic && (
            <ComicDetailsView 
              mainComic={mainComic}
              detail={detail}
              displayName={displayName}
              status={status}
              tags={tags}
              subLinks={subLinks}
              onBack={() => {
                navigateToComic(null);
                trackClick('back_to_home_top', '返回首頁');
              }}
              onShareComic={handleShareComic}
              onTrackClick={trackClick}
              getArtworkAltText={getArtworkAltText}
            />
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
