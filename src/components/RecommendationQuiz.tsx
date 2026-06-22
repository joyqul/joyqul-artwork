import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, Star, Sparkles, AlertCircle, Share2, Check } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion, QuizOption } from '../quizData';
import { Artwork, ComicDetail } from '../types';

interface RecommendationQuizProps {
  artworks: Artwork[];
  comicDetails: Record<string, ComicDetail>;
  onBack: () => void;
  onSelectComic: (id: string) => void;
  onTrackClick: (id: string, text: string) => void;
  getArtworkAltText: (id: string, title?: string) => string;
}

// Fun descriptions tailored to each comic result
const RESULT_DESCRIPTIONS: Record<string, string> = {
  'false_love_signal_manga': '推薦給喜歡微虐辦公室戀愛、想看看似奶狗其實腹黑的學弟攻與理工直男學長CP的你。',
  'calculus_manga': '推薦給喜歡輕鬆爆笑、想看可愛忠犬學弟攻與誘受學長CP的你。微積分也可以很萌！',
  'how_to_date_a_dragon_manga': '推薦給渴望甜度溢出、喜歡奇幻幽默與天然撩直球學弟攻、容易害羞學長受的你。',
  'joyqul_daily_manga': '最療癒的日常生活隨筆！推薦給今天想被戳中笑穴、看著各種爆笑與無厘頭非日常四格大笑的你。'
};

export function RecommendationQuiz({
  artworks,
  comicDetails,
  onBack,
  onSelectComic,
  onTrackClick,
  getArtworkAltText
}: RecommendationQuizProps) {
  // Check if a shared result is provided in URL query or hash query
  const getSharedResultFromUrl = (): string | null => {
    // 1. Check window.location.search
    const searchParams = new URLSearchParams(window.location.search);
    let res = searchParams.get('result');
    if (res && RESULT_DESCRIPTIONS[res]) {
      return res;
    }

    // 2. Check hash query if URL is handled via Hash Router / Hash fallbacks
    // e.g., /#/quiz?result=calculus_manga
    const hash = window.location.hash;
    const hashSearchIdx = hash.indexOf('?');
    if (hashSearchIdx !== -1) {
      const hashParams = new URLSearchParams(hash.substring(hashSearchIdx));
      res = hashParams.get('result');
      if (res && RESULT_DESCRIPTIONS[res]) {
        return res;
      }
    }
    return null;
  };

  const getSharedPctFromUrl = (): number | null => {
    const searchParams = new URLSearchParams(window.location.search);
    let pct = searchParams.get('pct');
    if (pct) {
      const parsed = parseInt(pct, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
        return parsed;
      }
    }

    const hash = window.location.hash;
    const hashSearchIdx = hash.indexOf('?');
    if (hashSearchIdx !== -1) {
      const hashParams = new URLSearchParams(hash.substring(hashSearchIdx));
      pct = hashParams.get('pct');
      if (pct) {
        const parsed = parseInt(pct, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
          return parsed;
        }
      }
    }
    return null;
  };

  const [sharedResultId, setSharedResultId] = useState<string | null>(() => {
    return getSharedResultFromUrl();
  });

  const [hasTakenQuiz, setHasTakenQuiz] = useState<boolean>(() => {
    return getSharedResultFromUrl() === null;
  });

  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalScores, setTotalScores] = useState<Record<string, number>>({
    'false_love_signal_manga': 0,
    'calculus_manga': 0,
    'how_to_date_a_dragon_manga': 0,
    'joyqul_daily_manga': 0
  });
  const [quizCompleted, setQuizCompleted] = useState<boolean>(() => {
    return getSharedResultFromUrl() !== null;
  });
  const [matchPercentage, setMatchPercentage] = useState<number>(() => {
    const urlPct = getSharedPctFromUrl();
    if (urlPct !== null) return urlPct;
    return Math.floor(Math.random() * 5) + 95; // 95% - 99%
  });

  // Initialize quiz by selecting 3-4 random questions to make it speedy and fun
  useEffect(() => {
    // Only run normal shuffle init if there's no active shared result
    const sharedId = getSharedResultFromUrl();
    if (!sharedId) {
      initializeQuiz(false);
    } else {
      setQuizCompleted(true);
      setSharedResultId(sharedId);
      setHasTakenQuiz(false);
    }
  }, []);

  const initializeQuiz = (clearUrl = false) => {
    // Clear URL query parameter ONLY if explicitly requested (e.g., clicking re-take)
    if (clearUrl && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '/quiz/');
      window.dispatchEvent(new Event('popstate'));
    }
    setSharedResultId(null);
    setHasTakenQuiz(true);

    // Shuffling the questions using Durstenfeld shuffle alg
    const shuffled = [...QUIZ_QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Limit to 4 questions to keep it quick but highly relevant!
    setActiveQuestions(shuffled.slice(0, 4));
    setCurrentStep(0);
    setTotalScores({
      'false_love_signal_manga': 0,
      'calculus_manga': 0,
      'how_to_date_a_dragon_manga': 0,
      'joyqul_daily_manga': 0
    });
    setQuizCompleted(false);
    setMatchPercentage(Math.floor(Math.random() * 5) + 95);
  };

  const handleOptionSelect = (option: QuizOption) => {
    // Record scores
    const updatedScores = { ...totalScores };
    Object.entries(option.scores).forEach(([comicId, points]) => {
      if (updatedScores[comicId] !== undefined) {
        updatedScores[comicId] += points;
      }
    });
    setTotalScores(updatedScores);

    // Track response event
    onTrackClick('quiz_option_click', `選擇: ${option.text}`);

    // Progress to next step
    if (currentStep < activeQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete! Generate a match percentage between 93% and 99% for fun
      const percentage = Math.floor(Math.random() * 7) + 93;
      setMatchPercentage(percentage);
      
      // Track best result
      let bestComicId = 'false_love_signal_manga';
      let highestScore = -999;
      Object.entries(updatedScores).forEach(([comicId, score]) => {
        const numScore = score as number;
        if (numScore > highestScore) {
          highestScore = numScore;
          bestComicId = comicId;
        }
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `/quiz/?result=${bestComicId}&pct=${percentage}`);
        window.dispatchEvent(new Event('popstate'));
      }

      setHasTakenQuiz(true);
      setQuizCompleted(true);
      onTrackClick('quiz_completion', `完成推薦測驗: ${bestComicId}`);
    }
  };

  // Find the comic with the highest score
  const getMatchingComicId = (): string => {
    if (sharedResultId && RESULT_DESCRIPTIONS[sharedResultId]) {
      return sharedResultId;
    }

    let bestComicId = 'false_love_signal_manga';
    let highestScore = -999;

    Object.entries(totalScores).forEach(([comicId, score]) => {
      const numScore = score as number;
      if (numScore > highestScore) {
        highestScore = numScore;
        bestComicId = comicId;
      }
    });

    return bestComicId;
  };

  const matchingComicId = getMatchingComicId();
  const matchingComic = artworks.find(art => art.id === matchingComicId);
  const matchingDetail = comicDetails[matchingComicId];
  const comicTitle = matchingDetail ? matchingDetail.title : (matchingComic?.title || "");

  const [copiedQuiz, setCopiedQuiz] = useState<boolean>(false);
  const [copiedResult, setCopiedResult] = useState<boolean>(false);

  const isMobileDevice = (): boolean => {
    if (typeof navigator === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const handleShareQuiz = async () => {
    const origin = window.location.origin;
    const shareUrl = `${origin}/quiz/`;
    const shareText = '';
    
    // Check if web share API is supported and we are on mobile
    if (navigator.share && isMobileDevice()) {
      try {
        await navigator.share({
          title: `玖伊枯命定推薦測驗`,
          text: shareText,
          url: shareUrl
        });
        onTrackClick('quiz_share_quiz_api', `分享測驗成功`);
        return;
      } catch (err) {
        console.log('Share quiz API cancelled or fallback copied:', err);
      }
    }

    // Clipboard copy fallback
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedQuiz(true);
      onTrackClick('quiz_share_quiz_copy', `複製分享測驗連結`);
      setTimeout(() => setCopiedQuiz(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShareResultUrl = async () => {
    const origin = window.location.origin;
    const shareUrl = `${origin}/quiz/${matchingComicId}/?pct=${matchPercentage}`;
    const shareText = '';

    // Check if web share API is supported and we are on mobile
    if (navigator.share && isMobileDevice()) {
      try {
        await navigator.share({
          title: `玖伊枯作品集命定推薦`,
          text: shareText,
          url: shareUrl
        });
        onTrackClick('quiz_share_result_api', `分享測驗結果成功: ${matchingComicId}`);
        return;
      } catch (err) {
        console.log('Share result API cancelled or fallback copied:', err);
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedResult(true);
      onTrackClick('quiz_share_result_copy', `複製分享結果連結: ${matchingComicId}`);
      setTimeout(() => setCopiedResult(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-2 page-view-animation">
      {/* Top Bar Navigation */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-[#C2A978]/10 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 group text-sm font-semibold text-[#8C8372] hover:text-[#403C35] transition-all bg-stone-100 hover:bg-stone-200/60 px-3.5 py-2 rounded-full shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>返回首頁</span>
        </button>

        <button
          onClick={handleShareQuiz}
          className={`flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-full border transition-all cursor-pointer text-xs font-bold tracking-wider shrink-0 ${
            copiedQuiz
              ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
              : 'border-[#C2A978]/60 hover:border-[#C2A978] bg-[#C2A978]/4 text-[#BCA374] hover:text-[#A68F62]'
          }`}
        >
          {copiedQuiz ? <Check className="w-3.5 h-3.5 shrink-0" /> : <Share2 className="w-3.5 h-3.5 shrink-0" />}
          <span className="truncate">{copiedQuiz ? '已複製連結！' : '分享此測驗'}</span>
        </button>
      </div>

      {!quizCompleted ? (
        /* QUIZ PROGRESS SCREEN */
        activeQuestions.length > 0 && (
          <div className="w-full bg-white border border-[#C2A978]/25 rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(194,169,120,0.06)] flex flex-col">
            
            {/* Step indicators */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-[#C2A978] tracking-wider uppercase">
                Question {currentStep + 1} of {activeQuestions.length}
              </span>
              <span className="text-xs font-semibold text-[#8C8372]">
                完成進度 {Math.round(((currentStep) / activeQuestions.length) * 100)}%
              </span>
            </div>

            {/* Progress line */}
            <div className="w-full h-1.5 bg-[#EEEDE9] rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-linear-to-r from-[#C2A978] to-[#E5D2A8] transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <h2 className="text-lg sm:text-xl font-sans font-extrabold text-[#33302B] tracking-wide mb-6 text-left leading-relaxed">
              {activeQuestions[currentStep].title}
            </h2>

            {/* Options block */}
            <div className="flex flex-col gap-3.5">
              {activeQuestions[currentStep].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleOptionSelect(opt)}
                  className="w-full flex items-center justify-between text-left p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#C2A978] hover:bg-[#C2A978]/4 transition-all duration-350 cursor-pointer group active:scale-[0.99]"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#403C35] group-hover:text-[#33302B] transition-colors leading-relaxed">
                    {opt.text}
                  </span>
                  <span className="text-[10px] text-stone-300 group-hover:text-[#C2A978] font-bold tracking-wider transition-colors uppercase shrink-0">
                    SELECT
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-dashed border-[#C2A978]/20 flex items-center gap-1.5 text-[10px] text-[#8C8372] justify-center">
              <AlertCircle className="w-3.5 h-3.5 text-[#C2A978]/75" />
              <span>隨機選題測驗，輕鬆找出最適合你的命定代表作。</span>
            </div>

          </div>
        )
      ) : (
        /* RESULT MATCHING SCREEN */
        matchingComic && (
          <div className="w-full bg-linear-to-b from-white to-[#FAF8F5] border border-[#C2A978]/30 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(194,169,120,0.1)] flex flex-col items-center page-view-animation">
            
            {/* Downloadable Poster Card wrapper */}
              <span 
                className="inline-flex items-center justify-center h-7 text-[11px] font-extrabold tracking-widest uppercase px-4 rounded-full border mb-3 select-none leading-none text-center"
                style={{
                  color: '#C2A978',
                  backgroundColor: 'rgba(194, 169, 120, 0.08)',
                  borderColor: 'rgba(194, 169, 120, 0.15)'
                }}
              >
                {hasTakenQuiz ? 'YOUR DESTINY MATCH' : 'FRIEND\'S RECOMMENDATION'}
              </span>

              <h2 
                className="text-2xl sm:text-3xl font-serif font-extrabold tracking-wide mb-2 text-center"
                style={{ color: '#33302B' }}
              >
                {hasTakenQuiz ? `${matchPercentage}% 命定契合度！` : '朋友最愛的契合代表作！'}
              </h2>
              
              <p 
                className="text-xs mb-6 tracking-wide text-center"
                style={{ color: '#8C8372' }}
              >
                {hasTakenQuiz 
                  ? '經過工人智慧的演算，推薦給你的作品是：' 
                  : `他的測驗結果與《${comicTitle}》高度契合達 ${matchPercentage}%！`}
              </p>

              {/* Interactive Matching Card */}
              <div className="w-full flex flex-col items-center">
                <button
                  onClick={() => {
                    onSelectComic(matchingComicId);
                    onTrackClick('quiz_result_card_click', `命中結果卡片: ${comicTitle}`);
                  }}
                  className="block text-left relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg border group cursor-pointer transition-transform hover:scale-[1.01] duration-300"
                  style={{ borderColor: 'rgba(194, 169, 120, 0.25)' }}
                >
                  <img
                    src={matchingComic.imageUrl}
                    alt={getArtworkAltText(matchingComicId, comicTitle)}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {matchingComic.status && (
                    <div className="absolute top-3 left-3 z-10">
                      <span 
                        className="inline-flex items-center justify-center backdrop-blur-xs h-5 text-[9px] uppercase font-bold tracking-wider px-2.5 rounded-full shadow-xs select-none leading-none"
                        style={{ backgroundColor: 'rgba(43, 40, 36, 0.90)', color: '#FFFFFF' }}
                      >
                        {matchingComic.status}
                      </span>
                    </div>
                  )}
                </button>

                <div className="mt-4 text-center px-2 w-full max-w-md">
                  <h3 
                    className="text-lg sm:text-xl font-serif font-bold tracking-wide"
                    style={{ color: '#33302B' }}
                  >
                    《{comicTitle}》
                  </h3>

                  <div 
                    className="mt-3.5 p-5 rounded-2xl border text-left"
                    style={{ backgroundColor: '#FAF9F6', borderColor: 'rgba(229, 229, 224, 0.50)' }}
                  >
                    {/* Original description */}
                    {(matchingDetail?.description || matchingComic?.description) && (
                      <p 
                        className="text-xs sm:text-sm leading-relaxed tracking-wide mb-3 pb-3 border-b border-dashed"
                        style={{ color: '#8C8372', borderColor: '#E5E5E0' }}
                      >
                        {matchingDetail?.description || matchingComic?.description}
                      </p>
                    )}
                    
                    {/* Custom recommendation */}
                    {RESULT_DESCRIPTIONS[matchingComicId] && (
                      <div>
                        <div 
                          className="text-[10px] font-extrabold tracking-widest mb-1.5 flex items-center gap-1"
                          style={{ color: '#C2A978' }}
                        >
                          <span>✨ 工人智慧推薦：</span>
                        </div>
                        <p 
                          className="text-xs sm:text-sm font-medium leading-relaxed tracking-wide"
                          style={{ color: '#403C35' }}
                        >
                          {RESULT_DESCRIPTIONS[matchingComicId]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            {/* CTAs */}
            <div className="w-full flex flex-col gap-3 mt-8">
              {/* Primary Call To Action */}
              {hasTakenQuiz ? (
                <button
                  onClick={() => {
                    onSelectComic(matchingComicId);
                    onTrackClick('quiz_result_action_go', `直接看爆作品: ${comicTitle}`);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-full bg-gradient-to-r from-[#C2A978] to-[#DFCBB4] hover:from-[#BCA374] hover:to-[#DFC29E] text-white font-extrabold text-xs sm:text-sm tracking-wider shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
                >
                  <span>直接看爆這部作品</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={initializeQuiz}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-gradient-to-r from-[#C2A978] to-[#DFCBB4] hover:from-[#BCA374] hover:to-[#DFC29E] text-white font-extrabold text-xs sm:text-sm tracking-widest shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-[0.99] animate-pulse"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>我也要測測看！</span>
                </button>
              )}

              {/* Secondary Buttons Row */}
              {hasTakenQuiz ? (
                <div className="grid grid-cols-2 gap-2.5 w-full">
                  {/* Share Result Button */}
                  <button
                    onClick={handleShareResultUrl}
                    className={`flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-full border transition-all cursor-pointer active:scale-[0.99] font-bold text-xs sm:text-sm tracking-wide ${
                      copiedResult
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                        : 'border-[#C2A978]/60 hover:border-[#C2A978] bg-[#C2A978]/4 text-[#BCA374] hover:text-[#A68F62]'
                    }`}
                  >
                    {copiedResult ? <Check className="w-4 h-4 shrink-0" /> : <Share2 className="w-4 h-4 shrink-0" />}
                    <span className="truncate">
                      {copiedResult ? '已複製結果！' : '分享測驗結果'}
                    </span>
                  </button>

                  {/* Re-take test button */}
                  <button
                    onClick={() => {
                      initializeQuiz(true);
                    }}
                    className="flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-full border border-stone-300 hover:border-[#C2A978] bg-white text-[#8C8372] hover:text-[#403C35] font-semibold text-xs sm:text-sm tracking-wider transition-all cursor-pointer active:scale-[0.99]"
                  >
                    <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">重新測驗</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onSelectComic(matchingComicId);
                    onTrackClick('quiz_shared_view_details', `看爆作品: ${comicTitle}`);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-full border border-stone-300 hover:border-[#C2A978] bg-white text-[#8C8372] hover:text-[#403C35] font-semibold text-xs sm:text-sm tracking-wider transition-all cursor-pointer active:scale-[0.99]"
                >
                  <span className="truncate">看這部作品介紹</span>
                </button>
              )}
            </div>

          </div>
        )
      )}
    </div>
  );
}
