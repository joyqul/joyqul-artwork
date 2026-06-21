import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Star, Sparkles, AlertCircle } from 'lucide-react';
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
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalScores, setTotalScores] = useState<Record<string, number>>({
    'false_love_signal_manga': 0,
    'calculus_manga': 0,
    'how_to_date_a_dragon_manga': 0,
    'joyqul_daily_manga': 0
  });
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [matchPercentage, setMatchPercentage] = useState<number>(95);

  // Initialize quiz by selecting 3-4 random questions to make it speedy and fun
  useEffect(() => {
    initializeQuiz();
  }, []);

  const initializeQuiz = () => {
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
      setMatchPercentage(Math.floor(Math.random() * 7) + 93);
      setQuizCompleted(true);
      onTrackClick('quiz_completion', '完成推薦測驗');
    }
  };

  // Find the comic with the highest score
  const getMatchingComicId = (): string => {
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

  return (
    <div className="w-full flex flex-col items-center mt-2 page-view-animation">
      {/* Top Bar Navigation */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-[#C2A978]/10 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 group text-sm font-semibold text-[#8C8372] hover:text-[#403C35] transition-all bg-stone-100 hover:bg-stone-200/60 px-3.5 py-2 rounded-full shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>返回首頁</span>
        </button>

        <span className="text-xs font-bold text-[#C2A978] tracking-widest uppercase bg-[#C2A978]/8 px-3 py-1.5 rounded-full border border-[#C2A978]/15 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C2A978]" />
          測驗推薦頁面
        </span>
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
            
            <div className="relative mb-5 animate-bounce">
              <div className="w-16 h-16 rounded-full bg-[#C2A978]/12 flex items-center justify-center text-[#BCA374]">
                <Star className="w-8 h-8 fill-[#C2A978] text-[#C2A978]" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2A978] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C2A978]"></span>
              </span>
            </div>

            <span className="text-[11px] font-extrabold tracking-widest text-[#C2A978] uppercase bg-[#C2A978]/10 px-3.5 py-1.5 rounded-full border border-[#C2A978]/15 mb-3">
              YOUR DESTINY MATCH
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-wide text-[#33302B] mb-2 text-center">
              {matchPercentage}% 命定契合度！
            </h2>
            
            <p className="text-xs text-[#8C8372] mb-6 tracking-wide text-center">
              經過工人智慧的演算，推薦給你的作品是：
            </p>

            {/* Interactive Matching Card */}
            <div className="w-full flex flex-col items-center">
              <button
                onClick={() => {
                  onSelectComic(matchingComicId);
                  onTrackClick('quiz_result_card_click', `命中結果卡片: ${comicTitle}`);
                }}
                className="block text-left relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg border border-[#C2A978]/25 group cursor-pointer transition-transform hover:scale-[1.01] duration-300"
              >
                <img
                  src={matchingComic.imageUrl}
                  alt={getArtworkAltText(matchingComicId, comicTitle)}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {matchingComic.status && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#2B2824]/90 backdrop-blur-xs text-white text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs select-none">
                      {matchingComic.status}
                    </span>
                  </div>
                )}
              </button>

              <div className="mt-4 text-center px-2 w-full max-w-md">
                <h3 className="text-lg sm:text-xl font-serif font-bold tracking-wide text-[#33302B]">
                  《{comicTitle}》
                </h3>

                <div className="mt-3.5 bg-stone-50 p-5 rounded-2xl border border-stone-200/50 text-left">
                  {/* Original description */}
                  {(matchingDetail?.description || matchingComic?.description) && (
                    <p className="text-xs sm:text-sm text-[#8C8372] leading-relaxed tracking-wide mb-3 pb-3 border-b border-dashed border-stone-200">
                      {matchingDetail?.description || matchingComic?.description}
                    </p>
                  )}
                  
                  {/* Custom recommendation */}
                  {RESULT_DESCRIPTIONS[matchingComicId] && (
                    <div>
                      <div className="text-[10px] font-extrabold text-[#C2A978] tracking-widest mb-1.5 flex items-center gap-1">
                        <span>✨ 工人智慧推薦：</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#403C35] font-medium leading-relaxed tracking-wide">
                        {RESULT_DESCRIPTIONS[matchingComicId]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="w-full flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={() => {
                  onSelectComic(matchingComicId);
                  onTrackClick('quiz_result_action_go', `直接看爆作品: ${comicTitle}`);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-gradient-to-r from-[#C2A978] to-[#DFCBB4] hover:from-[#BCA374] hover:to-[#DFC29E] text-white font-extrabold text-xs sm:text-sm tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
              >
                <span>直接看爆這部作品</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button
                onClick={initializeQuiz}
                className="flex items-center justify-center gap-1.5 py-3.5 px-5 rounded-full border border-stone-300 hover:border-[#C2A978] bg-white text-[#8C8372] hover:text-[#403C35] font-semibold text-xs transition-all cursor-pointer active:scale-[0.99]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>重新測驗</span>
              </button>
            </div>

          </div>
        )
      )}
    </div>
  );
}
