/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'facebook' | 'plurk' | 'youtube' | 'threads' | 'tumblr' | 'pixiv' | 'email' | 'custom';
  url: string;
  label: string;
  iconName: string;
}

export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  canvasType: 'wide' | 'normal';
  status?: string;
  tags?: string[];
  linkUrl?: string;
  description?: string;
}



export interface ProfileConfig {
  name: string;
  subheading: string;
  bio: string;
  tags: string[];
  avatarUrl: string;
  bannerUrl: string;
  themeColor: 'emerald' | 'amber' | 'indigo' | 'rose' | 'slate' | 'violet';
  customBannerText?: string;
  customBannerUrl?: string;
  commissionStatus: 'Closed' | 'Waitlist';
  aboutMeLong: string;
}

export interface ComicDetail {
  title: string;
  description: string;
  status: string;
  tags: string[];
  mainPlatform: string;
}

export interface PortfolioData {
  profile: ProfileConfig;
  socials: SocialLink[];
  artworks: Artwork[];
}
