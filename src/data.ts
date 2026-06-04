/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioData, ComicDetail } from './types';
import  * as Assets from '../assets';

export const COMIC_DETAILS: Record<string, ComicDetail> = {
  'false_love_signal_manga': {
    title: "虛假的戀愛訊號",
    description: "「心動？這種非理性的衝動，不過是虛假的戀愛訊號。」 高能訊號工作室創辦人蕭薪澤一向這麼相信，直到他的學弟詹震銳闖入他的生活，讓他開始感到動搖⋯⋯",
    status: "已完結",
    tags: ["BL", "看似忠犬的腹黑學弟攻", "理工腦學長受", "職場戀愛"],
    mainPlatform: "LINE Webtoon"
  },
  'calculus_manga': {
    title: "過氣男優的我竟然成為了微積分補教名師",
    description: "因為種種原因成為了GV男優的張証哲(25)面臨了過氣的問題，在遇到樓下的鄰居後，意外成為了微積分補教名師⋯⋯？！",
    status: "已完結",
    tags: ["BL", "忠犬又容易害羞的可愛學弟攻", "誘受學長"],
    mainPlatform: "LINE Webtoon"
  },
  'how_to_date_a_dragon_manga': {
    title: "要怎麼跟龍談戀愛",
    description: "在全台最大同性交友軟體上滑到了⋯⋯台北大黑龍？！不是，是要怎麼跟龍談戀愛啦？！",
    status: "連載中",
    tags: ["BL", "天然撩學弟攻", "容易害羞學長受", "微奇幻"],
    mainPlatform: "CxC"
  },
  'joyqul_daily_manga': {
    title: "飄飄的非日常",
    description: "用四格記錄一些根本不是日常會發生的事情。",
    status: "連載中",
    tags: ["日常四格"],
    mainPlatform: "CxC"
  }
};

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "玖伊枯（飄飄） 🇹🇼",
    subheading: "斜槓畫 BL | 偶爾畫畫日常四格",
    bio: "斜槓畫 BL \n偶爾畫畫日常四格",
    tags: ["BL / 耽美", "日常四格"],
    avatarUrl: Assets.joyqulAvatar, 
    bannerUrl: "",
    themeColor: "indigo",
    commissionStatus: "Waitlist",
    aboutMeLong: ""
  },
  socials: [
    {
      id: "soc-1",
      platform: "email",
      url: "mailto:joyqul.tw@gmail.com",
      label: "聯絡信箱",
      iconName: "Mail"
    },
    {
      id: "soc-2",
      platform: "instagram",
      url: "https://www.instagram.com/joyqul.tw",
      label: "Instagram",
      iconName: "Instagram"
    },
    {
      id: "soc-3",
      platform: "facebook",
      url: "https://www.facebook.com/joyqul.tw",
      label: "Facebook 粉絲專頁",
      iconName: "Facebook"
    },
    {
      id: "soc-5",
      platform: "youtube",
      url: "https://www.youtube.com/@joyqul-tw",
      label: "YouTube 頻道",
      iconName: "Youtube"
    },
    {
      id: "soc-6",
      platform: "custom",
      url: "https://cxc.today/zh/@joyqul/work",
      label: "CXC",
      iconName: "Globe"
    }
  ],
  artworks: [
    {
      id: "false_love_signal_manga",
      title: "",
      imageUrl: Assets.falseLoveSignalBanner,
      canvasType: "wide",
      status: "已完結",
      linkUrl: "https://www.webtoons.com/zh-hant/bl-gl/false-love-signals/list?title_no=8065"
    },
    {
      id: "false_love_signal_r18",
      title: "R18 刪減部分",
      imageUrl: Assets.falseLoveSignalR18,
      canvasType: "normal",
      linkUrl: "https://cxc.today/zh/@joyqul/book/37713"
    },
    {
      id: "false_love_signal_manga_sound",
      title: "有配音的酷東西",
      imageUrl: Assets.falseLoveSignalSound,
      canvasType: "normal",
      linkUrl: "https://www.youtube.com/watch?v=iktXUHBo1b4&list=PL0nXJpHnI3EEzm8hQu7GNCWkIJyF2exIO"
    },
    {
      id: "false_love_signal_ext",
      title: "一些製作花絮",
      imageUrl: Assets.falseLoveSignalExt,
      canvasType: "normal",
      linkUrl: "https://cxc.today/zh/@joyqul/book/42711"
    },
    {
      id: "false_love_signal_shorts",
      title: "Shorts",
      imageUrl: Assets.falseLoveSignalShorts,
      canvasType: "normal",
      linkUrl: "https://www.youtube.com/watch?v=PUYdss5ib88&list=PL0nXJpHnI3EH7TbutAEbuIznpKhOnvcIm"
    },
    {
      id: "calculus_manga",
      title:"",
      imageUrl: Assets.calculusBanner,
      status: "已完結",
      canvasType: "wide",
      linkUrl: "https://www.webtoons.com/zh-hant/local/from-porn-star-to-calculus-teacher/list?title_no=4938"
    },
    {
      id: "calculus_r18",
      title:"R18 刪減部分",
      imageUrl: Assets.calculusR18,
      canvasType: "normal",
      linkUrl: "https://cxc.today/zh/@joyqul/book/283"
    },
    {
      id: "calculus_ext",
      title: "番外・經典同居30題！",
      imageUrl: Assets.calculusExt,
      canvasType: "normal",
      linkUrl: "https://cxc.today/zh/@joyqul/book/3425"
    },
    {
      id: "how_to_date_a_dragon_manga",
      title: "",
      imageUrl: Assets.howToDateADragonBanner,
      status: "連載中",
      canvasType: "wide",
      linkUrl: "https://cxc.today/zh/@joyqul/book/25856"
    },
    {
      id: "joyqul_daily_manga",
      title:"",
      imageUrl: Assets.joyqulDaily,
      status:"連載中",
      canvasType:"wide",
      linkUrl: "https://cxc.today/zh/@joyqul/book/42711"
    }
  ],
};
