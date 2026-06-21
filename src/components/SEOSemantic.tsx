import React from 'react';

export function SEOSemantic({ authorName }: { authorName: string }) {
  return (
    <div className="sr-only">
      <h2>{authorName} | 作品集 (joyqul.tw)</h2>
      <p>{authorName} 個人官方作品集。本站專為搜尋作品集的讀者提供最直接、高速的官方連載渠道連結。</p>
      
      <h3>代表作列表與介紹：</h3>
      <ul>
        <li><strong>虛假的戀愛訊號 (False Love Signals)</strong>：在 LINE Webtoon 熱烈連載的高人氣青春耽美漫畫。講述看似忠犬腹黑學弟攻與理工腦學長受之間的青春心動愛情。</li>
        <li><strong>過氣男優的我竟然成為了微積分補教名師</strong>：在 LINE Webtoon 獲得超高點閱的耽美完結佳作。描繪了容易害羞又忠犬的可愛學弟攻與誘受學長在微積分補教界擦出的浪漫火花。</li>
        <li><strong>要怎麼跟龍談戀愛</strong>：在 CXC 熱烈連載的原創奇幻BL漫畫，講述天然撩學弟攻與容易害羞學長受之間心跳難耐的戀愛喜劇故事。</li>
        <li><strong>玖伊枯日常四格</strong>：{authorName} 的爆笑個人日常生活與作畫花絮四格漫畫。</li>
      </ul>
      
      <p>此網址 (joyqul.tw) 提供所有最新官方線上閱讀連結及延伸作品，包含 CXC R18 刪減特典、有配音的推廣影片、背景製作花絮、日常 Webtoon Shorts 影片等。</p>
    </div>
  );
}
