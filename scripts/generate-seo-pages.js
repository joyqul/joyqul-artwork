import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  console.error("Dist folder does not exist! Run build first.");
  process.exit(1);
}

// Find files in dist/assets to resolve hashed webp image paths
const assetsDir = path.join(distDir, 'assets');
let assetFiles = [];
if (fs.existsSync(assetsDir)) {
  assetFiles = fs.readdirSync(assetsDir);
}

function resolveHashedAsset(prefix) {
  // Find a file that starts with the prefix and ends with .webp, keeping standard regex matching in mind
  const match = assetFiles.find(file => file.startsWith(prefix) && file.endsWith('.webp'));
  if (match) {
    return `/assets/${match}`;
  }
  return `/assets/${prefix}.webp`; // default fallback
}

// Map of the core comic profiles to build statically with beautiful index crawlers
const comics = [
  {
    id: "false_love_signal_manga",
    title: "《虛假的戀愛訊號》線上連載與延伸連結 | 玖伊枯 作品集",
    description: "「心動？這種非理性的衝動，不過是虛假的戀愛訊號。」 高能訊號工作室創辦人蕭薪澤一向這麼相信，直到他的學弟詹震銳闖入他的生活，讓他開始感到動搖⋯⋯",
    imagePrefix: "false_love_signal_banner"
  },
  {
    id: "calculus_manga",
    title: "《過氣男優的我竟然成為了微積分補教名師》線上連載與延伸連結 | 玖伊枯 作品集",
    description: "因為種種原因成為了GV男優的張証哲(25)面臨了過氣的問題，在遇到樓下的鄰居後，意外成為了微積分補教名師⋯⋯？！",
    imagePrefix: "calculus_banner"
  },
  {
    id: "how_to_date_a_dragon_manga",
    title: "《要怎麼跟龍談戀愛》線上連載與延伸連結 | 玖伊枯 作品集",
    description: "在全台最大同性交友軟體上滑到了⋯⋯台北大黑龍？！不是，是要怎麼跟龍談戀愛啦？！",
    imagePrefix: "how_to_date_a_dragon_banner"
  },
  {
    id: "joyqul_daily_manga",
    title: "《飄飄的非日常》日常四格漫畫與延伸連結 | 玖伊枯 作品集",
    description: "用四格記錄一些根本不是日常會發生的事情。",
    imagePrefix: "joyqul_daily"
  }
];

// Create redirect landing pages with custom Open Graph cards
comics.forEach(comic => {
  const pageImageRelative = resolveHashedAsset(comic.imagePrefix);
  const pageImageUrl = `https://joyqul.tw${pageImageRelative}`;
  const pageUrl = `https://joyqul.tw/comic/${comic.id}`;
  
  const seoHtml = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/webp" href="/assets/joyqul_avatar.webp" />
    
    <!-- Primary Search Engine Optimization (SEO) Metadata -->
    <title>${comic.title}</title>
    <meta name="description" content="${comic.description}" />
    <meta name="keywords" content="Joyqul, 玖伊枯, 虛假的戀愛訊號, 過氣男優的我竟然成為了微積分補教名師, 要怎麼跟龍談戀愛, 台灣BL漫畫家, BL漫畫, 日常四格, 耽美漫畫" />
    <link rel="canonical" href="${pageUrl}" />

    <!-- Open Graph / Web Crawler sharing cards -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${comic.title}" />
    <meta property="og:description" content="${comic.description}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${pageImageUrl}" />

    <!-- Twitter / X sharing cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${comic.title}" />
    <meta name="twitter:description" content="${comic.description}" />
    <meta name="twitter:image" content="${pageImageUrl}" />

    <!-- Instant client redirection logic to the SPA hashtag path -->
    <meta http-equiv="refresh" content="0; url=/#/comic/${comic.id}" />
    <script>
      // Seamlessly transfer page context back to React client router
      const spaTarget = window.location.protocol + '//' + window.location.host + '/#/comic/${comic.id}';
      window.location.replace(spaTarget);
    </script>
  </head>
  <body style="font-family: system-ui, -apple-system, sans-serif; background: #FAF8F5; color: #403C35; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center;">
    <div>
      <h3 style="font-weight: 500;">正在為您導向至《玖伊枯作品集》作品專頁...</h3>
      <p style="font-size: 14px; color: #8F8778;">若您的瀏覽器沒有自動跳轉，請 <a href="/#/comic/${comic.id}" style="color: #BCA374; font-weight: bold; text-decoration: underline;">點擊此處</a> 直接開啟。</p>
    </div>
  </body>
</html>
`;

  // Ensure directory structures match target requirements
  const outputDir = path.join(distDir, 'comic', comic.id);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), seoHtml);
});

console.log("SEO Landing Pages build successfully completed!");
