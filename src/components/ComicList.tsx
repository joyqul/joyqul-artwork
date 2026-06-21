import React from 'react';
import { BookOpen } from 'lucide-react';
import { Artwork, ComicDetail } from '../types';
import { SeparateLine } from './SeparateLine';

interface ComicListProps {
  artworks: Artwork[];
  comicDetails: Record<string, ComicDetail>;
  statusFilter: string;
  onSelectComic: (id: string) => void;
  onTrackClick: (id: string, text: string) => void;
  getArtworkAltText: (id: string, title?: string) => string;
}

export function ComicList({
  artworks,
  comicDetails,
  statusFilter,
  onSelectComic,
  onTrackClick,
  getArtworkAltText
}: ComicListProps) {
  const filteredArtworks = artworks
    .filter((art) => art.canvasType === 'wide')
    .filter((art) => {
      if (statusFilter === '全部') return true;
      const comicDetail = comicDetails[art.id];
      const comicStatus = comicDetail?.status || art.status;
      return comicStatus === statusFilter;
    });

  return (
    <div className="w-full flex flex-col mt-2">
      {filteredArtworks.map((art) => {
        const comicDetail = comicDetails[art.id];
        const comicTitle = comicDetail ? comicDetail.title : art.title;
        const comicStatus = comicDetail?.status || art.status;
        const comicTags = comicDetail?.tags || art.tags || [];

        return (
          <div key={art.id} className="w-full flex flex-col">
            <SeparateLine className="my-6" />
            
            {/* Interactive Showcase Card */}
            <button
              onClick={() => {
                onSelectComic(art.id);
                onTrackClick(`comic_card_image_${art.id}`, `動態卡片: ${comicTitle}`);
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
                    onSelectComic(art.id);
                    onTrackClick(`comic_card_title_${art.id}`, `卡片標題: ${comicTitle}`);
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
                  onSelectComic(art.id);
                  onTrackClick(`comic_card_link_${art.id}`, `查看更多: ${comicTitle}`);
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
  );
}
