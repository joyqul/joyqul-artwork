/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioData } from './types';
import  * as Assets from '../assets';

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
      tags: ["看似忠犬的腹黑學弟攻", "理工腦學長受"],
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
      tags: ["忠犬又容易害羞的可愛學弟攻", "誘受學長"],
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
      tags: ["天然撩學弟攻", "容易害羞學長受"],
      linkUrl: "https://cxc.today/zh/@joyqul/book/25856"
    },
    {
      id: "joyqul_daily_manga",
      title:"",
      imageUrl: Assets.joyqulDaily,
      status:"連載中",
      canvasType:"wide",
      tags: ["日常", "四格"],
      linkUrl: "https://cxc.today/zh/@joyqul/book/42711"
    }
  ],
};
