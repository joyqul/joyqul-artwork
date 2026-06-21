import React from 'react';
import { 
  Share2, 
  Instagram, 
  Facebook, 
  Youtube, 
  Mail, 
  Globe, 
  MessageCircle 
} from 'lucide-react';
import { SocialLink, ProfileConfig } from '../types';

interface ProfileHeaderProps {
  profile: ProfileConfig;
  socials: SocialLink[];
  onShareClick: () => void;
  onSocialClick: (platform: string, label: string, url: string) => void;
}

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

export function ProfileHeader({ profile, socials, onShareClick, onSocialClick }: ProfileHeaderProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Top bar with Share */}
      <div className="w-full flex items-center justify-end mb-8 opacity-95">
        <button
          onClick={onShareClick}
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
            src={profile.avatarUrl}
            alt={`${profile.name} - 官方作品集與頭像門戶網站 (joyqul.tw)`}
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Name & Subheadings */}
      <h1 className="text-2xl font-bold tracking-wide text-[#33302B] mt-5 font-sans">
        {profile.name}
      </h1>

      <div className="mt-2.5 flex flex-col gap-1.5 font-sans text-center">
        {profile.subheading.split('|').map((line, idx) => (
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
        {socials.map((soc) => {
          const Icon = getSocialIcon(soc.platform);
          return (
            <a
              key={soc.id}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onSocialClick(soc.platform, soc.label, soc.url)}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-transparent border border-[#C2A978]/40 hover:border-[#C2A978] text-[#BCA374] hover:bg-[#C2A978]/10 hover:shadow-xs hover:scale-105 duration-200 transition-all"
              title={soc.label}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
